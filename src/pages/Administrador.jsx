import React from 'react';
import {
  DialogContentText, DialogActions, TextField, InputAdornment
} from '@mui/material';
import { Search as SearchIcon, Bookmark as BookmarkIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Administrador.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Recibidos from '../components/Administrador/Recibidos';
import Dashboard from '../components/Administrador/Dashboard';
import FormularioLugar from '../components/Administrador/MainBox';

function SearchHistoryPageHistory() { 
  const navigate = useNavigate();

  return (
    <div className='vh-100 vw-100'>
      <Navbar
        showingresa={false}
        showRegistrate={false}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <div className="search-history-background-history d-flex flex-column align-items-center p-4">

        {/* Contenedor de la barra de búsqueda */}
        <div className="controls-container-admin mb-4">
  <TextField
    label="Buscar"
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
</div>


        {/* Contenedor principal para Dashboard y Recibidos */}
        <div className='contenedor-cajas-admin d-flex justify-content-between w-100'>
          <div className='contenedor-cajas-admin d-flex justify-content-between w-100'>
            <Dashboard />
            <FormularioLugar
                  addplace="Museo Frida Kahlo"
                  nombre="Miranda Rojo"
                  correo="AnaHola11@gmail.com"
                  date="16 de octubre del 2024"
                  hour="2:30 p.m."
                
            />

            <Recibidos />
          </div>


        </div>


      </div>

      <Footer showIncorporaLugar={false} />
    </div>
  );
}

export default SearchHistoryPageHistory;
