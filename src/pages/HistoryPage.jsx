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

        <SearchHistoryBox searchHistory={searchHistoryHistory} />
      
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default HistoryPage;