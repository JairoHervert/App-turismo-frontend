const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'AppTurismo'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la BD:', err);
    return;
  }
  console.log('Conexión BD correcta');
});



app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM Usuario', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
    console.log(results);
  });
});

// Registro

app.post('/registro', (req, res) => {
  const { correo, contraseña } = req.body;
  const query = 'CALL UsuarioRegistro (?, ?);';
  
  db.query(query, [correo, contraseña], (err, results) => {
    if (err) {
      if (err.sqlState === '45000') {
        return res.status(400).json({ error: 'El correo ya está registrado.' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Usuario creado', userId: results.insertId });
  });
});

// Iniciar Sesión

app.post('/iniciar-sesion', (req, res) => {
  const { correo, contraseña } = req.body;
  const query = 'CALL UsuarioIniciarSesion(?, ?);';

  db.query(query, [correo, contraseña], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const resultado = results[0][0] || null;
    res.json({ id: resultado ? resultado.id : null });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});