// modulos importados
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

// componentes importados
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

// estilos importados
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/LoginPage.css';

// elementos de la página
import imgFormulario from '../img/piramides-teotihuacan.webp';

function LoginPage() {
  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className='vh-100 vw-100 login-background'>
        <Navbar
          showingresa={false}
          showRegistrate={false}
          transparentNavbar={false}
          lightLink={false}
          staticNavbar={false}
        />

        <Container maxWidth='lg' className='my-4 bg-light'>
          <Grid container>

            {/* lado izquiero imagen con texto */}
            <Grid size={6}>
              <Box className='login-left-image'>
                <Typography variant='h3' className='fw-semibold '>Bienvenido a la aventura que cambiará tu historia</Typography>
                <Typography variant='body1'>Únete a una comunidad vibrante donde florece la creatividad, se forjan conexiones y cada paso te acerca a experiencias inolvidables. Sumérgete y encuentra la inspiración.</Typography>

                <Box className=''>
                  <Typography variant='body1'>Únete a una comunidad vibrante donde florece la creatividad, se forjan conexiones y cada paso te acerca a experiencias inolvidables. Sumérgete y encuentra la inspiración.</Typography>
                  <Typography variant='body1'>Únete a una comunidad vibrante donde florece la creatividad, se forjan conexiones y cada paso te acerca a experiencias inolvidables. Sumérgete y encuentra la inspiración.</Typography>
                </Box>

              </Box>
            </Grid>

            {/* lado derecho formulario */}
            <Grid size={6}>
              <h1>Yo soy mateo</h1>
            </Grid>

          </Grid>
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default LoginPage