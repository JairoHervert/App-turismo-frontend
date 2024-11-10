import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/History.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

function SearchHistoryPageHistory() { 
  const navigate = useNavigate();

  const searchHistoryHistory = [
    { id: 1, query: 'Tortas "El güero"', time: '6:23 p.m.' },
    { id: 2, query: 'Acuario "MICHIN"', time: '6:23 p.m.' },
    { id: 3, query: 'Hotel "Roma"', time: '6:23 p.m.' },
    { id: 5, query: 'Castillo de Chapultepec', time: '6:23 p.m.' },
    { id: 6, query: 'Acuario "Inbursa"', time: '6:23 p.m.' },
    { id: 7, query: 'Bosque de Chapultepec', time: '6:23 p.m.' },
    { id: 8, query: 'Plaza de la Constitución', time: '6:25 p.m.' },
    { id: 9, query: 'Museo Frida Kahlo', time: '6:26 p.m.' },
    { id: 10, query: 'Puebla y su arquitectura colonial', time: '6:30 p.m.' },
    { id: 11, query: 'Pirámides de Teotihuacán', time: '6:35 p.m.' },
    { id: 12, query: 'Isla de las Muñecas', time: '6:40 p.m.' },
    { id: 13, query: 'Cenotes de Yucatán', time: '6:42 p.m.' },
    { id: 14, query: 'Museo Nacional de Antropología', time: '6:45 p.m.' },
    { id: 15, query: 'Zócalo de Ciudad de México', time: '6:50 p.m.' },
    { id: 16, query: 'Parque Nacional de Tulum', time: '6:55 p.m.' },
    { id: 17, query: 'El Mercado de San Juan', time: '6:58 p.m.' },
    { id: 18, query: 'Xochimilco y sus trajineras', time: '7:00 p.m.' },
    { id: 19, query: 'Basilica de Guadalupe', time: '7:05 p.m.' },
    { id: 20, query: 'Teatro de la Ciudad "Esperanza Iris"', time: '7:10 p.m.' },
    { id: 21, query: 'La Casa Azul de Coyoacán', time: '7:15 p.m.' },
    { id: 22, query: 'Museo Tamayo', time: '7:20 p.m.' },
    { id: 23, query: 'La Marquesa', time: '7:25 p.m.' },
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
      <div className="search-history-background-history d-flex">
      <div className="filter-box-history">
  <span className="filter-option-history"><strong>Hoy</strong></span>
  <span className="filter-option-history">Ayer</span>
  <span className="filter-option-history">Más antigua</span>
</div>
        <div className='cont-hist-bus-history'>
            <b><h3 className="search-history-title-history fw-normal mb-3 pb-3 text-center">Historial de Búsqueda</h3></b>


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
            <button className='btn btn-primary btn-history' type='button'>
              <i className="bi bi-funnel-fill"></i> Filtrar
            </button>
            <button className='btn btn-primary btn-history ' type='button'>
              <i className="bi bi-trash-fill"></i> Borrar historial
            </button>

          </div>

        </div>

          <p className="date-text-history"> Hoy - martes, 15 de octubre de 2024</p>

        <div className="search-history-box-history d-flex flex-column rounded">

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
