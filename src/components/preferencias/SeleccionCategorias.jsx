import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Box } from '@mui/material';
import CardPref from './CardPref';
import categorias from './CategoriasPref';
import ButtonsMod from '../ButtonsMod';
import img from '../../img/Itinerary/turist-for-another.jpg';
import AlertD from '../alert';
import { useRef } from 'react';
import ThemeMaterialUI from '../ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';


function SeleccionCategorias({ open, handleClose, handleSubmit }) {
  const theme = useTheme();
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState({});

  //obtener la referencia del componente AlertD
  const alertRef = useRef();

  //funcion para abrir la alerta
  const handleClickOpen = () => {
      if (alertRef.current) {
          alertRef.current.handleClickOpen();
      }
  };

  const handleCategoriaSelect = (categoria) => {
    setCategoriasSeleccionadas((prev) => {
      if (prev[categoria.id]) {
        const { [categoria.id]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [categoria.id]: true,
        };
      }
    });
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClose();
    }
  };

  const handleFormSubmit = () => {
    if (Object.keys(categoriasSeleccionadas).length === 0) {
      handleClickOpen();
    } else {
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}> 
    <Dialog open={open} onClose={handleDialogClose} maxWidth='lg' fullWidth>
      <DialogTitle sx={{ fontFamily: 'Montserrat, sans-serif', color: theme.palette.primary.main, fontWeight: 'bold' }}>Preferencias</DialogTitle>
      <DialogContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
        <DialogContentText>
          Escoje las categorías que más te interesen.
        </DialogContentText>
        <Box sx={{ mt: 2, maxHeight: '500px', overflow: 'auto' }}>
          <Container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <CardPref
              categorias={categorias}
              onSelect={handleCategoriaSelect}
              categoriasSeleccionadas={categoriasSeleccionadas}
            />
          </Container>
        </Box>
        <DialogActions>
          <ButtonsMod variant='principal' textCont='Enviar' height='3rem' clickEvent={handleFormSubmit} color='primary' />
          <AlertD
                ref={alertRef}
                titulo="Escoge al menos una categoría"
                mensaje="Debes escoger por lo menos una categoría para poder personalizar tus itinerarios."
                imagen={img}
                boton2="Aceptar"
            />
        </DialogActions>
      </DialogContent>
    </Dialog>
    </ThemeProvider>
  );
}

export default SeleccionCategorias;