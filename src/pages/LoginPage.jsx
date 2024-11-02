import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginPage.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import imgFormulario from '../img/piramides-teotihuacan.webp';
import { fetchUsuarios } from '../js/LoginPage';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/iniciar-sesion', { correo, contraseña });
      console.log(response.data);
      if (response.data.id) {
        console.log("Inicio de sesión exitoso. ID de usuario:", response.data.id);
      } else {
        console.log("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  // VERIFICACIÓN CON GOOGLE
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Token de Google:', tokenResponse);
      // Aquí puedes manejar el token de acceso como desees
      console.log(typeof tokenResponse);
      const accessToken = tokenResponse.access_token;
      console.log('Token de acceso:', accessToken);
      // Llama a Google UserInfo API para obtener los datos del usuario
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              
            },
          }
        );
        console.log('Información del usuario:', userInfo.data);
        // Aquí puedes manejar la información del usuario (e.g., nombre, email)
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    },
    onError: () => {
      console.log('Error al autenticar con Google');
    },
  });

  // VERIFICACIÓN CON FACEBOOK
  const responseFacebook = (response) => {
    console.log(response); // Maneja la respuesta de autenticación aquí
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
              <h3 className='fw-normal mb-3 pb-3 fontMontserrat fw-semibold'>Iniciar sesión</h3>

              <form className='login-form' onSubmit={handleLogin}>
                <div className='mb-3'>
                  <label htmlFor='logInputEmail' className='form-label'>Correo electrónico</label>
                  <input
                    type='email'
                    className='form-control'
                    id='logInputEmail'
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='logInputPassword' className='form-label'>Contraseña</label>
                  <input
                    type='password'
                    className='form-control'
                    id='logInputPassword'
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                  />
                </div>

                <div className='pt-1 mb-4 mt-4'>
                  <button type='submit' className='btn btn-primary'>Iniciar sesión</button>
                </div>

                <div className='mb-3'>
                  <small><Link className='text-muted' to='/forgot-password'>¿Olvidaste tu contraseña?</Link></small>
                </div>

                {/* Sección de botones de redes sociales */}
                <div className='text-center mt-4 mb-5'>
                  <p>o inicia sesión con:</p>
                  <button type='button' className='btn btn-link btn-floating mx-1' onClick={() => login()}>
                    <i className='bi bi-google'></i>
                  </button>
                  <button type='button' className='btn btn-link btn-floating mx-1'>
                    <i className='bi bi-microsoft'></i>
                  </button>
                  <FacebookLogin
                    appId="1276060800080687"
                    autoLoad={false}
                    callback={responseFacebook}
                    render={(renderProps) => (
                        <button type="button" className="btn btn-link btn-floating mx-1" onClick={renderProps.onClick}>
                        <i className="bi bi-facebook"></i>
                      </button>
                    )}
                  />
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
