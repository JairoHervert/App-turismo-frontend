import React, { useEffect, useState } from 'react';
import { Container, Stack, Typography, Button, TextField, InputAdornment, Box } from '@mui/material';
import { History as HistoryIcon, Delete as DeleteIcon, FilterList as FilterListIcon, Search as SearchIcon } from '@mui/icons-material';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import SearchHistoryBox from '../components/history/SearchHistoryBox'; 
import { obtenerHistorial, borrarHistorial } from '../pagesHandlers/history-handler';

import { ThemeProvider } from '@mui/material/styles';
import ThemeMaterialUI from '../components/ThemeMaterialUI';

import '../css/History.css';
import ButtonsMod from '../components/ButtonsMod';

function HistoryPage() { 

  const searchHistoryHistory = [
    {
      date: '2024-12-08',
      items: [
        { id: 1, query: 'Tortas "El güero"', time: '06:23 p.m.' },
        { id: 2, query: 'Acuario "MICHIN"', time: '06:23 p.m.' },
        { id: 3, query: 'Hotel "Roma"', time: '12:23 p.m.' },
        { id: 5, query: 'Castillo de Chapultepec', time: '00:10 p.m.' },
        { id: 6, query: 'Acuario "Inbursa"', time: '07:10 p.m.' },
        { id: 7, query: 'Bosque de Chapultepec', time: '20:23 p.m.' },
        { id: 8, query: 'Plaza de la Constitución', time: '23:25 a.m.' },
      ],
    },
    {
      date: '2024-12-05',
      items: [
        { id: 3, query: 'Hotel "Roma"', time: '12:23 p.m.' },
        { id: 5, query: 'Castillo de Chapultepec', time: '00:10 p.m.' },
      ],
    },
    {
      date: '2024-12-04',
      items: [
        { id: 6, query: 'Acuario "Inbursa"', time: '07:10 p.m.' },
        { id: 7, query: 'Bosque de Chapultepec', time: '20:23 p.m.' },
      ],
    },
    {
      date: '2024-12-03',
      items: [
        { id: 8, query: 'Plaza de la Constitución', time: '23:25 a.m.' },
      ],
    },
  ];

  const [searchHistory, setSearchHistory] = useState([]); // Estado para el historial
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const todayDate = new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  useEffect(() => {
    const fetchHistorial = async () => {
      const idUsuario = localStorage.getItem('id');
      if (!idUsuario) return;

      try {
        const historial = await obtenerHistorial(idUsuario);
        const historialAgrupado = historial.reduce((acc, item) => {
          // Busca si ya existe un grupo para la fecha actual
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

  const handleBorrarHistorial = async () => {
    const idUsuario = localStorage.getItem('id');
    if (!idUsuario) return;

    try {
      const mensaje = await borrarHistorial(idUsuario);
      alert(mensaje);
      setSearchHistory([]);
    } catch (error) {
      console.error('Error al borrar el historial:', error);
    }
  };

  const handleEliminarLugar = async (idLugar) => {
    const idUsuario = localStorage.getItem('id');
    console.log(idUsuario);
    console.log(idLugar);
    if (!idUsuario) return;

    try {
      const response = await fetch('http://localhost:3001/historial/lugar', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuario, idLugar }),
      });
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        alert(data.message);
        // Actualiza el estado eliminando el lugar
        setSearchHistory((prevHistory) =>
          prevHistory.filter((item) => item.id !== idLugar)
        );
      } else {
        console.error('Error al eliminar el lugar:', data.error);
      }
    } catch (error) {
      console.error('Error al eliminar el lugar:', error);
    }
  };
/*
  // Filtrar el historial según el texto ingresado
  const filteredHistory = searchHistory.filter((item) =>
    item.query.toLowerCase().includes(searchText.toLowerCase())
  );*/

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Navbar />
 
      <Container maxWidth='lg' className='my-4'>
        
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: {sm: 'space-between'}, alignItems: 'center' }}>
          {/* Título Historial */}
          <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center', marginBottom: {xs: '2rem', md: '0'} }}>
              <HistoryIcon color='secondary' sx={{ fontSize: {lg: '3rem', sm: '2.5rem', xs: '1.3rem'} }} />
              <Typography sx={{ fontSize: {lg: '3rem', sm: '2.5rem', xs: '1.3rem'}, fontWeight: '700' }}>Historial de búsqueda</Typography>
          </Stack>

          {/* Buscador Historial */}
          <TextField
            label='Buscar en el historial'
            variant='outlined'
            size='small'
            sx={{ maxWidth: 250 }}
            value={searchText} // Asocia el valor al estado searchText
            onChange={(e) => setSearchText(e.target.value)} // Actualiza el estado cuando el usuario escribe
              
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
          {/* Botón de filtrado */}
          <Box sx={{ marginRight: {xs: '0', sm: '1rem'}, marginBottom: {xs: '1rem', sm: 0}}}>
            <ButtonsMod
              variant='secundario'
              textCont='Filtrar'
              startIcon={<FilterListIcon />}
            />
          </Box>
          {/* Botón borrar historial */}
          <ButtonsMod
            variant='secundario'
            textCont='Borrar historial'
            width='fit-content'
            startIcon={<DeleteIcon />}
            clickEvent={handleBorrarHistorial}
          />
        </Stack>

        <SearchHistoryBox
          searchHistory={searchHistory}
          onEliminarLugar={handleEliminarLugar}
        />

      
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default HistoryPage;