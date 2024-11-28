const recuperacionModel = require('../models/MySQL/Recuperacion-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../configs/nodemailer-config');



class recuperacionController{

    static async OlvidarContrasena(req, res) {
        const { correo } = req.body;

        try {
          // Verificar si el usuario existe
          const usuario = await recuperacionModel.OlvidarContraseña(correo);
          if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
          }
    
          const { username } = usuario;

          // Responder con datos necesarios para el handler
          res.status(200).json({ message: 'Usuario registrado', nombre: username});
        } catch (error) {
          console.error('Error en OlvidarContraseña:', error);
          res.status(500).json({ error: error.message || 'Error interno del servidor.' });
        }
      }

      static async enviarCorreoRecuperacion(req, res){
        const { name, email } = req.body;
        
    
        const token = (correo) => {
          return jwt.sign({correo: correo}, process.env.JWT_SECRET, {expiresIn: '1h'});
        }
    
        const newToken = token(email);
    
        const mailOptions = {
          from: 'canastabasica2024@gmail.com',
          to: email,
          subject: 'Recuperación de contraseña',
          html: `<div style="background-color: #f6f6f6; font-family: Arial, sans-serif; padding: 20px; text-align: center; color: #ffffff;">
          <div style="background-color: #9bd8f0; padding: 20px; border-radius: 10px;">
            <!-- Logo de la aplicación -->
            <img src="../img/logo-provicional.png" alt="Logo de AppTurismo" style="max-width: 100px; margin-bottom: 10px;" />
            <h1 style="color: #FFFFFF; font-size: 24px; margin: 0;">Soporte tecnico de AppTurismo</h1>
          </div>
          <p style="color: #333333; font-size: 16px; margin: 20px 0;">
            Hola <strong>${name}</strong>, hemos recibido una solicitud para restablecer tu contraseña.
          </p>
          <p style="color: #333333; font-size: 16px; margin: 20px 0;">
            Para restablecer tu contraseña, haz clic en el siguiente botón:  
          </p>
          <a href="http://localhost:3000/recuperacion/${newToken}" style="
            display: inline-block;
            background-color: #FF0080;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 20px;">
            Restablecer contraseña
          </a>
          <p style="color: #333333; font-size: 14px; margin: 20px 0;">
            Si no solicitaste restablecer tu contraseña, ignora este mensaje
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


      static async actualizarContrasena(req, res) {
        
            const { token, nuevaContrasena } = req.body;

             // Hashear la nueva contraseña
             const saltRounds = 10;
             const hashedPassword = await bcrypt.hash(nuevaContrasena, saltRounds);
             
            try {
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
              console.log('Token decodificado:', decoded);
              const correo = decoded.correo;

              // Actualizar contraseña en la base de datos
              await recuperacionModel.actualizarContrasena(correo, hashedPassword);

              res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
              
            } catch (error) {
              console.error('Error al verificar el token:', error);
              if (error.name === 'TokenExpiredError') {
                return res.status(400).json({ message: 'El token ha expirado. Solicita uno nuevo.' });
              }
              return res.status(400).json({ message: 'Token inválido.' });
            }
        
    }

}

module.exports = recuperacionController;