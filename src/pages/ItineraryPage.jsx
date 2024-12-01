// componentes online
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Container, Stack, TextField, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


// iconos
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import SearchRoundedIcon from '@mui/icons-material/Search';

// componentes locales
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Planer from '../components/itinerary/Planer';
import PlanRoute from '../components/itinerary/PlanRoute';
import MoreInfoPlace from '../components/itinerary/MoreInfoPlace';

// estilos
import ThemeMaterialUI from '../components/ThemeMaterialUI';

function ItineraryPage() {
  // estado para manejar el estado de la pestaña activa, ya sea 'Plan' o 'Ruta'
  const [activeTab, setActiveTab] = useState('Plan');

  // estado para el lugar seleccionado
  const [selectedPlace, setSelectedPlace] = useState(null);

  // estados para manejar el estado del modal de informacion del lugar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Agregar evento de resize al montar el componente
    window.addEventListener('resize', handleResize);

    // Limpiar el evento de resize cuando se desmonte el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    if (windowWidth < 1200) {
      setIsModalOpen(true);
    }
  };

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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems='center' className='mb-4 it_pa-title-search' justifyContent={{ sm: 'space-between' }}>

          {/* Titulo */}
          <Stack direction='row' spacing={1} alignItems='center' className='mb-2'>
            <MapRoundedIcon color='google' fontSize='inhert' sx={{ fontSize: '3rem' }} />
            <Typography variant='h1' className='fw-bold' sx={{ fontSize: '3rem' }}>Itinerario</Typography>
          </Stack>

          {/* Buscador */}
          <TextField
            label='Buscar algun lugar en tu itinerario'
            variant='outlined'
            size='small'
            sx={{ maxWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>  {/* Cierre de Stack que aloja el titulo y el buscador */}


        <Grid container spacing={2} className='it_pa-planer-and-moreinfo-container'>
          {/* Lado izquierdo del itinerario, planer y ruta */}
          <Grid className='it_pa-planer-container'>
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

              {/* Renderizado condicional de la pestaña activa */}
              {activeTab === 'Plan' ? (
                <Planer setSelectedPlace={handlePlaceSelect} />
              ) : (
                <PlanRoute />
              )}
            </Card>
          </Grid>

          {/* Lado derecho del itinerario, mas informacion del lugar */}
          {windowWidth >= 1200 && (
            <Grid className='it_pa-more-info-container'>
              <MoreInfoPlace place={selectedPlace} />
            </Grid>
          )}

          <Box>
            <Dialog
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <DialogTitle>
                <Typography fontFamily={'poppins'} variant='h6'>
                  Información del Lugar
                </Typography>
                <IconButton
                  aria-label='close'
                  onClick={() => setIsModalOpen(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ maxWidth:'35rem' }}>
                <MoreInfoPlace place={selectedPlace} />
              </DialogContent>
            </Dialog>
          </Box>

        </Grid>

      </Container> {/* Cierre de Container principal */}

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  )
}

export default ItineraryPage