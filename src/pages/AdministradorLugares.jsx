import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAD from '../components/NavBarA';
import Footer from '../components/Footer';
import DashBoard from '../components/AdminPlaces/Dash';
import Recibidos from '../components/AdminPlaces/Recibido';
import MainBox from '../components/AdminPlaces/MainBoxP';

function SearchHistoryPageHistory() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [lugares, setLugares] = useState([
    { NombrePersona: 'Don ramon', correoPersona: 'DR@example.com', nombreLugar: 'Tacos el wero', categoria: 'Ninguna' },
    { NombrePersona: 'Gaspar Henaine', correoPersona: 'GH@example.com', nombreLugar: 'Hotel "El sonidito', categoria: 'Ninguna' },
    { NombrePersona: 'Carlos', correoPersona: 'carlos@example.com', nombreLugar: 'Bosque', categoria: 'Ninguna' },
    // Más lugares...
  ]);

  return (
    <div className="vh-100 vw-100">
      {/* Navbar con estilo sticky para que quede fijo en la parte superior */}
      <div className='navbar-container-adp'>
      <NavbarAD
        showingresa={false}
        showRegistrate={false}
        transparentNavbarAD={false}
        lightLink={false}
        staticNavbarAD={false}
    
      />
    </div>
      {/* Contenedor principal para Dashboard y Recibidos */}
      <div className="contenedor-cajas-admin-places d-flex w-100">
        <div className="contenedor-cajas-admin-places">
          <DashBoard />
        </div>
        <div className="second-container-admin-places">
          <Recibidos setSelectedCategory={setSelectedCategory} />
          <MainBox lugares={lugares} selectedCategory={selectedCategory} setLugares={setLugares} />
        </div>
      </div>

      {/* Footer */}
<div className='navbar-container-adp'>

      <Footer showIncorporaLugar={false} />
</div>


    </div>
  );
}

export default SearchHistoryPageHistory;
