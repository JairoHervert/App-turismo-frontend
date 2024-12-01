const express = require('express');
const router = express.Router();
const { buscarLugares, buscarLugaresPorTexto } = require('../controllers/places-controller');
const { registrarLugar } = require('../models/MySQL/lugares-model'); 
const fs = require('fs');
const path = require('path'); // Para manejar rutas de archivos


// Endpoint para buscar lugares
router.post('/buscar-lugares', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'El parámetro input es obligatorio' });
  }

  try {
    const lugares = await buscarLugares(input);
    res.json(lugares);
  } catch (error) {
    console.error('Error en /buscar-lugares:', error.message);
    res.status(500).json({ error: 'Error al buscar lugares' });
  }
});


router.post('/buscar-texto', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'El parámetro query es obligatorio' });
  }

  try {
    const lugares = await buscarLugaresPorTexto(query);

    // Ruta al archivo JSON donde se guardarán los lugares
    const filePath = path.join(__dirname, '../LugaresRegistrados/lugaresRegistrados.json');

    for (const lugar of lugares.places) {
      try {

        // PRIMERO SE DEBE VALIDAR QUE EL LUGAR TIENE SUBCATEGORÍAS DE LAS QUE SELECCIONAMOS (DIBUJO DEL PAINT)
        // SI NO TIENE NINGUNA DE LAS 4 SUBCATEGORÍAS, NO SE REGISTRA EN LA BASE DE DATOS (CONTINUE)
        // (SE REGISTRA EL LUGAR
        // SE LLAMA A REGISTRARSUBCATEGORÍA POR CADA SUBCATEGORÍA QUE TENGA EL LUGAR DE LAS DE LA BASE DE DATOS): Todo este proceso se hace en lugares-model.js
        // ESCRIBIR EL LUGAR EN EL JSON DE LUGARES

        //REGISTRA LUGAR EN LA BASE DE DATOS

        await registrarLugar(lugar); 
        console.log(`Lugar registrado exitosamente con ID: ${lugar.id}`);

        //AQUI TERMINA EL REGISTRO DEL LUGAR EN LA BD (EN CASO DE QUE FUERA EXITOSO)

        //AQUI EMPIEZA LA PARTE DE AGREGAR EL LUGAR AL JSON

        // Leer el archivo JSON existente
        let data = [];
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          data = JSON.parse(fileContent);
        }

        // Verificar si el lugar ya existe en el JSON
        const existeLugar = data.some((item) => item.id === lugar.id);
        if (!existeLugar) {
          // Añadir el lugar al arreglo solo si no existe
          data.push(lugar);

          // Guardar el arreglo actualizado en el archivo JSON
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
          console.log(`Lugar guardado en el archivo JSON con ID: ${lugar.id}`);
        } else {
          console.log(`Lugar con ID: ${lugar.id} ya existe en el archivo JSON.`);
        }

        //AQUI TERMINA LO DE GUARDAR EL LUGAR EN EL JSON

      } catch (dbError) {
        console.error(`Error al registrar el lugar con ID ${lugar.id}:`, dbError.message);
      }
    }

    res.json(lugares);
    //console.log('Datos enviados al cliente:', JSON.stringify(lugares, null, 2)); // Envia el JSON de todos los lugares encontrados al front
  } catch (error) {
    console.error('Error en /buscar-texto:', error.message);
    res.status(500).json({
      error: 'Error al buscar lugares por texto',
      detalles: error.response?.data || error.message,
    });
  }
});


/*
//Endpoint para el textsearch
router.post('/buscar-texto', async (req, res) => {
  const { query } = req.body;

  console.log('Solicitud recibida con query:', query);

  if (!query) {
    console.error('Error: El parámetro query es obligatorio.');
    return res.status(400).json({ error: 'El parámetro query es obligatorio' });
  }

  try {
    const lugares = await buscarLugaresPorTexto(query);
    console.log('Datos enviados al cliente:', JSON.stringify(lugares, null, 2)); // Envia el JSON de todos los lugares encontrados al front
    res.json(lugares); // Devuelve los lugares encontrados al cliente
  } catch (error) {
    console.error('Error en /buscar-texto:', error.message);
    res.status(500).json({
      error: 'Error al buscar lugares por texto',
      detalles: error.response?.data || error.message, // Información adicional
    });
  }
});
*/

module.exports = router;
