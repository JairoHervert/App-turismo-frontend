// componentes online
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Container, Stack, TextField, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';

// iconos
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import SearchIcon from '@mui/icons-material/Search';

// componentes locales
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Planer from '../components/itinerary/Planer';
import PlanRoute from '../components/itinerary/PlanRoute';
import MoreInfoPlace from '../components/itinerary/MoreInfoPlace';

// estilos
import ThemeMaterialUI from '../components/ThemeMaterialUI';

function ItineraryPage() {
  // hook para manejar el estado de la pestaña activa, ya sea 'Plan' o 'Ruta'
  const [activeTab, setActiveTab] = useState('Plan');

  return (
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

          {/* Titulo */}
          <Stack direction='row' spacing={1} alignItems='center' className='mb-2'>
            <MapRoundedIcon color='google' fontSize='inhert' sx={{ fontSize: '3rem' }} />
            <Typography variant='h1' className='fw-bold' sx={{ fontSize: '3rem' }}>Itinerario</Typography>
          </Stack>

          {/* Buscador */}
          <TextField
            label="Buscar algun lugar en tu itinerario"
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
        </Stack>  {/* Cierre de Stack que aloja el titulo y el buscador */}


        <Grid container spacing={2}>
          {/* Lado izquierdo del itinerario, planer y ruta */}
          <Grid size={{ xs: 10, md: 8 }}>
            <Card>
              {/* Titulo y botones de pestañas 'Plan' y 'Ruta' */}
              <Box className='mx-4 d-flex flex-column align-items-start'>
                <Typography variant='h3' fontFamily={'poppins'} className='fw-semibold mt-3' sx={{ fontSize: '1.9rem' }}>Plan por día</Typography>

                <Box className='d-flex my-4 gap-4'>
                  <Typography
                    variant='h2'
                    fontFamily={'poppins'}
                    className='fw-normal'
                    sx={{
                      fontSize: '1.4rem',
                      cursor: 'pointer',
                      borderBottom: activeTab === 'Plan' ? '3px solid #e6007e' : 'none',
                    }}
                    onClick={() => setActiveTab('Plan')}
                  >Plan</Typography>

                  <Typography
                    variant='h2'
                    fontFamily={'poppins'}
                    className='fw-normal'
                    sx={{
                      fontSize: '1.4rem',
                      cursor: 'pointer',
                      borderBottom: activeTab === 'Ruta' ? '3px solid #e6007e' : 'none',
                    }}
                    onClick={() => setActiveTab('Ruta')}
                  >Ruta</Typography>

                </Box>
              </Box>  {/* Cierre de Box que aloja el titulo y los botones de pestaña */}

              {activeTab === 'Plan' ? (<Planer />) : (<PlanRoute />)}  {/* Renderizado condicional de la pestaña activa */}
            </Card>
          </Grid>

          {/* Lado derecho del itinerario, mas informacion del lugar */}
          <Grid size={{ xs: 10, md: 4 }}>
            <Card>
              <MoreInfoPlace />
            </Card>
          </Grid>

        </Grid>

      </Container> {/* Cierre de Container principal */}

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  )
}

export default ItineraryPage