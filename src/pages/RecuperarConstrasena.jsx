import React, { useState } from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/RecuperarContrasena.css';
// 
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import LockResetIcon from '@mui/icons-material/LockReset';
import ButtonsMod from '../components/ButtonsMod';

import { Container, Card, Box, Typography, CardHeader, CardContent, TextField, Link } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/system';

const RecuperarContrasena = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const handleEmailChange = (e) => {
    const nuevoEmail = e.target.value;
    setEmail(nuevoEmail);

    if (touched) {
      setError(!validarEmail(nuevoEmail));
    }
  }

  const handleSend = () => {
    setTouched(true);

    if (validarEmail(email)) {
      setError(false);
      console.log('Correo enviado a: ', email);
    } else {
      setError(true);
      console.log('Correo inválido. No es posible mandar el correo');
    }
  }

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <NavBarHome
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <Container maxWidth='lg' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '75vh' }}>
        <Card sx={{ padding: '1%', width: '100%', margin: '50px 0 40px 0' }}>
          <Stack sx={{ padding: '16px 0 16px 16px'}}>
            <Typography>
              <Link href='/login'>Regresar a inicio de sesión</Link>
            </Typography>
          </Stack>

          <CardHeader
            className='rc-header-titulo'
            avatar={
              <LockResetIcon className='rc-header-icono' color='primary' sx={{ fontSize: '2.5rem' }} />
            }
            title='Restablece tu contraseña'
            titleTypographyProps={{
              sx: {
                fontSize: { xs: '1.8rem', sm: '1.8rem', md: '2.5rem' },
                fontWeight: 'bold',
              }
            }}
          />
          <CardContent>
            <Typography>
              Ingresa tu correo electrónico en el campo a continuación y te enviaremos un enlace para restablecer tu contraseña.
            </Typography>
            <TextField
              fullWidth
              variant='outlined'
              size='small'
              required
              label='Correo electrónico'
              sx={{ margin: '20px 0 40px 0' }}
              value={email}
              onChange={handleEmailChange}
              error={touched && error}
              helperText={touched && error ? 'Por favor, ingresa un correo electrónico válido.' : ''}
            />
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <ButtonsMod
                variant='principal'
                textCont='Enviar'
                clickEvent={handleSend}
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

export default RecuperarContrasena;
