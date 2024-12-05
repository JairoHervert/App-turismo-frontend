import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon } from '@mui/icons-material';
import '../../css/FavoritesPage.css';
import ButtonsMod from '../ButtonsMod';
import {handleEliminarFavorito} from '../../pagesHandlers/favDeseados-handler';

function ItemFavoritos({ idLugar, imagen, nombre, descripcion }) {
  const esURL = imagen.startsWith('http://') || imagen.startsWith('https://');
  // const imagenSrc = esURL ? imagen : require(`../../img/HomePage/places/${imagen}`);
  const imagenSrc = esURL ? imagen : `${process.env.PUBLIC_URL}/fotosLugares/${imagen}`;
  
  const navigate = useNavigate();
  const redigirALugar = () => {
    navigate(`/placepage/${idLugar}`);
  };

  const EliminarLugar = () => {
    handleEliminarFavorito(localStorage.getItem('id'), idLugar);
    window.location.reload();
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card sx={{ maxWidth: 380, margin: 'auto' }}>
        <CardActionArea onClick={redigirALugar}>
          <CardMedia
            component='img'
            height='250'
            image={imagenSrc}
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
            clickEvent={EliminarLugar}
          />
        </CardActions>

      </Card>
    </Grid>
  )
}

export default ItemFavoritos