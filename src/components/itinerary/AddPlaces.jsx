//import * as React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Importa axios para las peticiones HTTP
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
import img from '../../img/Itinerary/turist-for-another.jpg';
import ThemeMaterialUI from '../ThemeMaterialUI';
import { ThemeProvider, useTheme } from '@mui/material/styles';

export default function AlertDialog({ open, handleClose, acceptedPlaces, onAcceptPlace, onRemovePlace, onConfirmPlaces, allPlaces, setAllPlaces, }) {
  //obtener la referencia del componente AlertD
  const alertRef = useRef();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const theme = useTheme();
  const idUsuario = localStorage.getItem('id'); // Suponiendo que el ID del usuario está almacenado en localStorage
  //console.log('El idUsuario en AddPlaces.jsx es: ',idUsuario);

  // Obtener primero los lugares deseados y despues los demas lugares de la BD
  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const idUsuario = localStorage.getItem('id'); // Obtener ID de localStorage
        const response = await axios.get(`http://localhost:3001/api/lugares?idUsuario=${idUsuario}`);
        console.log('Lugares recibidos:', response.data);

        // Convertir esDeseado de 1/0 a true/false
        const allPlaces = response.data.map((place) => ({
          ...place,
          esDeseado: !!place.esDeseado, // Convierte 1 -> true y 0 -> false
        }));

        setAllPlaces(allPlaces); // Guarda una copia base
        setSuggestedPlaces(allPlaces); // Inicializa lugares sugeridos
      } catch (error) {
        console.error('Error al obtener los lugares:', error);
      }
    };
  
    if (open) {
      fetchLugares();
    }
  }, [open]);
  

  // Obtener los lugares deseados desde la BD
  /*
  useEffect(() => {
    const fetchLugaresDeseados = async () => {
      try {
        const idUsuario = localStorage.getItem('id'); // Suponiendo que el ID del usuario está almacenado en localStorage
        const response = await axios.get(`http://localhost:3001/api/lugares-deseados/${idUsuario}`);
        //console.log('Datos recibidos de la BD AddPlaces.jsx:', response.data);
        setSuggestedPlaces(response.data);
      } catch (error) {
        console.error('Error al obtener los lugares deseados:', error);
      }
    };

    if (open) {
      fetchLugaresDeseados();
    }
  }, [open, idUsuario]);
  */

  //funcion para abrir la alerta
  const handleClickOpen = () => {
    if (alertRef.current) {
      alertRef.current.handleClickOpen();
    }
  };

  useEffect(() => {
    if (open && allPlaces.length > 0) {
      setSuggestedPlaces(allPlaces);
    }
  }, [open]);
  

  // Modificación al aceptar un lugar
  const handleAcceptPlaceLocal = (place) => {
    setSuggestedPlaces((prev) => prev.filter((p) => p.idLugar !== place.idLugar));
    onAcceptPlace(place); // Ejecuta la función externa para actualizar el estado principal
  };

  const filteredSuggestedPlaces = suggestedPlaces.filter((place) =>
    place.placeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                {/* Agrega este console.log para ver el contenido */}
                {/*console.log("Contenido de suggestedPlaces:", suggestedPlaces)*/} 
                {/*{filteredSuggestedPlaces.map((place, index) => (    {suggestedPlaces.map((place, index) => (*/} 
                {filteredSuggestedPlaces.map((place, index) => ( 
                    <Grid item xs={12} key={index} sx={{ marginBottom: '1rem' }}>
                      <PlaceCard
                          place={{
                            id: place.idLugar,
                            name: place.placeName,
                            description: place.descripcion || 'Sin descripción',
                            image: place.imagen || null,
                            rating: place.rating || 0, // Si existe rating
                            esDeseado: place.esDeseado,
                        }}
                        onAcceptPlace={() => handleAcceptPlaceLocal(place)} // Aquí se pasa la función correctamente
                        isLogged={true}
                        isClickedDeseados={place.esDeseado} // Indica si es un lugar deseado
                        isClickedFavoritos={false}
                        onDeseadosClick={() => console.log(`Deseado: ${place.idLugar}`)}
                        onFavoritosClick={() => console.log(`Favorito: ${place.idLugar}`)}
                      />
                    </Grid>
                  ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ backgroundColor: '#f9f9f9', padding: 2, borderRadius: 2 }}>
              <Typography variant="h6">Lugares Aceptados</Typography>
              {acceptedPlaces.map((place, index) => {
                //console.log('Lugar aceptado al presionar el boton AGREGAR LUGAR:', place);
                return (
                  <AcceptedPlaceCard key={index} place={place} onRemovePlace={onRemovePlace} />
                );
              })}
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