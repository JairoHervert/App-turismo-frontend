import React, { useEffect, useState } from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import DescripcionLugar from '../components/placepage/DescripcionLugar';
import Reviews from '../components/placepage/Reviews';
import '../css/PlacePage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import ButtonsMod from '../components/ButtonsMod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { handleDatosLugar } from '../pagesHandlers/place-handler';

const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const imagenes = [
    'https://media.timeout.com/images/106046734/image.jpg',
    'https://mxc.com.mx/wp-content/uploads/2024/08/biblioteca-de-mexico-1.jpg-6.jpg',
    'https://www.sopitas.com/wp-content/uploads/2023/05/bibliotecas-personales-biblioteca-de-mexico-portada.jpg',
    'https://www.bibliotecademexico.gob.mx/imagenes/Bpersonales/Ini_CastroLeas.jpg',
    'https://www.sopitas.com/wp-content/uploads/2023/05/bibliotecas-personales-biblioteca-de-mexico-portada.jpg',
    'https://mxc.com.mx/wp-content/uploads/2024/08/biblioteca-de-mexico-1.jpg-6.jpg',
    'https://www.bibliotecademexico.gob.mx/imagenes/Bpersonales/ini_AliChumacero.jpg',
    'https://www.dondeir.com/wp-content/uploads/2021/03/bibliotecas-mexico.jpg',
    'https://www.sopitas.com/wp-content/uploads/2023/05/bibliotecas-personales-biblioteca-de-mexico-portada.jpg',
    'https://www.sopitas.com/wp-content/uploads/2023/05/bibliotecas-personales-biblioteca-de-mexico-portada.jpg',
    'https://www.bibliotecademexico.gob.mx/imagenes/Bpersonales/Ini_CastroLeas.jpg',
    'https://www.sopitas.com/wp-content/uploads/2023/05/bibliotecas-personales-biblioteca-de-mexico-portada.jpg',
    'https://mxc.com.mx/wp-content/uploads/2024/08/biblioteca-de-mexico-1.jpg-6.jpg',
    'https://www.bibliotecademexico.gob.mx/imagenes/Bpersonales/ini_AliChumacero.jpg',
    'https://www.dondeir.com/wp-content/uploads/2021/03/bibliotecas-mexico.jpg',
    'https://www.sopitas.com/wp-content/uploads/2023/05/bibliotecas-personales-biblioteca-de-mexico-portada.jpg'
  ];

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchPlace = async () => {
      try {
        console.log("Id lugar", id);
        
        const resultado = await handleDatosLugar(id); // Espera la resolución de la promesa
        if(!resultado) {
          navigate("/");
        }
        setPlace(resultado);
        console.log(resultado);
      } catch (error) {
        console.error('Error al obtener datos del lugar', error);
      }
    };

    fetchPlace();
  }, [id, navigate]);

  if (!place) {
    return <div>Cargando...</div>; // Muestra un loader mientras se obtiene el lugar
  }

  const handleHomePageClick = () => {
    navigate('/');
  };
  
  const allReviews = [
    {
      nombreUsuario: 'Brandon Segura',
      antiguedadReview: '10 meses',
      comentarioUsuario: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero perferendis quaerat excepturi? Praesentium tempore, aspernatur temporibus, commodi libero officiis ab deserunt sit accusantium iusto explicabo ad, voluptatem iure dolor quasi.',
      valueReview: 4.6,
      userPhoto: require('../img/PlacePage/place-user.png'),
    },
    {
      nombreUsuario: 'Mauricio',
      antiguedadReview: '1 año',
      comentarioUsuario: 'Me gustó',
      valueReview: 2.4,
      userPhoto: require('../img/PlacePage/place-user.png'),
    },
    {
      nombreUsuario: 'Juan Mark',
      antiguedadReview: '3 días',
      comentarioUsuario: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit...',
      valueReview: 3.5,
      userPhoto: require('../img/PlacePage/place-user.png'),
    },
    {
      nombreUsuario: 'Jairo',
      antiguedadReview: '5 días',
      comentarioUsuario: 'Un lugar fantástico para visitar, muy recomendable.',
      valueReview: 4.8,
      userPhoto: require('../img/PlacePage/place-user.png'),
    },
    {
      nombreUsuario: 'Brandolín Brincolín',
      antiguedadReview: '2 años',
      comentarioUsuario: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat quae saepe excepturi dolorum iste commodi illum rem numquam eum nobis cupiditate voluptate corrupti consequuntur, debitis blanditiis asperiores odio. Nisi, quisquam blanditiis? Eaque itaque obcaecati perferendis. Placeat fuga quisquam eos impedit?',
      valueReview: 3.2,
      userPhoto: require('../img/PlacePage/place-user.png'),
    },
    {
      nombreUsuario: 'MauDestructor3000',
      antiguedadReview: '3 meses',
      comentarioUsuario: 'Le pondré un 5 solo porque sí',
      valueReview: 5.0,
      userPhoto: require('../img/PlacePage/place-user.png'),
    },
    {
      nombreUsuario: 'Brandolín Brincolín Vazquez Segura',
      antiguedadReview: '2 años',
      comentarioUsuario: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat quae saepe excepturi dolorum iste commodi illum rem numquam eum nobis cupiditate voluptate corrupti consequuntur, debitis blanditiis asperiores odio. Nisi, quisquam blanditiis? Eaque itaque obcaecati perferendis. Placeat fuga quisquam eos impedit?',
      valueReview: 3.2,
      userPhoto: require('../img/PlacePage/place-user.png'),
    },
  ];

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <NavBarHome 
        showingresa={true} 
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <section>
        {/* Imagen de fondo del header la página de lugares turísticos */}
        <div className='place-page-img'
          style={{
            /* Agarra la primera imagen de la lista */
            backgroundImage: imagenes?.[0]
              ? `url(${imagenes[0]})`
              : 'none',
            backgroundColor: imagenes?.[0]
              ? 'transparent'
              : '#d3d3d3', /* Fondo genérico si no encuentra una imagn */
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
          }}
        >
          
          
        <div className='btn-place-page'>
          <ButtonsMod
            variant='principal'
            textCont='Regresar'
            clickEvent={handleHomePageClick}
            startIcon={<ArrowBackIcon />}
          />
        </div>

        </div>
      </section>

      <section>
        <DescripcionLugar
          nombreLugar='Biblioteca de México'
          resumenLugar='Desde su fundación, a comienzos de 1990, la revista Biblioteca de México ha publicado 172 números impresos y 4 números digitales. A lo largo de más de 30 años, ha dado espacio a trabajos de creación, investigación y crítica a autores de habla hispana y de otros idiomas. Pensada originalmente como una revista de letras en el sentido clásico y más generoso del término, que busca dar relieve y difusión a obras inasequibles de los acervos de la biblioteca misma, en esta nueva etapa digital también se tiene el propósito de acercarse a las nuevas generaciones de lectores, publicando a jóvenes escritores e ilustradores. Se trata, así, de sostener un esfuerzo de divulgación literaria que, de la manera más incluyente, brinde hospitalidad a la belleza y la inteligencia de la creación.'
          placeDireccion='De La Ciudadela 4, Colonia Centro, Centro, Cuauhtémoc, 06040 Ciudad de México, CDMX'
          placeCosto='Sin costo'
          placeAccesibilidad='Accesible con silla de ruedas'
          placeHorario='Todos los días de 8:30 a 19:30 hrs'
          lugarImagenes={imagenes}
          value = {3.6}
        />
      </section>

      <section className='reviews'>
        <div className='card review-card'>
          <div className='card-title-place'>
            <h1 className='title-place'>Reseñas y calificaciones</h1>
          </div>
          <div className='card-body'>
            {currentReviews.map((review,index) => (
              <Reviews
                key={index}
                nombreUsuario={review.nombreUsuario}
                antiguedadReview={review.antiguedadReview}
                comentarioUsuario={review.comentarioUsuario}
                valueReview={review.valueReview}
                userPhoto={review.userPhoto}
              />
            ))}
          </div>
          <Pagination
              count = {Math.ceil(allReviews.length / reviewsPerPage)}
              page = {currentPage}
              onChange= {handlePageChange}
              sx={{ mt: 2, display: 'flex', justifyContent: 'center', color: '#E4007C' }}
            />
        </div>
      </section>

      <Footer 
        showIncorporaLugar={false} />
    </div>
  );
};

export default PlacePage;
