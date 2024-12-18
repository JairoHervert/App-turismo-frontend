const express = require('express');
const itinerarioController = require('../controllers/itinerario-controller');
const router = express.Router();
const db = require('../models/MySQL/db'); // Ajusta la ruta si es diferente

router.post('/generarItinerario', itinerarioController.generarItinerario);
  

module.exports = router;
