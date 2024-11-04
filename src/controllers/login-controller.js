const loginModel = require('../models/MySQL/login-model');
const jwt = require('jsonwebtoken');
const doenv = require('dotenv').config();

class loginController{
    static async iniciarSesion(req, res){
        const { correo, contraseña } = req.body;

        const token = (id, correo) => {
          return jwt.sign({id: id, correo: correo}, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
        }

        loginModel.iniciarSesion(correo, contraseña)
          .then((resultado) => {
            const newToken = token(resultado.id, correo);
            res.cookie('access_token', newToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'none'
              // Configurar despues la duración del token
            });
            res.json({resultado: resultado, token: newToken});
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      }
}

module.exports = loginController;