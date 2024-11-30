const express = require('express');
const router = express.Router();
const { buscarLugares, buscarLugaresPorTexto } = require('../controllers/places-controller');
const { registrarLugar } = require('../models/lugares-model'); 


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

    for (const lugar of lugares.places) {
      try {

        // PRIMERO SE DEBE VALIDAR QUE EL LUGAR TIENE SUBCATEGORÍAS DE LAS QUE SELECCIONAMOS (DIBUJO DEL PAINT)
        // SI NO TIENE NINGUNA DE LAS 4 SUBCATEGORÍAS, NO SE REGISTRA EN LA BASE DE DATOS (CONTINUE)
        // (SE REGISTRA EL LUGAR
        // SE LLAMA A REGISTRARSUBCATEGORÍA POR CADA SUBCATEGORÍA QUE TENGA EL LUGAR DE LAS DE LA BASE DE DATOS): Todo este proceso se hace en lugares-model.js
        // ESCRIBIR EL LUGAR EN EL JSON DE LUGARES

        await registrarLugar(lugar); // Registrar lugar en la base de datos
        console.log(`Lugar registrado exitosamente con ID: ${lugar.id}`);
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
