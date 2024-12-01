import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Container, Box } from '@mui/material';
import CardPref from './CardPref';
import categorias from './CategoriasPref';
import ButtonsMod from '../ButtonsMod';
import { pink } from "@mui/material/colors";



function SeleccionCategorias({ open, handleClose, handleSubmit }) {
  const [subcategoriasSeleccionadas, setSubcategoriasSeleccionadas] = useState({});

  const handleCategoriaSelect = (categoria) => {
    setSubcategoriasSeleccionadas((prev) => {
      if (prev[categoria.id]) {
        const { [categoria.id]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [categoria.id]: categoria.subcategorias,
        };
      }
    });
  };

  const handleSubcategoriaSelect = (subcategoria) => {
    // Aquí puedes manejar la selección de subcategorías si es necesario
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontFamily: 'Montserrat, sans-serif', color: pink[600], fontWeight: 'bold' }}>Preferencias</DialogTitle>
      <DialogContent sx={{ fontFamily: 'Poppins, sans-serif' }}>
        <DialogContentText>
          Escoje las categorías y subcategorías que más te interesen.
        </DialogContentText>
        <Box sx={{ mt: 2, maxHeight: '500px', overflow: 'auto' }}> 
        <Container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <CardPref
            categorias={categorias}
            onSelect={handleCategoriaSelect}
            subcategoriasSeleccionadas={subcategoriasSeleccionadas}
            onSubcategoriaSelect={handleSubcategoriaSelect}
          />
        </Container>
        </Box>
        <DialogActions>
          {/*
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          */}
          <ButtonsMod variant='principal' textCont='Enviar' height='3rem' clickEvent={handleSubmit} color="primary" />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default SeleccionCategorias;