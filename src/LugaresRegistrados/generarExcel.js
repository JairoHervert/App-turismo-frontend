const XLSX = require('xlsx');

const { obtenerLugarNombreDireccion } = require('../models/MySQL/lugares-model');

const crearExcel = async () => {
    // Crear un libro de Excel (Workbook)
    const workbook = XLSX.utils.book_new();

    // Crear una hoja de datos (Worksheet)
    const data = [
        ["Nombre", "Direccion", "PrecioAproximado"]
    ];

    // Hacer una consulta a la base de datos para obtener nombre y dirección de los lugares, no llenar el precio aproximado
    try {
        const lugares = await obtenerLugarNombreDireccion();
        // console.log(lugares);
        for (const lugar of lugares) {
            // console.log(lugar.precioRango);  // "100 MXN - 200 MXN"
            // console.log(lugar.precioAproximado);
            // Agregar solo si precioAproximado es nulo
            if (lugar.precioAproximado !== null){
                data.push([lugar.nombre, lugar.direccion, lugar.precioAproximado]);
                continue;
            }
            if(lugar.precioAproximado === null && lugar.precioRango !== '"No disponible"'){
                // Extraer el precio aproximado del rango, obtener el promedio
                let precioAproximado;
                const precios = lugar.precioRango.split(' - ');
                const precioMin = parseInt(precios[0].replace(' MXN', '').substring(1));
                // console.log(precioMin);
                if(precios[1].includes('N/A')){
                    precioAproximado = precioMin;
                }
                else{
                    // Quitar las comillas finales  // 400"
                    const precioMax = parseInt(precios[1].replace(' MXN', '').substring(0, precios[1].length - 1));
                    // Castear a entero
                    precioAproximado = Math.round((precioMin + precioMax) / 2);
                }
                data.push([lugar.nombre, lugar.direccion, precioAproximado]);
            }
            else{
                data.push([lugar.nombre, lugar.direccion, ""]);
            }
        }
    } catch (error) {
        console.error('Error al obtener los lugares:', error.message);
    }

    // Agregar datos a la hoja
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, "Precios");

    // Guardar el archivo
    XLSX.writeFile(workbook, "Precios.xlsx");

    console.log("Archivo Excel creado: Precios.xlsx");
}

crearExcel();