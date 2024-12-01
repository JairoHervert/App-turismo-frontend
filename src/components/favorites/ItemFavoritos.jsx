import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon } from '@mui/icons-material';
import '../../css/FavoritesPage.css';
import ButtonsMod from '../ButtonsMod';

function ItemFavoritos({ imagen, nombre, descripcion }) {
  const navigate = useNavigate();
  const redigirALugar = () => {
    //navigateTo(`/placepage/${id}`); // pa los de back: si definimos un id, podria reedirigirse al lugar en especifico, por ahora redirige a la pagina placePage estatica
    navigate(`/placepage`); // redirige a la página de inicio
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card sx={{ maxWidth: 380, margin: 'auto' }}>
        <CardActionArea onClick={redigirALugar}>
          <CardMedia
            component='img'
            height='250'
            image={imagen}
            alt={'Imagen de ' + nombre}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' className='fw-semibold fa_pa-place-name' textAlign={'center'} sx={{ height: '4rem', alignContent: 'center' }} >
              {nombre}
            </Typography>
            <Typography variant='body2' fontFamily={'Poppins'} textAlign={'center'} className='fa_pa-descripcion'>
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