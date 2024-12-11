import React from 'react';
import CategoriaCard from './CategoriaCard';
import Grid from '@mui/material/Grid2';

function CardPref({ categorias, onSelect, categoriasSeleccionadas }) {
  return (
    <Grid container spacing={2}>
      {categorias.map((categoria) => (
        <CategoriaCard
          key={categoria.id}
          categoria={categoria}
          onSelect={onSelect}
          isSelected={!!categoriasSeleccionadas[categoria.nombre]}
        />
      ))}
    </Grid>
  );
}

export default CardPref;
