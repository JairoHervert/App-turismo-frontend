import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, Grid, TextField, Box, InputAdornment } from '@mui/material';
import { Search as SearchIcon, FavoriteRounded as FavoriteRoundedIcon } from '@mui/icons-material';
// Componentes
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ItemFavoritos from '../components/favorites/ItemFavoritos';

import { handleFavoritos } from '../pagesHandlers/user_handler';
import { useEffect, useState } from 'react';
import { isLogged } from '../schemas/isLogged';
import { useNavigate } from 'react-router-dom';

import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/FavoritesPage.css';

// imagenes de prueba
import Imagen1 from '../img/PlacePage/place-img-fuentetlaloc.jpg';
import Imagen2 from '../img/PlacePage/place-img-casadeleon.jpg';
import Imagen3 from '../img/PlacePage/place-img-palaciopostal.jpg';

function FavoritesPage() {
  //const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const loggedIn = await isLogged();
        if (!loggedIn.logged) {
          navigate('/login');
          return;
        }
      } catch (error) {
        console.log('El usuario no ha iniciado sesión', error);
        navigate('./login');
      }
    };

    const fetchFavoritos = async () => {
      try {
        const id = localStorage.getItem('id');
        console.log(id);
        
        const resultado = await handleFavoritos(id); // Espera la resolución de la promesa
        setFavoritos(resultado);
        console.log(favoritos);
      } catch (error) {
        console.error('Error al obtener lugares favoritos:', error);
      }
    };

    fetchLoginStatus();
    fetchFavoritos(); // Llama a la función para obtener los datos
  }, []);

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
            <FavoriteRoundedIcon color='primary' fontSize='inhert' className='fav_pag-icono-corazon' /> {/* Ahora usa el color primario del tema */}
            <h1 className='fw-bold fav_pag-titulo'>Favoritos</h1>
          </Stack>

          <TextField 
            label="Buscar en favoritos" 
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

        <Box sx={{ maxHeight: '74vh', overflowY: 'auto' }}>
          <Grid container spacing={2} justifyContent='center' alignItems='center'>
            {favoritos && favoritos.length > 0 ? (
              favoritos.map((lugar, index) => (
                <ItemFavoritos
                  key={index} // Usa un identificador único si está disponible, por ejemplo, 'lugar.id'
                  //idLugar={lugar.id}
                  nombre={lugar.nombre}
                  descripcion={lugar.descripcion}
                  imagen={lugar.imagen}
                  //tiempoLugar={lugar.tiempo}
                  //costoLugar={lugar.costo}
                />
              ))
            ) : (
              <div className='d-flex justify-content-center'>
                <h3 className='fw-bold'>No se encontraron lugares favoritos.</h3>
              </div>
            )}
            {/*
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
            */}
          </Grid>
        </Box>

      </Container>

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  );
}

export default FavoritesPage;