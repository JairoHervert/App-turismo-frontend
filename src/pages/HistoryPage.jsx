import React, { useEffect, useState, useRef } from 'react';
import { Container, Stack, Typography, TextField, InputAdornment, Box } from '@mui/material';
import { History as HistoryIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import SearchHistoryBox from '../components/history/SearchHistoryBox'; 
import { obtenerHistorial, borrarHistorial } from '../pagesHandlers/history-handler';

import { ThemeProvider } from '@mui/material/styles';
import ThemeMaterialUI from '../components/ThemeMaterialUI';

import '../css/History.css';
import ButtonsMod from '../components/ButtonsMod';
import grillo from '../img/grillo.png';
import AlertD from '../components/alert';

function HistoryPage() { 
  const [searchHistory, setSearchHistory] = useState([]); // Estado para el historial
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda

  // Modal - Borrar historial
  const alertRef = useRef();
  const handleOpenModal = () => {
    if (alertRef.current) {
        alertRef.current.handleClickOpen();
    }
  }

  useEffect(() => {
    const fetchHistorial = async () => {
      const idUsuario = localStorage.getItem('id');
      if (!idUsuario) return;

      try {
        const historial = await obtenerHistorial(idUsuario);
        const historialAgrupado = historial.reduce((acc, item) => {
          const grupoPorFecha = acc.find(grupoPorFecha => grupoPorFecha.date === item.date);
          const elementoSinFecha = { id: item.id, query: item.query, time: item.time };
        
          if (grupoPorFecha) {
            grupoPorFecha.items.push(elementoSinFecha);
          } else {
            acc.push({
              date: item.date,
              items: [elementoSinFecha]
            });
          }

          return acc;
        }, []);
        setSearchHistory(historialAgrupado);
      } catch (error) {
        console.error('Error al cargar el historial:', error);
      }
    };

    fetchHistorial();
  }, []);

  const obtenerHistorialFiltrado = () => {
    const term = searchText.toLowerCase();
    return searchHistory.map((grupo) => ({
      ...grupo,
      items: grupo.items.filter((item) =>
        item.query.toLowerCase().includes(term)
      ),
    })).filter((grupo) => grupo.items.length > 0);
  };

  const handleBorrarHistorial = async () => {
    const idUsuario = localStorage.getItem('id');
    if (!idUsuario) return;

    try {
      await borrarHistorial(idUsuario);
      setSearchHistory([]);
    } catch (error) {
      console.error('Error al borrar el historial:', error);
    }
  };

  const handleEliminarLugar = async (idLugar) => {
    const idUsuario = localStorage.getItem('id');
    if (!idUsuario) return;

    try {
      const response = await fetch('http://localhost:3001/historial/lugar', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuario, idLugar }),
      });
      if (response.ok) {
        setSearchHistory((prevHistory) =>
          prevHistory.map((grupo) => ({
            ...grupo,
            items: grupo.items.filter((item) => item.id !== idLugar),
          })).filter((grupo) => grupo.items.length > 0)
        );
      } else {
        console.error('Error al eliminar el lugar');
      }
    } catch (error) {
      console.error('Error al eliminar el lugar:', error);
    }
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Navbar />
 
      <Container maxWidth='lg' className='my-4' sx={{ minHeight: '80vh' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: {sm: 'space-between'}, alignItems: 'center' }}>
          <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center', marginBottom: {xs: '2rem', md: '0'} }}>
              <HistoryIcon color='secondary' sx={{ fontSize: {lg: '3rem', sm: '2.5rem', xs: '1.3rem'} }} />
              <Typography sx={{ fontSize: {lg: '3rem', sm: '2.5rem', xs: '1.3rem'}, fontWeight: '700' }}>Historial de búsqueda</Typography>
          </Stack>
          <TextField
            label='Buscar en el historial'
            variant='outlined'
            size='small'
            sx={{ maxWidth: 250 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        
        <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={{ md: 'end', xs: 'center' }} alignItems='center' marginBottom='1.5rem' marginTop='1.5rem'>
          {obtenerHistorialFiltrado().length > 0 && (
            <>
            <ButtonsMod
              variant='secundario'
              textCont='Borrar historial'
              width='fit-content'
              startIcon={<DeleteIcon />}
              clickEvent={handleOpenModal}
            />
            <AlertD
              ref={alertRef}
              titulo='¿Estás seguro de que deseas eliminar todo el historial?'
              mensaje='Esta acción no se puede deshacer'
              boton1='Aceptar'
              boton2='Cancelar'
              onConfirm={handleBorrarHistorial}
            />
            </>
          )}
        </Stack>

        {obtenerHistorialFiltrado().length > 0 ? (
          <SearchHistoryBox
            searchHistory={obtenerHistorialFiltrado()}
            onEliminarLugar={handleEliminarLugar}
          />
        ) : (
          <Box className='d-flex justify-content-center align-items-center flex-column' sx={{ minHeight: '50vh' }}>
            <Typography className='fw-medium text-center'
              sx={{ fontSize: {md: '2rem'}, fontFamily: 'poppins', mb: 2 }}
            >
              Todavía no tienes un historial de búsqueda.
            </Typography>
            <Box
              component='img'
              src={grillo}
              alt='Grillo'
              sx={{
                width: '10rem', 
                height: 'auto', 
              }}
            />
          </Box>
        )}
        
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default HistoryPage;
