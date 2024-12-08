import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container,Grid2 as Grid , Box, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, Link, IconButton, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import LeftImage from '../components/register/LeftImageR';
import imgRegister from '../img/registerIMGA.jpg';

import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [contraseña2, setContraseña2] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validaciones de la contraseña
  const validarContraseña = (contraseña) => {
    const rules = {
      longitudValida: /^(?=.{8,16}$)/.test(contraseña), // Longitud mínima de 8 y máxima de 16 caracteres
      mayuscula: /[A-Z]/.test(contraseña), // Al menos una mayúscula
      minuscula: /[a-z]/.test(contraseña), // Al menos una minúscula
      numero: /\d/.test(contraseña), // Al menos un número
      noVacio: contraseña.length > 0, // La contraseña no puede estar vacía
    };
    return rules;
  };
  //Validaciones del correo
  const validarCorreo = (correo) => {
    const rules = {
      sinEspacios: /^[^\s]+$/.test(correo),
      arrobaCaracteres: /^[^@]+@[^@]+$/.test(correo),
      dominioConPunto: /@[^@]+\.[^@]+$/.test(correo),
      noVacio: correo.length > 0,
    };
    return rules;
  };
  
  // Manejadores de cambios para el correo

  // Validación del nombre de usuario
  const validarUser = (usermame) => {
    const rules = {
      longitudValida: /^(?=.{8,60}$)/.test(usermame), // Longitud mínima de 8 y máxima de 60 caracteres
      noVacio: usermame.length > 0, // El nombre de usuario no puede estar vacío
    };
    return rules;
  };
  

  const validarConfirmarContraseña = (contraseña, confirmacion) => {
    return contraseña === confirmacion;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNombre(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      nombre: validarUser(value),  // Validar nombre de usuario
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      correo: validarCorreo(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setContraseña(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      contraseña: validarContraseña(value),
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setContraseña2(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      contraseña2: validarConfirmarContraseña(contraseña, value),
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validar si los campos no están vacíos
    if (!nombre || !correo || !contraseña || !contraseña2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        camposObligatorios: true, // Añadir error para campos vacíos
      }));
      return;
    }

    // Validar contraseñas
    const passwordRules = validarContraseña(contraseña);
    const passwordsMatch = validarConfirmarContraseña(contraseña, contraseña2);

    // Si la contraseña no cumple las reglas
    if (!passwordRules.longitudValida || !passwordRules.mayuscula || !passwordRules.minuscula || !passwordRules.numero || !passwordRules.noVacio) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña: passwordRules,
      }));
    }

    // Si las contraseñas no coinciden
    if (!passwordsMatch) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña2: false, // Marcar error en confirmar contraseña
      }));
    }

    // Si todo está correcto, proceder con el registro
    
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleHomeClick = () => navigate('/');



  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className="register-background">
        <Box className="lo_pa-container-tool">
          <Navbar
            showingresa={false}
            showRegistrate={false}
            transparentNavbar={false}
            lightLink={false}
            staticNavbar={false}
          />
          <Container maxWidth="md" disableGutters className= 'my-5 py-4 d-flex align-items-center justify-content-center'>
            <Grid container sx={{ justifyContent: 'center', borderRadius: '6px', overflow: 'hidden' }}>
              {/* Left Image Section */}
              <Grid size={{ xs: 12, md: 6 }} className='register-left-container'>
                <LeftImage
                  imageUrl={imgRegister}              
                  nombreFotografo="Daniel Zepeda"/>
              </Grid>

              {/* Form Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                                <Box className="register-right-form bg-light">
                  <Box className="mx-3 pb-5 pt-3">
                    <Box className="d-flex justify-content-end">
                      <IconButton aria-label="cerrar" onClick={handleHomeClick}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <Box className="mx-4">
                      
                      <Typography variant="h4" className="fw-bold">Regístrate</Typography>
                      <Typography variant="subtitle1">Completa el formulario para continuar</Typography>

                      <form className="register-form" onSubmit={handleFormSubmit}>
                        <Box className="my-4">
                          <TextField
                            label="Nombre de usuario"
                            value={nombre}
                            onChange={handleNameChange}
                            fullWidth
                            size="small"
                            required
                            error={formSubmitted && !errors.nombre?.longitudValida}
                            helperText={formSubmitted && !errors.nombre?.longitudValida ? "El nombre de usuario debe tener entre 8 y 60 caracteres." : ""}
                          />
                        <Typography variant="body2" color="textSecondary" className="mb-2 ms-2 fw-medium">
                          El username debe cumplir con las siguientes reglas:
                        </Typography>
                        </Box>

                        <Box className="my-3">
                          <ul>
                            <li className={`lo_pa-rule-input fw-medium ${errors.nombre?.longitudValida ? 'text-success fw-semibold' : ''}`}>El nombre de usuario debe tener entre 8 y 60 caracteres.</li>
                          </ul>
                        </Box>


                        <Box className="my-4">
                          <TextField
                            label="Correo electrónico"
                            value={correo}
                            onChange={handleEmailChange}
                            fullWidth
                            size="small"
                            required
                            error={formSubmitted && !errors.correo?.noVacio}
                            helperText={formSubmitted && !errors.correo?.noVacio ? "El correo no debe estar vacío." : ""}
                          />
                          <Typography variant="body2" color="textSecondary" className="mb-2 ms-2 fw-medium">
                            El correo debe cumplir con las siguientes reglas:
                          </Typography>
                          <ul>
                            <li className={`lo_pa-rule-input fw-medium ${errors.correo?.noVacio ? 'text-success fw-semibold' : ''}`}>No debe estar vacío.</li>
                            <li className={`lo_pa-rule-input fw-medium ${errors.correo?.sinEspacios ? 'text-success fw-semibold' : ''}`}>No debe contener espacios.</li>
                            <li className={`lo_pa-rule-input fw-medium ${errors.correo?.arrobaCaracteres ? 'text-success fw-semibold' : ''}`}>Debe tener al menos un carácter antes y después del símbolo @.</li>
                            <li className={`lo_pa-rule-input fw-medium ${errors.correo?.dominioConPunto ? 'text-success fw-semibold' : ''}`}>Debe incluir un punto en la parte del dominio (por ejemplo, .com, .net).</li>
                          </ul>
                        </Box>

                        <Box className="my-4">
                          <FormControl fullWidth size="small" error={formSubmitted && !!errors.contraseña}>
                            <InputLabel>Contraseña</InputLabel>
                            <OutlinedInput
                              type={showPassword ? 'text' : 'password'}
                              value={contraseña}
                              onChange={handlePasswordChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Contraseña"
                              required
                            />
                          </FormControl>
                        </Box>

                        <Box className="my-4">
                          <FormControl fullWidth size="small" error={formSubmitted && !errors.contraseña2}>
                            <InputLabel>Confirmar contraseña</InputLabel>
                            <OutlinedInput
                              type={showPassword2 ? 'text' : 'password'}
                              value={contraseña2}
                              onChange={handleConfirmPasswordChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Confirmar contraseña"
                              required
                            />
                          </FormControl>
                          <Typography variant="body2" color="textSecondary" className="mb-2 ms-2 fw-medium">
                          La contraseña debe cumplir con las siguientes reglas:
                            </Typography>
                        </Box>

                        <Box className="my-3">
                          <ul>
                            <li className={`lo_pa-rule-input fw-medium ${errors.contraseña?.longitudValida ? 'text-success fw-semibold' : ''}`}>Debe tener entre 8 y 16 caracteres.</li>
                            <li className={`lo_pa-rule-input fw-medium ${errors.contraseña?.mayuscula ? 'text-success fw-semibold' : ''}`}>Debe contener al menos una letra mayúscula.</li>
                            <li className={`lo_pa-rule-input fw-medium ${errors.contraseña?.minuscula ? 'text-success fw-semibold' : ''}`}>Debe contener al menos una letra minúscula.</li>
                            <li className={`lo_pa-rule-input fw-medium ${errors.contraseña?.numero ? 'text-success fw-semibold' : ''}`}>Debe contener al menos un número.</li>
                            <li className={`lo_pa-rule-input fw-medium ${errors.contraseña2 ? 'text-success fw-semibold' : ''}`}>Las contraseñas coinciden.</li>
                          </ul>
                        </Box>

                                               {/* Botón de registro */}
                        <Box className="my-4">
                          <Button fullWidth variant="contained" type="submit">
                            Registrarse
                          </Button>
                        </Box>

                        {/* Opciones de login */}
                        <Box className="my-4">
                          <Typography variant="body2" className="text-center">O regístrate con</Typography>
                          <Box className="d-flex justify-content-center gap-3">
                            <IconButton aria-label="google" color='google'>
                              <GoogleIcon />
                            </IconButton>
                            <IconButton aria-label="facebook" color='facebook'>
                              <FacebookRoundedIcon />
                            </IconButton>
                          </Box>
                        </Box>

                        {/* Enlaces a los Términos de Servicio y Política de Privacidad */}
                        <div className="mt-4">
                          <small>
                            Al registrarte, aceptas nuestros
                            <Link to="/terminos-condiciones" className="fontAzulMayaOscuro"> Términos de Servicio</Link> y
                            <Link to="/politica-privacidad" className="fontAzulMayaOscuro"> Política de Privacidad</Link>.
                          </small>
                        </div>
                      </form>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterPage;