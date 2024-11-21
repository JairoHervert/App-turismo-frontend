import React from 'react';
import { Box, Typography } from '@mui/material';
import mapImage from '../../img/HomePage/mapa.png'; // Asegúrate de tener una imagen de mapa en esta ruta

function PlanRoute() {
  return (
    <Box className='PR-container' sx={{ textAlign: 'center', marginTop: 2, marginBottom: 4 }}>
      <Typography variant='h3' fontWeight='bold' sx={{ marginBottom: 2 }}>
        Consulta la ruta aquí
      </Typography>
      <img src={mapImage} alt='Mapa' className='PR-mapa-imagen' style={{ width: '100%', height: 'auto', maxWidth: '700px' }} />
    </Box>
  );
}

export default PlanRoute;