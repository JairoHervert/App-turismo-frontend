// modulos importados
import React, { useState, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Box, Typography } from '@mui/material';
import { TextField, Grid2 as Grid, FormControl, InputLabel, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';

// Alert
import img from '../img/Itinerary/turist-for-another.jpg';
import AlertD from './../components/alert';
import ButtonsMod from './../components/ButtonsMod';

// modulos de iconos
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff, Google as GoogleIcon, FacebookRounded as FacebookRoundedIcon, Close as CloseIcon } from '@mui/icons-material';

// componentes importados
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import LeftImage from '../components/login/LeftImage';
import FormularioPreferencias from '../components/preferencias/FormularioPreferencias';
import SeleccionCategorias from '../components/preferencias/SeleccionCategorias';

//componentes de back
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { handleLogin, handleLoginGoogle, errorGoogleHandler, responseFacebook } from '../pagesHandlers/login-handler';
import { handleCompletarPerfil, handleActualizarCategorias } from '../pagesHandlers/user_handler';

// estilos importados
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/LoginPage.css';

// elementos de la página
import imgTeotihuacan from '../img/piramides-teotihuacan.webp';
import fuenteTlaloc from '../img/PlacePage/place-img-fuentetlaloc.jpg';
import casaLeon from '../img/PlacePage/place-img-casadeleon.jpg';

function LoginPage() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  
  const alertRef = useRef();
  const handleClickOpen = () => {
    if (alertRef.current) {
        alertRef.current.handleClickOpen();
    }
  };
  const handleConfirm = () => {
    console.log('Action confirmed');
    alert('Action confirmed');
  };

  // validacion de correo
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [correoReglas, setCorreoReglas] = useState({
    sinEspacios: false,
    arrobaCaracteres: false,
    dominioConPunto: false,
  });
  const[datosIniciales, setDatosIniciales] = useState({});

  const handleCorreoChange = (e) => {
    const correo = e.target.value;
    setCorreo(correo);

    // Validar reglas
    setCorreoReglas({
      sinEspacios: /^[^\s]+$/.test(correo),
      arrobaCaracteres: /^[^@]+@[^@]+$/.test(correo),
      dominioConPunto: /@[^@]+\.[^@]+$/.test(correo),
      noVacio: correo.length > 0,
    });
  };

  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const [open, setOpen] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [formData, setFormData] = useState({});
  const selectedDate = new Date(); // Define selectedDate

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (formData) => {
    console.log('Formulario enviado:', formData); 
    if(!formData) {
      return;
    }
    setFormData({
      ...formData,
      selectedDate,
    });
    let fecha = formData.selectedDate;
    const fechaFormateada = fecha.format("DD-MM-YYYY");
    const response = await handleCompletarPerfil(
      datosIniciales.resultado.id, formData.userName, formData.firstName, formData.lastName, fechaFormateada, formData.sexo, formData.foodPreference, formData.hasDisability
    );
    if(response) {
      setOpen(false);
      setOpenSecondModal(true);
    }
  };

  const handleSecondModalSubmit = async (categoriasSeleccionadas) => {
    console.log('Categorías seleccionadas:', categoriasSeleccionadas); // Agrega este console.log
    let cadena = '';
    for(var i=0; i<categoriasSeleccionadas.length; i++) {
      if(i!==0){
        cadena+=',';
      }
      cadena+=categoriasSeleccionadas[i];
    }
    const response = await handleActualizarCategorias(datosIniciales.resultado.id, cadena);
    console.log(response);
    if(response) {
      localStorage.setItem('access_token', datosIniciales.token);
      localStorage.setItem('id', datosIniciales.resultado.id);
      if(datosIniciales.resultado.tokenFacebook)
        localStorage.setItem('google_access_token', datosIniciales.resultado.tokenGoogle);
      else if(datosIniciales.resultado.tokenFacebook)
        localStorage.setItem('facebook_access_token', datosIniciales.resultado.tokenFacebook);
      setOpenSecondModal(false);
      navigate('/');
    }
  };

  const handleCloseSecondModal = () => {
    setOpenSecondModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (correoReglas.sinEspacios && correoReglas.arrobaCaracteres && correoReglas.dominioConPunto && correoReglas.noVacio && (contraseña.length > 0)) {
      const respuesta = await handleLogin(e, correo, contraseña);
      if(respuesta && respuesta.resultado && !respuesta.resultado.ultimaConexion) {
        setDatosIniciales(respuesta);
        setOpen(true);
      } else if(respuesta && respuesta.resultado) {
        localStorage.setItem('access_token', respuesta.token);
        localStorage.setItem('id', respuesta.resultado.id);
        navigate('/');
      } else {
        console.log(respuesta);
        handleClickOpen();
      }
    }
  };

  // visibilidad de la contraseña
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const successGoogleHandler = async (tokenResponse) => {
    console.log('Token de Google:', tokenResponse);
    const accessToken = tokenResponse.access_token;
    console.log('Token de acceso:', accessToken);
    
    // Llama a Google UserInfo API para obtener los datos del usuario
    try {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const respuesta = await handleLoginGoogle(
        userInfo.data.email,
        userInfo.data.name,
        userInfo.data.picture,
        userInfo.data.sub);
      if(respuesta && respuesta.resultado && !respuesta.resultado.ultimaConexion) {
        setDatosIniciales(respuesta);
        setOpen(true);
      } else if(respuesta && respuesta.resultado) {
        localStorage.setItem('access_token', respuesta.token);
        localStorage.setItem('google_access_token', userInfo.data.sub);
        localStorage.setItem('id', respuesta.resultado.id);
        navigate('/');
      }
      // Mostrar un SweetAlert de éxito si el registro es exitoso
  
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: successGoogleHandler,
    onError: errorGoogleHandler,
  });

  const handleFacebook = async (response) => {
    console.log(response);
    if(response.status && response.status === 'unknown') {
      return;
    }
    const { userID } = response;

    const resultado = await responseFacebook(response);
    console.log(resultado);
    if(resultado && resultado.resultado && !resultado.resultado.ultimaConexion) {
      setDatosIniciales(resultado);
      setOpen(true);
    } else if(resultado && resultado.resultado) {
      localStorage.setItem('access_token', resultado.token);
      localStorage.setItem('facebook_access_token', userID);
      localStorage.setItem('id', resultado.resultado.id);
      navigate('/');
    }
  }

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className='login-background'>

        <Box className='lo_pa-container-tool'>
          <Navbar
            showingresa={false}
            showRegistrate={false}
            transparentNavbar={false}
            lightLink={false}
            staticNavbar={false}
          />
          <AlertD
            ref={alertRef}
            titulo="Alerta de ejemplo"
            mensaje="Este es un mensaje de alerta."
            imagen={img}
            //el botón 1 no es obligatorio,por ejemplo, se puede mostrar nada mas como un mensaje por si no selecciona una opción o así
            boton1="Aceptar"
            boton2="Cancelar"
            onConfirm={handleConfirm}
          />
          <FormularioPreferencias open={open} handleClose={handleClose} handleSubmit={handleSubmit} datosIniciales={datosIniciales.resultado}/>
          <SeleccionCategorias open={openSecondModal} handleClose={handleCloseSecondModal} handleSubmit={handleSecondModalSubmit} />
          <Container maxWidth='md' disableGutters className='my-5 py-4 d-flex align-items-center justify-content-center' >
            <Grid container sx={{ justifyContent: 'center', borderRadius: '6px', overflow: 'hidden' }}>
              {/* lado izquierdo imagen con texto */}
              <Grid size={{ xs: 10, md: 6 }} className='login-left-container'>
                <LeftImage
                  imageUrl={casaLeon}
                  nombreFotografo='Brandon Peso Pluma' />
              </Grid>

              {/* lado derecho formulario */}
              <Grid size={{ md: 6 }}>
                <Box className='login-right-form bg-light'>
                  <Box className='mx-3 pb-5 pt-3'>
                    <Box className='d-flex justify-content-end'>
                      <IconButton aria-label="cerrar" onClick={handleHomeClick}>
                        <CloseIcon />
                      </IconButton>
                    </Box>

                    <Box className='mx-4'>
                      <Typography variant='h4' className='fw-bold'>Iniciar sesión</Typography>
                      <Typography variant='subtitle1'>Ingresa tus datos para continuar</Typography>

                      <form className='login-form' onSubmit={handleFormSubmit}>
                        <Box className='my-4'>
                          <TextField
                            hiddenLabel
                            id="log-correo"
                            label="Correo electrónico"
                            placeholder='correo@ejemplo.com'
                            size="small"
                            type='text'
                            onChange={handleCorreoChange}
                            fullWidth
                            // errores si no cumple con las reglas
                            error={formSubmitted && !correo}
                            helperText={formSubmitted && !correo ? "El correo no puede estar vacío" : ""}

                          />
                          <Typography variant="body2" color="textSecondary" className='mb-2 ms-2 fw-medium'>
                            El correo debe cumplir con las siguientes reglas:
                          </Typography>
                          <ul>
                            <li className={`lo_pa-rule-input fw-medium ${correoReglas.noVacio ? 'text-success fw-semibold' : ''}`}>No debe estar vacío.</li>
                            <li className={`lo_pa-rule-input fw-medium ${correoReglas.sinEspacios ? 'text-success fw-semibold' : ''}`}>No debe contener espacios.</li>
                            <li className={`lo_pa-rule-input fw-medium ${correoReglas.arrobaCaracteres ? 'text-success fw-semibold' : ''}`}>Debe tener al menos un carácter antes y después del símbolo @.</li>
                            <li className={`lo_pa-rule-input fw-medium ${correoReglas.dominioConPunto ? 'text-success fw-semibold' : ''}`}>Debe incluir un punto en la parte del dominio (por ejemplo, .com, .net).</li>
                          </ul>
                        </Box>

                        <Box className='my-4'>
                          <FormControl variant="outlined" size="small" fullWidth error={formSubmitted && !contraseña}>
                            <InputLabel htmlFor="log-password">Contraseña</InputLabel>
                            <OutlinedInput
                              id="log-password"
                              type={showPassword ? 'text' : 'password'}
                              value={contraseña}
                              onChange={handleContraseñaChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Contraseña"
                            />
                            {formSubmitted && !contraseña && (
                              <FormHelperText>La contraseña no puede estar vacía</FormHelperText>
                            )}
                          </FormControl>
                        </Box>

                        <Box className='lo_pa-iniciar-olvidaste'>
                          <Button variant="contained" type="submit">
                            Iniciar sesión
                          </Button>

                          <Link href="/recuperar-contrasena" underline="hover">
                            <Typography variant='subtitle2' color='dark' className='mt-4 pb-2' sx={{ fontSize: '1rem' }}>¿Olvidaste tu contraseña?</Typography>
                          </Link>
                        </Box>

                        <Box className='my-4 d-flex flex-column align-items-center justify-content-center'>
                          <Typography variant='subtitle2' sx={{ fontSize: '1rem' }}>O inicia sesión con:</Typography>
                          <Box className='d-flex justify-content-center'>
                            <IconButton aria-label="google" color='google' onClick={() => handleGoogleLogin()}>
                              <GoogleIcon />
                            </IconButton>

                            <FacebookLogin
                              appId="1276060800080687"
                              autoLoad={false}
                              callback={handleFacebook}
                              render={(renderProps) => (
                                <IconButton aria-label="facebook" color='facebook' onClick={renderProps.onClick}>
                                  <FacebookRoundedIcon />
                                </IconButton>
                              )}
                            />
                          </Box>
                        </Box>
                      </form>

                      <Box className='mt-5'>
                        <Typography variant='body1'>¿No tienes una cuenta? <Link href="/register" underline="hover">Regístrate aquí</Link></Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

            </Grid>
          </Container>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider >
  )
}

export default LoginPage