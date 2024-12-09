import React, { useState } from 'react';

import { Stack, Card, Typography, CardHeader, CardContent, Select, MenuItem, CardMedia } from '@mui/material';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Box, InputLabel } from '@mui/material';
import pasaporteImagen from '../../img/GenerarItinerario/generarItinerario-imagen-decorativo.avif';

import { TipsAndUpdates as TipsAndUpdatesIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon} from '@mui/icons-material';

function DetallesViaje () {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    // Número de viajantes - por defecto es un viajante
    const [numeroViajantes, setNumeroViajantes] = useState('1');

    return (
        <Stack
        direction='column'
        spacing={1}
        alignItems='center'
        sx={{
            width: '100%',
            alignItems: { xs: 'center', sm: 'end' },
            justifyContent: 'flex-start',
            display: 'flex',
            paddingLeft: { xs: 0, md: '1%' }
        }}
        >
            {/* Sección - Imagen decorativa */}
            <Card sx={{ width: '100%', }}>
                <CardMedia
                component='img'
                height='200px'
                image={pasaporteImagen}
                background='cover'
                alt='ImagenPasaporte'
                sx={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
                />
            </Card>
            
            {/* Card - Detalles de Viaje */}
            <Card className='gi-card-detallesViaje'
                sx={{
                width: '100%'
                }}
            >
                {/* Titulo - Detalles del viaje */}
                <CardHeader
                avatar={
                    <TipsAndUpdatesIcon sx={{ color: '#E4007C' }} />
                }
                title='Detalles del viaje'
                titleTypographyProps={{
                    sx: {
                    fontSize: '1.2rem',
                    fontWeight: 'medium',
                    }
                }}
                />
                {/* Contenido - Detalles del viaje */}
                <CardContent>
                <Box className='gi-card-detallesViaje-numeroViajantes'>
                    <FormControl fullWidth>
                        <InputLabel id='numero-viajantes-label'>Número de viajantes</InputLabel>
                        <Select
                            labelId='numero-viajantes-label'
                            label='Número de viajantes'
                            value={numeroViajantes}
                            onChange={(event) => setNumeroViajantes(event.target.value)}
                        >
                            {/* Length se puede modificar, de momento son 10 */}
                            {Array.from({ length: 10 }, (_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                                {i + 1}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Typography sx={{ marginBottom: '7px' }}>
                    ¿Alguna consideración especial?
                </Typography>

                <FormGroup>
                    <FormControlLabel className='gi-card-detallesViaje-checkbox' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Lugares para toda la familia' sx={{ marginLeft: 0, marginRight: 0 }} />
                    <FormControlLabel className='gi-card-detallesViaje-checkbox' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Lugares Vegan-Friendly' sx={{ marginLeft: 0, marginRight: 0, }} />
                    <FormControlLabel className='gi-card-detallesViaje-checkbox' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Lugares Pet-Friendly' sx={{ marginLeft: 0, marginRight: 0, }} />
                    <FormControlLabel className='gi-card-detallesViaje-checkbox' control={<Checkbox {...label} icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} />} label='Impedimento físico' sx={{ marginLeft: 0, marginRight: 0, }} />
                </FormGroup>

                </CardContent>
            </Card>
        </Stack>
    );
};

export default DetallesViaje;