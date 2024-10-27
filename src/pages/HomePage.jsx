import React from 'react';
import NavBarHome from '../components/NavBarHome';
import Footer from '../components/Footer';
import '../css/HomePage.css';

const HomePage = () => {
  return (
    <div>
      <NavBarHome 
        showingresa={true} 
        showRegistrate={true}
        transparentNavbar={true}
        lightLink={true} />

      <section className='home'>
        <div className='home-text'>
          <h5>Planea tu próximo <strong>viaje</strong> con nosotros a la</h5>
          <h1>Ciudad de México</h1>
          <button className='btn btn-primary' type='button'>
              Comienza ahora
          </button>
        </div>
      </section>
      
      <section>
        <h1>hola :)</h1>
      </section>
      <Footer 
        showIncorporaLugar={false} />
    </div>
  );
};

export default HomePage;
