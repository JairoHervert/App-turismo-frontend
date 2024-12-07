import React from 'react';
import { Container, Stack, Typography, Button, TextField, InputAdornment, Box } from '@mui/material';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import SearchHistoryBox from '../components/history/SearchHistoryBox'; 
import { History as HistoryIcon, Delete as DeleteIcon, FilterList as FilterListIcon, Search as SearchIcon } from '@mui/icons-material';

import { ThemeProvider } from '@mui/material/styles';
import ThemeMaterialUI from '../components/ThemeMaterialUI';

import '../css/History.css';
import ButtonsMod from '../components/ButtonsMod';

function HistoryPage() { 
  const searchHistoryHistory = [
    { id: 1, query: 'Tortas "El güero"', time: '6:23 p.m.' },
    { id: 2, query: 'Acuario "MICHIN"', time: '6:23 p.m.' },
    { id: 3, query: 'Hotel "Roma"', time: '6:23 p.m.' },
    { id: 5, query: 'Castillo de Chapultepec', time: '6:23 p.m.' },
    { id: 6, query: 'Acuario "Inbursa"', time: '6:23 p.m.' },
    { id: 7, query: 'Bosque de Chapultepec', time: '6:23 p.m.' },
    { id: 8, query: 'Plaza de la Constitución', time: '6:25 p.m.' },
  ];
  const todayDate = "martes, 15 de octubre de 2024";

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Navbar />
 
      <Container maxWidth='lg' className='my-4'>
        
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: {sm: 'space-between'}, alignItems: 'center' }}>
          {/* Título Historial */}
          <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center', marginBottom: {xs: '2rem', md: '0'} }}>
              <HistoryIcon color='primary' sx={{ fontSize: {lg: '3rem', sm: '2.5rem', xs: '1.3rem'} }} />
              <Typography sx={{ fontSize: {lg: '3rem', sm: '2.5rem', xs: '1.3rem'}, fontWeight: '700' }}>Historial de búsqueda</Typography>
          </Stack>

          {/* Buscador Historial */}
          <TextField
            label='Buscar en el historial'
            variant='outlined'
            size='small'
            sx={{ maxWidth: 250 }}
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
          />
        </Stack>

        <SearchHistoryBox searchHistory={searchHistoryHistory} date={todayDate} />
      
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default HistoryPage;
