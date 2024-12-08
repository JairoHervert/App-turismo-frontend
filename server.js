const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginController = require('./src/controllers/login-controller');
const registerController = require('./src/controllers/register-controller');
const userController = require('./src/controllers/user-controller');
const placeController = require('./src/controllers/place-controller');
const confirmacionRegistroController = require('./src/controllers/confirmacionRegistro-controller');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const placesRoutes = require('./src/routes/places');
const historyRoutes = require('./src/routes/history-routes');
const recuperacionController = require('./src/controllers/recuperacion-controller');
const favDeseadosController = require('./src/controllers/favDeseados-controller');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/places', placesRoutes);
app.use('/', historyRoutes);

const PORT = 3001;

// Ruta para manejar el registro y enviar el correo de verificación
app.post('/register', registerController.enviarCorreoVerificacion);
app.post('/confirm-email', confirmacionRegistroController.confirmarRegistro);

// Rutas para manejar la recuperación de la contraseña

app.post('/forgot-password', recuperacionController.OlvidarContrasena);
app.post('/Correo-Recuperacion', recuperacionController.enviarCorreoRecuperacion);
app.post('/actualizar-contrasena', recuperacionController.actualizarContrasena);

// Rutas para manejar el registro y el inicio de sesión

app.post('/registro', registerController.registroRegular);
app.post('/registroGoogle', registerController.registroGoogle);
app.post('/registro_Facebook', registerController.registroFacebook);
app.post('/iniciar-sesion', loginController.iniciarSesion);
app.post('/iniciar_sesionGoogle', loginController.iniciarSesionGoogle);
app.post('/login_Facebook', loginController.iniciarSesionFacebook);
app.post('/user_datos', userController.getDatos);
app.post('/user_guardar_datos', userController.setDatos);
app.post('/user_deseados', userController.verDeseados);
app.post('/user_favoritos', userController.verFavoritos);

app.post('/agregar-favoritos', favDeseadosController.Favoritos);
app.post('/agregar-deseados', favDeseadosController.Deseados);
app.post('/eliminar-favoritos', favDeseadosController.EliminarFavoritos);
app.post('/eliminar-deseados', favDeseadosController.EliminarDeseados);

app.post('/es-favorito', favDeseadosController.EsFavorito);
app.post('/es-deseado', favDeseadosController.EsDeseado);

// Rutas para manejar los lugares

app.post('/lugares_todos', placeController.LugaresTodos);
app.post('/lugar_datos', placeController.getDatos);
app.post('/lugar_fotos', placeController.getFotos);
app.post('/lugar_categorias', placeController.lugarGetCategorias);
app.post('/lugar_subcategorias', placeController.getSubcategorias);
app.post('/lugar_getLugaresPor4Categorias', placeController.getLugaresPor4Categorias);
app.post('/lugar_getLugaresPor4CategoriasUsuario', placeController.getLugaresPor4CategoriasUsuario);
app.post('/getCategorias', placeController.getCategorias);
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