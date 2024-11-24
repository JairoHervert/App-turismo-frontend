import React from 'react';
import '../../css/Perfil.css';

import { Box, Avatar, Stack, Card, Typography } from '@mui/material';

import {Map as MapIcon, FavoriteRounded as FavoriteRoundedIcon, Star as StarIcon, Edit as EditIcon } from '@mui/icons-material';

function InformacionHeader({ nombreUsuario, itinerariosCreados, favoritos, deseados }) {

    return (
        <Card className='perfil-usuario-header'>
            <Stack direction={{xs: 'column', sm:'row'}} alignItems='center'>
              {/* Avatar Usuario Header */}
              <Box sx={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    backgroundColor: '#999999',
                  }}
                >
                  JM
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
                >
                  <EditIcon color='primary'></EditIcon>
                </Box>
              </Box>
              
              {/* Perfil Usuario Header Informacion */}
              <Stack direction='column' sx={{width: '100%'}} className='perfil-usuario-header-informacion'>
                {/* Nombre Usuario Header */}
                <Typography variant='h3' fontWeight={'bold'} className='perfil-usuario-header-username'>
                  {nombreUsuario}
                </Typography>
                {/*direction={{ xs: 'column', sm: 'row' }} */}
                <Stack 
                  direction='row'
                  justifyContent='flex-start'
                  alignItems='flex-start'
                  sx={{marginTop: '10px'}}
                  className='perfil-usuario-informacion-listado'
                >
                    {/* Itinerarios Creados Usuario Header */}
                    <Stack direction='column' spacing={1} alignItems='start' className='perfil-usuario-listado'>
                      <span className='perfil-usuario-header-span'> 
                      Itinerarios creados
                      </span>
                      <Stack direction='row' sx={{alignItems: 'center'}}>
                        <MapIcon className='perfil-usuario-header-icon' />
                        <Typography variant='body1' className='perfil-usuario-header-font'> 
                            {itinerariosCreados}
                        </Typography>
                      </Stack>
                    </Stack>

                    {/* Lista Favoritos Usuario Header */}
                    <Stack direction='column' spacing={1} alignItems='start' className='perfil-usuario-listado'>
                        <span className='perfil-usuario-header-span'> 
                        Favoritos
                        </span>
                        <Stack direction='row' sx={{alignItems: 'center'}}>
                          <FavoriteRoundedIcon className='perfil-usuario-header-icon'/>
                          <Typography variant='body1' className='perfil-usuario-header-font'> 
                            {favoritos}
                          </Typography>
                        </Stack>
                    </Stack>
                    
                    {/* Lista Deseados Usuario Header */}
                    <Stack direction='column' spacing={1} alignItems='start' className='perfil-usuario-listado'>
                        <span className='perfil-usuario-header-span'> 
                        Deseados
                        </span>
                        <Stack direction='row' sx={{alignItems: 'center'}}>
                          <StarIcon className='perfil-usuario-header-icon'/>
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