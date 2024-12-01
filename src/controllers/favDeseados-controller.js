const favDeseadosModel = require('../models/MySQL/favDeseados-model');

class favDeseadosController {

    static async Favoritos(req, res) {
        const { idUsuario, IdLugar } = req.body;
        try {
          const favorito = await favDeseadosModel.Favoritos(idUsuario, IdLugar);
          res.status(200).json({ message: 'Lugar agregado a favoritos' });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar a favoritos' });
        }
      }
    

    static async Deseados(req, res) {
        const { idUsuario, IdLugar } = req.body;
        try {
          const deseado = await favDeseadosModel.Deseados(idUsuario, IdLugar);
          res.status(200).json({ message: 'Lugar agregado a deseados' });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar a deseados' });
        }
    }

    static async EsFavorito(req, res) {
        const { idUsuario, IdLugar } = req.body;
    
        try {
          const resultado = await favDeseadosModel.EsFavorito(idUsuario, IdLugar);
          res.status(200).json({ esFavorito: resultado });
        } catch (error) {
          console.error('Error en EsFavorito:', error);
          res.status(500).json({ error: 'Error al verificar si es favorito' });
        }
      }
      
      static async EsDeseado(req, res) {
        const { idUsuario, IdLugar } = req.body;
      
        try {
          const resultado = await favDeseadosModel.EsDeseado(idUsuario, IdLugar);
          res.status(200).json({ esDeseado: resultado });
        } catch (error) {
          console.error('Error en EsDeseado:', error);
          res.status(500).json({ error: 'Error al verificar si es deseado' });
        }
      }

      static async EliminarFavoritos(req, res) {
        const { idUsuario, IdLugar } = req.body;
      
        if (!idUsuario || !IdLugar) {
          return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }
      
        try {
          await favDeseadosModel.EliminarFavoritos(idUsuario, IdLugar);
          res.status(200).json({ message: 'Lugar eliminado de favoritos' });
        } catch (error) {
          console.error('Error en EliminarFavoritos:', error);
          res.status(500).json({ error: 'Error al eliminar de favoritos' });
        }
      }
      
      static async EliminarDeseados(req, res) {
        const { idUsuario, IdLugar } = req.body;
      
        if (!idUsuario || !IdLugar) {
          return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }
      
        try {
          await favDeseadosModel.EliminarDeseados(idUsuario, IdLugar);
          res.status(200).json({ message: 'Lugar eliminado de deseados' });
        } catch (error) {
          console.error('Error en EliminarDeseados:', error);
          res.status(500).json({ error: 'Error al eliminar de deseados' });
        }
      }
        
      

}
module.exports = favDeseadosController;
