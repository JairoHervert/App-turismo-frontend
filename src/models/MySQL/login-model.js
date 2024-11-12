const db = require('./db');

class loginModel {
  static async iniciarSesion(correo, contraseña){
    const query = 'CALL UsuarioIniciarSesion(?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo, contraseña], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results[0][0] || null;
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({ id: resultado ? resultado.id : null, hashedPassword: resultado ? resultado.contraseña : null, confirmacion: resultado ? resultado.confirmacion : null });
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
        resolve({id: resultado ? resultado.id : null});
      });
    });
  }

  static async iniciarSesionFacebook(token) {
    const query = 'CALL UsuarioIniciarSesionFacebook(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [token], (err, results) => {
        if(err) {
          reject(err);
        }
        const resultado = results[0][0] || null;
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({id: resultado ? resultado.id : null});
      });
    });
  }

}

module.exports = loginModel;