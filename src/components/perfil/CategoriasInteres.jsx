import React, { useEffect, useState, useRef } from 'react';
import '../../css/Perfil.css';
import ButtonsMod from '../ButtonsMod';

import { Card, CardHeader, CardContent, Divider, Box, Chip, CardActionArea, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CategoryIcon from '@mui/icons-material/Category';

import { handleActualizarCategorias } from '../../pagesHandlers/user_handler';
import AlertD from '../alert';
import img from '../../img/Itinerary/turist-for-another.jpg';
import alertImgSuccess from '../../img/alertas/success.webp';

function CategoriasInteres({ idUsuario, categoriasUsuario }) {
  const [id, setId] = useState(idUsuario);
  useEffect(() => {
    setId(idUsuario);
  }, [idUsuario]);
  const [isEditing, setIsEditing] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(categoriasUsuario);
  const [categoriasTotales, setCategoriasTotales] = useState([]);
  const alertRef = useRef();
  const alertRefConfirmar = useRef();
  const alertRefInvalido = useRef();

  const toggleCategoriaSeleccionada = (categoriaId) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(categoriaId)
        ? prev.filter((id) => id !== categoriaId)
        : [...prev, categoriaId]
    )
  }

  const handleSave = () => {
    if(categoriasSeleccionadas.length > 0) {
      handleClickOpen(1);
      // const nombresSeleccionados = categoriasTotales
      // .filter((categoria) => categoriasSeleccionadas.includes(categoria.id))
      // .map((categoria) => categoria.nombre)
      // .join(','); // Unir los nombres por comas
    
      // const response = await handleActualizarCategorias(id, nombresSeleccionados);
      // console.log(response);
      // if(response) {
      //   setIsEditing(!isEditing);
      // }
    } else {
      handleClickOpen(3);
    }
  }

  const handleGuardarCambios = async () => {
    const nombresSeleccionados = categoriasTotales
    .filter((categoria) => categoriasSeleccionadas.includes(categoria.id))
    .map((categoria) => categoria.nombre)
    .join(','); // Unir los nombres por comas
  
    const response = await handleActualizarCategorias(id, nombresSeleccionados);
    console.log(response);
    if(response) {
      handleClickOpen(2);
      setIsEditing(!isEditing);
    }
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

  const handleClickOpen = (modalId) => {
    if (modalId === 1 && alertRef.current) {
      alertRef.current.handleClickOpen();
    } else if (modalId === 2 && alertRefConfirmar.current) {
      alertRefConfirmar.current.handleClickOpen();
    } else if (modalId === 3 && alertRefInvalido.current) {
      alertRefInvalido.current.handleClickOpen();
    }
  };

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
            clickEvent={() => {
              // Si no estás editando, cambia a editar
              if (!isEditing) { 
                setIsEditing(!isEditing);
              }
              // Si estás editando y el formato no es válido, no te deja guardar
              else if (isEditing) {
                handleSave();
              }
            }}
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
                      <CardActionArea onClick={() => toggleCategoriaSeleccionada(categoria.id)}>
                        <CardMedia
                          component='img'
                          height='150'
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
      {/* 1. Preguntar si desea guardar cambios */}
      <AlertD
        ref={alertRef}
        titulo="¿Desea guardar los cambios?"
        mensaje="Haz click en el botón de ACEPTAR para confirmar los cambios."
        imagen={img}
        boton1='Aceptar'
        boton2="Cancelar"
        onConfirm={handleGuardarCambios}
      />
      {/* 2. Confirmar cambios guardados */}
      <AlertD
        ref={alertRefConfirmar}
        titulo="¡Cambios guardados!"
        mensaje="Tus cambios se han guardado correctamente."
        imagen={alertImgSuccess}
        boton2="Aceptar"
        onConfirm={handleClickOpen}
      />
      {/* 3. Si no tiene categorias seleccionadas */}
      <AlertD
          ref={alertRefInvalido}
          titulo="Selecciona tus categorías de interés"
          mensaje="Por favor, selecciona al menos una categoría de tu interés para continuar."
          imagen={img}
          boton2="Aceptar"
          onConfirm={handleClickOpen}
        />
    </Card>
  );
}

export default CategoriasInteres;