import React, { useEffect, useState } from 'react';
import '../../css/Perfil.css';
import ButtonsMod from '../ButtonsMod';

import { Card, CardHeader, CardContent, Divider, Box, Chip, CardActionArea, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CategoryIcon from '@mui/icons-material/Category';

function CategoriasInteres({ categoriasUsuario }) {
  const [isEditing, setIsEditing] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(categoriasUsuario);
  const [categoriasTotales, setCategoriasTotales] = useState([]);
  
  const toggleCategoriaSeleccionada = (categoriaId) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(categoriaId)
        ? prev.filter((id) => id !== categoriaId)
        : [...prev, categoriaId]
    )
  }

  const handleSave = () => {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    let id_categorias_seleccionadas = [];
    let categorias = []
    categoriasUsuario.forEach(categoria => {
      let newCategoria = {};
      newCategoria.id = categoria.id;
      newCategoria.nombre = categoria.nombre;
      newCategoria.imagen = categoria.imagen;
      categorias.push(newCategoria)
      
      if(categoria.esFavorita == '1')
        id_categorias_seleccionadas.push(categoria.id);
    });
    setCategoriasTotales(categorias);
    setCategoriasSeleccionadas(id_categorias_seleccionadas);
  }, [categoriasUsuario]);

  return (
    <Card
      sx={{
        padding: '1%',
        marginTop: '50px',
        marginBottom: '50px',
      }}>

      <CardHeader
        avatar={
          <CategoryIcon color='primary' />
        }
        title='Categorías de Interés'
        titleTypographyProps={{
          sx: {
            fontSize: '1.2rem',
            fontWeight: 'medium',
          }
        }}
        action={
          <ButtonsMod
            variant='secundario'
            textCont={isEditing ? 'Guardar' : 'Editar'}
            clickEvent={handleSave}
          />
        }
      />

      <Divider variant='middle' sx={{ borderColor: 'rgb(0 0 0)' }} />
      
      <CardContent sx={{ width: '100%' }}>
        {/* Inicia contenido para EDITAR categorías y subcategorías */}
        {isEditing ? (
          <Box sx={{ maxHeight: '500px', overflow: 'auto', padding: '1%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <Grid container spacing={2} columns={12} justifyContent='center'>
              {categoriasTotales.map((categoria) => {
                const isSelected = categoriasSeleccionadas.includes(categoria.id);
        
                return (
                  <Grid item xs={12} sm={6} md={4} key={categoria.id} width={{md: '30%', sm: '48%', xs: '100%'}} >
                    <Card
                      sx={{
                        position: 'relative',
                        boxShadow: 3,
                        height: '150px',
                        outline: isSelected ? '2.5px solid RGB(225, 48, 167)' : 'none',
                      }}
                    >
                      <CardActionArea onClick={() => toggleCategoriaSeleccionada(categoria.id)}>
                        <CardMedia
                          component='img'
                          height='150'
                          image={categoria.imagen}
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
                            backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.6)',
                          }}
                        >
                          <Typography variant='body1' sx={{ textAlign: 'center', fontWeight: '600', fontSize: '1.2rem', background: isSelected ? 'rgba(0, 0, 0, 0.5)' : 'none' }}>
                            {categoria.nombre}
                          </Typography>
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          /* Termina contenido para EDITAR categorías y subcategorías */
        ) : (
          /* Inicia MODO VISUALIZACIÓN de categorías y subcategorías */
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {/* Si hay subcategorías seleccionadas */}
            {categoriasSeleccionadas.length > 0 ? (
              categoriasTotales
                .filter((categoria) => categoriasSeleccionadas.includes(categoria.id))
                .map((categoria) => (
                  <Chip
                    key={categoria.id}
                    label={categoria.nombre}
                    sx={{
                      backgroundColor: '#FFFF',
                      color: '#E4007C',
                      border: '1px solid #E4007C',
                      '&:hover': {
                        backgroundColor: '#E4007C',
                        color: '#FFFF',
                      }
                    }}
                  />
                ))
            ) : (
              /* Si no hay subcategorías seleccionadas, se pondrá el texto 'Sin especificar' */
              <Typography variant='body1'>
                Sin especificar
              </Typography>
            )}
          </Box>
          /* Termina MODO VISUALIZACIÓN de categorías y subcategorías */
        )}

      </CardContent>
    </Card>
  );
}

export default CategoriasInteres;