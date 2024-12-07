import React from 'react';

import { Stack, Card, Typography, CardHeader, CardContent, Slider, TextField, InputAdornment } from '@mui/material';
import { Restaurant as RestaurantIcon, Festival as FestivalIcon, AttachMoneyRounded as AttachMoneyRoundedIcon, Tune as TuneIcon } from '@mui/icons-material';

function Presupuesto ({ isFirstEnabled, presupuesto, setPresupuesto, error, setError, helperText, setHelperText }) {

    const validarPresupuesto = (valor) => {
        setPresupuesto(valor);
        const regex = /^0$|^[1-9][0-9]*$/;
        if (valor === '') {
          setError(true);
          setHelperText('Este campo no debe estar vacío');
        } else if (regex.test(valor)) {
          setError(false);
          setHelperText('');
        } else {
          setError(true);
          setHelperText('Ingresa solo valores numéricos enteros');
        }
    };

    return (
        <Card className='gi-card-presupuesto' sx={{ width: '100%' }}>
            {/* Presupuesto - Header */}
            <CardHeader
                avatar={ <AttachMoneyRoundedIcon sx={{ backgroundColor: '#E4007C', color: '#FFF', borderRadius: '50%' }} /> }
                title='Presupuesto'
                titleTypographyProps={{
                    sx: { fontSize: '1.2rem', fontWeight: 'medium' }
                }}
            />
            {/* Presupuesto - Contenido */}
            <CardContent>

                <Typography sx={{ marginBottom: '20px', justifyContent: 'center' }} className='gi-card-titulo-apartados'>
                    Para crear un itinerario adaptado a tus necesidades, es importante que ingreses el presupuesto disponible.
                </Typography>

                {/* Aquí se ingresa el presupuesto total */}
                <Stack spacing={2} direction='row' sx={{ alignItems: 'center', mb: 1 }}>
                    <TextField
                        required
                        disabled={!isFirstEnabled}
                        label='Presupuesto total'
                        value={presupuesto}
                        onChange={(e) => validarPresupuesto(e.target.value)}
                        sx={{ width: '100%' }}
                        // errores
                        helperText={helperText}
                        error={error}
                        slotProps={{
                            input: {
                            startAdornment: ( <InputAdornment position='start'>$</InputAdornment> ),
                            },
                        }}
                    />
                </Stack>

            </CardContent>
            {/* Disposición del presupuesto - Header */}
            <CardHeader
                avatar={ <TuneIcon sx={{ color: '#E4007C' }} /> }
                title='Disposición del presupuesto'
                titleTypographyProps={{
                    sx: { fontSize: '1.2rem', fontWeight: 'medium' }
                }}
            />

            {/* Disposición del presupuesto - Contenido */}
            <CardContent>

                <Typography sx={{ marginBottom: '20px' }}>
                    Utiliza los controles deslizantes para asignar el porcentaje del total disponible a cada opción según tus preferencias.
                </Typography>

                <Stack sx={{ width: '100%', marginTop: '20px' }} direction='row'>

                    <Stack spacing={2} direction='column' sx={{ marginRight: '15px' }}>
                        {/* Control deslizante - Comida */}
                        <Stack direction='column' sx={{ alignItems: 'center', mb: 1 }}>
                            <RestaurantIcon sx={{ color: '#E4007C' }} />
                            <span>Comida</span>
                        </Stack>
                        { /* Control deslizante - Sitios */}
                        <Stack direction='column' sx={{ alignItems: 'center', mb: 1 }}>
                            <FestivalIcon sx={{ color: '#E4007C' }} />
                            <span>Sitios</span>
                        </Stack>
                    </Stack>

                    <Stack spacing={2} direction='column' width='100%' justifyContent='space-between'>
                        {/* Control deslizante - Comida */}
                        <Slider defaultValue={5} min={1} max={10} step={1} aria-label='Comida' valueLabelDisplay='auto' sx={{ color: '#B9E5F7' }} />
                        { /* Control deslizante - Sitios */}
                        <Slider defaultValue={5} min={1} max={10} step={1} aria-label='Sitios' valueLabelDisplay='auto' sx={{ color: '#B9E5F7' }} />
                    </Stack>    

                </Stack>

            </CardContent>
        </Card>
    );
};

export default Presupuesto;