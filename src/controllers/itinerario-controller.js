const itinerarioModel = require('../models/MySQL/itinerario-model');
const { generarItinerario } = require('../generacionItinerario/obtenerArreglosCategorías');

class itinerarioController{
    // Definir la función que permite llamar a generar itinerario con los parámetros necesarios
    static async generarItinerario(req, res){
        // generarItinerario = async (idUsuario, numeroPersonas, fechaInicio, fechaFin, horaInicio, horaFin, gradoAleatoriedad, duracionActividad, duracionComida, presupuesto, restricciones, latitudInicial, longitudInicial)
        console.log(req.body);
        const { idUsuario, numeroPersonas, fechaInicio, fechaFin, horaInicio, horaFin, gradoAleatoriedad, duracionActividad, duracionComida, presupuesto, restricciones, latitudInicial, longitudInicial } = req.body;
        try {
            const resultado = await generarItinerario(idUsuario, numeroPersonas, fechaInicio, fechaFin, horaInicio, horaFin, gradoAleatoriedad, duracionActividad, duracionComida, presupuesto, restricciones, latitudInicial, longitudInicial);
            res.status(200).json({resultado: resultado});
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
}

module.exports = itinerarioController;