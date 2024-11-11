const db = require('./db');

class registerModel{

  static async registroRegular(nombre, correo, contraseña){
    const query = 'CALL UsuarioRegistro (?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [nombre, correo, contraseña], (err, results) => {
        if (err) {
          if (err.sqlState === '45000') {
              return resolve('El correo ya está registrado.');
          }
          reject(err);
        }
        resolve({ message: 'Usuario creado'});
      });
    });
  }

  static async registroGoogle(nombre, correo, imagen, token){
    const query = 'CALL UsuarioRegistroGoogle (?, ?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [nombre, correo, imagen, token], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results[0][0] || null;
        let error = '';
        // console.log(resultado);
        if (resultado && resultado.error) {
          switch (resultado.error) {
            case 'correo_ya_registrado':
              error = 'El correo ya está registrado. Inicia sesión con tu correo y contraseña.';
              break;
            case 'usuario_ya_registrado':
              error = 'El usuario ya está registrado.';
              break;
            case 'correo_invalido':
              error = 'El correo no es válido.';
              break;
          }
          // return resolve({ error });
          reject(new Error(error));
        }
        return resolve({ id: resultado ? resultado.id : null}); // { id: resultado ? resultado.id : null}
      });
    });
  }

  static async registroFacebook(nombre, imagen, facebookId) {
    const query = 'CALL UsuarioRegistroFacebook (?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [nombre, imagen, facebookId], (err, results) => {
        if (err) {
          if (err.sqlState === '45000') {
            return resolve('El correo ya está registrado.');
          }
          reject(err);
        }
        const resultado = results || null;
        resolve(resultado/*{ id: resultado ? resultado.id : null}*/);
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