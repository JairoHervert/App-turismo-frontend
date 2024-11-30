import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Delete as DeleteIcon } from '@mui/icons-material'
import ButtonsMod from '../ButtonsMod'

function PlaceItem({ name, description, image, category, address, rating, phone }) {
  return (
    //<Grid item xs={12} sm={6} md={4}>
      <Card sx={{ width: 270, margin: 'auto' }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='250'
            image={image}
            alt={'Imagen de ' + name}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' className='fw-semibold' textAlign={'center'} component='div'>
              {name}
            </Typography>
            <Typography variant='body2' textAlign={'center'} className='fa_pa-descripcion'>
              {description}
            </Typography>

            <Typography>
              {category}
            </Typography>

            <Typography>
              {address}
            </Typography>

            <Rating name='read-only' value={rating} readOnly />

            <Typography>
              {phone}
            </Typography>


          </CardContent>
        </CardActionArea>

        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <ButtonsMod
            textCont='mamadas'
            variant='secundario'
            startIcon={<DeleteIcon />}
            clickEvent={() => alert('Eliminar')}
          />
        </CardActions>

      </Card>

    //</Grid>
  )
}

export default PlaceItem