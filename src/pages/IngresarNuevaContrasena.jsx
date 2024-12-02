import React, {useState} from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/RecuperarContrasena.css';

// 
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import PatternIcon from '@mui/icons-material/Pattern';
import ButtonsMod from '../components/ButtonsMod';
import {  InputLabel,InputAdornment, IconButton } from '@mui/material';
import { Container, Card, Box, Typography, CardHeader, CardContent, FormControl, OutlinedInput, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {handleActualizar} from '../pagesHandlers/recuperacion-handler';

const IngresarNuevaContrasena = () => {

    const token = window.location.pathname.split('/')[2];



    const [contraseña, setContraseña] = useState('');
    const [contraseña2, setContraseña2] = useState('');
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
  
    // Validaciones de la contraseña
    const validarContraseña = (contraseña) => {
      const rules = {
        longitudValida: /^(?=.{8,128}$)/.test(contraseña), // Longitud mínima de 8 y máxima de 128 caracteres
        mayuscula: /[A-Z]/.test(contraseña), // Al menos una mayúscula
        minuscula: /[a-z]/.test(contraseña), // Al menos una minúscula
        numero: /\d/.test(contraseña), // Al menos un número
        noVacio: contraseña.length > 0, // La contraseña no puede estar vacía
      };
      return rules;
    };

    const validarConfirmarContraseña = (contraseña, confirmacion) => {
      return contraseña === confirmacion;
    };
  
    const handlePasswordChange = (e) => {
      const value = e.target.value;
      setContraseña(value);

      setErrors((prevErrors) => {
        const passwordRules = validarContraseña(value);
        const newErrors = {
          ...prevErrors,
          contraseña: passwordRules,
        }

        if (value) {
          delete newErrors.camposObligatorios;
        }

        return newErrors;
      });
    };
  
    const handleConfirmPasswordChange = (e) => {
      const value = e.target.value;
      setContraseña2(value);

      setErrors((prevErrors) => {
        const passwordsMatch = validarConfirmarContraseña(contraseña, value);
        const newErrors = {
          ...prevErrors,
          contraseña2: passwordsMatch,
        }

        if (value) {
          delete newErrors.camposObligatorios;
        }

        return newErrors;
      });
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      setFormSubmitted(true);
  
      // Validar si los campos no están vacíos
      if (!contraseña || !contraseña2) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          camposObligatorios: true, // Añadir error para campos vacíos
        }));
        console.log('Error: Todos los campos deben estar llenos');
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
        console.log('Error: El formato de la contraseña es inválido');
        return;
      }
  
      // Si las contraseñas no coinciden
      if (!passwordsMatch) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contraseña2: false, // Marcar error en confirmar contraseña
        }));
        console.log('Error: Las contraseñas no coinciden');
        return;
      } 
      handleActualizar(token, contraseña);
    }
  
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
    const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <NavBarHome
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <Container maxWidth='lg' sx={{display:'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '75vh'}}>
        <Card sx={{padding: '1%', width: '100%', margin: '50px 0 40px 0'}}>
            <CardHeader
                className='rc-header-titulo'
                avatar={
                    <PatternIcon className='inc-header-icono' color='primary' sx={{fontSize: {md: '2.5rem', xs: '1.5rem'}}}/>
                }
                title='Ingresa una nueva contraseña'
                titleTypographyProps={{
                    sx: {
                    fontSize: {xs: '1.5rem', sm: '1.5rem', md: '2.5rem'},
                    fontWeight: 'bold',
                    }
                }}
            />

            <CardContent>
              <Typography variant='body1' sx={{ marginBottom: '30px' }}>
                La contraseña debe contener una longitud de entre 8 a 128 caracteres e incluir al menos una letra minúscula, una mayúscula y un número.
              </Typography>

              <FormControl fullWidth size='small'>
                {/* Contraseña */}
                <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  required
                  label='Contraseña'
                  value={contraseña}
                  onChange={handleContraseñaChange}
                  error={!!errores.contraseña && isTouched.contraseña}
                  helperText={errores.contraseña}
                  sx={{ margin: '10px 0 20px 0' }}
                  type={mostrarContraseña ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleMostrarContraseña} edge='end'>
                          {mostrarContraseña ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {/* Confirmar contraseña */}
                <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  required
                  label='Confirmar contraseña'
                  value={confirmarContraseña}
                  onChange={handleConfirmarContraseñaChange}
                  error={!!errores.confirmarContraseña && isTouched.confirmarContraseña}
                  helperText={errores.confirmarContraseña}
                  sx={{ marginBottom: '20px' }}
                  type={mostrarConfirmarContraseña ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleMostrarConfirmarContraseña} edge='end'>
                          {mostrarConfirmarContraseña ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'right'}}>
                  <ButtonsMod
                      variant='principal'
                      textCont='Aceptar'
                      clickEvent={handleSubmit}
                  />
              </Box>

            </CardContent>
        </Card>

      </Container>
            
      <Footer
        showIncorporaLugar={false} />
    
    </ThemeProvider>
  );

};

export default IngresarNuevaContrasena;
