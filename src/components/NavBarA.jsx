import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBarA.css';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import logo from '../img/logo-provicional.png';
import avatar from '../img/userFoto.jpg';


function NavbarAD({ showingresa, showRegistrate, transparentNavbar, lightLink, staticNavbar }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Nombre de Usuario');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${transparentNavbar ? 'posit-fixed' : 'bg-light position-initial'} ${staticNavbar ? 'position-absolute' : ''}`} >
        <div className="mx-3 container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img className="logo-img" src={logo} alt="Logo-canasta-basica" />
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <TextField
                  label="Buscar"
                  variant="outlined"
                  size="small"
                  sx={{
                    maxWidth: 250,
                    flexGrow: 1,
                    marginLeft: 'auto',
                    marginRight: 0,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </li>
            </ul>

            {/* Sección de perfil de usuario */}
            <div className="d-flex align-items-center justify-content-end justify-content-sm-end">
              {isLoggedIn ? (
                <>
                  <div className="order-sm-1 text-end me-2">
                    <div>Bienvenido Administrador</div>
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
                      <li><Link className="dropdown-item" to="/profile">Mi Perfil</Link></li>
                      <li><Link className="dropdown-item" to="/Admin-Page-Places">Página de solicitud de administrador</Link></li>
                      <li><Link className="dropdown-item" to="/Admin-Page">Página de administrador</Link></li>
                      <li><Link className='dropdown-item' to='/Admin-dashboard'>Dashboard de administrador</Link></li>
                      <li><Link className='dropdown-item' to='/Admin-SavedPlaces'>Lugares de administrador</Link></li> 
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

    </>
  );
}

export default NavbarAD;
