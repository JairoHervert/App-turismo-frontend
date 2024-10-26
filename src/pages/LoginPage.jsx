//login de la pagina
// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Ingresar</button>
      </form>
      <Link to="/">Regresar al Inicio</Link>
    </div>
  );
};

export default LoginPage;
