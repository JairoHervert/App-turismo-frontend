import React, { useState, useEffect } from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
// estilos y componentes
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/GenerarItinerario.css';
import ButtonsMod from '../components/ButtonsMod';
import FechasDeViaje from '../components/generarItinerario/FechasDeViaje';
import DetallesViaje from '../components/generarItinerario/DetallesViaje';
import Presupuesto from '../components/generarItinerario/Presupuesto';

import { Container, Stack, Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
// ÍCONOS
import { Map as MapIcon } from '@mui/icons-material';

const GenerarItinerario = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    let hayError = false;
    // Validaciones presupuesto
    if (presupuesto === '') {
      setError(true);
      setHelperText('Este campo no debe estar vacío');
      hayError = true;
    } 
    else {
      const regex = /^0$|^[1-9][0-9]*$/;
      if (!regex.test(presupuesto)) {
        setError(true);
        setHelperText('Ingresa solo valores numéricos enteros');
        hayError = true;
      }
    }

    // Validaciones fecha de inicio y fin
    if (fechaFin.isBefore(fechaInicio)) {
      setErrorFechaFin(true);
      hayError = true;
    }

    // Validación medio de transporte
    if (!medioTransporte) {
      setErrorMedioTransporte(true);
      setHelperTextTransporte('Selecciona un medio de transporte antes de continuar');
      hayError = true;
    }

    if (!hayError) {
      navigate('/Categorias-page');
    }
  }

  // Sección - Fecha Inicio y Fecha Fin **Por defecto se llena con la fecha de hoy
  const [fechaInicio, setFechaInicio] = useState(dayjs());
  const [fechaFin, setFechaFin] = useState(dayjs());
  const [errorFechaFin, setErrorFechaFin] = useState(false);

  // Sección - Presupuesto
  const [isFirstEnabled] = useState(true);
  const [presupuesto, setPresupuesto] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Ingresa solo valores numéricos enteros');

  // Sección - Detalles del viaje
  const [medioTransporte, setMedioTransporte] = useState('');
  const [errorMedioTransporte, setErrorMedioTransporte] = useState(false);
  const [helperTextTransporte, setHelperTextTransporte] = useState('');

  // Guardar el valor de medioTransporte en localStorage cuando cambie
  useEffect(() => {
    if (medioTransporte) {
      localStorage.setItem('modo', medioTransporte);
      console.log('Modo de transporte guardado en el localstorage de generaritinerario.jsx:', medioTransporte);
    }
  }, [medioTransporte]);

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <NavBarHome
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <Container maxWidth='lg' className='my-4'>
        { /* Sección - Header */}
        <Stack direction='row' spacing={1} alignItems='center'>
          <MapIcon fontSize='large' sx={{ color: '#E4007C', fontSize: {xs: '1.5rem', sm: '3rem'} }} />
          <Typography className='fw-bold' sx={{ fontSize: {xs: '1.5rem', sm: '3rem'} }}>Generar Itinerario</Typography>
        </Stack>

        <Typography variant='body1'>
          Para mejorar su experiencia, necesitamos algunos detalles de su viaje.
        </Typography>

        { /* Sección - Contenido Generar Itinerario */}
        <Stack
          className='gi-contenido'
          direction={{ xs: 'column', md: 'row' }}
          spacing={1}
          sx={{
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          { /* Sección - Fechas de viaje */}
          <Stack
            direction='column'
            spacing={1}
            alignItems='center'
            className='mb-2'
            sx={{
              width: '100%',
              paddingRight: { xs: 0, md: '1%' }
            }}
          >

            {/* Sección - Fechas de inicio y fin del viaje */}
            <FechasDeViaje
              fechaInicio={fechaInicio}
              setFechaInicio={setFechaInicio}
              fechaFin={fechaFin}
              setFechaFin={setFechaFin}
              errorFechaFin={errorFechaFin}
              setErrorFechaFin={setErrorFechaFin}
            />        

            { /* Sección - Card Presupuesto / Disposición del presupuesto */}
            <Presupuesto
              isFirstEnabled={isFirstEnabled}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              error={error}
              setError={setError}
              helperText={helperText}
              setHelperText={setHelperText}
            />

          </Stack>

          { /* Sección - Card Detalles del viaje */}
          <DetallesViaje
            medioTransporte={medioTransporte}
            setMedioTransporte={setMedioTransporte}
            errorMedioTransporte={errorMedioTransporte}
            setErrorMedioTransporte={setErrorMedioTransporte}
            helperTextTransporte={helperTextTransporte}
            setHelperTextTransporte={setHelperTextTransporte}
          />

        </Stack>

        <Box className='gi-btn-continuar'>
          <ButtonsMod
            variant='principal'
            textCont='Continuar'
            clickEvent={handleClick}
          />
        </Box>

      </Container>


      <Footer
        showIncorporaLugar={false} />
    </ThemeProvider>
  );
};

export default GenerarItinerario;
