import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box, Grid } from '@mui/material';
import { DeleteOutlineOutlined as DeleteIcon, DescriptionOutlined as DescriptionI} from '@mui/icons-material';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';

function ItemItinerarios({ imagen, titulo, detalles, fecha }) {
    return (
        <Grid marginY={3} item xs={12} sm={8} md={6} lg={5} sx={{ display: 'flex', justifyContent: 'center' }}> {/* Centra la tarjeta */}
            <Card sx={{ maxWidth: '65%', backgroundColor: 'white', borderRadius: 2, boxShadow: 3, display: 'flex', border: '1px solid #489abb'}}>
                {/* Imagen a la izquierda */}
                <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={imagen}
                    alt={titulo}
                />

                <Box sx={{ flex: 1, padding: '16px' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lugares: {detalles}
                        </Typography>
                        <br />
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                color: '#E4007C',
                                borderColor: '#E4007C',
                                '&:hover': { borderColor: '#E4007C', backgroundColor: 'rgba(245, 0, 87, 0.1)' },
                                
                            }}
                        >
                            Más información
                        </Button>
                    </CardContent>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '16px' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                        Fecha: {fecha}
                    </Typography>
                    <Button variant="contained" size="large" sx={{ backgroundColor: '#E4007C', color: 'white', marginBottom: 1 }}>
                        Repetir
                    </Button>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton aria-label="download pdf" sx={{ color: '#E4007C' }}>
                            <DescriptionI fontSize='large' />
                        </IconButton>
                        <IconButton aria-label="delete" sx={{ color: '#E4007C' }}>
                            <DeleteIcon fontSize='large' />
                        </IconButton>
                    </Box>
                </Box>
            </Card>
        </Grid>
    );
}

export default ItemItinerarios;


