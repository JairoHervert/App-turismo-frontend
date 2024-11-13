import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/ItinerariesSavedPage.css';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, Grid, TextField, Box, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Bookmark as BookmarkIcon } from '@mui/icons-material';
import ItemItinerarios from '../components/CardItinerarios';


import Imagen1 from '../img/ItinerariesPage/places/itineraries-Xochimilco.jpg';
import Imagen2 from '../img/ItinerariesPage/places/itineraries-Grutas.jpg';
import Imagen3 from '../img/ItinerariesPage/places/itineraries-Acuario.jpg';

function ItinirariesSavePage() {

    return (
        <ThemeProvider theme={ThemeMaterialUI}>
        <Navbar
            showingresa={false}
            showRegistrate={false}
            transparentNavbar={false}
            lightLink={false}
            staticNavbar={false}
        />

        <Container maxWidth='lg' className='it-my-4'>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems='center' className='it-mb-4' justifyContent={{ sm: 'space-between' }}>
            <Stack direction='row' spacing={1} alignItems='center' className='it-mb-2'>
                <BookmarkIcon color='primary' fontSize='inhert' className='it_pag-icono-book' /> {/* Ahora usa el color primario del tema */}
                <h1 className='it-page-title'>Itinerarios guardados</h1>
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

            <Box className="resume-calendar-container" sx={{ maxHeight: '65vh', overflowY: 'auto' }}>
                
                    <ItemItinerarios
                    imagen={Imagen1}
                    titulo="Itinerario para un domingo"
                    detalles="Restaurante 'Fernando', florería 'Daniela', trajineras 'Xochimilco'"
                    fecha="26/07/2019"
                    />

                    <ItemItinerarios
                    imagen={Imagen2}
                    titulo="Itinerario para ir de vacaciones"
                    detalles="Hotel 'Estrella', restaurante 'El señor', gruta 'Tolantongo'"
                    fecha="26/07/2019"
                    />

                    <ItemItinerarios
                    imagen={Imagen3}
                    titulo="Itinerario de lugares especiales"
                    detalles="Museo 'Soumaya', museo 'Jumex', cafetería 'Hello Kitty', plaza 'Antara', acuario 'Inbursa'"
                    fecha="26/07/2019"
                    />

            </Box>
                
        </Container>

        <Footer showIncorporaLugar={true} />
        </ThemeProvider>
    );

}

export default ItinirariesSavePage;