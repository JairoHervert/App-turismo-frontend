const ItinerariosGuardadosModel = require('../models/MySQL/ItinerariosG-model');

class itinerariosgController {

  static async ItinerariosGuardados(req, res) {
    const { idUsuario} = req.body;
    try {
      const respuesta = await ItinerariosGuardadosModel.obtenerItinerarios(idUsuario);
      res.status(200).json({data: respuesta });
    } catch (error) {
      res.status(500).json({ error: 'Error al consultar Itinerarios' });
    }
  }
}
module.exports = itinerariosgController;