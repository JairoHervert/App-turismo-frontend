const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    // password: '',
    database: 'AppTurismo',
    // port: 3308 // Cambiar en caso de usar el 3306
  });

  db.connect((err) => {
    if (err) {
      console.error('Error conectando a la BD:', err);
      return;
    }
    console.log('Conexión BD correcta');
  });

  module.exports = db;