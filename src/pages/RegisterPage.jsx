import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/RegisterPage.css';
import '../css/LoginPage.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import imgFormulario from '../img/registerIMGA.jpg';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { handleRegistro, successGoogleHandler, errorGoogleHandler, responseFacebook} from '../pagesHandlers/register-handler';

function RegisterPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [contraseña2, setContraseña2] = useState('');
  const [error, setError] = useState('');

  const handleHomeClick = () => {
    navigate('/');
  };

  // VERIFICACIÓN CON GOOGLE
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: successGoogleHandler,
    onError: errorGoogleHandler,
  });

  
  return (
    <div className='vh-100 vw-100'>
      <Navbar
        showingresa={false}
        showRegistrate={false}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <div className="register-background vh-100 vw-100 d-flex justify-content-center align-items-center ">
        <div className="register-box d-flex flex-column rounded">
          <div className="close-icon" onClick={handleHomeClick}>✕</div>
          <div className="register-content d-flex">
      
            <div className="register-left">
              <img src={imgFormulario} alt="Register background" className="register-left-image" />
              <div className='register-left-overlay text-start d-flex flex-column justify-content-center pb-5'>
                <h4 className='fw-semibold fs-2 fontMontserrat'>Únete a nuestra comunidad</h4>
                <small className='fw-light'>Descubre un espacio donde se fomenta la creatividad, las conexiones son valiosas y cada experiencia es inolvidable. Únete y da el primer paso hacia nuevas aventuras.</small>
                <div className="photo-credit">
                  Fotografía de
                  <p><span className="fw-bold">Nombre del Fotógrafo</span></p>
                </div>
              </div>
            </div>

            {/* Columna derecha: Formulario de registro */}
            <div className="register-right d-flex flex-column justify-content-center">
              <h3 className="fw-normal mb-3 pb-3 fontMontserrat fw-semibold">Registrar usuario</h3>

              <form className="login-form" onSubmit={(e) => handleRegistro(e, nombre, correo, contraseña)}>
                <div className="mb-3">
                  <label htmlFor="registerInputName" className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="registerInputName"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="registerInputEmail" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="registerInputEmail"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="registerInputPassword" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="registerInputPassword"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="registerConfirmPassword" className="form-label">Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="registerConfirmPassword"
                    value={contraseña2}
                    onChange={(e) => setContraseña2(e.target.value)}
                  />
                </div>

                <div className="pt-1 mb-4 mt-4">
                  <button type="submit" className="btn btn-primary">Registrarse</button>
                </div>

                {/* Sección de botones de redes sociales */}
                <div className="text-center mt-4 mb-5">
                  <p>o regístrate con:</p>
                  <button type='button' className='btn btn-link btn-floating mx-1' onClick={() => handleGoogleLogin()}>
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

                <p>¿Ya tienes una cuenta? <Link to="/register" className="fontRosaMexicano">Inicia sesión aquí</Link></p>

                <div className="mt-4">
                  <small>Al registrarte, aceptas nuestros <a href="#!" className="fontAzulMayaOscuro">Términos de Servicio</a> y <a href="#!" className="fontAzulMayaOscuro">Política de Privacidad</a>.</small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer showIncorporaLugar={false} />
    </div>
  );
}

export default RegisterPage;
