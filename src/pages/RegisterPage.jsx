import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginPage.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import imgFormulario from '../img/registerIMGA.jpg';

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

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');
    console.log(correo, contraseña);
    try {
      
      const response = await axios.post('http://localhost:3001/registro', {
        correo,
        contraseña,
      });
      console.log(response.data);

      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Error de conexión';
      setError('Error al registrar usuario: ' + errorMsg);
      console.error(errorMsg);
    }
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

      <div className="login-background vh-100 vw-100 d-flex justify-content-center align-items-center">
        <div className="login-box d-flex flex-column rounded">
          {/* Icono de cerrar en la esquina superior derecha */}
          <div className="close-icon" onClick={handleHomeClick}>✕</div>

          <div className="login-content d-flex">
            {/* Columna izquierda: Imagen y texto */}
            <div className="login-left">
              <img src={imgFormulario} alt="Register background" className="login-left-image" />
              <div className='login-left-overlay text-start d-flex flex-column justify-content-center pb-5'>
                <h4 className='fw-semibold fs-2 fontMontserrat'>Únete a nuestra comunidad</h4>
                <small className='fw-light'>Descubre un espacio donde se fomenta la creatividad, las conexiones son valiosas y cada experiencia es inolvidable. Únete y da el primer paso hacia nuevas aventuras.</small>

                {/* Crédito de la fotografía */}
                <div className="photo-credit">
                  Fotografía de
                  <p><span className="fw-bold">Nombre del Fotógrafo</span></p>
                </div>
              </div>
            </div>

            {/* Columna derecha: Formulario de registro */}
            <div className="login-right d-flex flex-column justify-content-center">
              <h3 className="fw-normal mb-3 pb-3 fontMontserrat fw-semibold">Registrar usuario</h3>

              <form className="login-form" onSubmit={handleRegistro}>
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
