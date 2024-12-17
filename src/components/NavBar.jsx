import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import '../css/NavBar.css';
import logo from '../img/logo-provicional.png';
import avatar from '../img/userFoto.jpg';
import axios from 'axios';
import { isLogged } from '../schemas/isLogged';

// componentes locales
import ButtonsMod from './ButtonsMod';

function Navbar({ showingresa, showRegistrate, transparentNavbar, lightLink, staticNavbar }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Nombre de Usuario'); // Simula el nombre del usuario
  const [profileImage, setProfileImage] = useState(avatar);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar la apertura del menú

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Verificar si el usuario está logueado
  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const id = localStorage.getItem('id');
        
        if (token && id) {
          const response = await axios.post('http://localhost:3001/isLogged', { id, token });
          if (response.data.logged) {
            setIsLoggedIn(true);
            setUserName(response.data.decoded.username);
  
            if (response.data.decoded.imagen) {
              // Validar si la nueva imagen es válida antes de actualizar
              const img = new Image();
              img.onload = () => setProfileImage(response.data.decoded.imagen);
              img.onerror = () => console.log('No se pudo cargar la imagen del perfil');
              img.src = response.data.decoded.imagen;
            }
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log('El usuario no ha iniciado sesión', error);
        setIsLoggedIn(false);
      }
    };
  
    fetchLoginStatus();
  
    // Agregar un listener para detectar cambios en el token
    const handleStorageChange = () => {
      fetchLoginStatus();
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Función para manejar la apertura y cierre del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

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
                <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/lugares">Lugares</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/alcaldias">Alcaldías</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/generar-itinerario">Genera un itinerario</Link>
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
                              src={profileImage}
                              alt="Perfil"
                              className="rounded-circle object-fit-cover"
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
                        
                        <li><Link className="dropdown-item" to='/perfil-page'>Usuario - Perfil</Link></li>
                        <li><Link className='dropdown-item' to='/deseados'>Usuario - Deseados</Link></li>
                        <li><Link className='dropdown-item' to='/favoritos'>Usuario - Favoritos</Link></li>
                        <li><Link className='dropdown-item' to='/itinerariesSaved'>Usuario - Itinerarios guardados</Link></li>
                        <li><Link className='dropdown-item' to='/HistoryPage'>Usuario - Historial</Link></li>
                        <li><Link className='dropdown-item' to='/Categorias-page'>Itinerario - Categorías</Link></li>
                        <li><Link className='dropdown-item' to='/itinerary'>Página de itinerario</Link></li>
                        <li><Link className='dropdown-item' to='/register-place-page'>Página de alta de lugares</Link></li>
                        <li><Link className='dropdown-item' to='/Admin-Page-Places'>Página de solicitud de administrador</Link></li>
                        <li><Link className='dropdown-item' to='/Admin-Page'>Página de administrador</Link></li>
                        <li><Link className='dropdown-item' to='/Admin-dashboard'>Dashboard de administrador</Link></li>
                        <li><Link className='dropdown-item' to='/Admin-SavedPlaces'>Lugares de administrador</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/logout" onClick={handleLogout}>Cerrar Sesión</Link></li>
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
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/deseados'>Mis lugares deseados</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/favoritos'>Mis lugares favoritos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/itinerariesSaved'>Mis itinerarios guardados</Link>
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to='/HistoryPage'>Historial de búsqueda</Link>
                    </li>
                    <li className="nav-item">
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="nav-item">
                      <Link className={`nav-link ${lightLink ? 'blanco' : ''}`} to="/logout" onClick={handleLogout}>Cerrar Sesión</Link>
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