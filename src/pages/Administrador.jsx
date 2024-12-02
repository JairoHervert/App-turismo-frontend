import React from 'react';
import { useLocation } from 'react-router-dom';
import NavbarAD from '../components/NavBarA';
import Footer from '../components/Footer';
import Dashboard from '../components/Administrador/Dashboard';
import FormularioLugar from '../components/Administrador/MainBox';
import '../css/Admin2.css';

function SearchHistoryPageHistory() { 
  const location = useLocation();
  const lugar = location.state?.lugar;  // Aquí obtenemos los datos del lugar

  return (
    <div className='contenedor-cajas-admin vh-100 vw-100'>
      <NavbarAD
        showingresa={false}
        showRegistrate={false}
        transparentNavbarAD={false}
        lightLink={false}
        staticNavbarAD={false}
      />

      {/* Contenedor principal para Dashboard y FormularioLugar */}
      <div className="contenedor-principal">
        <div className="">
          <Dashboard />
        </div>
        <div className="main-content-container">
          {lugar ? (
            <FormularioLugar
              addplace={lugar.nombreLugar} // Aquí pasamos el nombre del lugar
              nombre={lugar.NombrePersona} // Aquí pasamos el nombre de la persona
              correo={lugar.correoPersona} // Aquí pasamos el correo de la persona
              date="16 de octubre del 2024" // Si tienes una fecha, úsala aquí
              hour="2:30 p.m." // Si tienes una hora, úsala aquí
            />
          ) : (
            <p>No se encontraron datos del lugar.</p> // Si no hay lugar, mostramos un mensaje
          )}
        </div>
      </div>

      <FooterContainer />
    </div>
  );
}

const FooterContainer = () => (
  <div className="navbar-container-adp">
    <Footer showIncorporaLugar={false} />
  </div>
);

export default SearchHistoryPageHistory;
