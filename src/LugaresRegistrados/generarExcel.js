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
        console.log(lugares);
        for (const lugar of lugares) {
            data.push([lugar.nombre, lugar.direccion, '']);
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