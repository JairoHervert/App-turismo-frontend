import React, { useState, useEffect } from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography, Button, Box } from '@mui/material'
import { Star as StarIcon, StarBorder as StarBorderIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import { handleFavoritos, handleDeseados, handleEsFavorito,handleEsDeseado } from '../../pagesHandlers/favDeseados-handler';


// componentes locales y estilos
import ButtonsMod from '../ButtonsMod'
import '../../css/AllPlaces.css'

function PlaceItem({ id, name, description, image, category, address, rating, phone, idUsuario }) {

  const navigate = useNavigate();

  // Está redundante el código pero da flojera cambiarlo
  let imagen = `${process.env.PUBLIC_URL}/unavailble.avif`;
  if (!image) {
    imagen = `${process.env.PUBLIC_URL}/unavailble.avif`
  } else if (image.startsWith('http')) {
    imagen = image;
  } else if (image.startsWith('{')) {
    imagen = `${process.env.PUBLIC_URL}/unavailble.avif`
  } else {
    imagen = `${process.env.PUBLIC_URL}/fotosLugares/${image}`
  }

  const redigirALugar = () => {
    navigate(`/placepage/${id}`); // pa los de back: si definimos un id, podria reedirigirse al lugar en especifico, por ahora redirige a la página placePage estatica
    //navigate(`/placepage/5`) // redirige a la página de inicio
  }

  // estados y manejadores de los botones de favoritos y deseados
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDeseado, setIsDeseado] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const user = idUsuario;
      if (user) {
        try {
          const favorito = await handleEsFavorito(user, id);
          setIsFavorite(favorito.esFavorito);

          const deseado = await handleEsDeseado(user, id);
          setIsDeseado(deseado.esDeseado);
        } catch (error) {
          console.error('Error verificando favoritos o deseados:', error);
        }
      }
    };

    fetchStatus();
  }, [id]);

  const handleFavoritosClick = (e) => {
    e.stopPropagation();
   const idUsuario = localStorage.getItem('id');
    handleFavoritos(idUsuario,id );
    setIsFavorite(!isFavorite);
  };

  const handleDeseadosClick = (e) => {
    e.stopPropagation();
    const idUsuario = localStorage.getItem('id');
    handleDeseados(idUsuario, id );
    setIsDeseado(!isDeseado);
  };

  return (
    //<Grid item xs={12} sm={6} md={4}>
    <Card className='all_places-item-container'>
      <CardActionArea onClick={redigirALugar}>
        {/* Botones en la esquina superior derecha */}
        <Box sx={{ top: '7px', right: '63%' }} className="position-absolute d-flex gap-0 UD_buttons_star_heart">
          {idUsuario ?
            <>
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
          </Button><Button
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
            </>
            : ""}
        </Box>
        <CardMedia
          component='img'
          height='200'
          image={imagen}
          alt={'Imagen de ' + name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' className='all_places-place-name fw-semibold' textAlign={'center'} sx={{ alignContent: 'center' }}>
            {name}
          </Typography>

          <Typography fontFamily={'Poppins'} variant='body2' className='all_places-description my-3 fw-normal' textAlign={'center'}>
            {description}
          </Typography>

          <Typography fontFamily={'Poppins'} variant='body2' className='my-2 d-flex align-items-center gap-1'>
            <span className='fw-semibold'>Calificación:</span>
            <Rating name='read-only' value={rating} readOnly />
          </Typography>

          <Typography fontFamily={'Poppins'} variant='body2' className='all_places-category my-2' sx={{ alignContent: 'center' }}>
            <span className='fw-semibold'>Categoría: </span> {category}
          </Typography>

          <Typography fontFamily={'Poppins'} variant='body2' className='all_places-address my-2' sx={{ alignContent: 'center' }}>
            <span className='fw-semibold'>Dirección: </span> {address}
          </Typography>

          <Typography fontFamily={'Poppins'} variant='body2' className='my-2'>
            <span className='fw-semibold'>Teléfono: </span> {phone}
          </Typography>

        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ButtonsMod
          textCont='Conocer más'
          variant='secundario'
          clickEvent={redigirALugar}
        />
      </CardActions>

    </Card>

    //</Grid>
  )
}

export default PlaceItem