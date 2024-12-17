import React, { useState, useEffect } from 'react';

import { Card, CardHeader, CardContent, Divider, Box, Stack, Typography, ListItem, ListItemText, List, IconButton} from '@mui/material';
import { DeleteOutline as DeleteOutlineIcon, List as ListIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import '../../css/Categorias.css';
import categorias from '../preferencias/CategoriasPref.js';
import CardCategorias from './CardCategorias.jsx';

function ContenedorCategorias({ categoriasIniciales, onCategoriasSeleccionadas }) {
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState({});

  useEffect(() => {
    const categoriasFavoritas = categoriasIniciales
      .filter((categoria) => categoria.esFavorita === 1)
      .reduce((acc, categoria) => {
        acc[categoria.id] = categoria.nombre;
        return acc;
      }, {});
    setCategoriasSeleccionadas((prev) => ({ ...prev, ...categoriasFavoritas }));
    onCategoriasSeleccionadas(categoriasFavoritas); // Sincroniza el estado inicial con el padre
  }, [categoriasIniciales, onCategoriasSeleccionadas]);

  const handleCategoriaSelect = (categoria) => {
    setCategoriasSeleccionadas((prevSeleccionadas) => {
      const isAlreadySelected = !!prevSeleccionadas[categoria.id];
      const updatedSeleccionadas = isAlreadySelected
        ? (() => {
            const updated = { ...prevSeleccionadas };
            delete updated[categoria.id];
            return updated;
          })()
        : { ...prevSeleccionadas, [categoria.id]: categoria.nombre };

      onCategoriasSeleccionadas(updatedSeleccionadas); // Notifica al padre
      return updatedSeleccionadas;
    });
  };

  const handleCategoriaDelete = (categoria) => {
    setCategoriasSeleccionadas((prev) => {
      const updated = { ...prev };
      const idToDelete = Object.keys(prev).find(
        (key) => prev[key] === categoria
      );
      if (idToDelete) delete updated[idToDelete];
      onCategoriasSeleccionadas(updated); // Notifica al padre sobre el cambio
      return updated;
    });
  };

  return (
    <Grid container spacing={2} columns={12}>
      <Grid size={{sm: 12, md: 8, lg: 8}}>
      {/* Sección de las categorías */}
        <Stack sx={{ marginBottom: '50px' }}>
          {/* Aquí se enlistan todas las categorías */}
          <Box sx={{ maxHeight: '600px', overflow: 'auto', padding: '1%' }}>
              <Grid container columns={12} spacing={2}>
                {categoriasIniciales.map((categoria) => (
                  <CardCategorias
                    key={categoria.id}
                    categoria={categoria}
                    onSelect={handleCategoriaSelect}
                    isSelected={!!categoriasSeleccionadas[categoria.id]}
                  />
                ))}
              </Grid>
          </Box>
        </Stack>

      </Grid>

      { /* Sección donde se muestran categorías seleccionadas */}
      <Grid size={{xs: 12, sm: 12, md: 4, lg: 4}}>
      <Card>
        <CardHeader
          avatar={ <ListIcon sx={{ color: '#E4007C' }} /> }
          title= 'Lista de categorías seleccionadas'
          titleTypographyProps={{ sx: { fontWeight: 'bold', fontSize: '1em' } }}
          sx={{ alignItems: 'flex-start' }}
        />

        <Divider />

        {/* Contenido para la lista de categorías seleccionadas */}
        <CardContent sx={{ display: 'column', justifyContent: 'space-between', maxHeight: {md: '540px', xs: '20rem'}, overflowY: 'auto' }}>
          {Object.values(categoriasSeleccionadas).length > 0 ? (
            <List>
              {Object.values(categoriasSeleccionadas).map((categoria, index) => (
                <ListItem
                  key={index}
                  sx={{ transition: '0.2s', '&:hover': { backgroundColor: 'rgba(185, 229, 247, 0.5)' }, }}
                  secondaryAction={
                    // Ícono para eliminar las categorías de la lista
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => handleCategoriaDelete(categoria)} // Elimina y sincroniza con el padre
                    >
                      <DeleteOutlineIcon sx={{ color: '#E4007C', height: '1.3rem', width: '1.3rem' }} />
                    </IconButton>
                  }
                >
                  <ListItemText primary={categoria} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant='body1'>No hay categorías seleccionadas.</Typography>
          )}
        </CardContent>
        
      </Card>
    </Grid>
  </Grid>
    
  );
}

export default ContenedorCategorias;