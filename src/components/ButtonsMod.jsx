import React from 'react'
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

// variant: principal-->Rosa, secundario-->Blanco
// textCont: texto del boton
// clickEvent: funcion que se ejecuta al hacer click (ej: () => alert('Boton presionado'))
// width: ancho del boton (auto por defecto)
// height: alto del boton (auto por defecto)
// margin: margen del boton (auto por defecto)

/* ejemplo de uso:
  <ButtonsMod
    variant='principal'
    textCont='Eliminar'
    width='auto'
    height='9rem'
    clickEvent={funcionAEjecutar}
    startIcon={<DeleteIcon />}
    type='submit'
  />
*/

function ButtonsMod({ variant, textCont, clickEvent, width, height, startIcon, type }) {
  // condicion para el color del boton
  const buttonStyle = variant === 'principal' ? {
    backgroundColor: '#E4007C',
    color: '#FFFFFF',
    width: width,
    height: height,
    '&:hover': {
      backgroundColor: '#CA006B',
      transition: '0.4s',
    }
  } : {
    backgroundColor: '#FFFFFF',
    color: '#E4007C',
    width: width,
    height: height,
    '&:hover': {
      backgroundColor: '#E4007C',
      color: '#FFFFFF',
      borderColor: '#FFFFFF',
      transition: '0.4s',
    }
  }

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      {/* Boton principal */}
      <Button
        variant='outlined'
        startIcon={startIcon}
        sx={buttonStyle}
        onClick={clickEvent}
        type={type}
      >
        <Typography fontFamily={'Poppins'} sx={{fontSize: '0.9rem'}}>
          {textCont}
        </Typography>

      </Button>

    </ThemeProvider>
  )
}

export default ButtonsMod