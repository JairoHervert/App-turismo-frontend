import React, { useState, useEffect } from 'react';

import { Card, CardHeader, CardContent, Divider, Pagination, Box, Stack, Typography, ListItem, ListItemText, List, IconButton} from '@mui/material';
import { DeleteOutline as DeleteOutlineIcon, List as ListIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import '../../css/Categorias.css';

function ContenedorCategorias({ categoriasIniciales }) {
  const itemsPorPagina = 9;
  
  const [categoriasVisibles, setCategoriasVisibles] = useState(categoriasIniciales);
  const [pagina, setPagina] = useState(1);
  const [categoriasLista, setCategoriasLista] = useState([]);

  // Efecto para actualizar las categorías visibles cuando cambien las iniciales
  useEffect(() => {
    // Función para mezclar las categorías de manera aleatoria
    const shuffleArray = (array) => {
      return array
        .map(value => ({ value, sort: Math.random() })) // Asocia cada elemento con un número aleatorio
        .sort((a, b) => a.sort - b.sort) // Ordena según el número aleatorio
        .map(({ value }) => value); // Recupera solo los valores originales
    };
  
    const categoriasAleatorias = shuffleArray(categoriasIniciales);
    setCategoriasVisibles(categoriasAleatorias);
  }, [categoriasIniciales]);

  const handleCategoriaClick = (categoriaId) => {
    // Buscar la categoría seleccionada
    const categoriaSeleccionada = categoriasVisibles.find(categoria => categoria.id === categoriaId);

    // Si la categoría ya está seleccionada, la quitamos de la lista
    if (categoriasLista.includes(categoriaSeleccionada.nombre)) {
      setCategoriasLista(prevSeleccionadas => prevSeleccionadas.filter(categoria => categoria !== categoriaSeleccionada.nombre));
    } else {
      // Si no está seleccionada, se agrega
      setCategoriasLista(prevSeleccionadas => [...prevSeleccionadas, categoriaSeleccionada.nombre]);
    }
  }

  const indexInicio = (pagina - 1) * itemsPorPagina;
  const indexFin = indexInicio + itemsPorPagina;
  const categoriasPagina = categoriasVisibles.slice(indexInicio, indexFin);

  const handleChange = (event, value) => {
    setPagina(value);
  }

  return (

    <Grid container spacing={2} columns={12}>
      {/* Sección de categorías */}
      <Grid size={{sm: 12, md: 8, lg: 8}}>

        <Stack sx={{ marginBottom: '50px' }}>
          <Pagination count={Math.ceil( categoriasVisibles.length / itemsPorPagina )} page={pagina} onChange={handleChange} color='primary' size='large' className='cat-paginacion'/>
          
          <Grid container spacing={3} columns={12} justifyContent='flex-start'>
            {categoriasPagina.map((categoria) => (
              <Grid size={{xs: 4, sm: 4, md: 4, lg: 4}} key={categoria.id}>
                <Box 
                  sx={{ 
                    position: 'relative',
                    width: '100%', 
                    aspectRatio: '1/1', 
                    backgroundImage: `url(${categoria.imagen})`, 
                    backgroundPosition: 'center', 
                    backgroundSize: 'cover',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundRepeat: 'no-repeat',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    
                  }}
                  className={`cat-box-categoria ${categoriasLista.includes(categoria.nombre) ? 'expanded' : ''}`}
                  onClick={() => handleCategoriaClick(categoria.id)}
                >
                  <Typography className='cat-box-categoria-text' variant='body1' fontWeight='bold' color='white' textAlign='center' zIndex={2} sx={{ fontSize: {md: '1.5rem'} }} >
                    {categoria.nombre}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          
        </Stack>
      </Grid>

    { /* Sección donde se muestran categorías seleccionadas */}
    <Grid size={{xs: 12, sm: 12, md: 4, lg: 4}}>
      <Card sx={{ marginTop: {md: '3.5rem'} }}>

        <CardHeader
          avatar={
            <ListIcon sx={{ color: '#E4007C' }} />
          }
          title= 'Lista de categorías seleccionadas'
          titleTypographyProps={{
            sx: {
              fontWeight: 'bold',
              fontSize: '1em',
            }
          }}
          sx={{ alignItems: 'flex-start' }}
        />

        <Divider />
        {/* Contenido para la lista de categorías seleccionadas */}
        <CardContent sx={{ display: 'column', justifyContent: 'space-between', maxHeight: {md: '30rem', xs: '20rem'}, overflowY: 'auto' }}>
          {categoriasLista.length > 0 ? (
            <List>
              {categoriasLista.map((categoria, index) => (
                <ListItem key={index}
                  sx={{
                    bgcolor: 'background.paper',
                    '&:hover':{
                      backgroundColor: '#e4007c14'
                    }
                  }}
                  secondaryAction={
                    <IconButton edge='end' aria-label='delete' onClick={() => {
                      setCategoriasLista(prev => prev.filter(item => item !== categoria));
                    }} >
                      <DeleteOutlineIcon sx={{ color: '#E4007C' }}/>
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