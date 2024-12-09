import React, { useState } from 'react';
import { Button } from '@mui/material';
import FormularioPreferencias from './FormularioPreferencias';
import SeleccionCategorias from './SeleccionCategorias';
import ThemeMaterialUI from '../ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';

function PreferenciasModal() {
  const [open, setOpen] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [formData, setFormData] = useState({});
  const selectedDate = new Date(); // Define selectedDate

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(form.entries());
    const hasDisability = formJson.hasDisability || false; // Define hasDisability
    setFormData({
      ...formJson,
      selectedDate,
      hasDisability,
    });
    setOpen(false);
    setOpenSecondModal(true);
  };

  const handleSecondModalSubmit = () => {
    console.log('Form Data:', formData);
    // Aquí se puede enviar la información al servidor o realizar cualquier otra cosa
    setOpenSecondModal(false);
  };

  const handleCloseSecondModal = () => {
    setOpenSecondModal(false);
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Abrir formulario de preferencias
      </Button>
      <FormularioPreferencias open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
      <SeleccionCategorias open={openSecondModal} handleClose={handleCloseSecondModal} handleSubmit={handleSecondModalSubmit} />
    </ThemeProvider>
  );
}

export default PreferenciasModal;