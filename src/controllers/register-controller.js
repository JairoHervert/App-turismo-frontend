const registerModel = require("../models/MySQL/register-model");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const transporter = require('../configs/nodemailer-config');

class registerController {
  static async registroRegular(req, res) {
    const { nombre, correo, contraseña } = req.body;
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
  
      registerModel
        .registroRegular(nombre, correo, hashedPassword)
        .then((resultado) => {
          res.status(201).json(resultado);
        })
        .catch((err) => {
          if (err === "El correo ya está registrado.") {
            return res.status(400).json({ error: err });
          }
          res.status(500).json({ error: err.message });
        });
    } catch (err) {
      res.status(500).json({ error: 'Error al encriptar la contraseña' });
    }
  }

  static async registroGoogle(req, res) {
    const { nombre, correo, imagen, token } = req.body;
    registerModel
      .registroGoogle(nombre, correo, imagen, token)
      .then((resultado) => {
        res.status(201).json(resultado);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === 'El correo ya está registrado.') {
          return res.status(400).json({ error: err });
        }
        res.status(500).json({ error: err });
      });
  }

  /*static async registroGoogle(req, res) {
    const { nombre, correo, imagen, token } = req.body;
    
    try {
      const resultado = registerModel.registroGoogle(nombre, correo, imagen, token)
      res.status(201).json(resultado);
    }
    catch (err) {
      if(err.message === 'correo_ya_registrado')
        return res.status(400).json({ error: 'El correo ya está registrado.'});
      res.status(500).json({ error: err.message });
    }
  }*/

  static async enviarCorreoVerificacion(req, res){
    const { name, email } = req.body;
  
    // Genera un token único para la verificación
    const token = crypto.randomBytes(32).toString('hex');
  
     // Aquí se guardará el token y el correo en tu base de datos, junto con un tiempo de expiración (opcional).
  
    const mailOptions = {
      from: 'canastabasica2024@gmail.com',
      to: email,
      subject: 'Confirma tu registro',
      html: `<p>Hola ${name},</p><p>Gracias por registrarte. Haz clic en el enlace de abajo para confirmar tu correo:</p><a href="http://localhost:3000/confirm/${token}">Confirmar Registro</a>`
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