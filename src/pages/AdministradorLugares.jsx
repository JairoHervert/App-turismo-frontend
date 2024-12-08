import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAD from '../components/NavBarA';
import Footer from '../components/Footer';
import DashBoard from '../components/Administrador/Dashboard';
import Recibidos from '../components/AdminPlaces/Recibido';
import MainBox from '../components/AdminPlaces/MainBoxP';
import '../css/AdministradorLugares.css';



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
    <div >
  <div className="navbar-container-adp">
    <NavbarAD
      showingresa={false}
      showRegistrate={false}
      transparentNavbarAD={false}
      lightLink={false}
      staticNavbarAD={false}
    />
  </div>

      <div className="contenedor-cajas-admin-places ">
      <div className="contenedor-cajas-admin-places">
{       <DashBoard />
 }    </div>
 
    <div className="second-container-admin-places">
      <Recibidos setSelectedCategory={setSelectedCategory} />
      <MainBox lugares={lugares} selectedCategory={selectedCategory} setLugares={setLugares} />
    </div>
  </div>

  <div className="navbar-container-adp">
    <Footer showIncorporaLugar={false} />
  </div>
</div>
  );
}

// Navbar
const Header = () => (
  <div className="navbar-container-adp">
    <NavbarAD
      showingresa={false}
      showRegistrate={false}
      transparentNavbarAD={false}
      lightLink={false}
      staticNavbarAD={false}
    />
  </div>
);

// Contenedor principal con Dashboard y Recibidos
const MainContent = ({ lugares, selectedCategory, setLugares, setSelectedCategory }) => (
  <div className="contenedor-cajas-admin-places ">
    <div className="contenedor-cajas-admin-places">
      <DashBoard />
    </div>
    <div className="second-container-admin-places">
      <Recibidos setSelectedCategory={setSelectedCategory} />
      <MainBox lugares={lugares} selectedCategory={selectedCategory} setLugares={setLugares} />
    </div>
  </div>
);

const FooterContainer = () => (
  <div className="navbar-container-adp">
    <Footer showIncorporaLugar={false} />
  </div>
);

export default SearchHistoryPageHistory;
