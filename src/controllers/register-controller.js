const registerModel = require("../models/MySQL/register-model");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const transporter = require('../configs/nodemailer-config');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../pagesHandlers/error-handler');

class registerController {
  static async registroRegular(req, res) {
    const { nombre, correo, contraseña } = req.body;
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
  
      registerModel
        .registroRegular(nombre, correo, hashedPassword)
        .then((resultado) => {
          res.status(201).json({resultado: resultado});
        })
        .catch((err) => {
          if (err.message) {
            let mensajeError = errorHandler(err.message);
            // console.log(mensajeError);
            return res.status(400).json({ error: mensajeError });
          }
          res.status(500).json({ error: err.message });
        });
    } catch (err) {
      res.status(500).json({ error: 'Error al encriptar la contraseña' });
    }
  }

  static async registroGoogle(req, res) {
    const { nombre, apellido, correo, imagen, token } = req.body;
    registerModel
      .registroGoogle(nombre, apellido, correo, imagen, token)
      .then((resultado) => {
        res.status(201).json(resultado);
      })
      .catch((err) => {
        if (err.message) {
          let mensajeError = errorHandler(err.message);
          return res.status(400).json({ error: mensajeError });
        }
        res.status(500).json({ error: err });
      });
  }

  static async registroFacebook(req, res) {
    const { nombre, imagen, facebookId } = req.body;
    
    registerModel
      .registroFacebook(nombre, imagen, facebookId)
      .then((resultado) => {
        res.status(201).json(resultado);
      })
      .catch((err) => {
        if (err.message) {
          let mensajeError = errorHandler(err.message);
          return res.status(400).json({ error: mensajeError });
        }
        res.status(500).json({ error: err.message });
      });
  }

  static async enviarCorreoVerificacion(req, res){
    const { name, email } = req.body;

    const token = (correo) => {
      return jwt.sign({correo: correo}, process.env.JWT_SECRET);
    }

    const newToken = token(email);

    const mailOptions = {
      from: 'canastabasica2024@gmail.com',
      to: email,
      subject: 'Confirma tu registro en App Turismo',
      html: `<p>Hola ${name},</p><p>Gracias por registrarte en AppTurismo.</p><p>Para concluir tu registro y poder ingresar a tu cuenta haz clic en el enlace de abajo para confirmar tu correo:</p><a href="http://localhost:3000/confirm/${newToken}">Confirmar Registro</a>`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: 'Correo de confirmación enviado' });
    } catch (error) {
      console.error('Error al enviar el correo:', error); 
      res.status(500).send({ message: 'Error al enviar el correo', error });
    }
  }

}

module.exports = registerController;