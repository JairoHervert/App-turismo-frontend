import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, TextField, Box, InputAdornment, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FavoriteRounded as FavoriteRoundedIcon } from '@mui/icons-material';
import SearchRoundedIcon from '@mui/icons-material/Search';
// Componentes
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ItemFavoritos from '../components/favorites/ItemFavoritos';

import { handleFavoritos } from '../pagesHandlers/user_handler';
import { isLogged } from '../schemas/isLogged';
import { useNavigate } from 'react-router-dom';

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
  //const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [originalFavoritos, setOriginalFavoritos] = useState([]); // Copia original
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const loggedIn = await isLogged();
        if (!loggedIn.logged) {
          navigate('/login');
        }
      } catch (error) {
        console.log('El usuario no ha iniciado sesión', error);
        navigate('/login');
      }
    };

    const fetchFavoritos = async () => {
      try {
        const id = localStorage.getItem('id');
        console.log(id);
        
        const resultado = await handleFavoritos(id); // Espera la resolución de la promesa
        setFavoritos(resultado);
        setOriginalFavoritos(resultado); // Copia original
      } catch (error) {
        console.error('Error al obtener lugares favoritos:', error);
      }
    };

    fetchLoginStatus();
    fetchFavoritos(); // Llama a la función para obtener los datos
  }, []);

  const obtenerFavoritosFiltrados = () => {
    const term = searchTerm.toLowerCase();
    return originalFavoritos.filter((lugar) =>
      lugar.nombre.toLowerCase().includes(term) ||
      (lugar.descripcion && lugar.descripcion.toLowerCase().includes(term))
    );
  };

  useEffect(() => {
    const filtrados = obtenerFavoritosFiltrados();
    setFavoritos(filtrados);
  }, [searchTerm, originalFavoritos]);

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado
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
          {favoritos && favoritos.length > 0 ? (
            currentItems.map((place, index) => (
              <ItemFavoritos
                key={index} // Usa un identificador único si está disponible, por ejemplo, 'lugar.id'
                idLugar={lugar.id}
                nombre={lugar.nombre}
                descripcion={lugar.descripcion}
                imagen={lugar.imagen}
              />
            ))
          ) : (
            <div className='d-flex justify-content-center'>
              <h3 className='fw-bold'>No se encontraron lugares favoritos.</h3>
            </div>
          )}
          {}
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