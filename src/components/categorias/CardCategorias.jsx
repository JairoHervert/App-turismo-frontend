import React from 'react';

import { Card, Box, CardMedia, CardActionArea, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

function CardCategorias ({ categoria, onSelect, isSelected }) {

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
                key={categoria.id}
                sx={{
                position: 'relative',
                boxShadow: 3,
                height: { xs: 'auto', lg: '200px' },
                width: { xs: '100%' },
                outline: isSelected ? '2.5px solid RGB(225, 48, 167)' : 'none',
                }}
            >
                <CardActionArea  onClick={() => onSelect(categoria)} >
                    <CardMedia
                        component='img'
                        height='200'
                        image={categoria.imagen}
                        alt={categoria.nombre}
                    />
                    <Box
                        sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: '600' }}>
                        {categoria.nombre}
                        </Typography>
                    </Box>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default CardCategorias;