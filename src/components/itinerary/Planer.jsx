// componentes online
import { Box, IconButton, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

// timeline
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import {timelineOppositeContentClasses,} from '@mui/lab/TimelineOppositeContent';
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

  // si el dia actual no es lunes encontrar el lunes de esa semana
  const monday = new Date(today);
  if (today.getDay() !== 1) {
    monday.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    //console.log(monday.getDate());  // lunes anterior de la semana, para iniciar la barra de dias
  }

  return (
    <ThemeProvider theme={ThemeMaterialUI}>

      <Box className='mx-4 d-flex flex-column align-items-start'>

        {/* Contenido de la pestaña 'Plan' */}
        <Box className='d-flex align-items-center'>
          <IconButton color='black' aria-label='left arrow'>
            <LeftRow sx={{ fontSize: '2.2rem' }} />
          </IconButton>
          <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>L</Typography>

          {/* Barra de días en semana, corregirlo para que se genere a partir de un dia de inicio y fin */}
          <Box className='d-flex mx-2'>
            { /* Días de la semana a partir del lunes encontrado en la variable monday*/
              [...Array(7).keys()].map((i) => {
                const day = new Date(monday);
                day.setDate(monday.getDate() + i);
                return (
                  <IconButton key={i}>
                    <Typography fontFamily={'poppins'} color='dark' className='fw-light planer-dot-day-enabled'>{day.getDate()}</Typography>
                  </IconButton>
                );
              })
            }
          </Box> {/* Cierre de Box que aloja los días de la semana */}
          <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>D</Typography>

          <IconButton color='black' aria-label='right arrow'>
            <RightRow sx={{ fontSize: '2.2rem' }} />
          </IconButton>
        </Box> {/* Cierre de Box que aloja los botones de flecha y los días de la semana */}

        <Box className='ms-2 mt-4'>
          <Typography fontFamily={'poppins'} className='fw-normal' sx={{ fontSize: '1.5rem' }}>
            {/* Fecha actual en formato de texto */}
            {daysOfWeek[today.getDay()]}, {today.getDate()} de {months[today.getMonth()]} del {today.getFullYear()}
          </Typography>
        </Box>  {/* Cierre de Box que aloja el dia de la semana */}


        <Box className='my-4' sx={{width:'100%'}}>
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
            <PlaceTimeLine
              finalItem={false}
              placeTime={'10:00 am'}
              placeImage={Imagen4}
              placeName='Cafeterías'
              placeDescription='Disfruta de un café en las icónicas cafeterías de la Ciudad de México.'
              placeThings={['Ambiente tranquilo', 'Buena música']}
            />

            <PlaceTimeLine
              finalItem={false}
              placeTime={'11:00 am'}
              placeImage={Imagen2}
              placeName='Casa de León'
              placeDescription='Museo en la Ciudad de México que fue hogar de León Trotsky.'
              placeThings={['Arte moderno', 'Historia revolucionaria', 'Jardines hermosos']}
            />

            <PlaceTimeLine
              finalItem={false}
              placeTime={'12:00 pm'}
              placeImage={Imagen3}
              placeName='Palacio Postal'
              placeDescription='Edificio de estilo ecléctico que alberga Correos de México.'
              placeThings={['Arquitectura colonial', 'Historia postal']}
            />

            <PlaceTimeLine
              finalItem={true}
              placeTime={'2:00 pm'}
              placeImage={Imagen5}
              placeName='Pirámides de Teotihuacán'
              placeDescription='Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.'
              placeThings={['Construcciones antiguas', 'Cultura prehispánica']}
            />

          </Timeline>
        </Box>



      </Box>
    </ThemeProvider>
  );
}

export default Planer;
