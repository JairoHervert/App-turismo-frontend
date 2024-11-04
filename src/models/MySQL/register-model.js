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
          if (err.sqlState === '45000') {
              return resolve('El correo ya está registrado.');
          }
          reject(err);
        }
        resolve({ message: 'Usuario creado'});
      });
    });
  }

}

module.exports = registerModel;