import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import logo from '../img/logo-provicional.png';
import avatar from '../img/userFoto.jpg';
import Preferencias from './Preferencias';
import Detalles from './modalDetalleIt';

function Navbar({ showingresa, showRegistrate, transparentNavbar, lightLink, staticNavbar }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Nombre de Usuario'); // Simula el nombre del usuario
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar la apertura del menú

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Función para manejar la apertura y cierre del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${transparentNavbar ? 'posit-fixed' : 'bg-light position-initial'} ${staticNavbar ? 'position-absolute' : ''}`}>
        <div className="mx-3 container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img className='logo-img' src={logo} alt="Logo-canasta-basica" />
          </Link>

          {/* Botón de colapso para móvil */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>

          {/* Enlaces del menú */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/">Lugares</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/">Gastronomía</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/">Museos</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/">Nuevas Experiencias</Link>
              </li>
            </ul>

            {/* Sección de perfil de usuario */}
            <div className="d-flex align-items-center">
              {isLoggedIn ? (
                <>
                  <div className="text-end me-2">
                    <div>Bienvenido</div>
                    <div className="fw-bold">{userName}</div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="nav-link p-0 d-flex align-items-center bg-transparent border-0"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={menuOpen}
                      onClick={toggleMenu}
                    >
                      <img
                        src={avatar}
                        alt="Perfil"
                        className="rounded-circle"
                        width="50"
                        height="50"
                      />
                      <i className={`bi ms-1 ${menuOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`}></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                      <li><Link className="dropdown-item" to="/profile">Mi Perfil</Link></li>
                      <li><Link className="dropdown-item" to="/settings">Configuración</Link></li>
                      <li><Link className='dropdown-item' to='/confirmacion-registro'>Confirmacion Registro</Link></li>
                      <li><Link className='dropdown-item' to='/deseados'>Deseados User</Link></li>
                      <li><Link className='dropdown-item' to='/itinerariesSaved'>Itinerarios guardados</Link></li>
                      <li><Link className='dropdown-item' to='/HistoryPage'>Historial de busqueda</Link></li>

                      {/* <li><Link className='dropdown-item' to='/register'>Registrate</Link></li>  */}

                      <li><Link className='dropdown-item' to='/favoritos'>Favoritos User</Link></li>
                      <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">Preferencias</button></li>
                      <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">Preferencias 2</button></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/logout">Cerrar Sesión</Link></li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {showingresa && (
                    <button className="btn btn-outline-primary me-2" type="button" onClick={handleLoginClick}>
                      Ingresa
                    </button>
                  )}
                  {showRegistrate && (
                    <button className="btn btn-primary" type="button" onClick={handleRegisterClick}>
                      Regístrate
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Componente de Preferencias */}
      <Preferencias />
      <Detalles />
    </>
  );
}

export default Navbar;