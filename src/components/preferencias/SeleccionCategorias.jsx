import React, { useState, useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, Box } from '@mui/material';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import CardPref from './CardPref';
import categorias from './CategoriasPref';
import ButtonsMod from '../ButtonsMod';
import img from '../../img/Itinerary/turist-for-another.jpg';
import AlertD from '../alert';
import ThemeMaterialUI from '../ThemeMaterialUI';

function SeleccionCategorias({ open, handleClose, handleSubmit }) {
  const theme = useTheme();
  const [selectedCategories, setSelectedCategories] = useState({});
  const alertRef = useRef();

  const handleClickOpen = () => {
    if (alertRef.current) {
      alertRef.current.handleClickOpen();
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) => {
      if (prev[category.nombre]) {
        const { [category.nombre]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [category.nombre]: true,
        };
      }
    });
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClose();
    }
  };

  const handleFormSubmit = (event) => {
    if (Object.keys(selectedCategories).length === 0) {
      handleClickOpen();
    } else {
      event.preventDefault();
      handleSubmit(selectedCategories);
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
          <Box sx={{ mt: 2, maxHeight: '26rem', overflow: 'auto' }}>
            <Container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <CardPref
                categorias={categorias}
                onSelect={handleCategorySelect}
                categoriasSeleccionadas={selectedCategories}
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