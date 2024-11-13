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
        resolve({deseados: resultado/*
          id: resultado ? resultado.id : null,
          nombre: resultado ? resultado.nombre : null,
          descripcion: resultado ? resultado.descripcion : null,
          direccion: resultado ? resultado.direccion : null,
          imagen: resultado ? resultado.imagen : null,
          tiempo: resultado ? resultado.tiempo : null,
          costo: resultado ? resultado.costo : null,
          accesibilidad: resultado ? resultado.accesibilidad : null*/
        });
      });
    });
  }

}

module.exports = userModel;
