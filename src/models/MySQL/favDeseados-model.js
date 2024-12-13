const db = require('./db');

class favDeseadosModel {

  static async Deseados(idUsuario, IdLugar) {
    console.log("Model recibe: ", idUsuario, IdLugar);
    const query = 'CALL UsuarioAnadirDeseado (?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [idUsuario, IdLugar], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results[0][0] || null;
        console.log("RESULTADO DESEADOS", resultado);
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({ message: 'Lugar agregado a deseados'});
      });
    });
  }

  static async Favoritos(idUsuario, IdLugar) {
    const query = 'CALL UsuarioAnadirFavorito (?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [idUsuario, IdLugar], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results || null;
        console.log(resultado);
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({ message: 'Lugar agregado a favoritos'});
      });
    });
  }

  static async EsFavorito(idUsuario, IdLugar) {
    const query = 'SELECT 1 FROM lugarfavorito WHERE idUsuario = ? AND IdLugar = ? LIMIT 1;';
    return new Promise((resolve, reject) => {
      db.query(query, [idUsuario, IdLugar], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.length > 0); // Devuelve true si existe
      });
    });
  }
  
  static async EsDeseado(idUsuario, IdLugar) {
    const query = 'SELECT 1 FROM lugardeseado WHERE idUsuario = ? AND IdLugar = ? LIMIT 1;';
    return new Promise((resolve, reject) => {
      db.query(query, [idUsuario, IdLugar], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.length > 0); // Devuelve true si existe
      });
    });
  }

  static async EliminarFavoritos(idUsuario, IdLugar) {
    const query = 'DELETE FROM lugarfavorito WHERE idUsuario = ? AND IdLugar = ?;';
    return new Promise((resolve, reject) => {
      db.query(query, [idUsuario, IdLugar], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve({ message: 'Lugar eliminado de favoritos' });
      });
    });
  }
  
  static async EliminarDeseados(idUsuario, IdLugar) {
    const query = 'DELETE FROM lugardeseado WHERE idUsuario = ? AND IdLugar = ?;';
    return new Promise((resolve, reject) => {
      db.query(query, [idUsuario, IdLugar], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve({ message: 'Lugar eliminado de deseados' });
      });
    });
  }
      
      


}
module.exports = favDeseadosModel;