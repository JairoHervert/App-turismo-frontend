const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: 'Palaclav1+',
    password: 'root',
    database: 'AppTurismo',
    port: 3306, // Cambiar en caso de usar el 3306
    charset: 'utf8mb4' // Asegurar que use utf8mb4
  });

  db.connect((err) => {
    if (err) {
      console.error('Error conectando a la BD:', err);
      return;
    }
    console.log('Conexión BD correcta');
  });

  module.exports = db;