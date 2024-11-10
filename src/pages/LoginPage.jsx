import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginPage.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import imgFormulario from '../img/piramides-teotihuacan.webp';
import { fetchUsuarios } from '../js/LoginPage';

function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correoReglas, setCorreoReglas] = useState({
    sinEspacios: false,
    arrobaCaracteres: false,
    dominioConPunto: false,
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/iniciar-sesion', { correo, contraseña });
      if (response.data.id) {
        console.log("Inicio de sesión exitoso. ID de usuario:", response.data.id);
      }
    } catch (error) {
      // Mostrar el mensaje de error específico
      if (error.response && error.response.data && error.response.data.error) {
        console.error("Error:", error.response.data.error);
      } else {
        console.error("Error al intentar iniciar sesión:", error);
      }
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  // Manejador para actualizar, analizar y validar el valor del correo
  const handleCorreoChange = (e) => {
    const correo = e.target.value;
    setCorreo(correo);
    console.log(correo);

    // Validar reglas
    setCorreoReglas({
      sinEspacios: /^[^\s]+$/.test(correo),
      arrobaCaracteres: /^[^@]+@[^@]+$/.test(correo),
      dominioConPunto: /@[^@]+\.[^@]+$/.test(correo),
    });
  };

  return (
    <div className='vh-100 vw-100'>
      <Navbar
        showingresa={false}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <div className='login-background vh-100 vw-100 d-flex justify-content-center align-items-center'>
        <div className='login-box d-flex flex-column rounded'>
          {/* Icono de cerrar en la esquina superior derecha */}
          <div className='close-icon' onClick={handleHomeClick}>✕</div>

          <div className='login-content d-flex'>
            {/* Columna izquierda: Imagen y texto */}
            <div className='login-left'>
              <img src={imgFormulario} alt='Login background' className='login-left-image' />
              <div className='login-left-overlay text-start d-flex flex-column justify-content-center pb-5'>
                <h4 className='fw-semibold fs-2 fontMontserrat'>Bienvenido a la aventura que cambiará tu historia</h4>
                <small className='fw-light'>Únete a una comunidad vibrante donde florece la creatividad, se forjan conexiones y cada paso te acerca a experiencias inolvidables. Sumérgete y encuentra la inspiración.</small>

                {/* Crédito de la fotografía */}
                <div className='photo-credit'>
                  Fotografía de
                  <p><span className='fw-bold'>Nombre del Fotógrafo</span></p>
                </div>
              </div>
            </div>

            {/* Columna derecha: Formulario */}
            <div className='login-right d-flex flex-column justify-content-center'>
              <h3 className='fw-normal mb-3 pb-3 fontMontserrat fw-bolder'>Iniciar sesión</h3>

              <form className='login-form' onSubmit={handleLogin}>
                <div className='mb-3'>
                  <label htmlFor='logInputEmail' className='form-label fw-semibold'>Correo electrónico</label>

                  <input
                    type='email'
                    className='form-control'
                    id='logInputEmail'
                    value={correo}
                    onChange={handleCorreoChange}
                  //onChange={(e) => setCorreo(e.target.value)}
                  />
                  <ul>
                    <li className={`lo_pa-rule-input ${correoReglas.sinEspacios ? 'text-success' : ''}`}>
                      No debe contener espacios.
                    </li>
                    <li className={`lo_pa-rule-input ${correoReglas.arrobaCaracteres ? 'text-success' : ''}`}>
                      Debe tener al menos un carácter antes y después del símbolo @.
                    </li>
                    <li className={`lo_pa-rule-input ${correoReglas.dominioConPunto ? 'text-success' : ''}`}>
                      Debe incluir un punto en la parte del dominio (por ejemplo, .com, .net).
                    </li>
                  </ul>
                </div>

                <div className='mb-3'>
                  <label htmlFor='logInputPassword' className='form-label fw-semibold'>Contraseña</label>
                  <input
                    type='password'
                    className='form-control'
                    id='logInputPassword'
                    required
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                  />
                </div>

                <div className='pt-1 mb-4 mt-4'>
                  <button type='submit' className='btn btn-primary fw-semibold'>Iniciar sesión</button>
                </div>

                <div className='mb-3'>
                  <small><Link className='text-muted' to='/forgot-password'>¿Olvidaste tu contraseña?</Link></small>
                </div>

                {/* Sección de botones de redes sociales */}
                <div className='text-center lo_pa-opciones-inicio'>
                  <p className='fw-semibold'>o inicia sesión con:</p>
                  <button type='button' className='btn btn-link btn-floating mx-1'>
                    <i className='bi bi-google'></i>
                  </button>
                  <button type='button' className='btn btn-link btn-floating mx-1'>
                    <i className='bi bi-facebook'></i>
                  </button>
                </div>

                <p>¿No tienes una cuenta? <Link to='/register' className='fontRosaMexicano'>Regístrate aquí</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer showIncorporaLugar={false} />
    </div>
  );
}

export default LoginPage;
