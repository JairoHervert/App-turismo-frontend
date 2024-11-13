import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import '../../css/FavoritesPage.css';

function ItemFavoritos({ imagen, nombre, descripcion }) {
  const esURL = imagen.startsWith('http://') || imagen.startsWith('https://');
  const imagenSrc = esURL ? imagen : require(`../../img/HomePage/places/${imagen}`);
  
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card sx={{ maxWidth: 380, margin: 'auto' }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='250'
            image={imagenSrc}
            alt='Lugar 1'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' className='fw-semibold' textAlign={'center'} component='div'>
              {nombre}
            </Typography>
            <Typography variant='body2' textAlign={'center'} className='fa_pa-descripcion'>
              {descripcion}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>  {/* Añade el icono de eliminar */}
            Eliminar
          </Button>
        </CardActions>

      </Card>
    </Grid>
  )
}

export default ItemFavoritos