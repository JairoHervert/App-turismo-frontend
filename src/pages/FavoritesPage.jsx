import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, Grid, TextField, Box, InputAdornment, Typography } from '@mui/material';
import { FavoriteRounded as FavoriteRoundedIcon } from '@mui/icons-material';
import SearchRoundedIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ItemFavoritos from '../components/favorites/ItemFavoritos';

import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/FavoritesPage.css';

// imagenes de prueba
import Imagen1 from '../img/PlacePage/place-img-fuentetlaloc.jpg';
import Imagen2 from '../img/PlacePage/place-img-casadeleon.jpg';
import Imagen3 from '../img/PlacePage/place-img-palaciopostal.jpg';

function FavoritesPage() {
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
            <FavoriteRoundedIcon color='primary' fontSize='inhert' className='fav_pag-icono-corazon' sx={{ fontSize: '3rem' }}/> {/* El atributo color, es para ajustar el color a partir del archivo de theme MaterialUI */}
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

        <Box sx={{ maxHeight: '74vh', overflowY: 'auto' }}>
          <Grid container spacing={2} justifyContent='center' alignItems='center'>
            <ItemFavoritos
              imagen={Imagen1}
              nombre='Fuente de Tlaloc'
              descripcion='La Fuente de Tlaloc es una impresionante obra de Diego Rivera ubicada en el bosque de Chapultepec, Ciudad de México. ' />

            <ItemFavoritos
              imagen={Imagen2}
              nombre='Casa de León'
              descripcion='La Casa de León Trotsky es un museo en la Ciudad de México que fue la residencia del líder revolucionario ruso León Trotsky.' />

            <ItemFavoritos
              imagen={Imagen3}
              nombre='Palacio Postal'
              descripcion='El Palacio Postal de la Ciudad de México es un edificio de estilo ecléctico que alberga la oficina central de Correos de México.' />

            <ItemFavoritos
              imagen={Imagen1}
              nombre='Fuente de Tlaloc'
              descripcion='La Fuente de Tlaloc es una impresionante obra de Diego Rivera ubicada en el bosque de Chapultepec, Ciudad de México. ' />

            <ItemFavoritos
              imagen={Imagen2}
              nombre='Casa de León'
              descripcion='La Casa de León Trotsky es un museo en la Ciudad de México que fue la residencia del líder revolucionario ruso León Trotsky.' />

            <ItemFavoritos
              imagen={Imagen3}
              nombre='Palacio Postal'
              descripcion='El Palacio Postal de la Ciudad de México es un edificio de estilo ecléctico que alberga la oficina central de Correos de México.' />
          </Grid>
        </Box>

      </Container>

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  );
}

export default FavoritesPage;