const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginController = require('./src/controllers/login-controller');
const registerController = require('./src/controllers/register-controller');
const userController = require('./src/controllers/user-controller');
const confirmacionRegistroController = require('./src/controllers/confirmacionRegistro-controller');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const placesRoutes = require('./src/routes/places');


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/places', placesRoutes);

const PORT = 3001;

// Ruta para manejar el registro y enviar el correo de verificación
app.post('/register', registerController.enviarCorreoVerificacion);
app.post('/confirm-email', confirmacionRegistroController.confirmarRegistro);

app.post('/registro', registerController.registroRegular);
app.post('/registroGoogle', registerController.registroGoogle);
app.post('/registro_Facebook', registerController.registroFacebook);
app.post('/iniciar-sesion', loginController.iniciarSesion);
app.post('/iniciar_sesionGoogle', loginController.iniciarSesionGoogle);
app.post('/login_Facebook', loginController.iniciarSesionFacebook);
app.post('/user_datos', userController.getDatos);
app.post('/user_deseados', userController.verDeseados);
app.post('/user_favoritos', userController.verFavoritos);
app.post('/isLogged', (req, res) => {
  // // Recibir el valor de id y de un token, para verificar si el token es válido
  const {id, token} = req.body;
  console.log(token);
  console.log(req.body);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err){
      res.json({logged: false, decoded: null});
    } else {
      res.json({logged: true, decoded});
    }
    console.log(decoded);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});