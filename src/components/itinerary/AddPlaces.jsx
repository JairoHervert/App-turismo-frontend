import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonsMod from '../ButtonsMod';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import PlaceCard from './placeCardModal'; // Asegúrate de importar el componente PlaceCard
import AcceptedPlaceCard from './NewPlacesModal'; // Asegúrate de importar el componente AcceptedPlaceCard
import TextField from '@mui/material/TextField';
import AlertD from '../alert';
import { useRef } from 'react';
import img from '../../img/Itinerary/turist-for-another.jpg';
import ThemeMaterialUI from '../ThemeMaterialUI';
import { ThemeProvider, useTheme } from '@mui/material/styles';

export default function AlertDialog({ open, handleClose, suggestedPlaces, acceptedPlaces, onAcceptPlace, onRemovePlace, onConfirmPlaces }) {
  //obtener la referencia del componente AlertD
  const alertRef = useRef();

  //funcion para abrir la alerta
  const handleClickOpen = () => {
    if (alertRef.current) {
      alertRef.current.handleClickOpen();
    }
  };
  const [searchTerm, setSearchTerm] = React.useState('');
  const theme = useTheme();

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg" // Tamaño máximo del modal
        fullWidth // Ocupa todo el ancho disponible
      >
        <DialogTitle id="alert-dialog-title"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            color: theme.palette.primary.main,
            fontWeight: "bold",
          }}>
          {"Agregar Lugares a tu Itinerario"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                label="Buscar lugares"
                variant="outlined"
                size="small"
                sx={{ maxWidth: 250 }}
                margin="dense"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />


              <Box sx={{ maxHeight: 450, overflowY: 'auto', marginTop: 2 }}> {/* Contenedor con scroll */}
                {suggestedPlaces.map((place, index) => (
                  <Grid item xs={12} key={index} sx={{ marginBottom: '1rem' }}>
                    <PlaceCard place={place} onAcceptPlace={onAcceptPlace} />
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ backgroundColor: '#f9f9f9', padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">Lugares Aceptados</Typography>
              {acceptedPlaces.map((place, index) => (
                <AcceptedPlaceCard key={index} place={place} onRemovePlace={onRemovePlace} />
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonsMod
            variant='Secundario'
            textCont='Olvidar'
            width='auto'
            height='2rem'
            clickEvent={handleClose}
            startIcon={<DeleteIcon />}
          />
          <ButtonsMod
            variant='principal'
            textCont='Aceptar'
            width='auto'
            height='2rem'
            startIcon={<CheckIcon />}
            clickEvent={() => { handleClickOpen(); }} // Abrir la alerta
          />
          <AlertD
            ref={alertRef}
            titulo="¡Atención!"
            mensaje="¿Estás seguro de que deseas agregar estos lugares a tu itinerario? Recuerda  que repercutirá en tu tiempo y presupuesto."
            imagen={img}
            boton1="Aceptar"
            boton2="Cancelar"
            onConfirm={() => { onConfirmPlaces(); handleClose(); }} // Usar una función de flecha para llamar a ambas funciones

          />
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}