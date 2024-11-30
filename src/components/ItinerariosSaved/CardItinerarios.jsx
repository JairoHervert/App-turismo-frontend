import React, { useState } from 'react';
import { Card, CardMedia, CardActionArea, CardContent, Typography, Button, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DeleteOutlineOutlined as DeleteIcon, DescriptionOutlined as DescriptionIcon } from '@mui/icons-material';
import InfoDialog from './InfoItineraries';

function ItemItinerarios({ imagen, detalles, fechaInicio, fechaFin, presupuesto, viajantes }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:660px)');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleViewPDF = () => {
        // Simulación de la función para ver el PDF
        // Aquí el equipo de backend deberá implementar la lógica para generar y mostrar el PDF
        alert('Ver PDF del itinerario');
        // Ejemplo de llamada a una función de backend
        // viewPDF(itinerarioId);
    };

    const handleDeleteItinerary = () => {
        // Simulación de la función para eliminar el itinerario
        // Aquí el equipo de backend deberá implementar la lógica para eliminar el itinerario
        alert('Eliminar itinerario');
        // Ejemplo de llamada a una función de backend
        // deleteItinerary(itinerarioId);
    };
    return (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} marginY={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card className='it-res-card' sx={{
                width: '85%',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                boxShadow: 6
            }}>
                {/* Columna de la imagen */}

                    <CardMedia
                        component='img'
                        sx={{
                            height: isMobile ? 200 : '100%',
                            objectFit: 'cover',
                            width: isMobile ? '100%' : 150
                        }}
                        image={imagen}
                        alt='Lugar 1'
                    />

                {/* Columna de la información */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '16px'
                }}>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant='h5'
                            textAlign={'center'}
                            component='div'
                            className='fw-semibold'
                        >
                            Itinerario {fechaInicio}
                        </Typography>
                        <Typography
                            variant='body2'
                            textAlign={'left'}
                            color='text.secondary'
                            sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitLineClamp: 2, // Limita a 2 líneas
                            }}
                        >
                            <strong>Lugares: </strong>{detalles.join(', ')}

                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            padding: '15px',
                            justifyContent: isMobile ? 'center' : 'flex-start'
                        }}>
                            <Button
                                variant="outlined"
                                size='small'
                                onClick={handleClickOpen}
                            >
                                Más información
                            </Button>
                        </Box>
                    </CardContent>
                </Box>

                {/* Columna de las acciones */}
                <Box sx={{
                    minWidth: isMobile ? '100%' : '170px',
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    gap: '12px',
                    borderLeft: isMobile ? 'none' : '1px solid',
                    borderTop: isMobile ? '1px solid' : 'none',
                    borderColor: 'divider',
                    bgcolor: 'background.paper'
                }}>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        component='div'
                    >
                        Inicio: {fechaInicio}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        component='div'
                    >
                        Fin: {fechaFin}
                    </Typography>
                    {/*
                    <Button 
                        variant="contained" 
                        size="large" 
                        sx={{ 
                            marginBottom: isMobile ? 0 : '8px',
                            bgcolor: '#E4007C',
                            '&:hover': {
                                bgcolor: '#c40069'
                            }
                        }}
                    >
                        Repetir
                    </Button>
                    */}
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <IconButton
                            aria-label="download pdf"
                            sx={{ color: '#E4007C', padding: '4px' }}
                            onClick={handleViewPDF}
                        >
                            <DescriptionIcon fontSize='large' />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            sx={{ color: '#E4007C', padding: '4px' }}
                            onClick={handleDeleteItinerary}
                        >
                            <DeleteIcon fontSize='large' />
                        </IconButton>
                    </Box>
                </Box>
            </Card>

            <InfoDialog
                open={open}
                onClose={handleClose}
                titulo={fechaInicio}
                fechaInicio={fechaInicio}
                fechaFinal={fechaFin}
                presupuesto={presupuesto}
                viajantes={viajantes}
                detalles={detalles}
            />
        </Grid>
    );
}

export default ItemItinerarios;



