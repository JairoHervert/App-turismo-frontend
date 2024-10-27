// formulario de registro
// src/pages/RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBarHome';

const RegisterPage = () => {
  return (
    <div>
      <Navbar
        showingresa={true}
        showRegistrate={true}
      />
      <h2>Registrarse</h2>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Crear cuenta</button>
      </form>
      <Link to="/">Regresar al Inicio</Link>
    </div>
  );
};

export default RegisterPage;
