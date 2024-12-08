import React from 'react';

import { Card, CardHeader, CardContent, Stack, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { EventNote as EventNoteIcon } from '@mui/icons-material';

function FechasDeViaje ({ fechaInicio, setFechaInicio, fechaFin, setFechaFin, errorFechaFin, setErrorFechaFin }) {

    const handleFechaInicioChange = (nuevaFechaInicio) => {
        setFechaInicio(nuevaFechaInicio);
        if (nuevaFechaInicio.isAfter(fechaFin)) {
        setErrorFechaFin(true);
        } else {
        setErrorFechaFin(false);
        }
    }

    const hanldeFechaFinChange = (nuevoFechaFin) => {
        setFechaFin(nuevoFechaFin);
        if (nuevoFechaFin.isBefore(fechaInicio)) {
        setErrorFechaFin(true);
        } else {
        setErrorFechaFin(false);
        }
    }

    return (
    
    <Card className='gi-card-fechasViaje'
        sx={{
        width: '100%'
        }}
    >
        <CardHeader
        avatar={
            <EventNoteIcon sx={{ color: '#E4007C' }} fontSize='medium' />
        }
        title='Fechas de viaje'
        titleTypographyProps={{
            sx: {
            fontSize: '1.2rem',
            fontWeight: 'medium',
            }
        }}
        />
        <CardContent>

        <Typography className='gi-card-titulo-apartados' sx={{ marginBottom: '30px' }}>
            Selecciona la fecha de inicio y la fecha de fin de tu viaje.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2} alignItems='flex-start' justifyContent={{ sm: 'center' }} sx={{ marginTop: '0px' }}>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>   {/*quitar el dapterLocale si se perciben errores del input (undefined o NaN)*/}
            { /* Fecha de inicio */}
            <Stack direction='column' sx={{ width: '100%' }}>
                <DatePicker
                sx={{ width: '100%', }}
                label='Fecha de inicio'
                minDate={dayjs()} // fecha mínima como hoy
                value={fechaInicio} // asigna la fecha de hoy por defecto
                onChange={handleFechaInicioChange} // se actualiza al elegir una nueva fecha
                format='DD-MM-YYYY'
                margin='dense'
                />
            </Stack>
            { /* Fecha de fin */}
            <Stack direction='column' sx={{ width: '100%' }}>
                <DatePicker
                sx={{ width: '100%', }}
                label='Fecha de fin'
                minDate={fechaInicio} // fecha mínima será la de inicio
                value={fechaFin}
                onChange={hanldeFechaFinChange}
                format='DD-MM-YYYY'
                margin='dense'
                slotProps={{
                    textField: {
                    // marca un error si la fecha de fin es antes de la de inicio
                    error: errorFechaFin,
                    helperText: errorFechaFin ? 'Selecciona una fecha de fin válida' : '',
                    }
                }}
                />
            </Stack>

            </LocalizationProvider>
        </Stack>
        </CardContent>
    </Card>
    
    );
};

export default FechasDeViaje;