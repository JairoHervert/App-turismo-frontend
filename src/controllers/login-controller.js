const loginModel = require('../models/MySQL/login-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doenv = require('dotenv').config();
const { errorHandler } = require('../pagesHandlers/error-handler');

class loginController{

  static async iniciarSesion(req, res) {
    const { correo, contraseña } = req.body;

    const tokenJWT = (id, username, nombre, apellido, correo, imagen) => {
      return jwt.sign({
        id: id, username: username, nombre: nombre, apellido: apellido, correo: correo, imagen: imagen},
      process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    try {
      const resultado = await loginModel.iniciarSesion(correo);

      // Validar contraseña
      const passwordMatch = await bcrypt.compare(contraseña, resultado.hashedPassword);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta.' });
      }
      // Validar confirmación por correo
      if(resultado.confirmacion == '0') {
        let error = errorHandler('correo_no_confirmado');
        return res.status(400).json({ error: error})
      }
      
      const newToken = tokenJWT(resultado.id, resultado.username, resultado.nombre, resultado.apellido, correo, resultado.imagen);
      res.json({resultado: resultado, token: newToken});

    } catch (err) {
      if (err.message) {
        let mensajeError = errorHandler(err.message);
        return res.status(400).json({ error: mensajeError });
      }
      res.status(500).json({ error: err });
    }

  }

  static async iniciarSesionGoogle(req, res) {
    const { correo, token } = req.body;

    const tokenJWT = (id, username, nombre, apellido, correo, imagen) => {
      return jwt.sign({
        id: id, username: username, nombre: nombre, apellido: apellido, correo: correo, imagen: imagen},
      process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    try {
      const resultado = await loginModel.iniciarSesionGoogle(correo, token);

      const newToken = tokenJWT(resultado.id, resultado.username, resultado.nombre, resultado.apellido, correo, resultado.imagen);
      res.json({resultado: resultado, token: newToken});

    } catch (err) {
      if (err.message) {
        let mensajeError = errorHandler(err.message);
        return res.status(400).json({ error: mensajeError });
      }
      res.status(500).json({error: err});
    }
  }

  static async iniciarSesionFacebook(req, res) {
    const { token } = req.body;

    const tokenJWT = (id, username, nombre, apellido, imagen) => {
      return jwt.sign({
        id: id, username: username, nombre: nombre, apellido: apellido, imagen: imagen},
      process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    try {
      const resultado = await loginModel.iniciarSesionFacebook(token);
      
      const newToken = tokenJWT(resultado.id, resultado.username, resultado.nombre, resultado.apellido, resultado.imagen);
      res.json({resultado: resultado, token: newToken});

    } catch (err) {
      if (err.message) {
        let mensajeError = errorHandler(err.message);
        return res.status(400).json({ error: mensajeError });
      }
      res.status(500).json({error: err});
    }
  }
}

module.exports = loginController;