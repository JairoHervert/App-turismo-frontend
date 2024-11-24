import React from 'react'
import { Box, Typography } from '@mui/material'

function LeftImage({ imageUrl, nombreFotografo }) {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%'
      }}
      className='login-left-image'
    >
      <Box className='mx-5'>
        <Box className='pt-5'></Box>
        <Typography variant='h3' className='fw-semibold text-light pt-5'>
          Bienvenido a la aventura que cambiará tu historia
        </Typography>
        <Typography variant='body1' className='text-light mt-3 pb-5'>
          Únete a una comunidad vibrante donde florece la creatividad, se forjan conexiones y cada paso te acerca a experiencias inolvidables. Sumérgete y encuentra la inspiración.
        </Typography>

        <Box className='mb-5' sx={{ marginTop: '400px' }}>
          <Typography variant='body1' className='text-light mt-5 pt-5' >
            Fotografía de
          </Typography>
          <Typography variant='body1' className='fw-semibold text-light' >
            {nombreFotografo}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default LeftImage
