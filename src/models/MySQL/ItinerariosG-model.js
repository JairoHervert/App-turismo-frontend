const db = require('./db'); // Importar la configuración de la conexión a la BD

class ItinerariosGuardadosModel {
  // Método para obtener los itinerarios de un usuario
  static async obtenerItinerarios(idUsuario) {
    const query = 'CALL UsuarioVerItinerariosConLugares(?);'; // Procedimiento almacenado

    return new Promise((resolve, reject) => {
      db.query(query, [idUsuario], (err, results) => {
        if (err) {
          console.error("Error en la consulta: ", err);
          return reject(err); // Rechaza con el error
        }

        // Extrae los resultados del procedimiento
        const resultado = results[0] || [];
        
        resolve(resultado); // Devuelve los resultados al controlador
      });
    });
  }
}

module.exports = ItinerariosGuardadosModel; // Exportar el modelo