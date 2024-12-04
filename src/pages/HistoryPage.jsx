import React, { useEffect, useState } from 'react';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Navbar from '../components/NavBar';
import HistoryIcon from '@mui/icons-material/History';
import Footer from '../components/Footer';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchHistoryBox from '../components/history/SearchHistoryBox'; 
import DeleteIcon from '@mui/icons-material/Delete';
import { obtenerHistorial, borrarHistorial } from '../pagesHandlers/history-handler';

function SearchHistoryPageHistory() { 
  const [searchHistory, setSearchHistory] = useState([]); // Estado para el historial
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const todayDate = new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  useEffect(() => {
    const fetchHistorial = async () => {
      const idUsuario = localStorage.getItem('id'); // Obtén el ID del usuario
      if (!idUsuario) return;

      try {
        const historial = await obtenerHistorial(idUsuario); // Llama a la API para obtener el historial
        console.log('Historial recibido:', historial); // Verifica los datos
        setSearchHistory(historial); // Actualiza el estado con los datos obtenidos
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
  const idUsuario = localStorage.getItem('id'); // Obtén el ID del usuario
  if (!idUsuario) return;

  try {
    // Llama a la API para eliminar el lugar
    const response = await fetch('http://localhost:3001/historial/lugar', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idUsuario, idLugar }),
    });
    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      // Actualiza el estado eliminando el lugar
      setSearchHistory((prevHistory) =>
        prevHistory.filter((item) => item.idLugar !== idLugar)
      );
    } else {
      console.error('Error al eliminar el lugar:', data.error);
    }
  } catch (error) {
    console.error('Error al eliminar el lugar:', error);
  }
};

  // Filtrar el historial según el texto ingresado
  const filteredHistory = searchHistory.filter((item) =>
    item.query.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className='vh-100 vw-100'>
      <Navbar />
      <div className="search-history-background-history">
        <div className='cont-hist-bus-history'>
          <div className="controls-container-history">
            <TextField
              label="Buscar en el historial"
              variant="outlined"
              size="small"
              sx={{ maxWidth: 250 }}
              value={searchText} // Asocia el valor al estado searchText
              onChange={(e) => setSearchText(e.target.value)} // Actualiza el estado cuando el usuario escribe
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
              startIcon={<FilterListIcon />}
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
              startIcon={<DeleteIcon />}
              onClick={handleBorrarHistorial}
            >
              Borrar historial
            </Button>
          </div>
          <div>
            <Stack direction='row' spacing={1} alignItems='flex-start' sx={{ ml: -30, mb: 3 }}>
              <HistoryIcon color="primary" fontSize="Montserrat" sx={{ fontSize: '4rem'}} />
              <h1 className='history-page-title fw-bolder fontMontserrat mb-4 us_de-deseados-text'>Historial de búsqueda</h1>
            </Stack>
          </div>
        </div>
        <SearchHistoryBox searchHistory={filteredHistory} date={todayDate} onEliminarLugar={handleEliminarLugar} />
      </div>
      <Footer />
    </div>
  );
}

export default SearchHistoryPageHistory;
