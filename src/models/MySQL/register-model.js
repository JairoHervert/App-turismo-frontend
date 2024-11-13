const { errorHandler } = require('../../pagesHandlers/error-handler');
const db = require('./db');

class registerModel{

  static async registroRegular(nombre, correo, contraseña){
    const query = 'CALL UsuarioRegistro (?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [nombre, correo, contraseña], (err, results) => {
        if (err) {
          if (err.sqlState === '45000') {
              return reject(new Error('El correo ya está registrado.'));
          }
          reject(err);
        }
        const resultado = results || null;
        console.log(resultado);
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve({ message: 'Usuario creado'});
      });
    });
  }

  static async registroGoogle(nombre, apellido, correo, imagen, token){
    const query = 'CALL UsuarioRegistroGoogle (?, ?, ?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [nombre, apellido, correo, imagen, token], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results || null;
        console.log(resultado);
        console.log(resultado[0]);
        console.log(resultado[0][0]);
        console.log(resultado[0][0].error);
        if (resultado && resultado[0][0].error) {
          let errorMessage = errorHandler(resultado[0][0].error);
          return reject(new Error(errorMessage));
        }
        resolve({ id: resultado ? resultado.id : null}); // { id: resultado ? resultado.id : null}
      });
    });
  }

  static async registroFacebook(nombre, imagen, facebookId) {
    const query = 'CALL UsuarioRegistroFacebook (?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [nombre, imagen, facebookId], (err, results) => {
        if (err) {
          if (err.sqlState === '45000') {
            return reject(new Error('El correo ya está registrado.'));
          }
          reject(err);
        }
        const resultado = results || null;
        if (resultado && resultado.error) {
          let errorMessage = errorHandler(resultado.error);
          return reject(new Error(errorMessage));
        }
        resolve({ id: resultado ? resultado.id : null});
      });
    });
  }

  // Actualizar el campo confirmacion de la tabla usuario a 1
  static async confirmarCuenta(correo) {
    const query = 'CALL UsuarioConfirmarCuenta (?);';
    return new Promise((resolve, reject) => {
      db.query(query, correo, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  }

}

module.exports = registerModel;