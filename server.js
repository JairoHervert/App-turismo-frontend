const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9412',
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
  const { nombre, correo, contraseña } = req.body;
  const query = 'CALL UsuarioRegistro (?, ?, ?);';
  
  db.query(query, [nombre, correo, contraseña], (err, results) => {
    if (err) {
      if (err.sqlState === '45000') {
        return res.status(400).json({ error: 'El correo ya está registrado.' });
      }
      return res.status(500).json({ error: err.message });
    }
    console.log(results);
    res.status(201).json({ message: 'Usuario creado', userId: results });
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
    
    const resultado = results[0][0];
    if (resultado && resultado.error) {
      // Identificar el error específico
      if (resultado.error === 'correo_no_registrado') {
        return res.status(400).json({ error: 'El correo no está registrado.' });
      }
      if (resultado.error === 'contraseña_incorrecta') {
        return res.status(400).json({ error: 'La contraseña es incorrecta.' });
      }
      if (resultado.error === 'cuenta_no_confirmada') {
        return res.status(400).json({ error: 'La cuenta no ha sido confirmada. Revisa tu correo para confirmar tu cuenta.' });
      }
    } else if (resultado && resultado.id) {
      res.json({ id: resultado.id });
    } else {
      res.status(400).json({ error: 'Credenciales incorrectas.' });
    }
  });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});