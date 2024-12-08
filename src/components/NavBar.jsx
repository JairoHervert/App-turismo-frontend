import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import '../css/NavBar.css';
import logo from '../img/logo-provicional.png';
import avatar from '../img/userFoto.jpg';

// componentes locales
import ButtonsMod from './ButtonsMod';

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
      <nav className={`navbar navbar-expand-lg ${transparentNavbar ? 'position-fixed' : 'bg-light position-initial'} ${staticNavbar ? 'position-absolute' : ''}`}>
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
                <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/generar-itinerario">Generar itinerario</Link>
              </li>
            </ul>
            {/* Sección de perfil de usuario */}
            {isLoggedIn ? (
              <>
                <div className='align-items-center'>
                  {/* Versión para pantallas grandes */}
                  <div className="d-none d-lg-flex align-items-center justify-content-end">
                    <div className="order-lg-1 text-end me-2">
                      <div>Bienvenido</div>
                      <div className="fw-bold">{userName}</div>
                    </div>
                    <div className="order-lg-1">
                      <img
                        src={avatar}
                        alt="Perfil"
                        className="rounded-circle"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div className="order-lg-2 dropdown">
                      <button
                        onClick={toggleMenu}
                        aria-expanded={menuOpen}
                        data-bs-toggle="dropdown"
                        id="userDropdown"
                        className="nav-link p-0 d-flex align-items-center bg-transparent border-0"
                      >
                        <i className={`bi ms-1 ${menuOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`}></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        {/* Opciones del menú */}
                        <li><Link className="dropdown-item" to='/perfil-page'>Mi Perfil</Link></li>
                        <li><Link className="dropdown-item" to="/settings">Configuración</Link></li>
                        <li><Link className='dropdown-item' to='/Categorias-page'>Categorías</Link></li>
                        <li><Link className='dropdown-item' to='/confirmacion-registro'>Confirmación Registro</Link></li>
                        <li><Link className='dropdown-item' to='/deseados'>Deseados User</Link></li>
                        <li><Link className='dropdown-item' to='/itinerariesSaved'>Itinerarios guardados</Link></li>
                        <li><Link className='dropdown-item' to='/HistoryPage'>Historial de búsqueda</Link></li>
                        <li><Link className='dropdown-item' to='/resume-page'>Página de resumen</Link></li>
                        <li><Link className='dropdown-item' to='/itinerary'>Página de itinerario</Link></li>
                        <li><Link className='dropdown-item' to='/register-place-page'>Página de alta de lugares</Link></li>
                        <li><Link className='dropdown-item' to='/Admin-Page-Places'>Página de solicitud de administrador</Link></li>
                        <li><Link className='dropdown-item' to='/Admin-Page'>Página de administrador</Link></li>
                        <li><Link className='dropdown-item' to='/Admin-dashboard'>Dashboard de administrador</Link></li>
                        <li><Link className='dropdown-item' to='/Admin-SavedPlaces'>Lugares de administrador</Link></li>
                        <li><Link className='dropdown-item' to='/favoritos'>Favoritos User</Link></li>
                        <li><Link className='dropdown-item' to='/recuperar-contrasena'>Recuperar Contraseña</Link></li>
                        <li><Link className='dropdown-item' to='/ingresar-nueva-contrasena'>Ingresar Nueva Contraseña</Link></li>
                        <li><Link className='dropdown-item' to='/all-places'>Todos los lugares</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/logout">Cerrar Sesión</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>


                {/* Versión para pantallas pequeñas */}
                <div className='d-lg-none'>
                  <hr className="my-3"></hr>
                  <ul className=" d-flex navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/perfil-page'>Mi Perfil</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/settings">Configuración</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/deseados'>Deseados User</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/itinerariesSaved'>Itinerarios guardados</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/HistoryPage'>Historial de búsqueda</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/itinerary'>Página de itinerario</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/all-places'>Todos los lugares</Link>
                    </li>
                    <li className="nav-item">
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/logout">Cerrar Sesión</Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {showingresa && (
                  <Box>
                    <ButtonsMod
                      variant='secundario'
                      textCont='Ingresa'
                      width='6rem'
                      height='2.rem'
                      clickEvent={handleLoginClick}
                      type='submit'
                    />
                  </Box>
                )}
                {showRegistrate && (
                  <Box className='ms-1'>
                    <ButtonsMod
                      variant='principal'
                      textCont='Regístrate'
                      width='6rem'
                      height='2.rem'
                      clickEvent={handleRegisterClick}
                      type='submit'
                    />
                  </Box>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;