import React from 'react';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Navbar from '../components/NavBar';
import HistoryIcon from '@mui/icons-material/History';
import Footer from '../components/Footer';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchHistoryBox from '../components/history/SearchHistoryBox'; 
import DeleteIcon from '@mui/icons-material/Delete';

function SearchHistoryPageHistory() { 
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
    <div className='vh-100 vw-100'>
      <Navbar />
      <Stack direction='row' spacing={1} alignItems='flex-start' sx={{ ml: 3, mb: 3 }}>
  <HistoryIcon color="primary" fontSize="inherit" sx={{ fontSize: '4rem', }} />
  <h1 className='history-page-title'>Historial de búsqueda</h1>
</Stack>


      <div className="search-history-background-history">
        <div className='cont-hist-bus-history'>
          <div className="controls-container-history">
            <TextField
              label="Buscar en el historial"
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
            <Button
              variant="contained"
              size="large"
              sx={{
                marginBottom: '8px',
                backgroundColor: '#e4007c',
                '&:hover': {
                  backgroundColor: '#c3006a',
                },
              }}
              startIcon={<FilterListIcon />} // Añade el icono al principio del botón
            >
              Filtrar
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                marginBottom: '8px',
                backgroundColor: '#e4007c',
                '&:hover': {
                  backgroundColor: '#c3006a',
                },
              }}
              startIcon={<DeleteIcon />} // Añade el icono de borrar al principio del botón
            >
              Borrar historial
            </Button>
          </div>
        </div>
        <SearchHistoryBox searchHistory={searchHistoryHistory} date={todayDate} />
      </div>
      <Footer />
    </div>
  );
}

export default SearchHistoryPageHistory;
