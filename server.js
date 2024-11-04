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

app.post('/registro', registerController.registroRegular);
app.post('/registroGoogle', registerController.registroGoogle);
app.post('/iniciar-sesion', loginController.iniciarSesion);
app.post('/iniciar_sesionGoogle', loginController.iniciarSesionGoogle);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});