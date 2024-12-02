const db = require('./db');

class recuperacionModel {

    static async OlvidarContraseña(correo) {
        return new Promise((resolve, reject) => {
          const query = 'SELECT username FROM usuario WHERE correo = ?';
          db.query(query, [correo], (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) return reject(new Error('Usuario no encontrado'));
            resolve(result[0]); // Devuelve id, username, y correo
          });
        });
    }

    static async actualizarContrasena(correo, nuevaContrasena) {
      return new Promise((resolve, reject) => {
          const query = 'UPDATE usuario SET contraseña = ? WHERE correo = ?';
          db.query(query, [nuevaContrasena, correo], (err, result) => {
              if (err) return reject(err);
              resolve(result);
          });
      });
  }

}
module.exports = recuperacionModel;