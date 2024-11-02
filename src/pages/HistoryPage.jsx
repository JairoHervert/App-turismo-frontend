import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/History.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

function SearchHistoryPage() { 
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const searchHistory = [
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

      <div className="search-history-background vh-100 vw-100 d-flex justify-content-center align-items-center">
        
        <div className="controls-container">
          <button className='btn btn-primary' type='button' >
            <i className="bi bi-funnel-fill"></i> Filtrar
          </button>
          <button className='btn btn-primary' type='button'>
            <i className="bi bi-trash-fill"></i> Borrar historial
          </button>

          <div className="search-container" style={{ position: 'relative' }}>
      <i className="bi bi-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar en el historial"
        onChange={(e) => console.log('Buscar:', e.target.value)}
        style={{ paddingLeft: '35px' }} // Aumenta el padding a la izquierda para el ícono
      />
    </div>
          
        </div>
        
        {/* Contenedor de los controles de filtro, borrar historial y búsqueda */}
        

        {/* Caja del historial de búsqueda */}
        <div className="search-history-box d-flex flex-column rounded">
          <h3 className="search-history-title fw-normal mb-3 pb-3 text-center">Historial de Búsqueda</h3>
          
          <div className="header d-flex justify-content-between align-items-center mb-2">
            <button className="close-icon" onClick={handleHomeClick}>✕</button>
          </div>

          <p className="date-text text-center">Hoy - martes, 15 de octubre de 2024</p>

          <div className="search-history-list">
            {searchHistory.map(item => (
              <div key={item.id} className="search-history-item d-flex justify-content-between align-items-center">
                <div className="item-left d-flex align-items-center">
                  <input type="checkbox" className="checkbox me-2" />
                  <small className="query-time me-2">{item.time}</small>
                  <Link to={`/search?q=${item.query}`} className="query-text">{item.query}</Link>
                </div>
                <div className="menu-icon">⋮</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer showIncorporaLugar={false} />
    </div>
  );
}

export default SearchHistoryPage;
