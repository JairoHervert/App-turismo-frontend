import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ItemRegisterPlace from '../components/registerplace/registerplacecard';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, Stack, Card,  TextField, Button} from '@mui/material';
import { Search as SearchIcon, Bookmark as BookmarkIcon,DoneAllRounded as Check} from '@mui/icons-material';

function RegisterPlacePage(){

    const handleFormSubmit = (formData) => {
        console.log('Datos del formulario:', formData);
    };    

    return(
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
                        <Check color='primary' fontSize='inhert' className='it_pag-icono-book' />
                        <h1 className='it-page-title'>Solicitud de alta de lugar turístico</h1>
                    </Stack>
                </Stack>


                <Box component="form"  sx={{ display: 'flex', flexDirection: 'column', gap: 4 , boxShadow: 0}}>
                        <TextField
                            label="Nombre del Lugar"
                            name="nombre"
                        />
                        <TextField
                            label="Ubicación"
                            name="ubicacion"
                        />
                        <TextField
                            label="Descripción"
                            name="descripcion"
                            multiline
                            rows={4}
                            required
                        />
                        <Button type="submit" variant="contained">Enviar</Button>
                    </Box>

            </Container>

            <Footer showIncorporaLugar={true} />
        </ThemeProvider>
    );

}

export default RegisterPlacePage;