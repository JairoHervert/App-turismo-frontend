// Leer el excel y cargar los precios de los lugares en la base de datos de acuerdo con su nombre y dirección
const db = require('../models/MySQL/db');
const XLSX = require('xlsx');

const cargarPrecios = async () => {
    // Leer el archivo Excel
    const workbook = XLSX.readFile('Precios_Primeros_10.xlsx');
    const worksheet = workbook.Sheets['Sheet1'];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Recorrer los datos
    for (const lugar of data) {
        console.log(lugar);
        // Obtener el nombre y la dirección del lugar
        const nombre = lugar.Nombre;
        const direccion = lugar.Direccion;
        const precio = lugar.PrecioAproximado;

        // Actualizar el precio aproximado del lugar en la base de datos
        const query = `UPDATE lugar SET precioAproximado = ? WHERE nombre = ? AND direccion = ?`;
        const params = [precio, nombre, direccion];

        try {
            const [results] = await db.promise().query(query, params);
            if (results && results.error) {
                throw new Error(results.error);
            }
            console.log(`Precio actualizado para ${nombre} en ${direccion}`);
        } catch (error) {
            console.error('Error al actualizar el precio:', error.message);
        }
    }
}

cargarPrecios();