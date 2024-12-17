// componentes online
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import grillo from '../img/grillo.png';

// temas
import ThemeMaterialUI from '../components/ThemeMaterialUI';

// lugares de prueba guardados en un objeto js
import Places from '../components/AllPlaces/Places';

import { handleAllPlaces } from '../pagesHandlers/place-handler';
import { isLogged } from '../schemas/isLogged';

function AllPlacesPage() {
  const { alcaldia } = useParams();

  const [logged, setLogged] = useState(false);
  const [id, setId] = useState(null);
  const [lugares, setLugares] = useState(Places);
  const [allLugares, setAllLugares] = useState([]); // Lugares originales
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const loggedIn = await isLogged();
        setLogged(loggedIn.logged);
        if (loggedIn.logged) {
          const idLocal = loggedIn.data.id;
          setId(idLocal);
        }
        else
          console.log('El usuario no ha iniciado sesión');
      } catch (error) {
        console.log('El usuario no ha iniciado sesión', error);
      }
    };

    const fetchLugares = async () => {
      try {
        const resultado = await handleAllPlaces();
        setLugares(resultado); // Lugares iniciales visibles
        setAllLugares(resultado); // Guardar una copia original
        console.log(resultado);
      } catch (error) {
        console.error('Error al obtener lugares', error);
      }
    };

    fetchLoginStatus();
    fetchLugares();
  }, []);

  // Estado para manejar la página actual
  const [page, setPage] = useState(1);
  const itemsPorPagina = 12;

  const startIndex = (page - 1) * itemsPorPagina;
  const currentItems = lugares.slice(startIndex, startIndex + itemsPorPagina);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  // Estado para manejar el modal de filtros de busqueda
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para los filtros seleccionados (el estado se maneja en el componente MenuFilters.jsx)
  const [selectedFilters, setSelectedFilters] = useState({
    alcaldias: alcaldia ? [alcaldia] : [],
    categorias: [],
  });

  const obtenerLugaresFiltrados = () => {
    const lugaresFiltrados = allLugares.filter((lugar) => {
      const buscaTermino = searchTerm
        ? (lugar.nombre && eliminarAcentos(lugar.nombre).toLowerCase().includes(eliminarAcentos(searchTerm).toLowerCase())) ||
        (lugar.descripcion && eliminarAcentos(lugar.descripcion).toLowerCase().includes(eliminarAcentos(searchTerm).toLowerCase()))
        : true;

      const tieneAlcaldia =
        selectedFilters.alcaldias.length > 0
          ? selectedFilters.alcaldias.some((alcaldia) => lugar.direccion.includes(alcaldia))
          : true;

      const tieneCategoria =
        selectedFilters.categorias.length > 0
          ? selectedFilters.categorias.some((categoria) => lugar.categorias.includes(categoria))
          : true;

      // Ambas categorías y alcaldías están activas
      if (selectedFilters.alcaldias.length > 0 && selectedFilters.categorias.length > 0) {
        return tieneAlcaldia && tieneCategoria && buscaTermino;
      }

      if (selectedFilters.alcaldias.length > 0) {
        return tieneAlcaldia && buscaTermino;
      }

      if (selectedFilters.categorias.length > 0) {
        return tieneCategoria && buscaTermino;
      }

      // Si no hay filtros activos, mostrar todos los lugares
      return buscaTermino;
    });

    return lugaresFiltrados;
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters); // Actualiza los filtros seleccionados
    console.log('Filtros aplicados:', filters);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const lugaresFiltrados = obtenerLugaresFiltrados();
    console.log("Lugares filtrados devueltos:", lugaresFiltrados);
    setLugares(lugaresFiltrados);
  }, [searchTerm, selectedFilters, allLugares]);

  const eliminarAcentos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normaliza y elimina los acentos
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
              onChange={handleSearchChange} // Manejador para actualizar el término de búsqueda
              value={searchTerm} // Vincular con el estado de búsqueda
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

          {
            // Si no hay lugares, mostrar un la leyenda de que no se encontraron lugares
            lugares.length === 0 && (
              <Box
                className='d-flex justify-content-center align-items-center flex-column'
                sx={{ minHeight: '50vh' }}
              >
                <Typography
                  className='fw-medium text-center'
                  sx={{ fontSize: '2rem', fontFamily: 'poppins', mb: 2 }}
                >
                  No se encontraron lugares
                </Typography>
                <Box
                  component='img'
                  src={grillo}
                  alt='Grillo'
                  sx={{
                    width: '10rem', // Ajusta el ancho
                    height: 'auto', // Mantén la proporción
                  }}
                />
              </Box>
            )}
          {
            // Si hay lugares, mostrar los lugares
            currentItems.map((place, index) => (
              <PlaceItem
                key={index}
                id={place.id}
                name={place.nombre}
                description={place.descripcion}
                image={place.imagen}
                category={place.categorias}
                address={place.direccion}
                rating={place.rating}
                phone={place.teléfono}
                idUsuario={id}
              />
            ))}
        </Grid>

        <Box className='d-flex justify-content-center mt-4 mb-4'>
          <Stack spacing={2} className='d-flex justify-content-center'>
            <Pagination
              count={Math.ceil(lugares.length / itemsPorPagina)}
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
                onApplyFilters={handleApplyFilters}
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