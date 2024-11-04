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
        const resultado = results || null;
        let error = '';
        if (resultado && resultado.error) {
          switch (resultado.error) {
            case 'correo_ya_registrado':
              error = 'El correo ya está registrado.';
              break;
          }
          return reject(new Error(error));
        }
        resolve({ id: resultado ? resultado.id : null}); // { id: resultado ? resultado.id : null}
      });
    });
  }

}

module.exports = registerModel;