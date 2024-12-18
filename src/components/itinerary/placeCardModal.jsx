import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid2";
import ThemeMaterialUI from '../ThemeMaterialUI';
import { ThemeProvider, useTheme } from '@mui/material/styles';
//Handler fotos
import { handleFotosLugar } from '../../pagesHandlers/place-handler';

export default function PlaceCardModal({ place, onAcceptPlace }) {
  const theme = useTheme();

  // Estado para manejar las imágenes del lugar
  const [placeImages, setPlaceImages] = useState([]);

  // Obtener imágenes del lugar al montar el componente
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const resultado = await handleFotosLugar(place.id);
        const images = resultado.map((element) => `http://localhost:3000/fotosLugares/${element.URL}`);
        setPlaceImages(images);
      } catch (error) {
        console.error('Error al obtener fotos del lugar', error);
        setPlaceImages(['https://www.dondeir.com/wp-content/uploads/2021/03/bibliotecas-mexico.jpg']);
      }
    };

    if (place && place.id) {
      fetchImages();
    }
  }, [place]);

  // Validar si el objeto place existe
  if (!place) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="error">
            Información no disponible
          </Typography>
        </CardContent>
      </Card>
    );
  }

  //console.log("Contenido de place en PlaceCardModal:", place);
            
  //console.log(`Imágenes para el lugar ${place.id}:`, placeImages);

  // Mapea las propiedades correctas
  const name = place.name || "Sin nombre";
  const description = place.description || "Sin descripción";
  const image = placeImages.length > 0 ? placeImages[0] : "https://via.placeholder.com/150";
  const rating = place.rating || 0; // Si no hay rating, asignar 0
  const deseado = place.esDeseado || false;
  //console.log('el lugar y sus propiedades: ',place);
  //console.log('es deseado el lugar: ',place.name,' en placeCardModal.jsx: ',deseado);

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
    <Card sx={{ height: 215 }}>
      <Grid container spacing={2} >
        <Grid item size={8}>
          <CardContent>
            <Typography variant="h5" component="div"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1, // Número de líneas antes de truncar
                WebkitBoxOrient: 'vertical',
                color: deseado ? 'green' : 'inherit', // Título en verde si es deseado
                fontWeight: deseado ? 'bold' : 'normal', // Opcional: poner en negritas
              }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3, // Número de líneas antes de truncar
                WebkitBoxOrient: 'vertical',
              }}>
              {description}
            </Typography>
            <Rating precision={0.1} sx={{ marginTop: 1 }} value={rating} readOnly />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onAcceptPlace(place)} //AQUI ES LA FUNCION CUANDO LO DOY AGREGAR LUGAR, SE PASA COMO PROP DESDE ADDPLACES
            >
              Agregar lugar
            </Button>
          </CardActions>
        </Grid>
        <Grid item size={4}>
          <CardMedia
          
            component="img"
            image={image}
            sx={{ height: '100%', objectFit: 'cover' }}
            alt={name}
          />
        </Grid>
      </Grid>
    </Card>
    </ThemeProvider>
  );
}
