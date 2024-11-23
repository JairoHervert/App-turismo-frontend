// componentes online
import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

// timeline
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import { timelineOppositeContentClasses, } from '@mui/lab/TimelineOppositeContent';
import PlaceTimeLine from '../../components/itinerary/PlaceItemTimeline';


// iconos
import { KeyboardArrowLeftRounded as LeftRow, KeyboardArrowRightRounded as RightRow } from '@mui/icons-material';

// estilos
import ThemeMaterialUI from '../ThemeMaterialUI';
import '../../css/ItineraryPage.css';

// imaagenes de prueba
import Imagen1 from '../../img/PlacePage/place-img-fuentetlaloc.jpg';
import Imagen2 from '../../img/PlacePage/place-img-casadeleon.jpg';
import Imagen3 from '../../img/PlacePage/place-img-palaciopostal.jpg';
import Imagen4 from '../../img/PlacePage/place-img-cafeterias.jpg';
import Imagen5 from '../../img/piramides-teotihuacan.webp';


function Planer() {
  // obtencion del dia actual y mes en formato de texto
  const daysOfWeek = ['domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const today = new Date(); // fecha actual

  // Enconrar el lunes de la semana actual
  const initialMonday = new Date(today);
  if (today.getDay() !== 1) {
    initialMonday.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    //console.log(monday.getDate());  // lunes anterior de la semana, para iniciar la barra de dias
  }

  // state pra la fecha del lunes de la semana
  const [monday, setMonday] = useState(initialMonday);

  // Manejar la navegación a la semana anterior
  const handlePreviousWeek = () => {
    const previousMonday = new Date(monday);
    previousMonday.setDate(monday.getDate() - 7);
    setMonday(previousMonday);
  };

  // Manejar la navegación a la semana siguiente
  const handleNextWeek = () => {
    const nextMonday = new Date(monday);
    nextMonday.setDate(monday.getDate() + 7);
    setMonday(nextMonday);
  };


  // simulacion de un itinerario de 4 dias usando un objeto de javascript
  const itinerario = {
    '23 noviembre 2024': [
      {
        placeTime: '10:00 am',
        placeName: 'Cafeterías',
        placeDescription: 'Disfruta de un café en las icónicas cafeterías de la Ciudad de México.',
        placeThings: ['Ambiente tranquilo', 'Buena música'],
        placeImage: Imagen4,
        placeRating: 4,
        finalItem: false
      },
      {
        placeTime: '11:00 am',
        placeName: 'Casa de León',
        placeDescription: 'Museo en la Ciudad de México que fue hogar de León Trotsky.',
        placeThings: ['Arte moderno', 'Historia revolucionaria', 'Jardines hermosos'],
        placeImage: Imagen2,
        placeRating: 3,
        finalItem: false
      },
      {
        placeTime: '12:00 pm',
        placeName: 'Palacio Postal',
        placeDescription: 'Edificio de estilo ecléctico que alberga Correos de México.',
        placeThings: ['Arquitectura colonial', 'Historia postal'],
        placeImage: Imagen3,
        placeRating: 5,
        finalItem: false
      },
      {
        placeTime: '2:00 pm',
        placeName: 'Pirámides de Teotihuacán',
        placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
        placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
        placeImage: Imagen5,
        placeRating: 5,
        finalItem: true
      }
    ],
    '24 noviembre 2024': [
      {
        placeTime: '10:00 am',
        placeName: 'Cafeterías',
        placeDescription: 'Disfruta de un café en las icónicas cafeterías de la Ciudad de México.',
        placeThings: ['Ambiente tranquilo', 'Buena música'],
        placeImage: Imagen4,
        placeRating: 4,
        finalItem: false
      },
      {
        placeTime: '11:00 am',
        placeName: 'Casa de León',
        placeDescription: 'Museo en la Ciudad de México que fue hogar de León Trotsky.',
        placeThings: ['Arte moderno', 'Historia revolucionaria', 'Jardines hermosos'],
        placeImage: Imagen2,
        placeRating: 3,
        finalItem: false
      }
    ],
  }

  console.log(itinerario.lenght);

  console.log(itinerario['24 noviembre 24']);



  return (
    <ThemeProvider theme={ThemeMaterialUI}>

      <Box className='mx-4 d-flex flex-column align-items-start'>

        {/* Contenido de la pestaña 'Plan' */}
        <Box className='d-flex align-items-center'>
          <IconButton color='black' aria-label='left arrow' onClick={handlePreviousWeek}>
            <LeftRow sx={{ fontSize: '2.2rem' }} />
          </IconButton>

          {/* Barra de días en semana */}
          <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>L</Typography>

          <Box className='d-flex mx-2'>
            {/* Días de la semana a partir del lunes encontrado en la variable monday */}
            {[...Array(7).keys()].map((i) => {
              const day = new Date(monday);
              day.setDate(monday.getDate() + i);
              console.log(day.getDate() + ' ' + months[day.getMonth()] + ' ' + day.getFullYear());

              let dayInItinerary = (day.getDate() + ' ' + months[day.getMonth()] + ' ' + day.getFullYear()) in itinerario;

              return (
                <IconButton key={i}>
                  <Typography
                    fontFamily={'poppins'}
                    color='dark'
                    className={`fw-light ${dayInItinerary ? 'planer-dot-day-enabled' : 'planer-dot-day-disabled'}`}
                  >
                    {day.getDate()}
                  </Typography>
                </IconButton>
              );
            })}
          </Box>

          <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>D</Typography>

          <IconButton color='black' aria-label='right arrow' onClick={handleNextWeek}>
            <RightRow sx={{ fontSize: '2.2rem' }} />
          </IconButton>
        </Box> {/* Cierre de Box que aloja los botones de flecha y los días de la semana */}

        <Box className='ms-2 mt-4'>
          <Typography fontFamily={'poppins'} className='fw-normal' sx={{ fontSize: '1.5rem' }}>
            {/* Fecha actual en formato de texto */}
            {daysOfWeek[today.getDay()]}, {today.getDate()} de {months[today.getMonth()]} del {today.getFullYear()}
          </Typography>
        </Box>  {/* Cierre de Box que aloja el dia de la semana */}


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
            {itinerario['23 noviembre 2024'].map((place, index) => (
              <PlaceTimeLine
                key={index}
                placeTime={place.placeTime}
                placeName={place.placeName}
                placeDescription={place.placeDescription}
                placeThings={place.placeThings}
                placeImage={place.placeImage}
                placeRating={place.placeRating}
                finalItem={place.finalItem}
              />
            ))}

          </Timeline>
        </Box>



      </Box>
    </ThemeProvider>
  );
}

export default Planer;
