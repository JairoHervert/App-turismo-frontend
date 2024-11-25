const placeModel = require('./../models/MySQL/place-model');
const { errorHandler } = require('../pagesHandlers/error-handler');

class placeController {

  static async getDatos(req, res) {
    const { id } = req.body;
    try {
      const resultado = await placeModel.LugarGetDatos(id);

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

  static async getFotos(req, res) {
    const { id } = req.body;
    try {
      const resultado = await placeModel.LugarGetFotos(id);

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
}

module.exports = placeController;