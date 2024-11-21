import React from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// estilos
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/GenerarItinerario.css';
import ButtonsMod from '../components/ButtonsMod';

import { Container, Stack, Card, Typography, CardHeader, CardContent, Select, MenuItem, CardMedia } from '@mui/material';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Box, Slider, TextField, Button, InputLabel } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
// ÍCONOS
import { Map as MapIcon, EventNote as EventNoteIcon, TipsAndUpdates as TipsAndUpdatesIcon, Tune as TuneIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon} from '@mui/icons-material';
import { Restaurant as RestaurantIcon, Festival as FestivalIcon, CheckBox as CheckBoxIcon, AttachMoneyRounded as AttachMoneyRoundedIcon} from '@mui/icons-material';
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
    if(presupuesto === '') {
      setError(true);
      setHelperText('Este campo no debe estar vacío');
      return;
    }
    const regex = /^[1-9][0-9]*$/;
    if (!regex.test(presupuesto)) {
      setError(true);
      setHelperText('Ingresa solo valores numéricos enteros');
      return; 
    }
      navigate('/Categorias-page');
   };

  // CARD - FECHA DE INICIO Y FIN **POR DEFECTO SE LLENA CON LA FECHA DE HOY
  const [fechaInicio, setFechaInicio] = useState(dayjs());
  const [fechaFin, setFechaFin] = useState(dayjs());

  // CARD - PRESUPUESTO 
  const [presupuesto, setPresupuesto] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Ingresa solo valores numéricos enteros');

  const validarPresupuesto = (valor) => {
    setPresupuesto(valor);
    const regex = /^[1-9][0-9]*$/;
    if(valor === '') { 
      setError(true);
      setHelperText('Este campo no debe estar vacío');
    } else if(regex.test(valor)) {
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
        <Stack direction='row' spacing={1} alignItems='center' className='mb-2' sx={{marginTop: '30px'}}>
          <MapIcon fontSize='large' sx={{ color: '#E4007C'}} className='map-icon-itinerario' />
          <h1 className='fw-bold h1-itinerario-title'>Generar Itinerario</h1>
        </Stack>

        <Typography sx={{ marginBottom: '7px' }}>
          Para mejorar su experiencia, necesitamos algunos detalles de su viaje.
        </Typography>


        <Stack direction={{ xs: 'column', md: 'row' }}
          spacing={1}
          className='content-generarItinerario'
          sx={{
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <Stack
            direction='column'
            spacing={1}
            alignItems='center'
            className='mb-2'
            sx={{
              width: {xs: '95%', sm: '100%'},
              paddingRight: { xs: 0, md: '1%' }
            }}
          >

            {/* CARD - FECHA DE INICIO Y FIN DEL VIAJE */}
            <Card className='card-fechaViaje-generarItinerario'
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
                <Typography sx={{ marginBottom: '30px' }} className='subtitulos-generarItinerario'>
                    Selecciona la fecha de inicio y la fecha de fin de tu viaje.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2} alignItems='center' justifyContent={{ sm: 'center' }} sx={{ marginTop: '0px' }}>
                  { /* AQUÍ SE SELECCIONA LA FECHA DE INICIO Y FIN */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction='column' sx={{ width: '100%' }}>
                      <DatePicker
                        sx={{ width: '100%', }}
                        label='Fecha de inicio'
                        minDate={dayjs()} // fecha mínima como hoy
                        value={fechaInicio} // asigna la fecha de hoy por defecto
                        onChange={(newValue) => setFechaInicio(newValue)} // se actualiza al elegir una nueva fecha
                        format='DD-MM-YYYY'
                        margin='dense'
                      />
                    </Stack>
                    <Stack direction='column' sx={{ width: '100%' }}>
                      <DatePicker
                        sx={{ width: '100%', }}
                        label='Fecha de fin'
                        minDate={fechaInicio} // fecha mínima será la de inicio
                        value={fechaFin}
                        onChange={(newValue => setFechaFin(newValue))}
                        format='DD-MM-YYYY'
                        margin='dense'
                      />
                    </Stack>

                  </LocalizationProvider>
                </Stack>
              </CardContent>
            </Card>
            
            { /* CARD PRESUPUESTO / DISPOSICIÓN DEL PRESUPUESTO */}
            <Card className='card-presupuesto-generarItinerario'
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
                <Typography sx={{ marginBottom: '20px', justifyContent: 'center', textAlign: 'justify',}} className='subtitulos-generarItinerario'>
                  Para crear un itinerario adaptado a tus necesidades, es importante que ingreses el presupuesto disponible.
                </Typography>
                {/* VALIDACIONES PARA PRESUPUESTO */}
                <Stack spacing={2} direction='row' sx={{ alignItems: 'center', mb: 1 }}>
                    <TextField
                      disabled={!isFirstEnabled}
                      label='Presupuesto total'
                      placeholder='$'
                      value={presupuesto}
                      onChange={(e) => validarPresupuesto(e.target.value)}
                      // errores
                      helperText={helperText}
                      error={error}
                    />
                </Stack>

              </CardContent>

              <CardHeader
                  avatar={
                    <TuneIcon sx={{ color: '#E4007C'}} />
                  }
                  title='Disposición del presupuesto'
                  titleTypographyProps={{
                    sx: {
                      fontSize: '1.2rem',
                      fontWeight: 'medium',
                    }
                  }}
              />
              <CardContent>
                <Typography sx={{ marginBottom: '20px' }}>
                  Utiliza los controles deslizantes para asignar el porcentaje del total disponible a cada opción según tus preferencias.
                </Typography>
                <Box sx={{ width: '100%', marginTop: '20px' }}>

                  <Stack spacing={2} direction='row' sx={{ alignItems: 'center', mb: 1 }}>
                    <Stack direction='column' sx={{ alignItems: 'center', mb: 1 }}>
                      <RestaurantIcon sx={{ color: '#E4007C' }} />
                      <span>Comida</span>
                    </Stack>

                    <Slider defaultValue={50} aria-label='Default' valueLabelDisplay='auto' sx={{ color: '#B9E5F7' }} />
                  </Stack>

                  <Stack spacing={2} direction='row' sx={{ alignItems: 'center', mb: 1 }}>
                    <Stack direction='column' sx={{ alignItems: 'center', mb: 1 }}>
                      <FestivalIcon sx={{ color: '#E4007C' }} />
                      <span>Sitios</span>
                    </Stack>

                    <Slider defaultValue={50} aria-label='Default' valueLabelDisplay='auto' sx={{ color: '#B9E5F7' }} />
                  </Stack>

                </Box>
              </CardContent>
            </Card>
          </Stack>

          <Stack 
            direction='column'
            spacing={1}
            alignItems='center'
            sx={{
              width: {xs: '95%', sm: '100%'}, 
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
                {/* CARD - DETALLES DEL VIAJE --> NÚMERO DE VIAJANTES / CONSIDERACIONES */}
                <Card className='card-consideraciones-generarItinerario'
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
                    <div className='numero-viajantes'>
                      <FormControl fullWidth>
                        {/* ESTABLECES NÚMERO DE VIAJANTES, POR DEFAULT 1 */}
                      <InputLabel id='numero-viajantes-label'>Número de viajantes</InputLabel>
                        <Select
                          labelId='numero-viajantes-label'
                          label='Número de viajantes'
                          value={numeroViajantes}
                          onChange={(event) => setNumeroViajantes(event.target.value)}
                        >
                          {Array.from({ length: 10 }, (_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                              {i + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <Typography sx={{ marginBottom: '7px' }}>
                      ¿Alguna consideración especial?
                    </Typography>

                    <FormGroup>
                      <FormControlLabel className='checkbox-consideraciones' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Lugares para toda la familia' sx={{marginLeft: 0, marginRight: 0}}/>
                      <FormControlLabel className='checkbox-consideraciones' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Lugares Vegan-Friendly' sx={{marginLeft: 0, marginRight: 0,}}/>
                      <FormControlLabel className='checkbox-consideraciones' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Lugares Pet-Friendly' sx={{marginLeft: 0, marginRight: 0,}}/>
                      <FormControlLabel className='checkbox-consideraciones' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Impedimento físico' sx={{marginLeft: 0, marginRight: 0,}}/>
                    </FormGroup>

                  </CardContent>
                </Card>
          </Stack>

          
        </Stack>
        <div className='btn-generarItinerario'>
          <ButtonsMod
            variant='principal'
            textCont='Continuar'
            clickEvent={handleClick}
          />
        </div>

      </Container>


      <Footer
        showIncorporaLugar={false} />
    </ThemeProvider>
  );
};

export default GenerarItinerario;
