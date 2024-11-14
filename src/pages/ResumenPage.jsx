import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/ResumePage.css';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, Button, Box } from '@mui/material';
import { ArrowBackIos as Arrowb } from '@mui/icons-material';
import CardResume from '../components/resume/CardResume'; // Asegúrate de importar el componente correcto

function ResumePage() {
    const diasMes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15]; // Ejemplo de días del mes

    return (
        <ThemeProvider theme={ThemeMaterialUI}>
            <Navbar
                showingresa={false}
                showRegistrate={false}
                transparentNavbar={false}
                lightLink={false}
                staticNavbar={false}
            />

            <Container maxWidth='lg' className='resume-container'>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={15} alignItems='center' className='mb-2' justifyContent={{ sm: 'flex-start' }}>
                    <Button variant="contained" size="large" className="resume-back-button" sx={{ marginRight: 5}}>
                        <Arrowb color='light' fontSize='medium' className='fav_pag-icono-corazon' /> Regresar
                    </Button>
                    <Stack direction='column' spacing={1} alignItems='center' className='resume-title-container'>
                        <h1 className='resume-title'>Explora los planes para cada día</h1>
                        <h5 className='resume-subtitle'>Selecciona un día para explorar los detalles y personalizarlo</h5>
                    </Stack>
                </Stack>

                <Box className="resume-calendar-container" sx={{ maxHeight: '62vh', overflowY: 'auto' }}>
                    <CardResume diasMes={diasMes} />
                </Box>

                <Box className="resume-save-button">
                    <Button variant="contained" size='small'>
                        Finalizar y guardar
                    </Button>
                </Box>
            </Container>
            <Footer showIncorporaLugar={true} />
        </ThemeProvider>
    );
}

export default ResumePage;