import React from "react";
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

export default function PlaceCardModal({ place, onAcceptPlace }) {
  const theme = useTheme();

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
              }}>
              {place.name}
            </Typography>
            <Typography variant="body2" color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3, // Número de líneas antes de truncar
                WebkitBoxOrient: 'vertical',
              }}>
              {place.description}
            </Typography>
            <Rating precision={0.1} sx={{ marginTop: 1 }} value={place.rating} readOnly />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onAcceptPlace(place)}
            >
              Aceptar
            </Button>
          </CardActions>
        </Grid>
        <Grid item size={4}>
          <CardMedia
          
            component="img"
            image={place.image}
            sx={{ height: '100%', objectFit: 'cover' }}
            alt={place.name}
          />
        </Grid>
      </Grid>
    </Card>
    </ThemeProvider>
  );
}
