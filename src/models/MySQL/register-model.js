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
                resolve({ message: 'Usuario creado', userId: results.insertId });
            });
        });
    }

}

module.exports = registerModel;