import React from 'react';
import { Box, Typography } from '@mui/material';
import mapImage from '../../img/HomePage/mapa.png';

function PlanRoute() {
  return (
    <Box className='PR-container' sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
      <Typography className='fs-2 text-start ms-5' fontWeight='bold' sx={{ mb: 2 }}>
        Consulta la ruta aquí
      </Typography>
      <Box 
        component='img' 
        src={mapImage} 
        alt='Mapa del itinerario' 
        className='PR-mapa-imagen' 
        sx={{ width: '100%', height: 'auto', maxWidth: '700px' }} 
      />
    </Box>
  );
}

export default PlanRoute;
