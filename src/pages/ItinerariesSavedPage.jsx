import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/ItinerariesSavedPage.css';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, Grid, TextField, Box, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Bookmark as BookmarkIcon} from '@mui/icons-material';
import ItemItinerarios from '../components/CardItinerarios';


import Imagen1 from '../img/ItinerariesPage/places/itineraries-Xochimilco.jpg';
import Imagen2 from '../img/ItinerariesPage/places/itineraries-Grutas.jpg';
import Imagen3 from '../img/ItinerariesPage/places/itineraries-Acuario.jpg';

function ItinirariesSavePage() {

    return(
        <ThemeProvider theme={ThemeMaterialUI}>
            <Navbar
                showingresa={false}
                showRegistrate={false}
                transparentNavbar={false}
                lightLink={false}
                staticNavbar={false}
            />

            <Container maxWidth='lg' className='my-4'>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems='center' className='mb-4' justifyContent={{ sm: 'space-between' }}>
                    <Stack direction='row' spacing={1} alignItems='center' className='mb-2'>
                        <BookmarkIcon color='primary' fontSize='inhert' className='fav_pag-icono-corazon' /> {/* Ahora usa el color primario del tema */}
                        <h1 className='page-title'>Itinerarios guardados</h1>
                    </Stack>

                    <TextField 
                        label="Buscar en itinerarios guardados" 
                        variant="outlined" 
                        size="small" 
                        sx={{ maxWidth: 250 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <ItemItinerarios
                    imagen={Imagen1}
                    titulo="Xochimilco"
                    detalles="Restaurante 'Fernando', florería 'Daniela', trajineras 'Xochimilco'"
                    fecha="26/07/2019"
                />

                <ItemItinerarios
                    imagen={Imagen2}
                    titulo="Grutas de Tolantongo"
                    detalles="Hotel 'Estrella', restaurante 'El señor', gruta 'Tolantongo'"
                    fecha="26/07/2019"
                />

                <ItemItinerarios
                    imagen={Imagen3}
                    titulo="Acuario Inbursa"
                    detalles="Museo 'Soumaya', museo 'Jumex', cafetería 'Hello Kitty', plaza 'Antara', acuario 'Inbursa'"
                    fecha="26/07/2019"
                />               

            </Container>

            <Footer showIncorporaLugar={true} />
        </ThemeProvider>
    );
    
}

export default ItinirariesSavePage;