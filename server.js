const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = 3001;
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: 'AomAom',
  password: '',
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

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'canastabasica2024@gmail.com', // Cambia a tu correo
    pass: 'jfqn tvdl ppah vtkk' // Cambia a la contraseña de aplicación
  }
});

transporter.verify((error) => {
  if (error) {
    console.log('Error al configurar Nodemailer:', error);
  } else {
    console.log('Nodemailer configurado correctamente');
  }
});

// Ruta para manejar el registro y enviar el correo de verificación
app.post('/register', async (req, res) => {
  const { name, email } = req.body;

  // Genera un token único para la verificación
  const token = crypto.randomBytes(32).toString('hex');

   // Aquí se guardará el token y el correo en tu base de datos, junto con un tiempo de expiración (opcional).

  const mailOptions = {
    from: 'canastabasica2024@gmail.com',
    to: email,
    subject: 'Confirma tu registro',
    html: `<p>Hola ${name},</p><p>Gracias por registrarte. Haz clic en el enlace de abajo para confirmar tu correo:</p><a href="http://localhost:3000/confirm/${token}">Confirmar Registro</a>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Correo de confirmación enviado' });
  } catch (error) {
    console.error('Error al enviar el correo:', error); 
    res.status(500).send({ message: 'Error al enviar el correo', error });
  }
});


app.post('/confirm-email', (req, res) => {
    const { token } = req.body;
  
    // Aquí buscarías el token en la base de datos para verificar si es válido
    // Si el token es válido, marca el correo como verificado y elimina el token
  
    const tokenValido = true; // Simulación de verificación (es decir, que el token si coincide o existe en el campo del usuario)
  
    if (tokenValido) {
      res.json({ success: true, message: 'Correo verificado exitosamente' });
    } else {
      res.status(400).json({ success: false, message: 'Token inválido o expirado' });
    }
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

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});