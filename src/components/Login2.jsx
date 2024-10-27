import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login2.css';
import logo from '../img/logo-provicional.png';
import imgFormulario from '../img/piramides-teotihuacan.webp';

function Login2() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="login-background">
      {/* Logo y nombre en la esquina superior izquierda */}
      <div className="logo-container mt-4 ms-4" onClick={handleHomeClick}>
        <img src={logo} alt="Logo-canasta-basica" className="logo-image" />
        <span className="logo-text fontMontserrat fs-2">Canasta Básica</span>
      </div>

      {/* Contenedor del cuadro de login */}
      <div className="login-box">
        {/* Icono de cerrar en la esquina superior derecha */}
        <div className="close-icon" onClick={handleHomeClick}>✕</div>

        <div className="login-content">
          {/* Columna izquierda: Imagen y texto */}
          <div className="login-left">
            <img src={imgFormulario} alt="Login background" className="login-left-image" />
            <div className="login-left-overlay text-start">
              <h4 className='fw-semibold fs-2 fontMontserrat mb-4'>Bienvenido a la aventura que cambiará tu historia</h4>
              <small className='fw-light'>Únete a una comunidad vibrante donde florece la creatividad, se forjan conexiones y cada paso te acerca a experiencias inolvidables. Sumérgete y encuentra la inspiración.</small>

              {/* Crédito de la fotografía */}
              <div className="photo-credit">
                Fotografía de
                <p><span className="fw-bold">Nombre del Fotógrafo</span></p>
              </div>
            </div>
          </div>

          {/* Columna derecha: Formulario */}
          <div className="login-right">
            <h3 className="fw-normal mb-3 pb-3 fontMontserrat fw-semibold">Iniciar sesión</h3>

            <form className="login-form">
              <div className="mb-3">
                <label htmlFor="logInputEmail" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="logInputEmail" aria-describedby="emailHelp" />
              </div>

              <div className="mb-3">
                <label htmlFor="logInputEmail" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>

              <div className="pt-1 mb-4">
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
              </div>

              <div className="mb-3">
                <small><a className="text-muted" href="#!">¿Olvidaste tu contraseña?</a></small>
              </div>

              {/* Sección de botones de redes sociales */}
              <div className="text-center mt-4 mb-5">
                <p>o inicia sesión con:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="bi bi-google"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="bi bi-microsoft"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="bi bi-facebook"></i>
                </button>
              </div>

              <p>¿No tienes una cuenta? <a href="#!" className="fontRosaMexicano">Regístrate aquí</a></p>

              <div className="mt-4">
                <small>Al iniciar sesión, aceptas nuestros <a href="#!" className="fontAzulMayaOscuro">Términos de Servicio</a> y <a href="#!" className="fontAzulMayaOscuro">Política de Privacidad</a>.</small>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login2;
