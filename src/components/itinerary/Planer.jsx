// componentes online
import { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// timeline
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import { timelineOppositeContentClasses, } from '@mui/lab/TimelineOppositeContent';
import PlaceTimeLine from '../../components/itinerary/PlaceItemTimeline';

// datePicker
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// iconos
import { KeyboardArrowLeftRounded as LeftRow, KeyboardArrowRightRounded as RightRow } from '@mui/icons-material';

// estilos
import ThemeMaterialUI from '../ThemeMaterialUI';
import '../../css/ItineraryPage.css';

// itinerario de prueba
import itinerario from './ItinerariosDePrueba/Itinerario2';


function Planer({ setSelectedPlace }) {

  // arrays para el formato de la fecha
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // Encontrar el lunes de la semana actual mediante una funcion
  const searchMonday = (date) => {
    let day = dayjs(date);
    if (day.day() !== 1) {
      day = day.subtract(day.day() === 0 ? 6 : day.day() - 1, 'day');
    }
    return day;
  };

  const today = dayjs();
  const initialMonday = searchMonday(today);

  // state para la fecha del lunes de la semana
  const [monday, setMonday] = useState(initialMonday);
  const todayFormatted = today.format('DD-MM-YYYY');

  // state para el dia seleccionado en la barra de dias
  const initialSelectedDay = itinerario[todayFormatted] ? todayFormatted : Object.keys(itinerario)[0];
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay);
  console.log('selectedDay: ' + selectedDay);

  // Actualiza la semana mostrada según el día seleccionado
  useEffect(() => {
    setMonday(searchMonday(dayjs(selectedDay, 'DD-MM-YYYY')));
  }, [selectedDay]);

  // Función para deshabilitar fechas que no están en el itinerario
  const shouldDisableDate = (date) => {
    const formattedDate = date.format('DD-MM-YYYY');
    return !(formattedDate in itinerario);
  };

  // Manejar la navegación a la semana anterior
  const handlePreviousWeek = () => {
    const previousMonday = monday.subtract(7, 'day');
    setMonday(previousMonday);
  };

  // Manejar la navegación a la semana siguiente
  const handleNextWeek = () => {
    const nextMonday = monday.add(7, 'day');
    setMonday(nextMonday);
  };


  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className='mx-4 d-flex flex-column align-items-start'>

        {/* Contenido de la pestaña 'Plan' */}
        <Box className='d-flex'>
          <Box className='it_pa-week-days'>
            <IconButton color='black' aria-label='left arrow' onClick={handlePreviousWeek}>
              <LeftRow sx={{ fontSize: '2.2rem' }} />
            </IconButton>

            {/* Barra de días en semana */}
            <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>L</Typography>

            <Box className='d-flex mx-2'>
              {/* Días de la semana a partir del lunes encontrado en la variable monday */}
              {[...Array(7).keys()].map((i) => {
                const day = monday.add(i, 'day');
                const dayFormatted = day.format('DD-MM-YYYY');

                //console.log('dayFormatted: ' + dayFormatted);
                const dayInItinerary = dayFormatted in itinerario;

                // verificar condiciones para determinar la apariencia de los botones de los días
                let dayStyle = 'fw-light';
                if (dayFormatted === today.format('DD-MM-YYYY')) dayStyle += ' planer-dot-day-today';
                if (dayFormatted === selectedDay) dayStyle += ' planer-dot-day-selected fw-medium';
                if (dayInItinerary) dayStyle += ' planer-dot-day-enabled';
                else dayStyle += ' planer-dot-day-disabled';

                return (
                  <IconButton key={i} onClick={() => setSelectedDay(dayFormatted)} disabled={!dayInItinerary}>
                    <Typography
                      fontFamily={'poppins'}
                      color='dark'
                      className={dayStyle}
                    >
                      {day.date()}
                    </Typography>
                  </IconButton>
                );
              })}
            </Box>

            <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>D</Typography>

            <IconButton color='black' aria-label='right arrow' onClick={handleNextWeek}>
              <RightRow sx={{ fontSize: '2.2rem' }} />
            </IconButton>
          </Box>

          <Box className='mx-3 d-flex it_pa-datepicker-container'>
            {/* DatePicker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className='it_pa-datepicker'
                label='Consulta por fecha'
                slotProps={{
                  textField: {
                    readOnly: true,  // Esto evita que se pueda escribir directamente en el campo
                    helperText: 'Selecciona una fecha',
                  }
                }}
                value={dayjs(selectedDay, 'DD-MM-YYYY')}
                shouldDisableDate={shouldDisableDate}
                onChange={(newValue) => {
                  const formattedDate = newValue.format('DD-MM-YYYY');
                  setSelectedDay(formattedDate);
                  setMonday(searchMonday(newValue));
                }}
              />
            </LocalizationProvider>

          </Box>

        </Box> {/* Cierre de Box que aloja los botones de flecha y los días de la semana */}


        <Box className='ms-2 mt-4'>
          <Typography fontFamily={'poppins'} className='fw-normal it_pa-format-day-selected' sx={{ fontSize: '1.5rem' }}>
            {daysOfWeek[dayjs(selectedDay, 'DD-MM-YYYY').day()]}, {dayjs(selectedDay, 'DD-MM-YYYY').format('DD')} de {months[dayjs(selectedDay, 'DD-MM-YYYY').month()]} de {dayjs(selectedDay, 'DD-MM-YYYY').format('YYYY')}
          </Typography>
        </Box>

        <Box className='my-4' sx={{ width: '100%' }}>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
              overflowY: 'auto',
              maxHeight: '80vh',
              margin: 0,
              padding: 0,
            }}
          >

            {/* Iteración de los lugares del itinerario, segun el dia que se le pase */}
            {itinerario[selectedDay]?.map((place, index) => (
              <PlaceTimeLine
                key={index}
                placeTime={place.placeTime}
                placeName={place.placeName}
                placeDescription={place.placeDescription}
                placeThings={place.placeThings}
                placeImages={place.placeImages}
                placeRating={place.placeRating}
                finalItem={place.finalItem}
                obtainPlace={() => {
                  //console.log(`Lugar seleccionado: ${place.placeName}`);
                  setSelectedPlace(place);
                }}

              />
            ))}
          </Timeline>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Planer;
