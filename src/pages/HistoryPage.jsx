import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/History.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import SearchHistoryBox from '../components/history/SearchHistoryBox'; 
import DropdownMenu from '../components/history/DropdownMenu'; // Importar el componente

function SearchHistoryPageHistory() { 
  const navigate = useNavigate();

  const searchHistoryHistory = [
    { id: 1, query: 'Tortas "El güero"', time: '6:23 p.m.' },
    { id: 2, query: 'Acuario "MICHIN"', time: '6:23 p.m.' },
    { id: 3, query: 'Hotel "Roma"', time: '6:23 p.m.' },
    { id: 5, query: 'Castillo de Chapultepec', time: '6:23 p.m.' },
    { id: 6, query: 'Acuario "Inbursa"', time: '6:23 p.m.' },
    { id: 7, query: 'Bosque de Chapultepec', time: '6:23 p.m.' },
    { id: 7, query: 'Bosque de Chapultepec', time: '6:23 p.m.' },
    { id: 7, query: 'Bosque de Chapultepec', time: '6:23 p.m.' },
    { id: 7, query: 'Bosque de Chapultepec', time: '6:23 p.m.' },
    { id: 7, query: 'Bosque de Chapultepec', time: '6:23 p.m.' },
    { id: 7, query: 'Bosque de Chapultepec', time: '6:23 p.m.' },
    { id: 8, query: 'Plaza de la Constitución', time: '6:25 p.m.' },

  ];
  const todayDate = "martes, 15 de octubre de 2024";

  return (
    <div className='vh-100 vw-100'>
      <Navbar
        showingresa={false}
        showRegistrate={false}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <div className="search-history-background-history d-flex">

        <div className='cont-hist-bus-history'>
          <b>
            <h3 className="search-history-title-history fw-normal mb-3 pb-3 text-center">
              Historial de Búsqueda
            </h3>

          </b>

          <div className="controls-container-history">
            <div className="search-container position-relative">
              <i className="bi bi-search position-absolute" style={{ left: '10px', top: '18px', transform: 'translateY(-50%)' }}></i>
              <input
                type="text"
                className="search-bar-history"
                placeholder="Buscar en el historial"
                onChange={(e) => console.log('Buscar:', e.target.value)}
              />
            </div>
            <button className='btn btn-primary v' type='button'>
              <i className="bi bi-funnel-fill"></i> Filtrar
            </button>
            <button className='btn btn-primary btn-history ' type='button'>
              <i className="bi bi-trash-fill"></i> Borrar historial
            </button>
          </div>
        </div>
        <SearchHistoryBox searchHistory={searchHistoryHistory} date={todayDate} />
      </div>
      <DropdownMenu />

      <Footer showIncorporaLugar={false} />
    </div>
  );
}

export default SearchHistoryPageHistory;
