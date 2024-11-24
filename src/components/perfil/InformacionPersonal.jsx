import React, { useState } from 'react';
import '../../css/Perfil.css';

import { Stack, Card, Typography, CardHeader, CardContent, Divider, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ButtonsMod from '../ButtonsMod';
// íconos
import {Info as InfoIcon, Cake as CakeIcon, MailOutline as MailOutlineIcon, Badge as BadgeIcon, Phone as PhoneIcon, Flag as FlagIcon } from '@mui/icons-material';

function InformacionPersonal({correoElectronico, nombreCompleto, fechaNacimiento, telefono, pais, onSave }) {

    const [ isEditing, setIsEditing] = useState(false);
    const [ formData, setFormData ] = useState({
        correoElectronico,
        nombreCompleto,
        fechaNacimiento,
        telefono,
        pais,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, }));
    };

    const handleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSave = () => {
        console.log('Datos guardados: ', formData);
        if(onSave) {
            onSave(formData);
        }
        setIsEditing(false);
    };

    return (
    <Card
        className='perfil-usuario-card-informacion-personal'
        sx={{ padding: '1%', }}>
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
              <ButtonsMod
                variant='secundario'
                textCont={isEditing ? 'Guardar' : 'Editar'}
                width='auto'
                height='auto'
                clickEvent={() => {
                    if (isEditing) handleSave();
                    setIsEditing(!isEditing);
                }}
                type='submit'
              />
            }
          />

        <Divider variant='middle' sx={{borderColor: 'rgb(0 0 0)'}}/>

        <CardContent>
          <Stack direction={{xs: 'column', md: 'row'}} sx={{width: '100%'}}>
            
            <Stack direction='column' sx={{width: '100%', marginRight: '10px'}}>

              <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                <Grid container sx={{width: '100%'}}>
                  <Grid size={{xs: 12, sm: 5}}>
                      <Stack direction='row' spacing={1}>
                        <MailOutlineIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                        <Typography variant='body1' color='#777777'> 
                        Correo Electrónico
                        </Typography>
                      </Stack>
                  </Grid>              
                  <Grid size={{xs: 12, sm: 7}} sx={{paddingTop: '0'}}>
                      {/* EDITAR CORREO ELECTRÓNICO */}
                        {isEditing ? (
                            <TextField
                                variant='outlined'
                                size='small'
                                name='correoElectronico'
                                value={formData.correoElectronico}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <Typography variant='body1'>{formData.correoElectronico}</Typography>
                        )}
                  </Grid>
                </Grid>
              </Stack>

              <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                <Grid container sx={{width: '100%'}}>
                  <Grid size={{xs: 12, sm: 5}}>
                      <Stack direction='row' spacing={1}>
                        <BadgeIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                        <Typography variant='body1' color='#777777'> 
                        Nombre Completo
                        </Typography>
                      </Stack>
                  </Grid>              
                  <Grid size={{xs: 12, sm: 7}} sx={{paddingTop: '0'}}>
                    { /* EDITAR NOMBRE */}
                    {isEditing ? (
                        <TextField
                            fullWidth
                            variant='outlined'
                            size='small'
                            name='nombreCompleto'
                            value={formData.nombreCompleto}
                            onChange={handleInputChange}
                        />
                    ) : (
                    <Typography variant='body1'>{formData.nombreCompleto}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Stack>

              <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                <Grid container sx={{width: '100%'}}>
                  <Grid size={{xs: 12, sm: 5}}>
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <CakeIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                        <Typography variant='body1' color='#777777'> 
                        Fecha de Nacimiento
                        </Typography>
                      </Stack>
                  </Grid>              
                  <Grid size={{xs: 12, sm: 7}} sx={{paddingTop: '0'}}>
                    {/* EDITAR FECHA DE NACIMIENTO */}
                    {isEditing ? (
                        <TextField
                            fullWidth
                            variant='outlined'
                            size='small'
                            type='date'
                            name='fechaNacimiento'
                            value={formData.fechaNacimiento}
                            onChange={handleInputChange}
                        />
                    ) : (
                    <Typography variant='body1'>{formData.fechaNacimiento}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Stack>
              
            </Stack>

            <Stack direction={{sm: 'column'}} sx={{width: '80%'}}>

              <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                <Grid container sx={{width: '100%'}}>
                  <Grid size={{xs: 12, sm: 6, md: 5}}>
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <PhoneIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                        <Typography variant='body1' color='#777777'> 
                        Teléfono
                        </Typography>
                      </Stack>
                  </Grid>              
                  <Grid size={{xs: 12, sm: 6, md: 7}} sx={{paddingTop: '0'}}>
                    {/* EDITAR TELEFONO *** ESTE CAMPO SE PUEDE QUITAR SI NO SE CONTEMPLA EN LA BASE DE DATOS */}
                    {isEditing ? (
                        <TextField
                            fullWidth
                            variant='outlined'
                            size='small'
                            name='telefono'
                            value={formData.telefono}
                            onChange={handleInputChange}
                        />
                    ) : (
                    <Typography variant='body1'>{formData.telefono}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Stack>

              <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                <Grid container sx={{width: '100%'}}>
                  <Grid size={{xs: 12, sm: 6, md: 5}}>
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <FlagIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                        <Typography variant='body1' color='#777777'> 
                        País
                        </Typography>
                      </Stack>
                  </Grid>              
                  <Grid size={{xs: 12, sm: 6, md: 7}} sx={{paddingTop: '0'}}>
                    { /* EDITAR PAIS ** ESTE CAMPO SE PUEDE QUITAR SI NO SE CONTEMPLA EN LA BASE DE DATOS */}
                    {isEditing ? (
                        <TextField
                            fullWidth
                            variant='outlined'
                            size='small'
                            name='pais'
                            value={formData.pais}
                            onChange={handleInputChange}
                        />
                    ) : (
                    <Typography variant='body1'>{formData.pais}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Stack>

            </Stack>

          </Stack>
      
        </CardContent>
    </Card>
      
    );
  }

  export default InformacionPersonal;