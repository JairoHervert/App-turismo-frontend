const express = require('express');
const router = express.Router();
const { buscarLugares, buscarLugaresPorTexto } = require('../controllers/places-controller');

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

module.exports = router;
