const db = require('./db');

class placeModel {

  static async LugaresTodos() {
    const query = 'CALL getLugaresTodos();';
    return new Promise((resolve, reject) => {
      db.query(query, [], (err, results) => {
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

  static async LugarGetSubcategorias(id) {
    const query = 'CALL LugarGetSubcategorias(?);';
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

  static async LugarGetPor4Categorias(cat1, cat2, cat3, cat4) {
    const query = 'CALL getLugaresCategoria4(?, ?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [cat1, cat2, cat3, cat4], (err, results) => {
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

  static async LugarGetPor4CategoriasUsuario(id, cat1, cat2, cat3, cat4) {
    const query = 'CALL getLugaresCategoriaHomeUsuario(?, ?, ?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [id, cat1, cat2, cat3, cat4], (err, results) => {
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
