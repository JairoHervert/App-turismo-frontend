import React from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import ButtonsMod from '../ButtonsMod';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

export default function AcceptedPlaceCard({ place, onRemovePlace }) {
  //console.log('Contenido de place en NewPlacesModal:', place);
  return (
    <Grid container spacing={2} alignItems="center" sx={{ marginBottom: '1rem' }}>
      <Grid size={8}>
        <Typography variant="body1">{place.placeName}</Typography>
      </Grid>
      <Grid size={4}>
        <Box display="flex" justifyContent="flex-end">
          <ButtonsMod
            variant='Secundario'
            textCont='Eliminar'
            startIcon={<DeleteIcon />}
            width='auto'
            height='2rem'
            clickEvent={() => onRemovePlace(place)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}