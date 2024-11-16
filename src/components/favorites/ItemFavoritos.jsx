import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import '../../css/FavoritesPage.css';
import ButtonsMod from '../ButtonsMod';

function ItemFavoritos({ imagen, nombre, descripcion }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card sx={{ maxWidth: 380, margin: 'auto' }}>
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
            <Typography variant='body2' textAlign={'center'} className='fa_pa-descripcion'>
              {descripcion}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <ButtonsMod
            textCont='Eliminar'
            variant='secundario'
            startIcon={<DeleteIcon />}
            clickEvent={() => alert('Eliminar')}
          />
        </CardActions>

      </Card>
    </Grid>
  )
}

export default ItemFavoritos