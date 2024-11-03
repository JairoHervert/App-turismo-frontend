// const registerModel = require("../models/MySQL/register-model");
// const crypto = require('crypto');

class confirmacionRegistroController {
  static async confirmarRegistro(req, res){
    const { token } = req.body;
  
    // Aquí buscarías el token en la base de datos para verificar si es válido
    // Si el token es válido, marca el correo como verificado y elimina el token
  
    const tokenValido = true; // Simulación de verificación (es decir, que el token si coincide o existe en el campo del usuario)
  
    if (tokenValido) {
      res.json({ success: true, message: 'Correo verificado exitosamente' });
    } else {
      res.status(400).json({ success: false, message: 'Token inválido o expirado' });
    }
  }
}

module.exports = confirmacionRegistroController;