import React, { useState, useEffect, useRef } from 'react';
// componentes
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ContenedorCategorias from '../components/categorias/ContenedorCategorias';
import ButtonsMod from '../components/ButtonsMod';

import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import '../css/Categorias.css';

import { Container, Typography,  Stack } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';

// Alert
import alertImgError from '../img/alertas/error.webp';
import AlertD from './../components/alert';

import { handleCategorias } from '../pagesHandlers/place-handler';
import { handleTodasCategoriasUsuario }from '../pagesHandlers/user_handler';
import { isLogged } from '../schemas/isLogged';

function SearchCategoryPage() {
  const navigate = useNavigate();
  const handleRegresarClick = () => {
    navigate('/generar-itinerario');
  };

  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState({});
  useEffect(() => {
    const shuffleArray = (array) => {
      return array
        .map((value) => ({ value, sort: Math.random() })) // Asocia cada elemento con un número aleatorio
        .sort((a, b) => a.sort - b.sort) // Ordena según el número aleatorio
        .map(({ value }) => value); // Recupera solo los valores originales
    };

    const fetchCategorias = async () => {
      try {
        let resultado;
        const id = localStorage.getItem('id');
        if (id) resultado = await handleTodasCategoriasUsuario(id);
        else resultado = await handleCategorias();
        const categoriasAleatorias = shuffleArray(resultado);
        setCategorias(categoriasAleatorias);
        console.log(categoriasAleatorias);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  
  const alertError = useRef();
  const handleClickOpenError = () => {
    if (alertError.current) {
      alertError.current.handleClickOpen();
    }
  };
  const handleConfirmError = () => {
  };

  const handleContinuarClick = () => {
    if (Object.keys(categoriasSeleccionadas).length === 0) {
      handleClickOpenError();
      return;
    }
    navigate('/itinerary');
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Navbar
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false}
      />

      <AlertD
        ref={alertError}
        titulo='Error al establecer preferencias'
        mensaje='Por favor, selecciona al menos una categoría antes de continuar.'
        imagen={alertImgError}
        boton2="Aceptar"
        onConfirm={handleConfirmError}
      />

      <Container maxWidth="lg" className="sm-4">
        { /* Sección - Header */}
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          spacing={1}
          alignItems="center"
          className="mb-2"
          sx={{
            marginTop: '30px',
            justifyContent: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <CategoryIcon
            fontSize="large"
            sx={{
              color: '#E4007C',
              fontSize: { sm: '3rem', xs: '2.5rem' },
            }}
          />
          <Typography
            variant="h1"
            className="fw-bold"
            sx={{
              fontSize: { sm: '3rem', xs: '2rem' },
              textAlign: { xs: 'center', sm: 'flex-start' },
            }}
          >
            Personaliza tu viaje
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          sx={{
            textAlign: { xs: 'center', sm: 'start' },
            marginBottom: '40px',
          }}
        >
          Selecciona las categorías de tu interés.
        </Typography>

        <ContenedorCategorias
          categoriasIniciales={categorias}
          onCategoriasSeleccionadas={setCategoriasSeleccionadas} // Callback
        />

        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', margin: '30px 0 30px 0' }}
        >
          <ButtonsMod
            variant="principal"
            textCont="Regresar"
            clickEvent={handleRegresarClick}
          />
          <ButtonsMod
            variant="principal"
            textCont="Continuar"
            clickEvent={handleContinuarClick}
            disabled={Object.keys(categoriasSeleccionadas).length === 0} // Deshabilitar si no hay categorías seleccionadas
          />
        </Stack>
      </Container>

      <Footer showIncorporaLugar={false} />
    </ThemeProvider>
  );
}

export default SearchCategoryPage;
