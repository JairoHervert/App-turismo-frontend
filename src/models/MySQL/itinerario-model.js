const db = require('./db');

class itinerarioModel {
  static async obtenerCategoriasFavoritas(id){
    const query = 'SELECT * FROM CategoriaFavorita WHERE idUsuario = ?;';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        }
        const resultado = results || null;
        if (resultado && resultado.error)
          return reject(new Error(resultado.error));
        resolve(resultado);
      });
    });
  }

  static async obtenerLugaresCategoriaRestricciones(idCategoria, esActividad, impedimentoFisico, familiar, vegetarianFriendly, petFriendly){
    let restricciones = '';
    if (impedimentoFisico) {
        restricciones += ' AND (accesibilidadParking OR accesibilidadEntrance OR accesibilidadRestroom OR accesibilidadSeating)';
    }
    if (familiar) {
        restricciones += ' AND goodForChildren';
    }
    if (vegetarianFriendly && !esActividad) {
        restricciones += ' AND servesVegetarianFood';
    }
    if (petFriendly) {
        // restricciones += ' AND allowsDogs';
    }
    if(!esActividad){
        restricciones += ' AND (lug.tipos LIKE "%restaurant%")';
    }
    else{
        restricciones += ' AND NOT(lug.tipos LIKE "%restaurant%")';
    }

    const query = `SELECT DISTINCT lug.*
        FROM categoria cat
        INNER JOIN subcategoria sub ON cat.id = sub.idCategoria
        INNER JOIN lugarsubcategoria ls ON sub.id = ls.idSubcategoria
        INNER JOIN lugar lug ON lug.id = ls.idLugar
        WHERE cat.id = ? ${restricciones};`;
    return new Promise((resolve, reject) => {
        db.query(query, [idCategoria], (err, results) => {
            if (err) {
                reject(err);
            }
            const resultado = results || null;
            if (resultado && resultado.error)
                return reject(new Error(resultado.error));
            resolve(resultado);
        });
    });
  }
}

module.exports = itinerarioModel;