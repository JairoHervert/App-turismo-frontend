import * as React from 'react';
import { Card, CardActionArea, CardMedia, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

function CardPref({ categorias, onSelect, subcategoriasSeleccionadas, onSubcategoriaSelect }) {
    return (
        <Grid container spacing={2} >
            {categorias.map((categoria) => (
                <React.Fragment key={categoria.id}>
                    <Grid size={{xs:12, sm:6, md:3.3, lg:2.4}}>
                        <Card sx={{ position: 'relative', boxShadow: 3,mb: 2 , height: { xs: 'auto', lg: '200px' }, width: { xs: '100%', lg: '200px' } }}>
                            <CardActionArea onClick={() => onSelect(categoria)}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={categoria.imagen}
                                    alt="green iguana"
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
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para mejorar la legibilidad
                                    }}
                                >
                                    <Typography variant="h5" component="div">
                                        {categoria.nombre}
                                    </Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    {subcategoriasSeleccionadas[categoria.id] && subcategoriasSeleccionadas[categoria.id].map((subcategoria) => (
                    <Grid size={{xs:12, sm:6, md:3.3, lg:2.4}} key={subcategoria.id}>
                            <Card sx={{ position: 'relative', boxShadow: 3, mb: 2 , height: { xs: 'auto', lg: '200px' }, width: { xs: '100%', lg: '200px' } }}>
                                <CardActionArea onClick={() => onSubcategoriaSelect(subcategoria)}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        alt="green iguana"
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
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para mejorar la legibilidad
                                        }}
                                    >
                                        <Typography variant="h6" component="div">
                                            {subcategoria.nombre}
                                        </Typography>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </React.Fragment>
            ))}
        </Grid>
    );
}

export default CardPref;
