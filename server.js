const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginController = require('./src/controllers/login-controller');
const registerController = require('./src/controllers/register-controller');
const confirmacionRegistroController = require('./src/controllers/confirmacionRegistro-controller');
const cookieParser = require('cookie-parser');
const doenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = 3001;

// Ruta para manejar el registro y enviar el correo de verificación
app.post('/register', registerController.enviarCorreoVerificacion);


app.post('/confirm-email', confirmacionRegistroController.confirmarRegistro);

// app.get('/usuarios', (req, res) => {
//   db.query('SELECT * FROM Usuario', (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
//     console.log(results);
//   });
// });

app.post('/registro', registerController.registroRegular);
app.post('/iniciar-sesion', loginController.iniciarSesion);
app.post('/isLogged', (req, res) => {
  // // Recibir el valor de id y de un token, para verificar si el token es válido
  const {id, token} = req.body;
  console.log(token);
  console.log(req.body);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err){
      res.json({logged: false});
    } else {
      res.json({logged: true});
    }
    console.log(decoded);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});