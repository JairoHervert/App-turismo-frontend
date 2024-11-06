const loginModel = require('../models/MySQL/login-model');
const bcrypt = require('bcrypt');
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

    try {
      const resultado = await loginModel.iniciarSesion(correo);

      // Comparar la contraseña ingresada con la almacenada encriptada
      const passwordMatch = await bcrypt.compare(contraseña, resultado.hashedPassword);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta.' });
      }
      if(resultado.confirmacion == '0') {
        return res.status(400).json({ error: 'La cuenta no ha sido confirmada. Revisa tu correo para confirmar tu cuenta.'})
      }

      const newToken = token(resultado.id, correo);
      res.cookie('access_token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
        // Configurar despues la duración del token
      });
      res.json({resultado: resultado, token: newToken});

    } catch (err) {
      if (err.message === 'correo_no_registrado') {
        return res.status(400).json({ error: 'El correo no está registrado.' });
      }
      res.status(500).json({ error: err.message });
    }

  }

  static async iniciarSesionGoogle(req, res) {
    const {correo, token } = req.body;
    try {
      const resultado = await loginModel.iniciarSesionGoogle(correo, token);
      res.json({id: resultado });
    } catch (err) {
      if (err.message === 'correo_no_registrado' || err.message === 'Cuenta no registrada') {
        return res.status(400).json({ error: 'Cuenta no registrada.' });
      }
      res.status(500).json({error: err});
    }
  }
}

module.exports = loginController;