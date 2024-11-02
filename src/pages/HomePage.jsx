import React from 'react';
import Slider from 'react-slick';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import Mapa from '../components/Mapa';
import PreguntaRegistro from '../components/preguntaRegistro';
import { useState } from 'react';

// import css
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/HomePage.css';

import CatHome from '../components/categories/CategoryHome';
import {CardAlcaldia, Arrow} from '../components/CardAlcaldia';


const HomePage = () => {

  const [isRegistered, setIsRegistered] = useState(false);


  const settings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerPadding: "15%",
    slidesToShow: 1,
    speed: 1000
  };

  return (
    <div>
      <NavBarHome 
        showingresa={true} 
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <section className='home'>
        <div className='home-text'>
          <h5>Planea tu próximo <strong>viaje</strong> con nosotros a la</h5>
          <h1>Ciudad de México</h1>
          <button className='btn btn-primary' type='button'>
              Comienza ahora 
          </button>
        </div>
      </section>
      
      <section className='cardAlcaldias'>
        <h2>Conoce las alcaldías de la CDMX</h2>
        <p>Infinitas posibilidades x 16 alcaldías</p>

        <div className='container slider'>
          <Slider {...settings}>
            <CardAlcaldia
              nombreAlcaldia='Coyoacán'
              nombreLugar='Plaza Coyoacán'
              nombreImagen='coyoacan' />
            <CardAlcaldia
              nombreAlcaldia='Álvaro Obregón'
              nombreLugar='Museo del Axolote'
              nombreImagen='alvaro-obregon' />
            <CardAlcaldia
              nombreAlcaldia='Xochimilco'
              nombreLugar='Plaza Coyoacán'
              nombreImagen='xochimilco' />
            <CardAlcaldia
              nombreAlcaldia='Miguel Hidalgo'
              nombreLugar='Plaza Coyoacán'
              nombreImagen='miguel-hidalgo' />
          </Slider>
        </div>
      </section>

        {/* Agregar boton de ver mas que redirige a ver todas las alcaldias*/ }
        <div className='alc-vermas'>
          <button className='btn btn-primary' type='button'>
            Ver más
          </button>
        </div>


      {/* SECCIÓN DE CESAR - EXPLORAR CATEGORÍAS*/}
      <br></br>
      <section>
        <div className='home-text'>
        <h3>
            <strong>
              {isRegistered
                ? 'Lugares que te podrían interesar'
                : 'Explora nuestras categorías'}
            </strong>
          </h3>        </div>
        <CatHome />
      </section>

      {/* SECCIÓN DE CESAR - EXPLORAR LUGARES CERCANOS */}

      <section>
        <div className='mapa'>
          <h2>¡Sorpréndete con lo que te rodea!</h2>
          <Mapa/>
        </div>
      </section>

      <br></br>

      <section> 
        <PreguntaRegistro />
      </section>
      <br></br>

      <Footer 
        showIncorporaLugar={false} />
    </div>
  );
};

export default HomePage;
