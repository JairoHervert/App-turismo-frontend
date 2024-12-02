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

const IngresarNuevaContrasena = () => {
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(true);
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);
  const [errores, setErrores] = useState({
    contraseña: '',
    confirmarContraseña: '',
  })
  const [isTouched, setIsTouched] = useState(false);

  const validarContraseña = (pwd) => {
    const errores = [];
    if (pwd.length < 8 || pwd.length > 128) {
      errores.push('La contraseña debe tener entre 8 y 128 caracteres.');
    }
    if (!/[A-Z]/.test(pwd)) {
      errores.push('Debe contener al menos una letra mayúscula.');
    }
    if (!/[a-z]/.test(pwd)) {
      errores.push('Debe contener al menos una letra minúscula.');
    }
    if (!/[0-9]/.test(pwd)) {
      errores.push('Debe incluir al menos un número.');
    }
    return errores.join(' ');
  }

  const handleContraseñaChange = (e) => {
    const value = e.target.value;
    setContraseña(value);
    setErrores((prev) => ({
      ...prev,
      contraseña: validarContraseña(value),
    }));
  }

  const handleConfirmarContraseñaChange = (e) => {
    const value = e.target.value;
    setConfirmarContraseña(value);

    if (isTouched.confirmarContraseña) {
      setErrores((prev) => ({
        ...prev,
        confirmarContraseña: value !== contraseña ? 'Las contraseñas no coinciden.' : '',
      }));
    }
  }

  const handleSubmit = () => {
    setIsTouched({
      contraseña: true,
      confirmarContraseña: true,
    });
    let nuevosErrores = {};

    if (!contraseña) {
      nuevosErrores.contraseña = 'Este campo no debe estar vacío';
    }
    else {
      nuevosErrores.contraseña = validarContraseña(contraseña);
    }
    if (!confirmarContraseña) {
      nuevosErrores.confirmarContraseña = 'Este campo no debe estar vacío';
    }
    else if (confirmarContraseña !== contraseña) {
      nuevosErrores.confirmarContraseña = 'Las contraseñas no coinciden';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
    }
    else {
      console.log('Formulario enviado');
    }
  }

  const handleMostrarContraseña = () => {
    setMostrarContraseña((prev) => !prev);
  }

  const handleMostrarConfirmarContraseña = () => {
    setMostrarConfirmarContraseña((prev) => !prev);
  }

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
