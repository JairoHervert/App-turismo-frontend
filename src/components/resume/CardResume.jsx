import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import '../../css/CardResume.css';

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function Calendario({ diasMes }) {
    return (
        <Box className="ca-container">
            <Grid container spacing={1} justifyContent="center" className="ca-header">
                {diasSemana.map((dia, index) => (
                    <Grid key={index} item xs={12 / 7} className="ca-dia-semana">
                        <Typography variant="h6">
                            {dia}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={1} justifyContent="left">
                {diasMes.map((dia, index) => (
                    <Grid key={index} item xs={12 / 7} className="ca-dia">
                        <Typography variant="body1">{dia}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Calendario;