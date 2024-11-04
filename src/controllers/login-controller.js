const loginModel = require('../models/MySQL/login-model');
const bcrypt = require('bcrypt');

class loginController{
  static async iniciarSesion(req, res){
    const { correo, contraseña } = req.body;
  
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
      res.json({ id: resultado });
    } catch (err) {
      if (err.message === 'correo_no_registrado') {
        return res.status(400).json({ error: 'El correo no está registrado.' });
      }
      res.status(500).json({ error: err.message });
    }
/*
    loginModel.iniciarSesion(correo, contraseña)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });*/
  }
}

module.exports = loginController;