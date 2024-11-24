import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Componentes
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import HeaderLugar from '../components/placepage/HeaderLugar';
import DescripcionLugar from '../components/placepage/DescripcionLugar';
import Reviews from '../components/placepage/Reviews';
// CSS
import '../css/PlacePage.css';
// Material UI
import { Pagination } from '@mui/material';

const PlacePage = () => {

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

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  /* Para los horarios - Le puse cualquier cosa porque no sé cómo van a manejar los datos aaaaaa */
  const horariosDeApertura = [
    { open: { day: 1, time: "0900" }, close: { day: 1, time: "1800" } },
    { open: { day: 2, time: "1000" }, close: { day: 2, time: "1700" } }
  ];

  const formatHorarios = (periods) => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    if (!periods || periods.length === 0) {
      return 'Horario no disponible';
    }

    return periods.map(({ open, close }) => {
      const openDay = daysOfWeek[open.day];
      const closeDay = daysOfWeek[close.day];
      const openTime = `${open.time.slice(0, 2)}:${open.time.slice(2)}`;
      const closeTime = `${close.time.slice(0, 2)}:${close.time.slice(2)}`;

      return `${openDay}: ${openTime} - ${closeTime}${openDay !== closeDay ? ` (${closeDay})` : ''}`;
    });
  }

  const horarioLugar = formatHorarios(horariosDeApertura);

  return (
    <div>
      <NavBarHome
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <HeaderLugar
        categoria='Museos'
      />
      
      <DescripcionLugar
        nombreLugar='Biblioteca de México'
        value={4.6}
        resumenLugar='Desde su fundación, a comienzos de 1990, la revista Biblioteca de México ha publicado 172 números impresos y 4 números digitales. A lo largo de más de 30 años, ha dado espacio a trabajos de creación, investigación y crítica a autores de habla hispana y de otros idiomas. Pensada originalmente como una revista de letras en el sentido clásico y más generoso del término, que busca dar relieve y difusión a obras inasequibles de los acervos de la biblioteca misma, en esta nueva etapa digital también se tiene el propósito de acercarse a las nuevas generaciones de lectores, publicando a jóvenes escritores e ilustradores. Se trata, así, de sostener un esfuerzo de divulgación literaria que, de la manera más incluyente, brinde hospitalidad a la belleza y la inteligencia de la creación.'
        direccionLugar='De La Ciudadela 4, Colonia Centro, Centro, Cuauhtémoc, 06040 Ciudad de México, CDMX'
        /* Para el siguiente parámetro [costoLugar]
          Si se cuenta con la información, se mandan como parámetros 1/2/3/4
          Ejemplo:
          Gratis -> {0} 
          Barato -> {1}
          ...
          Sino,
          Costo desconocido -> {null} */
        costoLugar={1}
        /* Para los siguientes parámetros [accesibilidad, petFriendly, veganFriendy]
          Si se cuenta con la información, se mandan como parámetros null/true/false 
          Ejemplo:
          Es accesible a silla de ruedas -> {true} 
          No es accesible a silla de ruedas -> {false} 
          No se cuenta con la información -> {null} [Si no cuenta con la información, no aparecerá] */
        accesibilidadLugar={true}
        petFriendly={false}
        veganFriendly={null}
        familiar={false}
        goodForGroups={true}
        metodoPago={null}
        website='https://unsplash.com/es/ilustraciones/-u8mPV6Fd3s'
        /* Esta sección de horarios puede cambiar dependiendo de cómo traten la información */
        horarioLugar={horarioLugar}
        /*  */
        categoria='Deportes'
        /* Si no hay imágenes -> {null} */
        imagenesLugar={imagenes}

      />

      <section className='pp-reviews'>
        <div className='card pp-reviews-card'>
          <div className='pp-reviews-card-titulo'>
            <h1 className='pp-reviews-card-titulo-h1'>Reseñas y calificaciones</h1>
          </div>
          <div className='card-body'>
            {currentReviews.map((review, index) => (
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
            count={Math.ceil(allReviews.length / reviewsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
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
