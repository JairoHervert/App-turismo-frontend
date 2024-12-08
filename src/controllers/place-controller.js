const placeModel = require('./../models/MySQL/place-model');
const { errorHandler } = require('../pagesHandlers/error-handler');

class placeController {

  static async LugaresTodos(req, res) {
    try {
      const resultado = await placeModel.LugaresTodos();

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

  static async lugarGetCategorias(req, res) {
    const { id } = req.body;
    try {
      const resultado = await placeModel.LugarGetCategorias(id);

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

  static async getSubcategorias(req, res) {
    const { id } = req.body;
    try {
      const resultado = await placeModel.LugarGetSubcategorias(id);

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

  static async getLugaresPor4Categorias(req, res) {
    const { cat1, cat2, cat3, cat4 } = req.body;
    try {
      const resultado = await placeModel.LugarGetPor4Categorias(cat1, cat2, cat3, cat4);

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

  static async getLugaresPor4CategoriasUsuario(req, res) {
    const { id, cat1, cat2, cat3, cat4 } = req.body;
    try {
      const resultado = await placeModel.LugarGetPor4CategoriasUsuario(id, cat1, cat2, cat3, cat4);

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

  static async getCategorias(req, res) {
    try {
      const resultado = await placeModel.getCategorias();

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