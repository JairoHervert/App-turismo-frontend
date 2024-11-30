import React, { useState } from 'react';
import '../../css/Perfil.css';
import ButtonsMod from '../ButtonsMod';

import { Card, CardHeader, CardContent, Divider, Box, Stack, Chip, Checkbox, Accordion, AccordionSummary, AccordionDetails, Typography, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';

function CategoriasInteres({ categoriasUsuario }) {
  const [isEditing, setIsEditing] = useState(false);
  // Para solo tener un acordeón abierto a la vez
  const [acordeonAbierto, setAcordeonAbierto] = useState(null);
  // Se inicializa un arreglo con las subcategorías seleccionadas (almacena el id)
  const [subcategoriasSeleccionadas, setSubcategoriasSeleccionadas] = useState([]);
  
  // Para seleccionar y deseleccionar subcategorías
  const handleSubcategoriaSeleccionada = (id) => {
    console.log('Seleccionando subcategoría:', id);
    setSubcategoriasSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  // Para saber si la subcategoría está seleccionada
  const esSubcategoriaSeleccionada = (id) => subcategoriasSeleccionadas.includes(id);

  const handleSave = () => {
    setIsEditing(!isEditing);
  }

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
      
      <CardContent>
        {/* Inicia contenido para EDITAR categorías y subcategorías */}
        {isEditing ? (
          categoriasUsuario.map((categoria) => (
            /* Para que solo un acordeón esté abierto a la vez */
            <Accordion 
              key={categoria.id}
              expanded={acordeonAbierto === categoria.id}
              onChange={() =>
                setAcordeonAbierto((prev) => (prev === categoria.id ? null : categoria.id))
              }
            >
              {/* Nombre de la categoría */}
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {categoria.nombre}
                </Typography>
              </AccordionSummary>
              { /* Nombre de las subcategorías de esa categoría */}
              <AccordionDetails>
                <Stack direction='column' >
                  {/* Lista de las subcategorías */}
                  {categoria.subcategorias.map((subcategoria) => (

                    <FormGroup key={subcategoria.id} >
                      <FormControlLabel 
                        label={subcategoria.nombre} 
                        control={
                          <Checkbox 
                            checked={esSubcategoriaSeleccionada(subcategoria.id)}
                            onChange={() => handleSubcategoriaSeleccionada(subcategoria.id, categoria.nombre)}
                          />
                        }
                      />
                    </FormGroup>

                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))
          /* Termina contenido para EDITAR categorías y subcategorías */
        ) : (
          /* Inicia MODO VISUALIZACIÓN de categorías y subcategorías */
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {/* Si hay subcategorías seleccionadas */}
            {subcategoriasSeleccionadas.length > 0 ? (
              categoriasUsuario
                .flatMap((categoria) => categoria.subcategorias)
                .filter((sub) => subcategoriasSeleccionadas.includes(sub.id))
                .map((sub) => (
                  <Chip
                    key={sub.id}
                    label={sub.nombre}
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