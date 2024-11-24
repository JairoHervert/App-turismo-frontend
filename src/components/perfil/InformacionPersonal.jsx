import React, { useState } from 'react';
import '../../css/Perfil.css';

import { Stack, Card, Typography, CardHeader, CardContent, Divider, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ButtonsMod from '../ButtonsMod';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
// íconos
import {Info as InfoIcon, Cake as CakeIcon, MailOutline as MailOutlineIcon, Badge as BadgeIcon, Phone as PhoneIcon, Flag as FlagIcon, NoMealsRounded } from '@mui/icons-material';

function InformacionPersonal({correoElectronico, nombre, apellido, fechaNacimiento, onSave }) {
    // para editar información personal
    const [ isEditing, setIsEditing] = useState(false);
    const [ formData, setFormData ] = useState({
        correoElectronico,
        nombre,
        apellido,
        fechaNacimiento,
    });

    // Para la validación del nombre
    const [nombreError, setNombreError] = useState(false);
    const [nombreHelperText, setNombreHelperText] = useState('Este campo es opcional');
    // Para la validación del apellido
    const [apellidoError, setApellidoError] = useState(false);
    const [apellidoHelperText, setApellidoHelperText] = useState('Este campo es opcional');
    // Para la validación de fecha de nacimiento
    const [fechaError, setFechaError] = useState(false);
    const [fechaHelperText, setFechaHelperText] = useState('La edad debe ser de entre 18 a 65 años');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, }));
        // validación nombre completo
        if (name === 'nombre') {
          validarNombre(value);
        } else if (name === 'apellido') {
          validarApellido(value);
        }
    }

    const handleEdit = () => {
        setIsEditing((prev) => !prev);
        
        if (!formData.nombre) {
          setNombreError(false);
          setNombreHelperText('Este campo es opcional');
        }
        if (!formData.apellido) {
          setApellidoError(false);
          setApellidoHelperText('Este campo es opcional');
        }
    }

    const handleSave = () => {
        let valid = true;
        
        if (formData.nombre || nombreError) {
          if (!validarNombre(formData.nombre)) {
            valid = false;
          }
        }
        if (formData.apellido || apellidoError) {
          if (!validarApellido(formData.apellido)) {
            valid = false;
          }
        }
        
        if (valid) {
          console.log('Datos guardados: ', formData);
          if (onSave) {
            onSave(formData);
          }
          setIsEditing(false);
        } else {
          console.log('Formulario no válido');
        } 
    }

    // Validación - Nombre
    const validarNombre = (nombre) => {
      if (nombre.trim() === '') {
        setNombreError(false);
        setNombreHelperText('Este campo es opcional');
        return true;
      }

      const esValido = /^[a-zA-ZÀ-ÿ\s]{3,}$/.test(nombre.trim());

      if (!esValido) {
        setNombreError(true);
        setNombreHelperText('El nombre debe contener al menos tres letras válidas');
        return false;
      } else {
        setNombreError(false);
        setNombreHelperText('');
        return true;
      }
    }

    // Validación - Apellido
    const validarApellido = (apellido) => {
      if (apellido.trim() === '') {
        setApellidoError(false);
        setApellidoHelperText('Este campo es opcional');
        return true;
      }
      // hay apellidos con solo dos letras
      const esValido = /^[a-zA-ZÀ-ÿ\s]{2,}$/.test(apellido.trim());
      
      if (!esValido) {
        setApellidoError(true);
        setApellidoHelperText('El nombre debe contener al menos dos letras válidas');
        return false;
      } else {
        setApellidoError(false);
        setApellidoHelperText('');
        return true;
      }
    }

    // Validación - Fecha de nacimiento
    const handleFechaNacimientoChange = (nuevaFecha) => {
      if (!nuevaFecha) {
        setFechaError(true);
        setFechaHelperText('La edad debe ser de entre 18 a 65 años');
        setFormData((prev) => ({
          ...prev,
          fechaNacimiento: null,
        }))
        return;
      }

      const fechaNacimientoActual = dayjs();
      const edad = fechaNacimientoActual.diff(nuevaFecha, 'year');

      if (edad < 18 || edad > 65) {
        setFechaError(true);
        setFechaHelperText('Edad fuera del rango permitido (18 a 65 años)')
      } else {
        setFechaError(false);
        setFechaHelperText('');
      }

      setFormData((prev) => ({
        ...prev,
        fechaNacimiento: nuevaFecha.format('DD-MM-YYYY'),
      }));
    }

    const isFormValid = () => {
      return !nombreError || !apellidoError || !fechaError;
    }

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
                  // Si no estás editando, cambia a editar
                  if (!isEditing) { 
                    setIsEditing(!isEditing);
                  }
                  // Si estás editando y el formato no es válido, no te deja guardar
                  else if (isFormValid() && isEditing) {
                    handleSave();
                  }
                }}
              />
            }
          />

        <Divider variant='middle' sx={{borderColor: 'rgb(0 0 0)'}}/>
        { /* Card - Correo, Nombre, FechaNacimiento, Teléfono, País */}
        <CardContent>
            { /* Sección - Correo, Nombre, FechaNacimiento */}
            <Stack direction='column' sx={{width: '100%'}}>
              {/* Correo electrónico */}
              <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                <Grid container sx={{width: '100%'}}>
                  <Grid size={{xs: 12, sm: 5, md: 4}}>
                      <Stack direction='row' spacing={1}>
                        <MailOutlineIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                        <Typography variant='body1' color='#777777'> 
                        Correo Electrónico
                        </Typography>
                      </Stack>
                  </Grid>              
                  <Grid size={{xs: 12, sm: 7, md: 8}} sx={{paddingTop: '0'}}>
                      {/* EDITAR CORREO ELECTRÓNICO */}
                        {isEditing ? (
                            <TextField
                                disabled // por si no se puede cambiar el correo
                                variant='outlined'
                                size='small'
                                name='correoElectronico'
                                value={formData.correoElectronico}
                                onChange={handleInputChange}
                                sx={{ width:'100%' }}
                            />
                        ) : (
                            <Typography variant='body1'>{formData.correoElectronico}</Typography>
                        )}
                  </Grid>
                </Grid>
              </Stack>
              { /* Nombre completo */}
              <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                <Grid container sx={{width: '100%'}}>
                  <Grid size={{xs: 12, sm: 5, md: 4}}>
                      <Stack direction='row' spacing={1}>
                        <BadgeIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                        <Typography variant='body1' color='#777777'> 
                          Nombre
                        </Typography>
                      </Stack>
                  </Grid>              
                  <Grid size={{xs: 12, sm: 7, md: 8}} sx={{paddingTop: '0'}}>
                    { /* EDITAR NOMBRE */}
                    {isEditing ? (
                        <TextField
                            fullWidth
                            variant='outlined'
                            size='small'
                            name='nombre'
                            value={formData.nombre}
                            onChange={handleInputChange}
                            error={nombreError}
                            helperText={nombreHelperText}
                        />
                    ) : (
                    <Typography variant='body1'>{formData.nombre || 'Sin especificar'}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Stack>
              { /* Apellido */}
              <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                <Grid container sx={{width: '100%'}}>
                  <Grid size={{xs: 12, sm: 5, md:4}}>
                      <Stack direction='row' spacing={1}>
                        <BadgeIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                        <Typography variant='body1' color='#777777'> 
                          Apellido
                        </Typography>
                      </Stack>
                  </Grid>              
                  <Grid size={{xs: 12, sm: 7, md:8}} sx={{paddingTop: '0'}}>
                    { /* EDITAR APELLIDO */}
                    {isEditing ? (
                        <TextField
                          fullWidth
                          variant='outlined'
                          size='small'
                          name='apellido'
                          value={formData.apellido}
                          onChange={handleInputChange}
                          error={apellidoError}
                          helperText={apellidoHelperText}
                        />
                    ) : (
                    <Typography variant='body1'>{formData.apellido || 'Sin especificar'}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Stack>
              { /* Fecha de nacimiento */}
              <Stack direction={{xs: 'row', sm: 'colum'}} spacing={5} className='perfil-informacion-personal-items'>
                <Grid container sx={{width: '100%'}}>
                  <Grid size={{xs: 12, sm: 5, md: 4}}>
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <CakeIcon fontSize='small' sx={{ color: '#73C2FB', opacity: '0.6'}} />
                        <Typography variant='body1' color='#777777'> 
                        Fecha de Nacimiento
                        </Typography>
                      </Stack>
                  </Grid>              
                  <Grid size={{xs: 12, sm: 7, md: 8}} sx={{paddingTop: '0'}}>
                    {/* EDITAR FECHA DE NACIMIENTO */}
                    {isEditing ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>               
                            <DatePicker 
                              sx={{ width: '100%', }}
                              format='DD-MM-YYYY'
                              margin='dense'
                              value={formData.fechaNacimiento ? dayjs(formData.fechaNacimiento, 'DD-MM-YYYY') : null}
                              /* maxDate y minDate ayudan para solo seleccionar una fecha
                                 dentro del rango permitido (18 - 65 años) */
                              maxDate={dayjs().subtract(18, 'year')}
                              minDate={dayjs().subtract(65, 'year')}
                              onChange={handleFechaNacimientoChange}
                              slotProps={{
                                textField: {
                                  error: fechaError,
                                  helperText: fechaHelperText,
                                }
                              }}
                            />
                        </LocalizationProvider>
                    ) : (
                    <Typography variant='body1'>{formData.fechaNacimiento ? dayjs(formData.fechaNacimiento, 'DD-MM-YYYY').format('DD-MM-YYYY') : 'Sin especificar'}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Stack>
              
            </Stack>
      
        </CardContent>
      </Card>
      
    );
  }

  export default InformacionPersonal;