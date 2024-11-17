import React from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
// estilos
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/Perfil.css';

import { Container, Avatar, Stack, Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Divider, Chip, Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import {Info as InfoIcon, Cake as CakeIcon, MailOutline as MailOutlineIcon, Badge as BadgeIcon, Map as MapIcon, FavoriteRounded as FavoriteRoundedIcon } from '@mui/icons-material';
import {Star as StarIcon, Edit as EditIcon, Category as CategoryIcon, Phone as PhoneIcon, Flag as FlagIcon} from '@mui/icons-material';

const categorias = ['Parques', 'Museos', 'Restaurantes', 'Cafeterías', 'Playas', 'Atracciones', 'Familiares', 'Hospitales', 'Empresas', 'Aeropuerto', 'Bar', 'Gym','Galería de Arte', 'Iglesia'];

/* ¡ IMPORTANTE ! ESTA VERSIÓN NO UTILIZA COMPONENTES, SIN EMBARGO SE ESTÁ TRABAJANDO EN ELLO.
   ESTO DEBIDO A QUE AÚN ESTOY TRABAJANDO EN LA VERSIÓN PARA PODER EDITAR LA INFORMACIÓN SIN 
   QUE TE REDIRIJA A OTRA PÁGINA. EN LA VERSIÓN FINAL SI SE ESPERA HACER USO DE COMPONENTES. */

const Perfil = () => {

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <NavBarHome
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

    <div className='perfil-usuario-background'>
    </div>
      <Container maxWidth='lg' className='md-4'>
        {/* Perfil Usuario Header */}
        
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
                  juan.molina
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
                      <Stack direction='row'>
                        <MapIcon className='perfil-usuario-header-icon' />
                        <Typography variant='h4'> 
                        46
                        </Typography>
                      </Stack>
                    </Stack>

                    {/* Lista Favoritos Usuario Header */}
                    <Stack direction='column' spacing={1} alignItems='start' className='perfil-usuario-listado'>
                        <span className='perfil-usuario-header-span'> 
                        Favoritos
                        </span>
                        <Stack direction='row'>
                          <FavoriteRoundedIcon className='perfil-usuario-header-icon'/>
                          <Typography variant='h4'> 
                          46
                          </Typography>
                        </Stack>
                    </Stack>
                    
                    {/* Lista Deseados Usuario Header */}
                    <Stack direction='column' spacing={1} alignItems='start' className='perfil-usuario-listado'>
                        <span className='perfil-usuario-header-span'> 
                        Deseados
                        </span>
                        <Stack direction='row'>
                          <StarIcon className='perfil-usuario-header-icon'/>
                          <Typography variant='h4'> 
                          46
                          </Typography>
                        </Stack>
                    </Stack>
                  </Stack>
              
              </Stack>
            </Stack>
            
          </Card>
        

        { /* Información Personal Usuario */}
        <Card
            className='perfil-usuario-card-informacion-personal'
            sx={{
              padding: '1%',
            }}>
            <CardHeader
                avatar={
                  <InfoIcon sx={{ backgroundColor: '#E4007C', color: '#FFF', borderRadius: '50%' }} />
                }
                title='Información Personal'
                titleTypographyProps={{
                  sx: {
                    fontSize: '1.2rem',
                    fontWeight: 'medium',
                  }
                }}
                action={
                  <Button
                    variant='outlined'
                    color='primary'
                    size='small'
                  >
                    Editar
                  </Button>
                }
              />
            <Divider variant='middle' sx={{borderColor: 'rgb(0 0 0)'}}/>
            <CardContent>
              <Stack direction={{xs: 'column', md: 'row'}} sx={{width: '100%'}}>
                
                <Stack direction='column' sx={{width: '100%'}}>

                  <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                    <Grid container>
                      <Grid item xs={12} sm={5} md={5}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <MailOutlineIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                            <Typography variant='body1' color='#777777'> 
                            Correo Electrónico
                            </Typography>
                          </Stack>
                      </Grid>              
                      <Grid item sm={6} md={7} sx={{paddingTop: '0'}}>
                        <Box>
                          <Typography variant='body1' >
                            puncorreocasualee@gmail.com
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                    <Grid container>
                      <Grid item xs={12} sm={5} md={5}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <BadgeIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                            <Typography variant='body1' color='#777777'> 
                            Nombre
                            </Typography>
                          </Stack>
                      </Grid>              
                      <Grid item sm={6} md={7} sx={{paddingTop: '0'}}>
                        <Box>
                          <Typography variant='body1' >
                            César Peso Pluma
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                    <Grid container>
                      <Grid item xs={12} sm={5} md={5}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <CakeIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                            <Typography variant='body1' color='#777777'> 
                            Fecha de Nacimiento
                            </Typography>
                          </Stack>
                      </Grid>              
                      <Grid item sm={6} md={7} sx={{paddingTop: '0'}}>
                        <Box>
                          <Typography variant='body1' >
                            10/10/2024
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>
                  
                </Stack>

                <Stack direction={{sm: 'column'}} sx={{width: '80%'}}>

                  <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={5}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <PhoneIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                            <Typography variant='body1' color='#777777'> 
                            Teléfono
                            </Typography>
                          </Stack>
                      </Grid>              
                      <Grid item sm={6} md={7} sx={{paddingTop: '0'}}>
                        <Box>
                          <Typography variant='body1' >
                            +52 4455060396
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={5}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <FlagIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                            <Typography variant='body1' color='#777777'> 
                            País
                            </Typography>
                          </Stack>
                      </Grid>              
                      <Grid item sm={6} md={7} sx={{paddingTop: '0'}}>
                        <Box>
                          <Typography variant='body1' >
                            México
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>

                </Stack>

              </Stack>
          
            </CardContent>
        </Card>
                
        { /* Categorías de Interés Usuario */}
        <Card
            sx={{
              padding: '1%',
              marginTop: '50px',
              marginBottom: '50px',
            }}>
            <CardHeader
                avatar={
                  <CategoryIcon color='primary' />
                }
                title='Categorías de Interés'
                titleTypographyProps={{
                  sx: {
                    fontSize: '1.2rem',
                    fontWeight: 'medium',
                  }
                }}
                action={
                  <Button
                    variant='outlined'
                    color='primary'
                    size='small'
                  >
                    Editar
                  </Button>
                }
              />
            <Divider variant='middle' sx={{borderColor: 'rgb(0 0 0)'}}/>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
              {categorias.map((category, index) => (
                <Chip
                key={index}
                  label={category}
                  clickable
                  sx={{
                    backgroundColor: '#FFFF',
                    color: '#E4007C',
                    border: '1px solid #E4007C',
                    '&:hover': {
                      backgroundColor: '#E4007C',
                      color: '#FFFF',
                    }
                  }}
                />
              ))}
              </Box>
            </CardContent>
        </Card>

      </Container>
    

      <Footer
        showIncorporaLugar={false} />
    </ThemeProvider>
  );


};

export default Perfil;
