// modulos importados
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Box, Typography } from '@mui/material';
import { TextField, Grid2 as Grid, FormControl, InputLabel, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';

// modulos de iconos
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff, Google as GoogleIcon, FacebookRounded as FacebookRoundedIcon, Close as CloseIcon } from '@mui/icons-material';

// componentes importados
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import LeftImage from '../components/login/LeftImage';

// estilos importados
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/LoginPage.css';

// elementos de la página
import imgTeotihuacan from '../img/piramides-teotihuacan.webp';
import fuenteTlaloc from '../img/PlacePage/place-img-fuentetlaloc.jpg';
import casaLeon from '../img/PlacePage/place-img-casadeleon.jpg';

function LoginPage() {
  // validacion de correo
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [correoReglas, setCorreoReglas] = useState({
    sinEspacios: false,
    arrobaCaracteres: false,
    dominioConPunto: false,
  });

  const handleCorreoChange = (e) => {
    const correo = e.target.value;
    setCorreo(correo);
    console.log(correo);

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

  const handleLogin = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (correo && contraseña) {
      // Lógica de inicio de sesión...
      console.log("Iniciando sesión...");
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

  // redireccionamiento a home
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };


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

                      <form className='login-form' onSubmit={handleLogin}>
                        <Box className='my-4'>
                          <TextField
                            hiddenLabel
                            id="log-correo"
                            label="Correo electrónico"
                            placeholder='correo@ejemplo.com'
                            size="small"
                            type='email'
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
                            <IconButton aria-label="google" color='google'>
                              <GoogleIcon />
                            </IconButton>
                            <IconButton aria-label="facebook" color='facebook'>
                              <FacebookRoundedIcon />
                            </IconButton>
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