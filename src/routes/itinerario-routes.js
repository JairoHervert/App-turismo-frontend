const express = require('express');
const { obtenerCategoriasFavoritas } = require('../controllers/itinerario-controller');
const router = express.Router();
const db = require('../models/MySQL/db'); // Ajusta la ruta si es diferente

// Obtener itinerario
// Obtener itinerario (sin filtrar por fecha)
router.get('/itinerario', (req, res) => {
  const { idUsuario, idItinerario } = req.query;

  // Verifica que ambos parámetros estén presentes
  if (!idUsuario || !idItinerario) {
    return res.status(400).json({ error: 'idUsuario y idItinerario son requeridos' });
  }

  const query = `
  SELECT 
    li.idLugar, 
    l.nombre, 
    li.orden,
    li.fecha,
    li.horaLlegada,
    li.horaSalida, 
    l.descripcion,
    GROUP_CONCAT(DISTINCT s.nombre ORDER BY s.nombre ASC) AS subcategorias,
    l.latitud,
    l.longitud,
    l.regularOpeningHours,
    l.imagen,
    l.rating,
    l.direccion,
    l.teléfono
  FROM LugarItinerario li
  JOIN Lugar l ON li.idLugar = l.id
  LEFT JOIN LugarSubcategoria ls ON l.id = ls.idLugar
  LEFT JOIN Subcategoria s ON ls.idSubcategoria = s.id
  WHERE li.idItinerario = ? AND li.idItinerario IN (
    SELECT id 
    FROM Itinerario i
    WHERE i.idUsuario = ?
  )
  GROUP BY li.idLugar, l.nombre, li.orden, l.descripcion, l.latitud, l.longitud, l.regularOpeningHours, l.imagen, l.rating, l.direccion, l.teléfono
  ORDER BY li.fecha ASC, li.horaLlegada ASC;
`;
  //Cambie la linea 43 que tenia= ORDER BY li.orden ASC; por que tal vez no me de el valor del orden al crear el itinerario, por lo que mejor sean ordenador por fecha y hora de llegada.
  // Cambia el orden de los parámetros
  db.query(query, [idItinerario, idUsuario], (err, results) => {
    if (err) {
      console.error('Error al obtener el itinerario:', err);
      return res.status(500).json({ error: 'Error al obtener el itinerario' });
    }

    res.json(results);
  });
});

//Guardar itinerario modificado por el usuario a la base de datos.

router.post('/guardar-itinerario', async (req, res) => {
  const { idUsuario, idItinerario, lugares } = req.body;

  try {
    // Convierte el pool actual a promesas
    const connection = db.promise();

    // Iterar sobre los lugares enviados y actualizar en la base de datos
    for (const lugar of lugares) {
      console.log("Actualizando lugar:", lugar);
      await connection.query(
        `UPDATE LugarItinerario 
         SET orden = ?, fecha = ?, horaLlegada = ?, horaSalida = ? 
         WHERE idLugar = ? AND idItinerario = ?`,
        [lugar.orden, lugar.fecha, lugar.horaLlegada, lugar.horaSalida, lugar.idLugar, idItinerario]
      );
    }

    res.status(200).json({ message: 'Itinerario guardado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el itinerario:', error);
    res.status(500).json({ error: 'Error al guardar el itinerario' });
  }
});


// Ruta para eliminar un lugar del itinerario
router.delete('/eliminar-lugar', async (req, res) => {
  const { idItinerario, idLugar } = req.body;

  try {
    // Eliminar el lugar de la base de datos
    const query = 'DELETE FROM LugarItinerario WHERE idItinerario = ? AND idLugar = ?';
    await db.promise().query(query, [idItinerario, idLugar]);

    res.status(200).json({ message: 'Lugar eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el lugar:', error);
    res.status(500).json({ error: 'Hubo un problema al eliminar el lugar' });
  }
});


// Actualizar orden del itinerario
router.post('/itinerario/orden', async (req, res) => {
    const { idItinerario, lugares } = req.body;

    try {
        for (const lugar of lugares) {
            //console.log(`Actualizando orden: idLugar=${lugar.idLugar}, orden=${lugar.orden}`);

            const query = `
                UPDATE LugarItinerario
                SET orden = ?
                WHERE idItinerario = ? AND idLugar = ?
            `;
            await new Promise((resolve, reject) => {
                db.query(query, [lugar.orden, idItinerario, lugar.idLugar], (err, results) => {
                    if (err) {
                        console.error('Error al actualizar el orden:', err);
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        }

        res.json({ message: 'Orden actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el orden:', error);
        res.status(500).json({ error: 'Error al actualizar el orden' });
    }
});

  

module.exports = router;
