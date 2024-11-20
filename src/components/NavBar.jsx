import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import logo from '../img/logo-provicional.png';
import avatar from '../img/userFoto.jpg';
import Preferencias from './Preferencias';
import Detalles from './modalDetalleIt';
import { isLogged } from '../schemas/isLogged';

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

  // Verificar si el usuario está logueado
  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const loggedIn = await isLogged();
        setIsLoggedIn(loggedIn.logged);
        setUserName(loggedIn.data);
      } catch (error) {
        console.log('El usuario no ha iniciado sesión', error);
      }
    };

    fetchLoginStatus();
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
            <div className="d-flex align-items-center justify-content-end justify-content-sm-end">
              {isLoggedIn ? (
                <>
                  <div className="order-sm-1 text-end me-2">
                    <div>Bienvenido</div>
                    <div className="fw-bold">{userName}</div>
                  </div>
                  <div className="order-sm-2">
                    <img
                      src={avatar}
                      alt="Perfil"
                      className="rounded-circle"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div className="order-sm-3 dropdown">
                    <button
                      className="nav-link p-0 d-flex align-items-center bg-transparent border-0"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={menuOpen}
                      onClick={toggleMenu}
                    >
                      <i className={`bi ms-1 ${menuOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`}></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
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
                      <li><Link className='dropdown-item' to='/Admin-Page'>Página de administrador</Link></li>

                      {/* <li><Link className='dropdown-item' to='/register'>Registrate</Link></li>  */}

                      <li><Link className='dropdown-item' to='/favoritos'>Favoritos User</Link></li>
                      <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">Preferencias</button></li>
                      <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">Detalles</button></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/logout" onClick={handleLogout}>Cerrar Sesión</Link></li>
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