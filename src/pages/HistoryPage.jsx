import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/History.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

function SearchHistoryPageHistory() { 
  const navigate = useNavigate();

  const handleHomeClickHistory = () => {
    navigate('/');
  };

  const searchHistoryHistory = [
    { id: 1, query: 'Tortas "El güero"', time: '6:23 p.m.' },
    { id: 2, query: 'Acuario "MICHIN"', time: '6:23 p.m.' },
    { id: 3, query: 'Hotel "Roma"', time: '6:23 p.m.' },
    { id: 4, query: 'Six Flags México', time: '6:23 p.m.' },
    { id: 5, query: 'Castillo de Chapultepec', time: '6:23 p.m.' },
    { id: 6, query: 'Acuario "Inbursa"', time: '6:23 p.m.' },
    { id: 7, query: 'Bosque de Chapultepec', time: '6:23 p.m.' },

  ];

  return (
    <div className='vh-100 vw-100'>
      <Navbar
        showingresa={false}
        showRegistrate={false}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <div className="search-history-background-history d-flex flex-column justify-content-center">
        
        <div className="controls-container-history">
          <button className='btn btn-primary' type='button'>
            <i className="bi bi-funnel-fill"></i> Filtrar
          </button>
          <button className='btn btn-primary' type='button'>
            <i className="bi bi-trash-fill"></i> Borrar historial
          </button>

          <div className="search-container position-relative">
            <i className="bi bi-search position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
            <input
              type="text"
              className="search-bar-history"
              placeholder="Buscar en el historial"
              onChange={(e) => console.log('Buscar:', e.target.value)}
            />
          </div>
        </div>

        <div className="search-history-box-history d-flex flex-column rounded">
          <h3 className="search-history-title-history fw-normal mb-3 pb-3 text-center">Historial de Búsqueda</h3>
          <p className="date-text-history text-center">Hoy - martes, 15 de octubre de 2024</p>

          <div className="search-history-list-history">
            {searchHistoryHistory.map(item => (
              <div key={item.id} className="search-history-item-history d-flex justify-content-between align-items-center">
                <div className="item-left-history d-flex align-items-center">
                  <input type="checkbox" className="checkbox-history me-2" />
                  <small className="query-time-history me-2">{item.time}</small>
                  <Link to={`/search?q=${item.query}`} className="query-text-history">{item.query}</Link>
                </div>
                <div className="menu-icon-history">⋮</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer showIncorporaLugar={false} />
    </div>
  );
}

export default SearchHistoryPageHistory;
