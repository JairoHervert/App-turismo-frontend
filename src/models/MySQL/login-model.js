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
        let error;
        if (resultado && resultado.error) {
          switch (resultado.error) {
            case 'correo_no_registrado':
              error = 'El correo no está registrado.';
              break;
            case 'contraseña_incorrecta':
              error = 'La contraseña es incorrecta.';
              break;
            case 'cuenta_no_confirmada':
              error = 'La cuenta no ha sido confirmada. Revisa tu correo para confirmar tu cuenta.';
              break;
            default:
              error = 'Credenciales incorrectas.';
          }
          return reject(new Error(error));
        }
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
        if (resultado && resultado.error) {
          reject(new Error('Cuenta no registrada'));
        }
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
        if (resultado && resultado.error) {
          reject(new Error('cuenta_no_registrada'));
        }
        resolve({id: resultado ? resultado.id : null});
      });
    });
  }

}

module.exports = loginModel;