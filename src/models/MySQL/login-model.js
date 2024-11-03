const db = require('./db');

class loginModel{
    static async iniciarSesion(correo, contraseña){
        const query = 'CALL UsuarioIniciarSesion(?, ?);';
        return new Promise((resolve, reject) => {
            db.query(query, [correo, contraseña], (err, results) => {
                if (err) {
                    reject(err);
                }
                const resultado = results[0][0] || null;
                resolve({ id: resultado ? resultado.id : null });
            });
        });
    }
}

module.exports = loginModel;