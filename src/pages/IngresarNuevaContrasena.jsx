import React, {useState} from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/RecuperarContrasena.css';
// 
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import PatternIcon from '@mui/icons-material/Pattern';
import ButtonsMod from '../components/ButtonsMod';
import {  InputLabel,InputAdornment, IconButton } from '@mui/material';
import { Container, Card, Box, Typography, CardHeader, CardContent, FormControl, OutlinedInput } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const IngresarNuevaContrasena = () => {
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
      console.log('Se restableció tu contraseña');
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
                    <PatternIcon className='inc-header-icono' color='primary' sx={{fontSize: '2.5rem'}}/>
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
                {/* Contraseña */}
                <Box className='my-4' sx={{marginTop: '0 !important'}}>
                <FormControl fullWidth size='small' error={formSubmitted && !!errors.camposObligatorios}>
                    <InputLabel>Contraseña</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={contraseña}
                        onChange={handlePasswordChange}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Contraseña'
                        required
                    />
                    {formSubmitted && errors.camposObligatorios && (
                        <Typography color='error' variant='body2'>
                            Los campos no deben estar vacíos
                        </Typography>
                    )}
                    {formSubmitted && !errors.contraseña?.longitudValida && !errors.camposObligatorios && (
                        <Typography color='error' variant='body2'>
                            El formato de la contraseña es inválido
                        </Typography>
                    )}
                </FormControl>
                </Box>
                {/* Confirmar contraseña */}
                <Box className='my-4'>
                <FormControl fullWidth size="small" error={formSubmitted && !errors.contraseña2} className='ing-formlabel'>
                    <InputLabel>Confirmar contraseña</InputLabel>
                        <OutlinedInput
                            type={showPassword2 ? 'text' : 'password'}
                            value={contraseña2}
                            onChange={handleConfirmPasswordChange}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleClickShowPassword2}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label='Confirmar contraseña'
                            required
                        />
                        {formSubmitted && errors.camposObligatorios && (
                          <Typography color='error' variant='body2'>
                              Los campos no deben estar vacíos
                          </Typography>
                        )}
                        {formSubmitted && !errors.contraseña2 && !errors.camposObligatorios && (
                            <Typography color='error' variant='body2'>
                                Las contraseñas no coinciden
                            </Typography>
                        )}
                </FormControl>
                </Box>

                <Box className="my-3">
                  <ul>
                      <li className={`lo_pa-rule-input fw-medium ${errors.contraseña?.longitudValida ? 'text-success fw-semibold' : ''}`}>Debe tener entre 8 y 128 caracteres.</li>
                      <li className={`lo_pa-rule-input fw-medium ${errors.contraseña?.mayuscula ? 'text-success fw-semibold' : ''}`}>Debe contener al menos una letra mayúscula.</li>
                      <li className={`lo_pa-rule-input fw-medium ${errors.contraseña?.minuscula ? 'text-success fw-semibold' : ''}`}>Debe contener al menos una letra minúscula.</li>
                      <li className={`lo_pa-rule-input fw-medium ${errors.contraseña?.numero ? 'text-success fw-semibold' : ''}`}>Debe contener al menos un número.</li>
                      <li className={`lo_pa-rule-input fw-medium ${errors.contraseña2 ? 'text-success fw-semibold' : ''}`}>Las contraseñas coinciden.</li>
                  </ul>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'right'}}>
                    <ButtonsMod
                        variant='principal'
                        textCont='Aceptar'
                        clickEvent={handleFormSubmit}
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
