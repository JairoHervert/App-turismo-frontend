const itinerarioModel = require('../models/MySQL/itinerario-model');

class itinerarioController{
    static async obtenerCategoriasFavoritas(req, res){
        const {idUsuario} = req.body;
        try {
            const categoriasFavoritas = await itinerarioModel.obtenerCategoriasFavoritas(idUsuario);
            // Obtener un arreglo con solo el nombre de las categorías favoritas
            const nombreCategoriasFavoritas = categoriasFavoritas.map(categoria => categoria.nombre);
            res.json({nombreCategoriasFavoritas});
        } catch (error) {
            res.status(500).json({error});
        }
    }
}

module.exports = itinerarioController;