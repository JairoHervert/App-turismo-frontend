const userModel = require('./../models/MySQL/user-model');
const { errorHandler } = require('../pagesHandlers/error-handler');

class userController {

  static async getDatos(req, res) {
    const { id } = req.body;
    try {
      const resultado = await userModel.UsuarioGetDatos(id);

      res.json({resultado: resultado});
    } catch (error) {
      if(error.message) {
        let mensajeError = errorHandler(error.message);
        return res.status(400).json({ error: mensajeError });
      } else{
        return res.status(500).json({ error: error });
      }
    }
  }

  static async verDeseados(req, res) {
    const { id } = req.body;
    try {
      const resultado = await userModel.UsuarioVerDeseados(id);

      res.json({resultado: resultado});
    } catch (err) {
      if (err.message) {
        let mensajeError = errorHandler(err.message);
        return res.status(400).json({ error: mensajeError });
      }
      res.status(500).json({ error: err });
    }
  }

  static async verFavoritos(req, res) {
    const { id } = req.body;
    try {
      const resultado = await userModel.UsuarioVerFavoritos(id);

      res.json({resultado: resultado});
    } catch (err) {
      if (err.message) {
        let mensajeError = errorHandler(err.message);
        return res.status(400).json({ error: mensajeError });
      }
      res.status(500).json({ error: err });
    }
  }

}

module.exports = userController;