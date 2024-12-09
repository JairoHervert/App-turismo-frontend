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
        res.status(201).json({resultado: resultado});
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
      html: `<div style="background-color: #f6f6f6; font-family: Arial, sans-serif; padding: 20px; text-align: center; color: #ffffff;">
      <div style="background-color: #9bd8f0; padding: 20px; border-radius: 10px;">
        <!-- Logo de la aplicación -->
        <h1 style="color: #FFFFFF; font-size: 24px; margin: 0;">¡Bienvenido a AppTurismo!</h1>
      </div>
      <p style="color: #333333; font-size: 16px; margin: 20px 0;">
        Hola <strong>${name}</strong>, gracias por registrarte con nosotros.
      </p>
      <p style="color: #333333; font-size: 16px; margin: 20px 0;">
        Para concluir tu registro y comenzar a explorar todas las funciones de nuestra plataforma, haz clic en el botón de abajo:
      </p>
      <a href="http://localhost:3000/confirm/${newToken}" style="
        display: inline-block;
        background-color: #FF0080;
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 5px;
        margin-top: 20px;">
        Confirmar Registro
      </a>
      <p style="color: #333333; font-size: 14px; margin: 20px 0;">
        Si no solicitaste este registro, puedes ignorar este correo.
      </p>
    </div>`
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