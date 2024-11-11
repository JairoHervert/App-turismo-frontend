import React from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import DescripcionLugar from '../components/placepage/DescripcionLugar';
import Reviews from '../components/placepage/Reviews';
import Reviews from '../components/placepage/Reviews';
import '../css/PlacePage.css';
import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PlacePage = () => {

  const imagenes = [
    'https://www.bibliotecademexico.gob.mx/imagenes/Bpersonales/Ini_CastroLeas.jpg',
    'https://www.sopitas.com/wp-content/uploads/2023/05/bibliotecas-personales-biblioteca-de-mexico-portada.jpg',
    'https://mxc.com.mx/wp-content/uploads/2024/08/biblioteca-de-mexico-1.jpg-6.jpg',
    'https://www.bibliotecademexico.gob.mx/imagenes/Bpersonales/ini_AliChumacero.jpg',
    'https://www.dondeir.com/wp-content/uploads/2021/03/bibliotecas-mexico.jpg'
  ];

  const navigate = useNavigate();

  const handleHomePageClick = () => {
        navigate('/');
   };

  const imagenes = [
    'https://www.bibliotecademexico.gob.mx/imagenes/Bpersonales/Ini_CastroLeas.jpg',
    'https://www.sopitas.com/wp-content/uploads/2023/05/bibliotecas-personales-biblioteca-de-mexico-portada.jpg',
    'https://mxc.com.mx/wp-content/uploads/2024/08/biblioteca-de-mexico-1.jpg-6.jpg',
    'https://www.bibliotecademexico.gob.mx/imagenes/Bpersonales/ini_AliChumacero.jpg',
    'https://www.dondeir.com/wp-content/uploads/2021/03/bibliotecas-mexico.jpg'
  ];

  const navigate = useNavigate();

  const handleHomePageClick = () => {
        navigate('/');
   };

  return (
    <div>
      <NavBarHome 
        showingresa={true} 
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <section>
        <div className='place-page-img'>
          <button className='btn btn-place-page' onClick={handleHomePageClick}>
            <i className='bi bi-arrow-left'></i>
            Regresar
          </button>
        </div>
      </section>

      <section>
        <DescripcionLugar
          placeDireccion='De La Ciudadela 4, Colonia Centro, Centro, Cuauhtémoc, 06040 Ciudad de México, CDMX'
          placeCosto='Sin costo'
          placeAccesibilidad='Accesible con silla de ruedas'
          placeHorario='Todos los días de 8:30 a 19:30 hrs'
          lugarImagenes={imagenes}

        />
      </section>

      <section className='reviews'>
        <div className='card review-card'>
          <div className='card-title-place'>
            <h1 className='title-place'>Reseñas y calificaciones</h1>
          </div>
          <div className='card-body'>
            <Reviews
              nombreUsuario='Brandon Segura'
              antiguedadReview='10 meses'
              comentarioUsuario='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero perferendis quaerat excepturi? Praesentium tempore, aspernatur temporibus, commodi libero officiis ab deserunt sit accusantium iusto explicabo ad, voluptatem iure dolor quasi.'/>
            <Reviews
              nombreUsuario='Mauricio'
              antiguedadReview='1 año'
              comentarioUsuario='Me gustó'/>
            <Reviews
              nombreUsuario='Juan Mark'
              antiguedadReview='3 dias'
              comentarioUsuario='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptate, cupiditate suscipit totam maxime est deleniti nulla similique, quae asperiores optio explicabo culpa! Itaque sit veniam ipsam expedita autem quis recusandae molestias qui placeat, officia distinctio perferendis, rerum iste pariatur animi illo nostrum veritatis ex voluptatem, vel id odio. Vel.'/>
              
          </div>
        </div>
      </section>

      <Footer 
        showIncorporaLugar={false} />
    </div>
  );
};

export default PlacePage;
