// componentes online
import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, TextField, InputAdornment, Typography, Dialog, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

// componentes locales
import Navbar from '../components/NavBar'
import Footer from '../components/Footer';
import PlaceItem from '../components/AllPlaces/PlaceItem';
import MenuFilters from '../components/AllPlaces/MenuFilters';

// iconos
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

// temas
import ThemeMaterialUI from '../components/ThemeMaterialUI';

// lugares de prueba guardados en un objeto js
import Places from '../components/AllPlaces/Places';

function AllPlacesPage() {
  // Estado para manejar la página actual
  const [page, setPage] = useState(1);
  const itemsPorPagina = 12;

  const startIndex = (page - 1) * itemsPorPagina;
  const currentItems = Places.slice(startIndex, startIndex + itemsPorPagina);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  // Estado para manejar el modal de filtros de busqueda
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para los filtros seleccionados (el estado se maneja en el componente MenuFilters.jsx)
  const [selectedFilters, setSelectedFilters] = useState({
    alcaldias: [],
    categorias: [],
  });

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters); // Actualiza los filtros seleccionados
    console.log('Filtros aplicados:', filters);
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

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems='center' className='mb-4' justifyContent={{ sm: 'space-between' }}>
          <Stack direction='row' spacing={1} alignItems='center' className='mb-2'>
            <PlaceRoundedIcon color='secondary' fontSize='inhert' className='fav_pag-icono-corazon' sx={{ fontSize: '3rem' }} /> {/* El atributo color, es para ajustar el color a partir del archivo de theme MaterialUI */}
            <Typography variant='h1' className='fw-bold' sx={{ fontSize: { xs: '2rem', md: '3rem' }, }}>Lugares disponibles</Typography>
          </Stack>

          <Box className='d-flex align-items-center justify-content-center'>
            <IconButton className='me-2' onClick={() => setIsModalOpen(true)}>
              <FilterListRoundedIcon color='secondary' sx={{ fontSize: '1.8rem' }} />
            </IconButton>

            <TextField
              label='Buscar en todos los lugares'
              variant='outlined'
              size='small'
              color='primary'
              sx={{ maxWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>

        <Grid container spacing={2} justifyContent='center' alignItems='center'>
          {currentItems.map((place, index) => (
            <PlaceItem
              key={index}
              name={place.name}
              description={place.description}
              image={place.image}
              category={place.category}
              address={place.address}
              rating={place.rating}
              phone={place.phone}
            />
          ))}
        </Grid>

        <Box className='d-flex justify-content-center mt-4 mb-4'>
          <Stack spacing={2} className='d-flex justify-content-center'>
            <Pagination
              count={Math.ceil(Places.length / itemsPorPagina)}
              page={page}
              onChange={handleChangePage}
              color='secondary'
            />
          </Stack>
        </Box>

        {/* Modal de filtros de búsqueda  */}
        <Box>
          <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <Box>
              <MenuFilters
                setIsModalOpen={setIsModalOpen}
                selectedFilters={selectedFilters}
                setSelectedFilters={handleApplyFilters}
              />
            </Box>

          </Dialog>
        </Box>

      </Container>
      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  )
}

export default AllPlacesPage