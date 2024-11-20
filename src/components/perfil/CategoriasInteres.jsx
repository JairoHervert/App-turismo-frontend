import React, { useState } from 'react';
import '../../css/Perfil.css';
import ButtonsMod from '../ButtonsMod';

import { Divider, Chip, Box, Button, Card, CardHeader, CardContent } from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';

function CategoriasInteres({ categoriasUsuario }) {

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
                    textCont='Editar'
                    width='auto'
                    height='auto'
                    type='submit'
                  />
                }
              />
            <Divider variant='middle' sx={{borderColor: 'rgb(0 0 0)'}}/>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
              {categoriasUsuario.map((category, index) => (
                <Chip
                key={index}
                  label={category}
                  clickable
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
              ))}
              </Box>
            </CardContent>
        </Card>
      
    );
  }

  export default CategoriasInteres;