import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid2'

// componentes locales y estilos
import ButtonsMod from '../ButtonsMod'
import '../../css/AllPlaces.css'

function PlaceItem({ name, description, image, category, address, rating, phone }) {

  const navigate = useNavigate()
  const redigirALugar = () => {
    //navigateTo(`/placepage/${id}`); // pa los de back: si definimos un id, podria reedirigirse al lugar en especifico, por ahora redirige a la página placePage estatica
    navigate(`/placepage`) // redirige a la página de inicio
  }

  return (
    //<Grid item xs={12} sm={6} md={4}>
      <Card className='all_places-item-container'>
        <CardActionArea onClick={redigirALugar}>
          <CardMedia
            component='img'
            height='200'
            image={image}
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