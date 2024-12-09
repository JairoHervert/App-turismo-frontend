import * as React from "react";
import { useState, forwardRef, useImperativeHandle } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import ButtonsMod from "./ButtonsMod";

const AlertD = forwardRef(({ titulo, mensaje, imagen, boton1, boton2, onConfirm }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true);
    }
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handleClose();
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        PaperProps={{
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <DialogTitle sx={{color: '#E4007C', fontWeight: 'bold'}}>{titulo}</DialogTitle>
        <DialogContent>
          {imagen && (
            <img src={imagen} alt="imagen" style={{ width: 'auto', height: '20vh', display: 'block', margin: '0 auto'}} />
          )}
          <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center' }}>
            {mensaje}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center'}}>
            <ButtonsMod
              variant='secundario'
              textCont={boton2}
              width='auto'
              height='2rem'
              clickEvent={handleClose} 
            />
          {boton1 && (
            <ButtonsMod
              variant='principal'
              textCont={boton1}
              width='auto'
              height='2rem'
              clickEvent={handleConfirm}
            />
          )}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
});

export default AlertD;


/*
ejemplo de uso:

import React from 'react';
import img from '../img/Itinerary/turist-for-another.jpg';
import AlertD from './alert';
import ButtonsMod from './ButtonsMod';

import { useRef } from 'react'; 

function AlertPrueba() {
  //obtener la referencia del componente AlertD
    const alertRef = useRef();

    //funcion para abrir la alerta
    const handleClickOpen = () => {
        if (alertRef.current) {
            alertRef.current.handleClickOpen();
        }
    };

    //funcion que hace la accion del boton
    const handleConfirm = () => {
        console.log('Action confirmed');
        alert('Action confirmed');
        // Aquí puedes realizar la acción del botón
    };

    return (
            <ButtonsMod
                variant='principal'
                textCont='abrir alerta'
                width='auto'
                height='2rem'
                clickEvent={handleClickOpen}
            />
            <AlertD
                ref={alertRef}
                titulo="Alerta de ejemplo"
                mensaje="Este es un mensaje de alerta."
                imagen={img}
                //el botón 1 no es obligatorio,por ejemplo, se puede mostrar nada mas como un mensaje por si no selecciona una opción o así
                boton1="Aceptar"
                boton2="Cancelar"
                onConfirm={handleConfirm}
            />
+    );
}

export default AlertPrueba;
*/