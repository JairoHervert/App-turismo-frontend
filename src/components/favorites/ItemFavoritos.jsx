import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

function ItemFavoritos({ imagen, nombre, descripcion }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card sx={{ maxWidth: 380, margin: 'auto', backgroundColor: '#b9e6f79f' }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='250'
            image={imagen}
            alt='Lugar 1'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' className='fw-semibold' textAlign={'center'} component='div'>
              {nombre}
            </Typography>
            <Typography variant='body2' textAlign={'center'}>
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