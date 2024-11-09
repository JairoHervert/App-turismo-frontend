const jwt = require('jsonwebtoken');
const registerModel = require('../models/MySQL/register-model');
;

class confirmacionRegistroController {
  static async confirmarRegistro(req, res){
    const token = req.body.token
    console.log("token: " + token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
        res.json({success: false});
        return;
      } else {
        const correo = decoded.correo;
        console.log(correo);
        registerModel.confirmarCuenta(correo)
        .then((resultado) => {
          res.json({success: true});
        })
        .catch((err) => {
          console.log(err);
          res.json({success: false});
        });
      }
    });
  }
}

module.exports = confirmacionRegistroController;