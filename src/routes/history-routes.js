const express = require('express');
const { registrarHistorial, obtenerHistorial, borrarHistorial, eliminarLugarHistorial } = require('../controllers/history-controller');
const router = express.Router();

// Ruta para registrar el historial
router.post('/historial', registrarHistorial);

// Ruta para obtener el historial del usuario
router.get('/historial', obtenerHistorial);

// Ruta para borrar el historial
router.delete('/historial', borrarHistorial);

// Ruta para eliminar un lugar específico del historial
router.delete('/historial/lugar', eliminarLugarHistorial);

module.exports = router;