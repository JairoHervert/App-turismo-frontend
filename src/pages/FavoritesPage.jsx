import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, TextField, Box, InputAdornment, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FavoriteRounded as FavoriteRoundedIcon } from '@mui/icons-material';
import SearchRoundedIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ItemFavoritos from '../components/favorites/ItemFavoritos';

import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/FavoritesPage.css';

// lugares de prueba guardados en un objeto js
import Places from '../components/AllPlaces/Places';

function FavoritesPage() {
  // Estado para manejar la página actual
  const [page, setPage] = useState(1);
  const itemsPorPagina = 12;

  const startIndex = (page - 1) * itemsPorPagina;
  const currentItems = Places.slice(startIndex, startIndex + itemsPorPagina);

  const handleChangePage = (e, value) => {
    setPage(value);
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
            <FavoriteRoundedIcon color='primary' fontSize='inhert' className='fav_pag-icono-corazon' sx={{ fontSize: '3rem' }} /> {/* El atributo color, es para ajustar el color a partir del archivo de theme MaterialUI */}
            <Typography variant='h1' className='fw-bold' sx={{ fontSize: '3rem' }}>Favoritos</Typography>
          </Stack>

          <TextField
            label='Buscar en favoritos'
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
        </Stack>

        <Grid container spacing={2} justifyContent='center' alignItems='center'>
          {currentItems.map((place, index) => (
            <ItemFavoritos
              key={index}
              imagen={place.image}
              nombre={place.name}
              descripcion={place.description}
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

      </Container>

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  );
}

export default FavoritesPage;