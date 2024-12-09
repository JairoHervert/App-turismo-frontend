const db = require('../models/MySQL/db');

const registrarHistorial = (req, res) => {
  const { idUsuario, idLugar } = req.body;

  console.log('Datos recibidos:', { idUsuario, idLugar });

  if (!idUsuario || !idLugar) {
    console.error('Error: Faltan datos obligatorios');
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  const query = `
    INSERT INTO Historial (idUsuario, idLugar, auditoria)
    VALUES (?, ?, NOW())
    ON DUPLICATE KEY UPDATE auditoria = NOW();
  `;

  console.log('Ejecutando query:', query);

  db.query(query, [idUsuario, idLugar], (err, results) => {
    if (err) {
      console.error('Error al registrar en el historial:', err);
      return res.status(500).json({ error: 'Error al registrar en el historial' });
    }

    console.log('Historial registrado con éxito:', results);
    res.status(200).json({ message: 'Historial registrado con éxito' });
  });
};

const obtenerHistorial = (req, res) => {
    const { idUsuario } = req.query;
  
    if (!idUsuario) {
      return res.status(400).json({ error: 'El ID del usuario es obligatorio' });
    }
  
    const query = `
      SELECT H.idLugar, L.nombre AS query, DATE_FORMAT(H.auditoria, '%h:%i %p') AS time
      FROM Historial H
      JOIN Lugar L ON H.idLugar = L.id
      WHERE H.idUsuario = ?
      ORDER BY H.auditoria DESC;
    `;
  
    // Usa callbacks para manejar el resultado de la consulta
    db.query(query, [idUsuario], (err, results) => {
      if (err) {
        console.error('Error al obtener el historial:', err);
        return res.status(500).json({ error: 'Error al obtener el historial' });
      }
  
      res.status(200).json(results); // Devuelve los resultados
    });
  };

// Borrar el historial de un usuario
const borrarHistorial = (req, res) => {
    const { idUsuario } = req.body;
  
    if (!idUsuario) {
      return res.status(400).json({ error: 'El ID del usuario es obligatorio.' });
    }
  
    const query = `DELETE FROM Historial WHERE idUsuario = ?`;
  
    db.query(query, [idUsuario], (err, results) => {
      if (err) {
        console.error('Error al borrar el historial:', err);
        return res.status(500).json({ error: 'Error al borrar el historial' });
      }
  
      res.status(200).json({ message: 'Historial borrado con éxito.' });
    });
  };

// Controlador para eliminar un lugar específico del historial
const eliminarLugarHistorial = (req, res) => {
  const { idUsuario, idLugar } = req.body;

  if (!idUsuario || !idLugar) {
    return res.status(400).json({ error: 'El ID del usuario y el ID del lugar son obligatorios' });
  }

  const query = 'DELETE FROM Historial WHERE idUsuario = ? AND idLugar = ?';

  db.query(query, [idUsuario, idLugar], (error, results) => {
    if (error) {
      console.error('Error al eliminar el lugar del historial:', error);
      return res.status(500).json({ error: 'Error al eliminar el lugar del historial' });
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Lugar eliminado del historial con éxito' });
    } else {
      res.status(404).json({ error: 'No se encontró el lugar en el historial' });
    }
  });
};  

module.exports = { registrarHistorial, obtenerHistorial, borrarHistorial, eliminarLugarHistorial };