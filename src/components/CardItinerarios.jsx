import React, { useState } from 'react';
import { Card, CardMedia, CardActionArea, CardActions, CardContent, Typography, Button, IconButton, Box, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DeleteOutlineOutlined as DeleteIcon, DescriptionOutlined as DescriptionIcon } from '@mui/icons-material';
import '../css/ItinerariesCard.css';
import InfoDialog from '../components/InfoItineraries';

function ItemItinerarios({ imagen, titulo, detalles, fecha }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} marginY={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card className='it-res-card' sx={{ width: '85%', display: 'flex', flexDirection: 'row', boxShadow: 6 }}>
                {/* Columna de la imagen */}
                <CardActionArea sx={{ width: 150, display: 'flex' }}>
                    <CardMedia
                        component='img'
                        sx={{ height: '100%', objectFit: 'cover', width: 150 }}
                        image={imagen}
                        alt='Lugar 1'
                    />
                </CardActionArea>

                {/* Columna de la información */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px' }}>
                    <CardContent>
                        <Typography gutterBottom variant='h5' textAlign={'center'} component='div' className='fw-semibold'>
                            {titulo}
                        </Typography>
                        <Typography variant='body2' textAlign={'left'} color='text.secondary'>
                            Lugares: {detalles}
                        </Typography>

                        <Box sx={{ display: 'flex', padding: '15px' }}>
                            <Button variant="outlined" size='small' onClick={handleClickOpen}>
                                Más información
                            </Button>
                        </Box>
                    </CardContent>
                </Box>

                {/* Columna de las acciones */}
                <Box sx={{ minWidth: '170px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px', gap: '12px' }}>
                    <Typography variant='body2' color='text.secondary' component='div'>
                        Fecha: {fecha}
                    </Typography>
                    <Button variant="contained" size="large" sx={{ marginBottom: '8px' }}>
                        Repetir
                    </Button>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <IconButton aria-label="download pdf" sx={{ color: '#E4007C', padding: '4px' }}>
                            <DescriptionIcon fontSize='large' />
                        </IconButton>
                        <IconButton aria-label="delete" sx={{ color: '#E4007C', padding: '4px' }}>
                            <DeleteIcon fontSize='large' />
                        </IconButton>
                    </Box>
                </Box>
            </Card>

            <InfoDialog open={open} onClose={handleClose} titulo={titulo} fecha={fecha} detalles={detalles} />

        </Grid>
    );
}

export default ItemItinerarios;



