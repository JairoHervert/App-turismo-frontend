import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Bookmark as BookmarkIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAD from '../components/NavBarA';
import Footer from '../components/Footer';
import DashBoard from '../components/AdminPlaces/Dash';
import Recibido from '../components/AdminPlaces/Recibido';
import MainBox from '../components/AdminPlaces/MainBoxP';


function SearchHistoryPageHistory() { 
  const navigate = useNavigate();
  const lugares = [
    { NombrePersona: 'Carlos Villagrán', nombreLugar: 'Palacio de Bellas Artes', categoria: 'Cultural' },
    { NombrePersona: 'Gaspar Henaine', nombreLugar: 'Museo Nacional de Antropología', categoria: 'Histórico' },
    { NombrePersona: 'Don Ramón', nombreLugar: 'Tacos el paisano', categoria: 'Comida' },
  ];
  return (
    <div className='vh-100 vw-100'>
      <NavbarAD
        showingresa={false}
        showRegistrate={false}
        transparentNavbarAD={false}
        lightLink={false}
        staticNavbarAD={false}
      />

      {/* Contenedor principal para Dashboard y Recibidos */}
      <div className='contenedor-cajas-admin-places d-flex  w-100'>
        
        <div className='contenedor-cajas-admin-places'>
          <DashBoard />
        </div>
        <div className='second-container-admin-places'>
          <Recibido />
          <MainBox 
        lugares={lugares} 
      />   
        </div>
       
         </div>

      <Footer showIncorporaLugar={false} />
    </div>
  );
}

export default SearchHistoryPageHistory;
