//login de la pagina
// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavBarHome from '../components/NavBarHome';
import Footer from '../components/Footer';

function LoginPage() {
  return (
    <div>
      <NavBarHome 
        showingresa={false} 
        ShowRegistrate={true} />

      <div className='container m-5'>
        <h2 className='mb-5'>Iniciar Sesión</h2>

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" />
          </div>

          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>

        <p className='mt-3'>
          ¿No tienes cuenta?{' '}
          <Link to='/register'>Regístrate</Link>
        </p>
      </div>

      <Footer 
        showIncorporaLugar={false} />
    </div>
  );
};

export default LoginPage;
