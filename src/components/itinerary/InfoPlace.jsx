import { Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import ImagesCarousel from './ImagesCarousel'

function InfoPlace({ name, longDescription, images, openHour, closeHour, address, phone, rating }) {
  return (
    <Box className='my-3'>
      <Box className='mx-4'>
        <Typography fontFamily={'poppins'} className='fw-normal' sx={{ fontSize: '1.6rem' }}>
          {name}
        </Typography>

        {/* Aqui debe ir un carousel de imagenes */}
        <Box className='mb-3 mt-2'>
          <ImagesCarousel images={images} />
        </Box>

        <Rating name='read-only' value={rating} readOnly />

        <Typography fontFamily={'poppins'} className='fw-semibold my-1'>
          Horario: <span className='fw-normal'>{openHour} - {closeHour}</span>
        </Typography>
      </Box>

      <Box sx={{ overflowY: 'auto', maxHeight: '44.8vh', paddingRight: '1.2rem' }} className='ms-4 me-3'>
        <Typography fontFamily={'poppins'} className='fw-normal my-3 text-justify'>
          {longDescription}
        </Typography>


        <Typography fontFamily={'poppins'} className='fw-semibold my-4'>
          Dirección: <span className='fw-normal'>{address}</span>
        </Typography>

        <Typography fontFamily={'poppins'} className='fw-normal mt-2 mb-4'>
          <strong>Teléfono:</strong> {phone}
        </Typography>
      </Box>

    </Box>
  )
}

export default InfoPlace