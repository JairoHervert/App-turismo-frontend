import React from 'react';
import '../css/NavBarHome.css';
import logo from '../img/logo-provicional.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img className='logo-img' src={logo} alt="Logo"/>
        </a>

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
          <i className="fas fa-bars"></i>
        </button>

        {/* Enlaces del menú */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Lugares</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Gastronomía</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Museos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Nuevas Experiencias</a>
            </li>
          </ul>

          {/* Botones de Ingresar y Registrarse */}
          <div className="d-flex">
            <button className="btn btn-outline-primary me-2" type="button">
              Ingresa
            </button>
            <button className="btn btn-primary" type="button">
              Regístrate
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
