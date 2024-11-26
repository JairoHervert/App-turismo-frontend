import { TimelineConnector, TimelineDot, TimelineItem, TimelineSeparator, TimelineContent, TimelineOppositeContent } from '@mui/lab';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ThemeMaterialUI from '../ThemeMaterialUI';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import '../../css/ItineraryPage.css';

function PlaceItemTimeline({ finalItem, placeName, placeImages, placeDescription, placeTime, placeThings, placeRating, obtainPlace }) {
  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className='mb-3' sx={{ cursor: 'pointer' }}
        onClick={() => {
          obtainPlace();
        }}>
        <TimelineItem>
          <TimelineOppositeContent className='me-3 mt-1' sx={{ padding: '0', margin: '0' }} color='black'>
            <Typography fontFamily={'poppins'} variant='subtitle2'>{placeTime}</Typography>
          </TimelineOppositeContent>

          {/* Si no es el último elemento, se muestra la linea vertical conectora del timeline */}
          <TimelineSeparator>
            {!finalItem ? (
              <>
                <TimelineDot color='primary' />
                <TimelineConnector sx={{ backgroundColor: '#E4007C' }} />
              </>
            ) : (
              <TimelineDot color='primary' />
            )}
          </TimelineSeparator>

          <TimelineContent>

            <Box className='d-flex it_pa-item'>
              
              {/* Imagen del lugar */}
              <Box
                component='img'
                src={placeImages[0]}
                alt={placeName}
                className='rounded it_page-img-item'
                sx={{
                  height: 'auto',
                }}
              />

              {/* Información del lugar */}
              <Box className='d-flex flex-column ms-3 align-items-center justify-content-center'>
                <Typography className='text-center' fontFamily={'poppins'} variant='h6' color='black'>{placeName}</Typography>
                <Typography className='text-center fw-light' fontFamily={'poppins'} variant='body1' color='black'>{placeDescription}</Typography>
                <Rating name='read-only' value={placeRating} readOnly />

                <Box>
                  {placeThings && placeThings.length > 0 && (
                    <ul className='it_pa-list-things'>
                      {placeThings.map((thing, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                          <span className='it_pa-list-dot fontPoppins'>•</span>
                          <Typography fontFamily={'poppins'} variant='body2'>{thing}</Typography>
                        </li>
                      ))}
                    </ul>
                  )}
                </Box>

              </Box>
            </Box>

          </TimelineContent>
        </TimelineItem>
      </Box>
    </ThemeProvider>
  );
}

export default PlaceItemTimeline;
