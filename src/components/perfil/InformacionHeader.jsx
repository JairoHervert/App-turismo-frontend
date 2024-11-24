import React, { useState } from 'react';
import '../../css/Perfil.css';

import { Box, Avatar, Stack, Card, Typography } from '@mui/material';

import { Map as MapIcon, FavoriteRounded as FavoriteRoundedIcon, Star as StarIcon, Edit as EditIcon } from '@mui/icons-material';

function InformacionHeader({ nombreUsuario, avatar, itinerariosCreados, favoritos, deseados }) {

  const [avatarNuevo, setAvatar] = useState(avatar);
  const obtenerInicial = nombreUsuario?.charAt(0).toUpperCase();

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <Card className='perfil-usuario-header'>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center'>
        {/* Avatar Usuario Header */}
        <Box sx={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              backgroundColor: '#999999',
              fontSize: 48,
            }}
            src={avatarNuevo}
          >
            {!avatarNuevo && obtenerInicial}
          </Avatar>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#FFFF',
              color: '#fff',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              border: '1px solid #E4007C',
            }}
            onClick={() => document.getElementById('avatar-input').click()}
          >
            <EditIcon color='primary'></EditIcon>
          </Box>
          <input
            id='avatar-input'
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </Box>

        {/* Perfil Usuario Header Informacion */}
        <Stack direction='column' sx={{ width: '100%' }} className='perfil-usuario-header-informacion'>
          {/* Nombre Usuario Header */}
          <Typography variant='h3' fontWeight={'bold'} className='perfil-usuario-header-username'>
            {nombreUsuario}
          </Typography>
          {/*direction={{ xs: 'column', sm: 'row' }} */}
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='flex-start'
            sx={{ marginTop: '10px' }}
            className='perfil-usuario-informacion-listado'
          >
            {/* Itinerarios Creados Usuario Header */}
            <Stack direction='column' spacing={1} alignItems='start' className='perfil-usuario-listado'>
              <Typography className='perfil-usuario-header-span fw-medium'>
                Itinerarios creados
              </Typography>
              <Stack direction='row' sx={{ alignItems: 'center' }}>
                <MapIcon className='perfil-usuario-header-icon' />
                <Typography variant='body1' className='perfil-usuario-header-font'>
                  {itinerariosCreados}
                </Typography>
              </Stack>
            </Stack>

            {/* Lista Favoritos Usuario Header */}
            <Stack direction='column' spacing={1} alignItems='start' className='perfil-usuario-listado'>
              <Typography className='perfil-usuario-header-span fw-medium'>
                Favoritos
              </Typography>
              <Stack direction='row' sx={{ alignItems: 'center' }}>
                <FavoriteRoundedIcon className='perfil-usuario-header-icon' />
                <Typography variant='body1' className='perfil-usuario-header-font'>
                  {favoritos}
                </Typography>
              </Stack>
            </Stack>

            {/* Lista Deseados Usuario Header */}
            <Stack direction='column' spacing={1} alignItems='start' className='perfil-usuario-listado'>
              <Typography className='perfil-usuario-header-span fw-medium'>
                Deseados
              </Typography>
              <Stack direction='row' sx={{ alignItems: 'center' }}>
                <StarIcon className='perfil-usuario-header-icon' />
                <Typography variant='body1' className='perfil-usuario-header-font'>
                  {deseados}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

        </Stack>
      </Stack>

    </Card>

  );
}

export default InformacionHeader;