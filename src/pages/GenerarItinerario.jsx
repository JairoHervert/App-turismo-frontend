import React from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import { useState } from 'react';

import '../css/GenerarItinerario.css';

import { Container, Stack, Card, Typography, CardHeader, CardContent, Select, MenuItem } from '@mui/material';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Box, Slider, TextField, Button} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { Map as MapIcon, EventNote as EventNoteIcon, TipsAndUpdates as TipsAndUpdatesIcon, SwapHorizontalCircle as SwapHorizontalCircleIcon } from '@mui/icons-material';
import { Restaurant as RestaurantIcon, Festival as FestivalIcon, RadioButtonUncheckedRounded as RadioButtonUncheckedRoundedIcon} from '@mui/icons-material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';


const GenerarItinerario = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [numeroViajantes, setNumeroViajantes] = useState('');

    const [isFirstEnabled, setIsFirstEnabled] = useState(true);

    const handleIconClick = () => {
        // Cambia el estado de los TextFields (habilitar/deshabilitar)
        setIsFirstEnabled((prev) => !prev);
    };

    return (
    <div>
      <NavBarHome 
        showingresa={true} 
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

    <Container maxWidth='lg' className='my-4'>
        <Stack direction='row' spacing={1} alignItems='center' className='mb-2'>
            <MapIcon fontSize='large' sx={{ color: '#E4007C' }} className='map-icon-itinerario'/> 
            <h1 className='fw-bold h1-itinerario-title'>Generar Itinerario</h1>
            
        </Stack>
        <Typography sx={{marginBottom: '7px'}}>
                Para mejorar su experiencia, necesitamos algunos detalles de su viaje.
        </Typography>


        <Stack  direction={{ xs: 'column', sm: 'row' }} 
                spacing={1} 
                className='content-generarItinerario'
                sx={{
                    width: '100%',
                    justifyContent: 'space-between'
                }}
        >
            <Stack 
                direction='column'
                spacing={1}
                alignItems='center' 
                className='mb-2'
                sx={{
                    width: '95%',
                }}
            >
                <Card className='card-fechaViaje-generarItinerario'
                        sx={{
                            width: '100%'
                        }}
                >
                    <CardHeader
                        avatar={
                            <EventNoteIcon sx={{ color: '#E4007C' }} fontSize='medium'/> 
                        }
                        title= 'Fechas de viaje'
                        titleTypographyProps={{
                            sx: { 
                                fontSize: '1.2rem', 
                                fontWeight: 'medium',
                            }
                        }}
                    />
                    <CardContent>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}  alignItems='center' justifyContent={{ sm: 'center' }} sx={{marginTop: '0px'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack direction='column' sx={{width:'100%'}}>
                                    <Typography sx={{marginBottom: '7px'}} className='subtitulos-generarItinerario'>
                                        Fecha de inicio
                                    </Typography>
                                    <DatePicker 
                                        sx={{
                                            width: '100%',
                                        }}
                                        minDate={dayjs()} // fecha mínima como hoy
                                        format="DD-MM-YYYY"
                                    />
                                </Stack>
                                <Stack direction='column' sx={{width:'100%'}}>
                                    <Typography sx={{marginBottom: '7px'}} className='subtitulos-generarItinerario'>
                                        Fecha de fin
                                    </Typography>
                                    <DatePicker
                                        sx={{
                                            width: '100%',
                                        }}
                                        minDate={dayjs()} // fecha mínima como hoy
                                        format="DD-MM-YYYY"
                                    />
                                </Stack>
                                
                            </LocalizationProvider>
                        </Stack>
                    </CardContent>
                </Card>
                
                <Card className='card-presupuesto-generarItinerario'
                        sx={{
                            width: '100%'
                        }}
                >
                    <CardHeader
                        avatar={
                            <AttachMoneyRoundedIcon sx={{ backgroundColor: '#E4007C', color: '#FFF', borderRadius: '50%' }} /> 
                        }
                        title= 'Presupuesto'
                        titleTypographyProps={{
                            sx: { 
                                fontSize: '1.2rem', 
                                fontWeight: 'medium',
                            }
                        }}
                    />
                    <CardContent>
                            <Stack spacing={2} direction='row' sx={{ alignItems: 'center', mb: 1, marginBottom:'20px'}}>
                                <Stack direction='column'>
                                    <Typography sx={{marginBottom: '7px'}} className='subtitulos-generarItinerario'>
                                        Presupuesto total
                                    </Typography>
                                    <TextField
                                        disabled={!isFirstEnabled}
                                        required
                                        id="outlined-required"
                                        defaultValue='$1,200'
                                    />
                                </Stack>
                                
                                <SwapHorizontalCircleIcon onClick={handleIconClick} fontSize='large' sx={{ backgroundColor: '#FFF', color: '#E4007C', cursor: 'pointer' }} className='swap-presupuesto'/>
                                
                                <Stack direction='column'>
                                    <Typography sx={{marginBottom: '7px'}} className='subtitulos-generarItinerario'>
                                        Presupuesto por día
                                    </Typography>
                                    <TextField
                                        disabled={isFirstEnabled}
                                        id="outlined-disabled"
                                        defaultValue='$300'
                                    />
                                </Stack>
                            </Stack>

                        <Typography sx={{marginBottom: '7px'}}>
                                Disposición del presupuesto
                        </Typography>
                        <Box sx={{ width: '100%', marginTop: '20px'}}>
                            <Stack spacing={2} direction='row' sx={{ alignItems: 'center', mb: 1 }}>
                                    <Stack direction='column' sx={{ alignItems: 'center', mb: 1 }}>
                                        <RestaurantIcon sx={{ color: '#E4007C' }}/>
                                        <span>Comida</span>
                                    </Stack>
                                    
                                    <Slider defaultValue={50} aria-label='Default' valueLabelDisplay='auto' sx={{color: '#B9E5F7'}}/>
                                    
                                    <Stack direction='column' sx={{ alignItems: 'center', mb: 1 }}>
                                        <FestivalIcon sx={{ color: '#E4007C' }}/>
                                        <span>Sitios</span>
                                    </Stack>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Stack>
            
            

            <Card className='card-consideraciones-generarItinerario'
                    sx={{
                        width: '95%'
                    }}
            >
                <CardHeader
                    avatar={
                        <TipsAndUpdatesIcon sx={{ color: '#E4007C' }} /> 
                    }
                    title= 'Consideraciones'
                    titleTypographyProps={{
                        sx: { 
                            fontSize: '1.2rem', 
                            fontWeight: 'medium',
                        }
                    }}
                />
                <CardContent>
                    <div className='numero-viajantes'> 
                        <Typography sx={{marginBottom: '7px'}}>
                            Número de viajantes
                        </Typography>
                        
                        <FormControl fullWidth>
                            <Select
                                value={numeroViajantes}
                                onChange={(event) => setNumeroViajantes(event.target.value)}
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <Typography sx={{marginBottom: '7px'}}>
                        ¿Alguna consideración especial?
                    </Typography>

                    <FormGroup>
                        <FormControlLabel className='checkbox-consideraciones' control={<Checkbox {...label} icon={<RadioButtonUncheckedRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} />} label="Lugares para toda la familia" />
                        <FormControlLabel className='checkbox-consideraciones' control={<Checkbox {...label} icon={<RadioButtonUncheckedRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} />} label="Lugares Vegan-Fiendly" />
                        <FormControlLabel className='checkbox-consideraciones' control={<Checkbox {...label} icon={<RadioButtonUncheckedRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} />} label="Lugares Pet-Friendly" />
                        <FormControlLabel className='checkbox-consideraciones' control={<Checkbox {...label} icon={<RadioButtonUncheckedRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} />} label="Impedimento físico" />
                    </FormGroup>
        
                </CardContent>
            </Card>
        </Stack>
        <div className='btn-generarItinerario'>
            <Button variant="contained" sx={{backgroundColor: '#E4007C'}}>
                Continuar
            </Button>
        </div>
        
    </Container>
    

      <Footer 
        showIncorporaLugar={false} />
    </div>
  );
};

export default GenerarItinerario;
