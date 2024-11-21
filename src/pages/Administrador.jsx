import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAD from '../components/NavBarA';
import Footer from '../components/Footer';
import Recibidos from '../components/Administrador/Recibidos';
import Dashboard from '../components/Administrador/Dashboard';
import FormularioLugar from '../components/Administrador/MainBox';

function SearchHistoryPageHistory() { 

  return (
    <div className='vh-100 vw-100'>
      <NavbarAD
        showingresa={false}
        showRegistrate={false}
        transparentNavbarAD={false}
        lightLink={false}
        staticNavbarAD={false}
      />

{/*       <div className="search-history-background-history d-flex flex-column align-items-center p-4">
 */}


        {/* Contenedor principal para Dashboard y Recibidos */}
        <div className='contenedor-cajas-admin d-flex  w-100'>
          <div className='contenedor-cajas-admin  '>
            
            <Dashboard />


            </div>
            <div className='second-container-admin'>
            <Recibidos />
            <FormularioLugar
                  addplace="Museo Frida Kahlo"
                  nombre="Miranda Rojo"
                  correo="AnaHola11@gmail.com"
                  date="16 de octubre del 2024"
                  hour="2:30 p.m."
                
            />
          </div>
        </div>



      <Footer showIncorporaLugar={false} />
    </div>
  );
}

export default SearchHistoryPageHistory;   