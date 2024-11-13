const db = require('./db');

class userModel {

  static async UsuarioVerDeseados(id){
    const query = 'CALL UsuarioVerDeseados(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results[0] || null;
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({deseados: resultado});
      });
    });
  }

  static async UsuarioVerFavoritos(id){
    const query = 'CALL UsuarioVerFavoritos(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results[0] || null;
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({favoritos: resultado});
      });
    });
  }

}

module.exports = userModel;
