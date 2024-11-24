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


function Planer({ setSelectedPlace }) {
  // arrays para el formato de la fecha
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const today = new Date(); // fecha actual

  // Encontrar el lunes de la semana actual
  const initialMonday = new Date(today);
  if (today.getDay() !== 1) {
    initialMonday.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
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
  
  // simulacion de un itinerario usando un objeto de javascript
  const itinerario = {
    '23 noviembre 2024': [
      {
        placeTime: '10:00 am',
        placeName: 'Fuente de Tláloc',
        placeDescription: 'Monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia.',
        placeLongDescription: 'La Fuente de Tláloc es un monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia. Se encuentra en la cima del cerro del Chiquihuite, en la alcaldía de Gustavo A. Madero. La fuente fue construida en 1951 por el arquitecto Luis Leduc y el escultor Jesús Fructuoso Contreras. La escultura de Tláloc mide 22 metros de altura y está hecha de concreto recubierto de piedra volcánica. La fuente es un símbolo de la cultura prehispánica y de la importancia del agua en la vida de los mexicanos.',
        placeThings: ['Arte moderno', 'Historia prehispánica', 'Jardines hermosos'],
        placeOpenHour: '8:00 am',
        placeCloseHour: '6:00 pm',
        placeAddress: 'Cerro del Chiquihuite, Gustavo A. Madero, Ciudad de México.',
        placePhone: '55 1234 5678',
        placeImages: [Imagen1, Imagen2, Imagen3],
        placeRating: 4,
        finalItem: false
      },
      {
        placeTime: '11:00 am',
        placeName: 'Casa de León',
        placeDescription: 'Museo en la Ciudad de México que fue hogar de León Trotsky.',
        placeLongDescription: 'La Casa de León es un museo en la Ciudad de México que fue hogar de León Trotsky. El museo se encuentra en la colonia Del Carmen, en la alcaldía de Coyoacán. La casa fue adquirida por el gobierno mexicano en 1982 y convertida en museo en 1990. En el museo se pueden ver objetos personales de Trotsky, así como exposiciones sobre la historia de la Revolución Rusa y la lucha obrera en México. El museo también cuenta con jardines hermosos que invitan a la reflexión y al descanso.',
        placeThings: ['Arte moderno', 'Historia revolucionaria', 'Jardines hermosos'],
        placeOpenHour: '7:00 am',
        placeCloseHour: '6:00 pm',
        placeAddress: 'Río Churubusco 410, Del Carmen, Coyoacán, Ciudad de México.',
        placePhone: '55 8765 4321',
        placeImages: [Imagen2, Imagen4, Imagen3],
        placeRating: 3,
        finalItem: false
      },
      {
        placeTime: '12:00 pm',
        placeName: 'Palacio Postal',
        placeDescription: 'Edificio de estilo ecléctico que alberga Correos de México.',
        placeLongDescription: 'El Palacio Postal es un edificio de estilo ecléctico en la Ciudad de México que alberga la sede de Correos de México. El edificio fue construido entre 1902 y 1907 por el arquitecto italiano Adamo Boari. El Palacio Postal es uno de los edificios más emblemáticos de la Ciudad de México y es famoso por su arquitectura y decoración. En su interior se pueden ver murales, vitrales y esculturas que representan la historia de la comunicación y el correo en México.',
        placeThings: ['Arquitectura colonial', 'Historia postal'],
        placeOpenHour: '9:00 am',
        placeCloseHour: '5:00 pm',
        placeAddress: 'Tacuba 1, Centro Histórico, Ciudad de México.',
        placePhone: '55 2468 1357',
        placeImages: [Imagen3, Imagen1, Imagen5],
        placeRating: 5,
        finalItem: false
      },
      {
        placeTime: '2:00 pm',
        placeName: 'Pirámides de Teotihuacán',
        placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
        placeLongDescription: 'Las Pirámides de Teotihuacán son un sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides. Teotihuacán fue una de las ciudades más grandes de Mesoamérica y su nombre significa "lugar donde los dioses nacen". En el sitio se pueden ver las pirámides del Sol y de la Luna, así como la Calzada de los Muertos y los templos de Quetzalcóatl y de los Jaguares. Teotihuacán es un lugar sagrado para los mexicas y un importante centro ceremonial y político en la época prehispánica.',
        placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
        placeOpenHour: '8:00 am',
        placeCloseHour: '5:00 pm',
        placeAddress: 'San Juan Teotihuacán, Estado de México.',
        placePhone: '55 9876 5432',
        placeImages: [Imagen5, Imagen2, Imagen1],
        placeRating: 5,
        finalItem: true
      }
    ],
    '24 noviembre 2024': [
      {
        placeTime: '11:00 am',
        placeName: 'Pirámides de Teotihuacán',
        placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
        placeLongDescription: 'Las Pirámides de Teotihuacán son un sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides. Teotihuacán fue una de las ciudades más grandes de Mesoamérica y su nombre significa "lugar donde los dioses nacen". En el sitio se pueden ver las pirámides del Sol y de la Luna, así como la Calzada de los Muertos y los templos de Quetzalcóatl y de los Jaguares. Teotihuacán es un lugar sagrado para los mexicas y un importante centro ceremonial y político en la época prehispánica.',
        placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
        placeOpenHour: '8:00 am',
        placeCloseHour: '5:00 pm',
        placeAddress: 'San Juan Teotihuacán, Estado de México.',
        placePhone: '55 9876 5432',
        placeImages: [Imagen5, Imagen2, Imagen1],
        placeRating: 5,
        finalItem: false
      },
      {
        placeTime: '11:00 am',
        placeName: 'Casa de León',
        placeDescription: 'Museo en la Ciudad de México que fue hogar de León Trotsky.',
        placeLongDescription: 'La Casa de León es un museo en la Ciudad de México que fue hogar de León Trotsky. El museo se encuentra en la colonia Del Carmen, en la alcaldía de Coyoacán. La casa fue adquirida por el gobierno mexicano en 1982 y convertida en museo en 1990. En el museo se pueden ver objetos personales de Trotsky, así como exposiciones sobre la historia de la Revolución Rusa y la lucha obrera en México. El museo también cuenta con jardines hermosos que invitan a la reflexión y al descanso.',
        placeThings: ['Arte moderno', 'Historia revolucionaria', 'Jardines hermosos'],
        placeOpenHour: '7:00 am',
        placeCloseHour: '6:00 pm',
        placeAddress: 'Río Churubusco 410, Del Carmen, Coyoacán, Ciudad de México.',
        placePhone: '55 8765 4321',
        placeImages: [Imagen4, Imagen2, Imagen3],
        placeRating: 3,
        finalItem: false
      },
      {
        placeTime: '12:00 pm',
        placeName: 'Palacio Postal',
        placeDescription: 'Edificio de estilo ecléctico que alberga Correos de México.',
        placeLongDescription: 'El Palacio Postal es un edificio de estilo ecléctico en la Ciudad de México que alberga la sede de Correos de México. El edificio fue construido entre 1902 y 1907 por el arquitecto italiano Adamo Boari. El Palacio Postal es uno de los edificios más emblemáticos de la Ciudad de México y es famoso por su arquitectura y decoración. En su interior se pueden ver murales, vitrales y esculturas que representan la historia de la comunicación y el correo en México.',
        placeThings: ['Arquitectura colonial', 'Historia postal'],
        placeOpenHour: '9:00 am',
        placeCloseHour: '5:00 pm',
        placeAddress: 'Tacuba 1, Centro Histórico, Ciudad de México.',
        placePhone: '55 2468 1357',
        placeImages: [Imagen1, Imagen1, Imagen5],
        placeRating: 5,
        finalItem: true
      }
    ],
    '25 noviembre 2024': [
      {
        placeTime: '11:00 am',
        placeName: 'Pirámides de Teotihuacán',
        placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
        placeLongDescription: 'Las Pirámides de Teotihuacán son un sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides. Teotihuacán fue una de las ciudades más grandes de Mesoamérica y su nombre significa "lugar donde los dioses nacen". En el sitio se pueden ver las pirámides del Sol y de la Luna, así como la Calzada de los Muertos y los templos de Quetzalcóatl y de los Jaguares. Teotihuacán es un lugar sagrado para los mexicas y un importante centro ceremonial y político en la época prehispánica.',
        placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
        placeOpenHour: '8:00 am',
        placeCloseHour: '5:00 pm',
        placeAddress: 'San Juan Teotihuacán, Estado de México.',
        placePhone: '55 9876 5432',
        placeImages: [Imagen5, Imagen2, Imagen1],
        placeRating: 5,
        finalItem: false
      },
      {
        placeTime: '1:00 pm',
        placeName: 'Fuente de Tláloc',
        placeDescription: 'Monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia.',
        placeLongDescription: 'La Fuente de Tláloc es un monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia. Se encuentra en la cima del cerro del Chiquihuite, en la alcaldía de Gustavo A. Madero. La fuente fue construida en 1951 por el arquitecto Luis Leduc y el escultor Jesús Fructuoso Contreras. La escultura de Tláloc mide 22 metros de altura y está hecha de concreto recubierto de piedra volcánica. La fuente es un símbolo de la cultura prehispánica y de la importancia del agua en la vida de los mexicanos.',
        placeThings: ['Arte moderno', 'Historia prehispánica', 'Jardines hermosos'],
        placeOpenHour: '8:00 am',
        placeCloseHour: '6:00 pm',
        placeAddress: 'Cerro del Chiquihuite, Gustavo A. Madero, Ciudad de México.',
        placePhone: '55 1234 5678',
        placeImages: [Imagen1, Imagen2, Imagen3],
        placeRating: 4,
        finalItem: true
      }
    ],
  }

  // state para el dia seleccionado en la barra de dias
  // se inicializa con el dia ACTUAL si este forma parte del itinerario, de lo contrario se selecciona el primer dia del itinerario
  const actualDay = today.getDate() + ' ' + months[today.getMonth()] + ' ' + today.getFullYear(); //nn mes 202x
  const initialSelectedDay = (actualDay in itinerario) ? actualDay : Object.keys(itinerario)[0];
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay);

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
              day.setDate(monday.getDate() + i);  // se recorre a partir del lunes obtenido

              const dayInItinerary = (day.getDate() + ' ' + months[day.getMonth()] + ' ' + day.getFullYear()) in itinerario;
              const dayFormatted = `${day.getDate()} ${months[day.getMonth()]} ${day.getFullYear()}`;

              // verificar condiciones para determinar la apariencia de los botones de los días
              let dayStyle = 'fw-light';
              if (dayFormatted === actualDay) dayStyle += ' planer-dot-day-today';  // clase para el dia actual
              if (dayFormatted === selectedDay) dayStyle += ' planer-dot-day-selected fw-medium'; // clase para el dia que seleccione el usuario
              if (dayInItinerary) dayStyle += ' planer-dot-day-enabled';  // clase para los dias que forman parte del itinerario
              else dayStyle += ' planer-dot-day-disabled';  // clase para los dias que no forman parte del itinerario

              return (
                <IconButton key={i} onClick={() => setSelectedDay(dayFormatted)} disabled={!dayInItinerary}>
                  <Typography
                    fontFamily={'poppins'}
                    color='dark'
                    className={dayStyle}
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
          <Typography fontFamily={'poppins'} className='fw-normal it_pa-format-day-selected' sx={{ fontSize: '1.5rem' }}>
            {/* Fecha seleccionada en la barra de días en formato de texto */}
            {daysOfWeek[new Date(selectedDay).getDay()]}, {selectedDay}
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
