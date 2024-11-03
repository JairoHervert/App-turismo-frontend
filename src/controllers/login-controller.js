const loginModel = require('../models/MySQL/login-model');

class loginController{
    static async iniciarSesion(req, res){
        const { correo, contraseña } = req.body;
      
        loginModel.iniciarSesion(correo, contraseña)
          .then((resultado) => {
            res.json(resultado);
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      }
}

module.exports = loginController;