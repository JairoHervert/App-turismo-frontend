import React, { useState } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Star as StarIcon, StarBorder as StarBorderIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import '../../css/FavoritesPage.css';
import ButtonsMod from '../ButtonsMod';
import { handleEliminarFavorito } from '../../pagesHandlers/favDeseados-handler';

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

  // estados y manejadores de los botones de favoritos y deseados
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDeseado, setIsDeseado] = useState(false);
  const handleFavoritosClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  const handleDeseadosClick = (e) => {
    e.stopPropagation();
    setIsDeseado(!isDeseado);
  };


  return (
    <Card className='all_places-item-container'>
      <CardActionArea onClick={redigirALugar}>
        {/* Botones en la esquina superior derecha */}
        <Box sx={{ top: '7px', right: '63%' }} className="position-absolute d-flex gap-0 UD_buttons_star_heart">
          <Button
            variant="outlined"
            className="pc-btn-deseados"
            onClick={handleDeseadosClick}
            size="small"
            sx={{
              borderColor: 'white',
              color: '#FFC001',
              backgroundColor: 'white',
              marginLeft: '5px',
              '&:hover': {
                color: '#FAC902',
              },
              minWidth: '40px', // Personaliza el ancho mínimo del botón
              minHeight: '40px', // Personaliza el alto mínimo del botón
            }}
          >
            {isDeseado ? <StarIcon /> : <StarBorderIcon />}
          </Button>
          <Button
            variant="outlined"
            className="pc-btn-favoritos"
            onClick={handleFavoritosClick}
            size="small"
            sx={{
              borderColor: 'white',
              color: 'red',
              backgroundColor: 'white',
              marginLeft: '5px',
              '&:hover': {
                color: 'red',
              },
              minWidth: '40px', // Personaliza el ancho mínimo del botón
              minHeight: '40px', // Personaliza el alto mínimo del botón
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        </Box>
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
  )
}

export default ItemFavoritos