import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Perfil.css';
import ModalAvatar from './ModalAvatar.jsx';

import { Box, Avatar, Stack, Card, Typography } from '@mui/material';
import { Map as MapIcon, FavoriteRounded as FavoriteRoundedIcon, Star as StarIcon, Edit as EditIcon } from '@mui/icons-material';

import { handleGuardarImagen } from '../../pagesHandlers/user_handler.js'

function InformacionHeader({ idUsuario, avatar, nombreUsuario, nom, ape, correo, itinerariosCreados, favoritos, deseados }) {

  const [id, setId] = useState(idUsuario);
  const [avatarNuevo, setAvatarNuevo] = useState(null);
  const [obtenerInicial] = nombreUsuario?.charAt(0).toUpperCase(); 
  const [openModal, setOpenModal] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    setAvatarNuevo(avatar);
  }, [avatar]);

  useEffect(() => {
    setId(idUsuario);
  }, [idUsuario]);

  // Validación - URL de imagen
  const validarUrlImagen = async (url) => {
    const trimmedUrl = url.trim();
  
    try {
      const parsedUrl = new URL(trimmedUrl);
  
      // Para comprobar que tenga extensión de imagen
      /*if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(parsedUrl.pathname)) {
        throw new Error('La URL debe apuntar a una imagen válida (.jpg, .png, etc.)');
      }*/
  
      return '';
    } catch (error) {
      return error.message; 
    }
  }

  const handleAvatarChange = async () => {
    const error = await validarUrlImagen(newAvatarUrl);
  
    if (error) {
      setUrlError(error);
      return;
    }
  
    const response = await handleGuardarImagen(id, newAvatarUrl);
    if (response) {
      // Solicitar un nuevo token al servidor
      const refreshResponse = await axios.post('http://localhost:3001/refreshToken', { id });
      if (refreshResponse.data.success) {
        // Actualizar el token en el almacenamiento local
        localStorage.setItem('token', refreshResponse.data.token);
        window.location.reload();
        // Actualizar el estado local con la nueva imagen
        setAvatarNuevo(newAvatarUrl);
        setOpenModal(false);
        setNewAvatarUrl('');
        setUrlError('');
      } else {
        console.error('Error al actualizar el token');
      }
    }
  }
  
  const handleCancel = () => {
    setOpenModal(false);
    setNewAvatarUrl('');
    setUrlError('');
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
            onClick={() => setOpenModal(true)}
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
        
        {/* Modal para modificar la URL de la imagen del avatar */}
        <ModalAvatar
          openModal={openModal}
          setOpenModal={setOpenModal}
          newAvatarUrl={newAvatarUrl}
          setNewAvatarUrl={setNewAvatarUrl}
          handleAvatarChange={handleAvatarChange}
          handleCancel={handleCancel}
          urlError={urlError}
          setUrlError={setUrlError}
        />

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