import React from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// estilos y componentes
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/GenerarItinerario.css';
import ButtonsMod from '../components/ButtonsMod';

import { Container, Stack, Card, Typography, CardHeader, CardContent, Select, MenuItem, CardMedia } from '@mui/material';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Box, Slider, TextField, InputAdornment, InputLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
// ÍCONOS
import { Map as MapIcon, EventNote as EventNoteIcon, TipsAndUpdates as TipsAndUpdatesIcon, Tune as TuneIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@mui/icons-material';
import { Restaurant as RestaurantIcon, Festival as FestivalIcon, CheckBox as CheckBoxIcon, AttachMoneyRounded as AttachMoneyRoundedIcon } from '@mui/icons-material';
// IMAGEN PASAPORTE DECORATIVA
import pasaporteImagen from '../img/GenerarItinerario/generarItinerario-imagen-decorativo.avif';

const GenerarItinerario = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  // CARD - DETALLES DE VIAJE -> NÚMERO DE VIAJANTES **POR DEFECTO ES 1 VIAJANTE
  const [numeroViajantes, setNumeroViajantes] = useState('1');
  const [isFirstEnabled] = useState(true);

  // MOVERSE A LA SIGUIENTE PÁGINA
  const navigate = useNavigate();
  const handleClick = () => {
    // Validaciones presupuesto
    if (presupuesto === '') {
      setError(true);
      setHelperText('Este campo no debe estar vacío');
      return;
    }
    const regex = /^0$|^[1-9][0-9]*$/;
    if (!regex.test(presupuesto)) {
      setError(true);
      setHelperText('Ingresa solo valores numéricos enteros');
      return;
    }

    // Validaciones fecha de inicio y fin
    if (fechaFin.isBefore(fechaInicio)) {
      setErrorFechaFin(true);
      return;
    }

    navigate('/Categorias-page');
  }

  // CARD - FECHA DE INICIO Y FIN **POR DEFECTO SE LLENA CON LA FECHA DE HOY
  const [fechaInicio, setFechaInicio] = useState(dayjs());
  const [fechaFin, setFechaFin] = useState(dayjs());
  const [errorFechaFin, setErrorFechaFin] = useState(false);

  const handleFechaInicioChange = (nuevaFechaInicio) => {
    setFechaInicio(nuevaFechaInicio);
    if (nuevaFechaInicio.isAfter(fechaFin)) {
      setErrorFechaFin(true);
    } else {
      setErrorFechaFin(false);
    }
  }

  const hanldeFechaFinChange = (nuevoFechaFin) => {
    setFechaFin(nuevoFechaFin);
    if (nuevoFechaFin.isBefore(fechaInicio)) {
      setErrorFechaFin(true);
    } else {
      setErrorFechaFin(false);
    }
  }

  // CARD - PRESUPUESTO 
  const [presupuesto, setPresupuesto] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Ingresa solo valores numéricos enteros');

  const validarPresupuesto = (valor) => {
    setPresupuesto(valor);
    const regex = /^0$|^[1-9][0-9]*$/;
    if (valor === '') {
      setError(true);
      setHelperText('Este campo no debe estar vacío');
    } else if (regex.test(valor)) {
      setError(false);
      setHelperText('');
    } else {
      setError(true);
      setHelperText('Ingresa solo valores numéricos enteros');
    }
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <NavBarHome
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <Container maxWidth='lg' className='sm-4'>
        { /* Sección - Header */}
        <Stack direction='row' spacing={1} alignItems='center' className='mb-2' sx={{ marginTop: '30px' }}>
          <MapIcon fontSize='large' sx={{ color: '#E4007C', fontSize: '3rem' }} />
          <Typography variant='h1' className='fw-bold' sx={{ fontSize: '3rem' }}>Generar Itinerario</Typography>
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

            {/* Card - Fechas de inicio y fin del viaje */}
            <Card className='gi-card-fechasViaje'
              sx={{
                width: '100%'
              }}
            >
              <CardHeader
                avatar={
                  <EventNoteIcon sx={{ color: '#E4007C' }} fontSize='medium' />
                }
                title='Fechas de viaje'
                titleTypographyProps={{
                  sx: {
                    fontSize: '1.2rem',
                    fontWeight: 'medium',
                  }
                }}
              />
              <CardContent>

                <Typography className='gi-card-titulo-apartados' sx={{ marginBottom: '30px' }}>
                  Selecciona la fecha de inicio y la fecha de fin de tu viaje.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2} alignItems='flex-start' justifyContent={{ sm: 'center' }} sx={{ marginTop: '0px' }}>

                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>   {/*quitar el dapterLocale si se perciben errores del input (undefined o NaN)*/}
                    { /* Fecha de inicio */}
                    <Stack direction='column' sx={{ width: '100%' }}>
                      <DatePicker
                        sx={{ width: '100%', }}
                        label='Fecha de inicio'
                        minDate={dayjs()} // fecha mínima como hoy
                        value={fechaInicio} // asigna la fecha de hoy por defecto
                        onChange={handleFechaInicioChange} // se actualiza al elegir una nueva fecha
                        format='DD-MM-YYYY'
                        margin='dense'
                      />
                    </Stack>
                    { /* Fecha de fin */}
                    <Stack direction='column' sx={{ width: '100%' }}>
                      <DatePicker
                        sx={{ width: '100%', }}
                        label='Fecha de fin'
                        minDate={fechaInicio} // fecha mínima será la de inicio
                        value={fechaFin}
                        onChange={hanldeFechaFinChange}
                        format='DD-MM-YYYY'
                        margin='dense'
                        slotProps={{
                          textField: {
                            // marca un error si la fecha de fin es antes de la de inicio
                            error: errorFechaFin,
                            helperText: errorFechaFin ? 'Selecciona una fecha de fin válida' : '',
                          }
                        }}
                      />
                    </Stack>

                  </LocalizationProvider>
                </Stack>
              </CardContent>
            </Card>

            { /* Sección - Card Presupuesto / Disposición del presupuesto */}
            <Card className='gi-card-presupuesto'
              sx={{
                width: '100%'
              }}
            >
              <CardHeader
                avatar={
                  <AttachMoneyRoundedIcon sx={{ backgroundColor: '#E4007C', color: '#FFF', borderRadius: '50%' }} />
                }
                title='Presupuesto'
                titleTypographyProps={{
                  sx: {
                    fontSize: '1.2rem',
                    fontWeight: 'medium',
                  }
                }}
              />
              <CardContent>
                { /* Sección - Presupuesto */}
                <Typography sx={{ marginBottom: '20px', justifyContent: 'center', textAlign: 'justify', }} className='gi-card-titulo-apartados'>
                  Para crear un itinerario adaptado a tus necesidades, es importante que ingreses el presupuesto disponible.
                </Typography>

                <Stack spacing={2} direction='row' sx={{ alignItems: 'center', mb: 1 }}>
                  <TextField
                    required
                    disabled={!isFirstEnabled}
                    label='Presupuesto total'
                    value={presupuesto}
                    onChange={(e) => validarPresupuesto(e.target.value)}
                    sx={{ width: '100%' }}
                    // errores
                    helperText={helperText}
                    error={error}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position='start'>$</InputAdornment>
                        ),
                      },
                    }}
                  />
                </Stack>

              </CardContent>

              <CardHeader
                avatar={
                  <TuneIcon sx={{ color: '#E4007C' }} />
                }
                title='Disposición del presupuesto'
                titleTypographyProps={{
                  sx: {
                    fontSize: '1.2rem',
                    fontWeight: 'medium',
                  }
                }}
              />
              { /* Sección - Disposición del presupuesto */}
              <CardContent>
                <Typography sx={{ marginBottom: '20px' }}>
                  Utiliza los controles deslizantes para asignar el porcentaje del total disponible a cada opción según tus preferencias.
                </Typography>

                <Stack sx={{ width: '100%', marginTop: '20px' }} direction='row'>
                  <Stack spacing={2} direction='column' sx={{ marginRight: '15px' }}>
                    {/* Control deslizante - Comida */}
                    <Stack direction='column' sx={{ alignItems: 'center', mb: 1 }}>
                      <RestaurantIcon sx={{ color: '#E4007C' }} />
                      <span>Comida</span>
                    </Stack>
                    { /* Control deslizante - Sitios */}
                    <Stack direction='column' sx={{ alignItems: 'center', mb: 1 }}>
                      <FestivalIcon sx={{ color: '#E4007C' }} />
                      <span>Sitios</span>
                    </Stack>

                  </Stack>

                  <Stack spacing={2} direction='column' width='100%'>
                    {/* Control deslizante - Comida */}
                    <Slider defaultValue={5} min={1} max={10} step={1} aria-label='Comida' valueLabelDisplay='auto' sx={{ color: '#B9E5F7' }} />
                    { /* Control deslizante - Sitios */}
                    <Slider defaultValue={5} min={1} max={10} step={1} aria-label='Sitios' valueLabelDisplay='auto' sx={{ color: '#B9E5F7' }} />
                  </Stack>    

                </Stack>
              </CardContent>
            </Card>
          </Stack>
          { /* Sección - Card Detalles del viaje */}
          <Stack
            direction='column'
            spacing={1}
            alignItems='center'
            sx={{
              width: '100%',
              alignItems: { xs: 'center', sm: 'end' },
              justifyContent: 'flex-start',
              display: 'flex',
              paddingLeft: { xs: 0, md: '1%' }
            }}
          >
            <Card sx={{ width: '100%', }}>
              <CardMedia
                component='img'
                height='200px'
                image={pasaporteImagen}
                background='cover'
                alt='ImagenPasaporte'
                sx={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </Card>
            <Card className='gi-card-detallesViaje'
              sx={{
                width: '100%'
              }}
            >
              <CardHeader
                avatar={
                  <TipsAndUpdatesIcon sx={{ color: '#E4007C' }} />
                }
                title='Detalles del viaje'
                titleTypographyProps={{
                  sx: {
                    fontSize: '1.2rem',
                    fontWeight: 'medium',
                  }
                }}
              />
              <CardContent>
                <Box className='gi-card-detallesViaje-numeroViajantes'>
                  <FormControl fullWidth>
                    {/* ESTABLECES NÚMERO DE VIAJANTES, POR DEFAULT 1 */}
                    <InputLabel id='numero-viajantes-label'>Número de viajantes</InputLabel>
                    <Select
                      labelId='numero-viajantes-label'
                      label='Número de viajantes'
                      value={numeroViajantes}
                      onChange={(event) => setNumeroViajantes(event.target.value)}
                    >
                      {/* Length se puede modificar, de momento son 10 */}
                      {Array.from({ length: 10 }, (_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Typography sx={{ marginBottom: '7px' }}>
                  ¿Alguna consideración especial?
                </Typography>

                <FormGroup>
                  <FormControlLabel className='gi-card-detallesViaje-checkbox' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Lugares para toda la familia' sx={{ marginLeft: 0, marginRight: 0 }} />
                  <FormControlLabel className='gi-card-detallesViaje-checkbox' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Lugares Vegan-Friendly' sx={{ marginLeft: 0, marginRight: 0, }} />
                  <FormControlLabel className='gi-card-detallesViaje-checkbox' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Lugares Pet-Friendly' sx={{ marginLeft: 0, marginRight: 0, }} />
                  <FormControlLabel className='gi-card-detallesViaje-checkbox' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Impedimento físico' sx={{ marginLeft: 0, marginRight: 0, }} />
                </FormGroup>

              </CardContent>
            </Card>
          </Stack>


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
