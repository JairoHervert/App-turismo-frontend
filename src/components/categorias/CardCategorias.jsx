import React from 'react';

import { Card, Box, CardMedia, CardActionArea, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

function CardCategorias ({ categoria, onSelect, isSelected }) {

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        key={categoria.id}
        sx={{
        position: 'relative',
        boxShadow: 3,
        height: { xs: 'auto', lg: '200px' },
        width: { xs: '100%' },
        outline: isSelected ? '2.5px solid RGB(225, 48, 167)' : 'none',
        '&::after': isSelected
        ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderLeft: '30px solid RGB(225, 48, 167)',
            borderBottom: '30px solid transparent',
          }
        : {},
        }}
      >
        <CardActionArea  onClick={() => onSelect(categoria)} >
          <CardMedia
            component='img'
            height='200'
            image={require(`../../img/Categorías/${categoria.nombre}.jpg`)}
            alt={categoria.nombre}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.7)',
              transition: 'background-color 0.2s ease-in-out', // Transición suave para el fondo
            }}
          >
            <Typography
              variant='h5'
              sx={{
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '1.2rem',
                width: '100%',
                background: isSelected ? 'rgba(0, 0, 0, 0.65)' : 'none',
                position: 'relative',
              }}
            >
              {categoria.nombre}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CardCategorias;