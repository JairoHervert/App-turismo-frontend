import React from 'react';
import NavBarHome from '../components/NavBarHome';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <NavBarHome />

      <div className='m-5'>
      
        <h2>Bienvenido a la página principal</h2>
        <p>Esta es la página principal de la aplicación</p>

      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
