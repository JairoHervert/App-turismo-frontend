import { TimelineConnector, TimelineDot, TimelineItem, TimelineSeparator, TimelineContent, TimelineOppositeContent } from '@mui/lab';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ThemeMaterialUI from '../ThemeMaterialUI';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import '../../css/ItineraryPage.css';

function PlaceItemTimeline({ finalItem, placeName, placeImage, placeDescription, placeLongDescription, placeTime, placeThings, placeAddress, placeRating, placeImages, onPlaceClick }) {
  const handleClick = () => {
    onPlaceClick({
      name: placeName,
      images: placeImages,
      description: placeDescription,
      longDescription: placeLongDescription,
      time: placeTime,
      address: placeAddress,
      rating: placeRating,
      things: placeThings,
    });
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className='mb-3' onClick={handleClick}>
        <TimelineItem>
          <TimelineOppositeContent className='me-3 mt-1' sx={{ padding: '0', margin: '0' }} color="black">
            <Typography fontFamily={'poppins'} variant='subtitle2'>{placeTime}</Typography>
          </TimelineOppositeContent>

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
            <Box className='d-flex p-1' sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
<Box
  component="img"
  src={placeImage}
  alt={placeName}
  className='rounded it_page-img-item'
  sx={{
    width: { xs: '100%', sm: '11rem' },
    height: { xs: 'auto', sm: '10rem' },
    objectFit: 'cover',
  }}
/>
              <Box className='d-flex flex-column mx-3 align-items-center justify-content-center' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography className='text-center' fontFamily={'poppins'} variant='h6' color='black'>{placeName}</Typography>
                <Typography className='text-center fw-light' fontFamily={'poppins'} variant='body1' color='black'>{placeDescription}</Typography>
                <Rating name="read-only" value={placeRating} readOnly />

                <Box>
                  {placeThings && placeThings.length > 0 && (
                    <ul className='it_pa-list-things'>
                      {placeThings.map((thing, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                          <span className='it_pa-list-dot fontPoppins'>•</span>
                          <Typography fontFamily={'poppins'} variant="body2">{thing}</Typography>
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