import React from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import DescripcionLugar from '../components/placepage/DescripcionLugar';
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
        <DescripcionLugar/>
      </section>

      <Footer 
        showIncorporaLugar={false} />
    </div>
  );
};

export default PlacePage;
