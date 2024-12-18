import React, { useState } from 'react';
import { Card, CardMedia, CardActionArea, CardContent, Typography, Button, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DeleteOutlineOutlined as DeleteIcon, DescriptionOutlined as DescriptionIcon } from '@mui/icons-material';
import InfoDialog from './InfoItineraries';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyDocument } from '../pdf'; // Importa MyDocument desde pdf.jsx
import img from '../../img/Itinerary/turist-for-another.jpg';
import AlertD from '../alert';

import { useRef } from 'react'; 


function ItemItinerarios({ imagen, detalles, fechaInicio, fechaFin, itinerario }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:660px)');
    const alertRef = useRef();

    //funcion para abrir la alerta
    const handleClickOpen = () => {
        if (alertRef.current) {
            alertRef.current.handleClickOpen();
        }
    };

    const handleNavigation = () => navigate('/itineraryFinal');
    

    const handleClose = () => {
        setOpen(false);
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
                                onClick={handleNavigation}
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
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <PDFDownloadLink
                            document={<MyDocument data={itinerario} />}
                            fileName="Itinerario_Aztlán.pdf"
                            style={{
                                textDecoration: 'none',
                                color: '#E4007C',
                                padding: '4px'
                            }}
                        >
                            {({ loading }) => (
                                <IconButton aria-label="download pdf" sx={{ color: '#E4007C', padding: '4px' }}>
                                    <DescriptionIcon fontSize='large' />
                                </IconButton>
                            )}
                        </PDFDownloadLink>
                        <IconButton
                            aria-label="delete"
                            sx={{ color: '#E4007C', padding: '4px' }}
                            onClick={handleClickOpen}
                        >
                            <DeleteIcon fontSize='large' />
                        </IconButton>
                        <AlertD
                            ref={alertRef}
                            titulo="¿Estás seguro de eliminar el itinerario?"
                            mensaje="Una vez eliminado, no podrás recuperar la información."
                            imagen={img}
                            //el botón 1 no es obligatorio,por ejemplo, se puede mostrar nada mas como un mensaje por si no selecciona una opción o así
                            boton1="Aceptar"
                            boton2="Cancelar"
                            onConfirm={handleDeleteItinerary}
                        />
                    </Box>
                </Box>
            </Card>
        </Grid>
    );
}

export default ItemItinerarios;
