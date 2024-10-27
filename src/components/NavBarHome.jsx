import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/NavBarHome.css';
import logo from '../img/logo-provicional.png';

function Navbar({ showingresa, ShowRegistrate }) {

  // Navegación programática con el hook useNavigate
  const navigate = useNavigate();

  // Función para boton de login
  const handleLoginClic = () => {
    navigate('/login');
  };

  // Función para boton de registro
  const handleRegisterClick = () => {
    navigate('/register');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img className='logo-img' src={logo} alt="Logo-canasta-basica"/>
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
          <i className="fas fa-bars"></i>
        </button>

        {/* Enlaces del menú */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Enlaces (por ahora todos llevan a home) */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Lugares</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Gastronomía</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Museos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Nuevas Experiencias</Link>
            </li>
          </ul>

          {/* Botones de Ingresar y Registrarse con hook para redireccionamiento*/}
          <div className="d-flex">

            {/* Mostrar botones de Ingresar o Registrate si sus sentinelas son True */}
            {showingresa && (
              <button className="btn btn-outline-primary me-2" type="button" onClick={handleLoginClic}>
              Ingresa
            </button> )}

            {ShowRegistrate && (
            <button className="btn btn-primary" type="button" onClick={handleRegisterClick}>
              Regístrate
            </button> )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
