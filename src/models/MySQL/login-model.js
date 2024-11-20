const db = require('./db');

class loginModel {
  static async iniciarSesion(correo){
    const query = 'CALL UsuarioIniciarSesion(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results[0][0] || null;
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({
          id: resultado ? resultado.id : null,
          username: resultado ? resultado.username : null,
          nombre: resultado ? resultado.nombre : null,
          apellido: resultado ? resultado.apellido : null,
          hashedPassword: resultado ? resultado.contraseña : null,
          imagen: resultado ? resultado.imagen : null,
          confirmacion: resultado ? resultado.confirmacion : null
        });
      });
    });
  }

  static async iniciarSesionGoogle(correo, token) {
    const query = 'CALL UsuarioIniciarSesionGoogle(?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo, token], (err, results) => {
        if(err) {
          reject(err);
        }
        const resultado = results[0][0] || null;
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({
          id: resultado ? resultado.id : null,
          username: resultado ? resultado.username : null,
          nombre: resultado ? resultado.nombre : null,
          apellido: resultado ? resultado.apellido : null,
          imagen: resultado ? resultado.imagen : null,
          confirmacion: resultado ? resultado.confirmacion : null
        });
      });
    });
  }

  static async iniciarSesionFacebook(token, imagen) {
    const query = 'CALL UsuarioIniciarSesionFacebook(?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [token, imagen], (err, results) => {
        if(err) {
          reject(err);
        }
        const resultado = results[0][0] || null;
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({
          id: resultado ? resultado.id : null,
          username: resultado ? resultado.username : null,
          nombre: resultado ? resultado.nombre : null,
          apellido: resultado ? resultado.apellido : null,
          imagen: resultado ? resultado.imagen : null,
          confirmacion: resultado ? resultado.confirmacion : null
        });
      });
    });
  }

}

module.exports = loginModel;