import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Timeline from '@mui/lab/Timeline';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import PlaceItemTimeline from './PlaceItemTimeline';
import ThemeMaterialUI from '../ThemeMaterialUI';
import LeftRow from '@mui/icons-material/ArrowBackIos';
import RightRow from '@mui/icons-material/ArrowForwardIos';
// imágenes de prueba
import Imagen1 from '../../img/PlacePage/place-img-fuentetlaloc.jpg';
import Imagen2 from '../../img/PlacePage/place-img-casadeleon.jpg';
import Imagen3 from '../../img/PlacePage/place-img-palaciopostal.jpg';
import Imagen4 from '../../img/PlacePage/place-img-cafeterias.jpg';
import Imagen5 from '../../img/piramides-teotihuacan.webp';

function Planer({ onPlaceClick, itineraryDays }) {
  const daysOfWeek = ['domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const today = new Date();
  const monday = new Date(today);
  if (today.getDay() !== 1) {
    monday.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
  }

  const [startDay, setStartDay] = useState(monday);
  const [selectedDay, setSelectedDay] = useState(null);

  const itinerary = {
    '2024-11-17': [
      {
        placeTime: '10:00 am',
        placeImage: Imagen4,
        placeName: 'Cafeterías',
        placeDescription: 'Disfruta de un café en las icónicas cafeterías de la Ciudad de México.',
        placeLongDescription: 'Las cafeterías de la Ciudad de México son conocidas por su ambiente acogedor y su excelente café. Puedes disfrutar de una variedad de bebidas y pasteles mientras te relajas en un entorno tranquilo. Muchas cafeterías también ofrecen música en vivo y eventos especiales.',
        placeThings: ['Ambiente tranquilo', 'Buena música'],
        placeAddress: 'Calle Falsa 123, Ciudad de México',
        placeRating: 4.5,
        placeImages: [Imagen1, Imagen2, Imagen3, Imagen4]
      },
      {
        placeTime: '11:00 am',
        placeImage: Imagen2,
        placeName: 'Casa de León',
        placeDescription: 'Museo en la Ciudad de México que fue hogar de León Trotsky.',
        placeLongDescription: 'La Casa de León Trotsky es un museo en la Ciudad de México que fue el hogar del revolucionario ruso León Trotsky. El museo ofrece una visión fascinante de la vida y obra de Trotsky, así como de la historia de la revolución rusa. Los visitantes pueden explorar la casa y los jardines, y aprender más sobre la vida de Trotsky a través de exposiciones y eventos especiales.',
        placeThings: ['Arte moderno', 'Historia revolucionaria', 'Jardines hermosos'],
        placeAddress: 'Calle Real 456, Ciudad de México',
        placeRating: 4.7,
        placeImages: [Imagen1, Imagen2, Imagen3, Imagen4]
      }
    ],
    '2024-11-18': [
      {
        placeTime: '12:00 pm',
        placeImage: Imagen3,
        placeName: 'Palacio Postal',
        placeDescription: 'Edificio de estilo ecléctico que alberga Correos de México.',
        placeLongDescription: 'El Palacio Postal es un edificio de estilo ecléctico en la Ciudad de México que alberga Correos de México. El edificio es conocido por su impresionante arquitectura y su rica historia. Los visitantes pueden explorar el interior del palacio y aprender más sobre la historia postal de México a través de exposiciones y eventos especiales.',
        placeThings: ['Arquitectura colonial', 'Historia postal'],
        placeAddress: 'Calle Antigua 789, Ciudad de México',
        placeRating: 4.6,
        placeImages: [Imagen1, Imagen2, Imagen3, Imagen4]
      },
      {
        placeTime: '2:00 pm',
        placeImage: Imagen5,
        placeName: 'Pirámides de Teotihuacán',
        placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
        placeLongDescription: 'Las Pirámides de Teotihuacán son un sitio arqueológico cerca de la Ciudad de México que cuenta con majestuosas pirámides y otras construcciones antiguas. El sitio es conocido por su rica historia y su impresionante arquitectura. Los visitantes pueden explorar las pirámides y aprender más sobre la cultura prehispánica a través de exposiciones y eventos especiales.',
        placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
        placeAddress: 'Calle Arqueológica 101, Teotihuacán',
        placeRating: 4.8,
        placeImages: [Imagen1, Imagen2, Imagen3, Imagen4]
      }
    ],
    '2024-11-19': [
      {
        placeTime: '12:00 pm',
        placeImage: Imagen3,
        placeName: 'Palacio Brandon',
        placeDescription: 'Edificio de estilo ecléctico que alberga Correos de México.',
        placeLongDescription: 'El Palacio Postal es un edificio de estilo ecléctico en la Ciudad de México que alberga Correos de México. El edificio es conocido por su impresionante arquitectura y su rica historia. Los visitantes pueden explorar el interior del palacio y aprender más sobre la historia postal de México a través de exposiciones y eventos especiales.',
        placeThings: ['Arquitectura colonial', 'Historia postal'],
        placeAddress: 'Calle Antigua 789, Ciudad de México',
        placeRating: 4.6,
        placeImages: [Imagen1, Imagen2, Imagen3, Imagen4]
      },
      {
        placeTime: '2:00 pm',
        placeImage: Imagen5,
        placeName: 'Pirámides de Teotihuacán',
        placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
        placeLongDescription: 'Las Pirámides de Teotihuacán son un sitio arqueológico cerca de la Ciudad de México que cuenta con majestuosas pirámides y otras construcciones antiguas. El sitio es conocido por su rica historia y su impresionante arquitectura. Los visitantes pueden explorar las pirámides y aprender más sobre la cultura prehispánica a través de exposiciones y eventos especiales.',
        placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
        placeAddress: 'Calle Arqueológica 101, Teotihuacán',
        placeRating: 4.8,
        placeImages: [Imagen1, Imagen2, Imagen3, Imagen4]
      }
    ]
  };

  // Función para parsear la cadena de fecha en formato 'YYYY-MM-DD' como fecha local
  const parseDateString = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Función para formatear una fecha como 'YYYY-MM-DD' en tiempo local
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (itineraryDays.length > 0) {
      const firstItineraryDay = parseDateString(itineraryDays[0]);
      setSelectedDay(firstItineraryDay);
    }
  }, [itineraryDays]);

  const handlePrevWeek = () => {
    const newStartDay = new Date(startDay);
    newStartDay.setDate(startDay.getDate() - 7);
    setStartDay(newStartDay);
  };

  const handleNextWeek = () => {
    const newStartDay = new Date(startDay);
    newStartDay.setDate(startDay.getDate() + 7);
    setStartDay(newStartDay);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDay);
      day.setDate(startDay.getDate() + i);
      const dayString = formatDate(day);
      const isItineraryDay = itineraryDays.includes(dayString);
      const isSelected = selectedDay && formatDate(selectedDay) === dayString;
      days.push(
        <IconButton
          key={i}
          onClick={() => handleDayClick(day)}
          disabled={!isItineraryDay}
          sx={{
            backgroundColor: isSelected ? '#e6007e' : isItineraryDay ? '#7bd7f5' : 'darkgray',
            '&:hover': {
              backgroundColor: isSelected ? '#e6007e' : isItineraryDay ? 'primary.dark' : 'lightgray',
            },
            color: 'white',
            borderRadius: '50%',
            width: 40,
            height: 40,
            margin: 0.5,
            // Mantener el color gris para los botones deshabilitados
            opacity: isItineraryDay ? 1 : 1,
            pointerEvents: isItineraryDay ? 'auto' : 'none',
          }}
        >
          <Typography fontFamily={'poppins'} className='fw-light'>
            {day.getDate()}
          </Typography>
        </IconButton>
      );
    }
    return days;
  };

  const renderItinerary = () => {
    if (!selectedDay) return null;
    const selectedDayString = formatDate(selectedDay);
    const itineraryForSelectedDay = itinerary[selectedDayString];
    if (!itineraryForSelectedDay) return null;

    return (
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
        {itineraryForSelectedDay.map((item, index) => (
          <PlaceItemTimeline
            key={index}
            finalItem={index === itineraryForSelectedDay.length - 1}
            placeTime={item.placeTime}
            placeImage={item.placeImage}
            placeName={item.placeName}
            placeDescription={item.placeDescription}
            placeLongDescription={item.placeLongDescription}
            placeThings={item.placeThings}
            placeAddress={item.placeAddress}
            placeRating={item.placeRating}
            placeImages={item.placeImages}
            onPlaceClick={onPlaceClick}
          />
        ))}
      </Timeline>
    );
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className='mx-4 d-flex flex-column align-items-start'>
        <Box className='d-flex align-items-center' sx={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%' }}>
          <IconButton color='black' aria-label='left arrow' onClick={handlePrevWeek}>
            <LeftRow sx={{ fontSize: '2.2rem' }} />
          </IconButton>
          <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>L</Typography>

          <Box className='d-flex mx-2' sx={{ overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'thin', }}>
            {renderDays()}
          </Box>
          <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>D</Typography>

          <IconButton color='black' aria-label='right arrow' onClick={handleNextWeek}>
            <RightRow sx={{ fontSize: '2.2rem' }} />
          </IconButton>
        </Box>

        <Box className='ms-2 mt-4'>
          <Typography fontFamily={'poppins'} className='fw-normal' sx={{ fontSize: '1.5rem' }}>
            {daysOfWeek[today.getDay()]}, {today.getDate()} de {months[today.getMonth()]} del {today.getFullYear()}
          </Typography>
        </Box>

        <Box className='my-4' sx={{ width: '100%' }}>
          {renderItinerary()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Planer;