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

  static async obtenerLugaresCategoriaRestricciones(idCategoria, esActividad, nivelPresupuesto, impedimentoFisico, familiar, vegetarianFriendly, petFriendly, goodForGroups){
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
    if(goodForGroups){
        restricciones += ' AND goodForGroups';
    }

    const query = `SELECT DISTINCT lug.*
        FROM categoria cat
        INNER JOIN subcategoria sub ON cat.id = sub.idCategoria
        INNER JOIN lugarsubcategoria ls ON sub.id = ls.idSubcategoria
        INNER JOIN lugar lug ON lug.id = ls.idLugar
        WHERE cat.id = ? AND lug.precioNivel <= ? ${restricciones};`;
    return new Promise((resolve, reject) => {
        db.query(query, [idCategoria, nivelPresupuesto], (err, results) => {
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

  static async obtenerLugaresDeseados(id){
    const query = 'SELECT * FROM LugarDeseado WHERE idUsuario = ?;';
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

  static async obtenerLugaresRestricciones(esActividad, nivelPresupuesto, impedimentoFisico, familiar, vegetarianFriendly, petFriendly, goodForGroups){
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
        restricciones += ' AND (tipos LIKE "%restaurant%")';
    }
    else{
        restricciones += ' AND NOT(tipos LIKE "%restaurant%")';
    }
    if(goodForGroups){
        restricciones += ' AND goodForGroups';
    }
    const query = `SELECT * FROM Lugar WHERE precioNivel <= ? ${restricciones};`;
    return new Promise((resolve, reject) => {
        db.query(query, [nivelPresupuesto], (err, results) => {
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

  static async obtenerTodosLugares(esActividad, nivelPresupuesto){
    let restricciones = '';
    if(!esActividad){
      restricciones += ' (tipos LIKE "%restaurant%")';
    }
    else{
      restricciones += ' NOT(tipos LIKE "%restaurant%")';
    }
    const query = "SELECT * FROM Lugar WHERE precioNivel <= ? AND " + restricciones + ";";
    return new Promise((resolve, reject) => {
        db.query(query, [nivelPresupuesto], (err, results) => {
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

  // Esta función primero crea el itinerario en la tabla Itinerario y luego crea las relaciones en la tabla LugarItinerario
  static async guardarItinerario(idUsuario, itinerario){
    // const itinerario = JSON.parse(itinerarioString);
    // Obtener la fecha inicial y final
    const fechaInicio = itinerario.fechaInicio;
    const fechaFin = itinerario.fechaFin;
    const dias = itinerario.lugaresItinerario;
    // dias es un arreglo de objetos con la siguiente estructura
    // [
    //   {
    //     fecha: '2024-12-02',
    //     lugares: [
    //       {
    //         DETALLES DEL LUGAR
    //       },
    //       {
    //         DETALLES DEL LUGAR
    //       },
    //       ...
    //     ]
    //   },
    //   ...
    // ]

    // Ejemplo
    // Primero inserta el itinerario
      // INSERT INTO Itinerario (idUsuario, fechainicio, fechafin)
      // VALUES (1,'2024-12-02','2024-12-04');
      // La insercion me devuelve el id del itinerario
    // Luego inserta los lugares
      // INSERT INTO LugarItinerario (idItinerario, idLugar, orden, horaLlegada, horaSalida, fecha, auditoria) 
      // VALUES
      // (1, 'ChIJ0TgTPyv50YUR-iqvuuniMvI', 1, '10:00:00', '12:00:00', '2024-12-02', NOW()),
      // (1, 'ChIJ_Snp5Qr90YURsaIE_iQE8oU', 2, '12:00:00', '14:00:00', '2024-12-02', NOW()),
      // (1, 'ChIJ_xP1t6v40YURJmwqWm3owew', 3, '14:00:00', '16:00:00', '2024-12-02', NOW()),
      // (1, 'ChIJQWGH_U__0YURun-Y31zgPjI', 4, '16:00:00', '18:00:00', '2024-12-02', NOW()),
      // (1, 'ChIJY29w0Un_0YUR7pw57OVcNuo', 5, '13:30:00', '14:30:00', '2024-12-04', NOW()),
      // (1, 'ChIJs0hTSxsC0oURjhhkDYbOtZE', 6, '14:30:00', '16:30:00', '2024-12-04', NOW());

    let query = 'INSERT INTO Itinerario (idUsuario, fechainicio, fechafin) VALUES (?,?,?);';
    return new Promise((resolve, reject) => {
      db.query(query, [idUsuario, fechaInicio, fechaFin], (err, results) => {
        if (err) {
          reject(err);
        }
        const idItinerario = results.insertId;
        console.log('idItinerario', idItinerario);
        if (idItinerario) {
          query = 'INSERT INTO LugarItinerario (idItinerario, idLugar, orden, horaLlegada, horaSalida, fecha, auditoria) VALUES ?;';
          const values = [];
          for(const dia of dias){
            dia.lugares.forEach((lugar, index) => {
              values.push([idItinerario, lugar.data.id, index + 1, lugar.horaInicio, lugar.horaInicio, dia.fecha, new Date()]);
            });
          }
          db.query(query, [values], (err, results) => {
            if (err) {
              reject(err);
            }
            resolve(results);
          });
        }
      });
    });
  }
    
}


module.exports = itinerarioModel;