const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginController = require('./src/controllers/login-controller');
const registerController = require('./src/controllers/register-controller');
const confirmacionRegistroController = require('./src/controllers/confirmacionRegistro-controller');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});