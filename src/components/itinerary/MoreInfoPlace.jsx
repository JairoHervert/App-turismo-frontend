import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Rating } from '@mui/material';
import ThemeMaterialUI from '../ThemeMaterialUI';
import imagen from '../../img/PlacePage/place-img-cafeterias.jpg';

function MoreInfoPlace({ place }) {
  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box
        className='d-flex flex-column align-items-center m-4'
        sx={{
          height: '780px', // Alto fijo
          overflow: 'hidden', // Ocultar desbordamiento para mantener el tamaño fijo
        }}
      >
        {place ? (
          <>
            {/* Carrusel de imágenes */}
            <div
              id='carouselMoreInfoPlace'
              className='carousel slide'
              data-bs-ride='carousel'
              style={{ width: '100%', height: 'auto' }}
            >
              <div className='carousel-inner'>
                {place.images.map((image, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    key={index}
                  >
                    <img
                      src={image}
                      className='d-block w-100 lugar-imagen rounded'
                      alt={`${place.name} ${index + 1}`}
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
              <button
                className='carousel-control-prev'
                type='button'
                data-bs-target='#carouselMoreInfoPlace'
                data-bs-slide='prev'
              >
                <span
                  className='carousel-control-prev-icon'
                  aria-hidden='true'
                ></span>
                <span className='visually-hidden'>Previous</span>
              </button>
              <button
                className='carousel-control-next'
                type='button'
                data-bs-target='#carouselMoreInfoPlace'
                data-bs-slide='next'
              >
                <span
                  className='carousel-control-next-icon'
                  aria-hidden='true'
                ></span>
                <span className='visually-hidden'>Next</span>
              </button>
            </div>

            {/* Contenedor desplazable para el contenido textual */}
            <Box
              sx={{
                overflowY: 'auto',
                padding: 2,
              }}
            >
              <Typography
                variant='h3'
                fontWeight='bold'
                sx={{ marginBottom: 2 }}
              >
                {place.name}
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 1 }}>
                <span style={{ fontWeight: 'bold' }}>Hora de estancia:</span>{' '}
                {place.time}
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 1 }}>
                <span style={{ fontWeight: 'bold' }}>Dirección:</span>{' '}
                {place.address}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 2,
                }}
              >
                <Typography variant='body2'>
                  <span style={{ fontWeight: 'bold' }}>Calificación:</span>{' '}
                  {place.rating}
                </Typography>
                <Rating
                  name='read-only'
                  value={place.rating}
                  readOnly
                  sx={{ marginLeft: 1 }}
                />
              </Box>
              <Typography variant='body1' sx={{ marginBottom: 2 }}>
                <span style={{ fontWeight: 'bold' }}>Descripción:</span>{' '}
                {place.longDescription}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            {/* Contenido genérico cuando no se ha seleccionado ningún lugar */}
            <img
              src={imagen}
              alt='Lugar genérico'
              className='rounded it_page-img-item'
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '600px',
                maxHeight: '200px',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                overflowY: 'auto',
                maxHeight: 'calc(100% - 220px)', // Altura máxima ajustada restando el espacio de la imagen y márgenes
                width: '100%',
                padding: 2,
              }}
            >
              <Typography
                variant='h3'
                sx={{ marginBottom: 2, textAlign: 'center' }}
              >
                Disfruta de tu día :)
              </Typography>
              <Typography variant='body1' sx={{ textAlign: 'center' }}>
                Este día será muy emocionante, muchas aventuras y buenos
                momentos te esperan.
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default MoreInfoPlace;
