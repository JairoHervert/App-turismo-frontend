import React from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import DescripcionLugar from '../components/placepage/DescripcionLugar';
import Reviews from '../components/placepage/Reviews';
import '../css/PlacePage.css';

const PlacePage = () => {

  return (
    <div>
      <NavBarHome 
        showingresa={true} 
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <section>
        <div className='place-page-img'>
          <button className='btn btn-place-page'>
            <i class="bi bi-arrow-left"></i>
            Regresar
          </button>
        </div>
      </section>

      <section>
        <DescripcionLugar
          nombreImagen='palaciopostal'
        />
      </section>

      <section className='reviews'>
        <div className='card review-card'>
          <div className='card-title'>
            <h1 className='title'>Reseñas y calificaciones</h1>
          </div>
          <div className='card-body'>
            <Reviews/>
            <Reviews/>
            <Reviews/>
          </div>
        </div>
      </section>

      <Footer 
        showIncorporaLugar={false} />
    </div>
  );
};

export default PlacePage;
