import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/RegisterPage.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import imgFormulario from '../img/registerIMGA.jpg';

function RegisterPage() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

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

              <form className="register-form">
                <div className="mb-3">
                  <label htmlFor="registerInputName" className="form-label">Nombre completo</label>
                  <input type="text" className="form-control" id="registerInputName" />
                </div>

                <div className="mb-3">
                  <label htmlFor="registerInputEmail" className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control" id="registerInputEmail" />
                </div>

                <div className="mb-3">
                  <label htmlFor="registerInputPassword" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="registerInputPassword" />
                </div>

                <div className="mb-3">
                  <label htmlFor="registerConfirmPassword" className="form-label">Confirmar contraseña</label>
                  <input type="password" className="form-control" id="registerConfirmPassword" />
                </div>

                <div className="pt-1 mb-4 mt-4">
                  <button type="submit" className="btn btn-primary">Registrarse</button>
                </div>

                {/* Sección de botones de redes sociales */}
                <div className="text-center mt-4 mb-5">
                  <p>o regístrate con:</p>
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

                <p>¿Ya tienes una cuenta? <Link to="/login" className="fontRosaMexicano">Inicia sesión aquí</Link></p>

                <div className='mt-4'>
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
