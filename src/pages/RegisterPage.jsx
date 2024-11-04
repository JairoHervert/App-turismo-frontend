import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/RegisterPage.css';
import '../css/LoginPage.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import imgFormulario from '../img/registerIMGA.jpg';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { handleRegistro, successGoogleHandler, errorGoogleHandler, responseFacebook } from '../pagesHandlers/register-handler';
import { validateName, validateEmail, validatePassword, validateConfirmPassword } from '../schemas/validacionRegister';

function RegisterPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [contraseña2, setContraseña2] = useState('');
  const [errors, setErrors] = useState({});

  const handleHomeClick = () => {
    navigate('/');
  };

  // Validación en tiempo real para cada campo
  const handleNameChange = (e) => {
    const value = e.target.value;
    setNombre(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      nombre: validateName(value),
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      correo: validateEmail(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setContraseña(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      contraseña: validatePassword(value),
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setContraseña2(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      contraseña2: validateConfirmPassword(contraseña, value),
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Verificar que no haya errores antes de llamar a handleRegistro
    if (!errors.nombre && !errors.correo && !errors.contraseña && !errors.contraseña2) {
      handleRegistro(e, nombre, correo, contraseña);
    } else {
      alert('Por favor, corrige los errores en el formulario antes de enviar.');
    }
  };

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

      <div className="register-background vh-100 vw-100 d-flex justify-content-center align-items-center">
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

            <div className="register-right d-flex flex-column justify-content-center">
              <h3 className="fw-normal mb-3 pb-3 fontMontserrat fw-semibold">Registrar usuario</h3>

              <form className="login-form" onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="registerInputName" className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="registerInputName"
                    value={nombre}
                    onChange={handleNameChange}
                  />
                  {errors.nombre && <p className="error-text">{errors.nombre}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="registerInputEmail" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="registerInputEmail"
                    value={correo}
                    onChange={handleEmailChange}
                  />
                  {errors.correo && <p className="error-text">{errors.correo}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="registerInputPassword" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="registerInputPassword"
                    value={contraseña}
                    onChange={handlePasswordChange}
                  />
                  {errors.contraseña && <p className="error-text">{errors.contraseña}</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="registerConfirmPassword" className="form-label">Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="registerConfirmPassword"
                    value={contraseña2}
                    onChange={handleConfirmPasswordChange}
                  />
                  {errors.contraseña2 && <p className="error-text">{errors.contraseña2}</p>}
                </div>

                <div className="pt-1 mb-4 mt-4">
                  <button type="submit" className="btn btn-primary">Registrarse</button>
                </div>

                <div className="text-center mt-4 mb-5">
                  <p>o regístrate con:</p>
                  <button type='button' className='btn btn-link btn-floating mx-1' onClick={() => handleGoogleLogin()}>
                    <i className='bi bi-google'></i>
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

                <p>¿Ya tienes una cuenta? <Link to="/login" className="fontRosaMexicano">Inicia sesión aquí</Link></p>

                <div className="mt-4">
                  <small>
                    Al registrarte, aceptas nuestros
                    <Link to="/terminos-condiciones" className="fontAzulMayaOscuro"> Términos de Servicio</Link> y
                    <Link to="/politica-privacidad" className="fontAzulMayaOscuro"> Política de Privacidad</Link>.
                  </small>
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