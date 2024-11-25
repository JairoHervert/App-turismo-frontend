const db = require('./db');

class placeModel {

  static async LugarGetDatos(id) {
    const query = 'CALL LugarGetDatos(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results[0][0] || null;
        if(resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({datos: resultado});
      });
    });
  }
  
  static async LugarGetFotos(id) {
    const query = 'CALL LugarGetFotos(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results[0] || null;
        if(resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({datos: resultado});
      });
    });
  }
}

module.exports = placeModel;
