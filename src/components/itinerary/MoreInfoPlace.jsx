// componentes online
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Rating, Card } from '@mui/material';
import ThemeMaterialUI from '../ThemeMaterialUI';

// componentes locales
import InfoPlace from './InfoPlace';

import imagenTursita from '../../img/Itinerary/turist-for-another.jpg';

function MoreInfoPlace({ place }) {
  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box
        className='d-flex flex-column align-items-center mx-1'
      >
        <Card>
          <Box className='d-flex flex-column align-items-center justify-content-center mt-2 mx-3'>
            <img src={imagenTursita} alt='Turista' className='it_pa-imagen-turista' />
            <Typography variant='subtitle1' className='text-center fw-medium fst-italic my-2'>"Viajar es abrir el alma a lo desconocido y volver con historias".</Typography>
          </Box>
        </Card>
        {place ? (
          <Card className='my-2'>
            <InfoPlace
              name={place.placeName}
              longDescription={place.placeLongDescription}
              images={place.placeImages}
              openHour={place.placeOpenHour}
              closeHour={place.placeCloseHour}
              address={place.placeAddress}
              phone={place.placePhone}
              rating={place.placeRating}
            />
          </Card>
        ) : (
          <>
            <Card className='mt-2'>
              {/* Si no hay lugar seleccionado, se muestra este contenido por default */}
              <Box className='d-flex flex-column align-items-center justify-content-center mx-3'>
                <Typography variant='subtitle1' className='text-center fw-semibold mt-4 mb-2' fontFamily={'Poppins'} sx={{ fontSize: '1.1rem' }}>Explora los detalles de cada lugar.</Typography>
                <Typography variant='subtitle1' className='text-center mb-4' fontFamily={'Poppins'}><span className='fw-semibold'>Tip de Viaje:</span> Selecciona un lugar de tu itinerario y explora todo lo que tiene para ofrecer.</Typography>
              </Box>
            </Card>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default MoreInfoPlace;
