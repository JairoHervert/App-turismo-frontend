// componentes online
import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, TextField, InputAdornment, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';


// componentes locales
import Navbar from '../components/NavBar'
import PlaceItem from '../components/AllPlaces/PlaceItem';

// iconos
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

// temas
import ThemeMaterialUI from '../components/ThemeMaterialUI';

// lugares de prueba guardados en un json
import Places from '../components/AllPlaces/Places';

function AllPlacesPage() {
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
            <Typography variant='h1' className='fw-bold' sx={{ fontSize: '3rem' }}>Lugares disponibles</Typography>
          </Stack>

          <TextField
            label='Buscar en todos los lugares'
            variant='outlined'
            size='small'
            color='secondary'
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
          {Places.map((place, index) => (
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

      </Container>

    </ThemeProvider>
  )
}

export default AllPlacesPage