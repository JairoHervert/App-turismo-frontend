import React, { useEffect, useState } from 'react';
// Componentes
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import HeaderLugar from '../components/placepage/HeaderLugar';
import DescripcionLugar from '../components/placepage/DescripcionLugar';
import Reviews from '../components/placepage/Reviews';
// CSS
import '../css/PlacePage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import ButtonsMod from '../components/ButtonsMod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { handleEsFavorito, handleEsDeseado } from '../pagesHandlers/favDeseados-handler';
import { handleDatosLugar, handleFotosLugar, handleCategoriasLugar } from '../pagesHandlers/place-handler';
import { registrarHistorial } from '../pagesHandlers/history-handler';

const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [categorias, setCategorias] = useState(null);

  const [isFavorito, setIsFavorito] = useState(false);
  const [isDeseado, setIsDeseado] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const [isLogged, setLogged] = useState(false);

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

  const [fotos, setFotos] = useState(imagenes);

  const rev = [
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

  const [allReviews, setReviews] = useState(rev);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchPlace = async () => {
      try {

        const idUsuario = localStorage.getItem('id');
        if(idUsuario) {
          // Verifica si está en favoritos
          const favorito = await handleEsFavorito(idUsuario, id);
          setIsFavorito(favorito.esFavorito);

          // Verifica si está en deseados
          const deseado = await handleEsDeseado(idUsuario, id);
          setIsDeseado(deseado.esDeseado);
          setLogged(true);

          //Registrar el lugar en el historial
          await registrarHistorial(idUsuario, id);
        }

        const resultado = await handleDatosLugar(id); // Espera la resolución de la promesa
        if(!resultado) {
          navigate("/");
        }
        let copiaResultado = resultado;
        copiaResultado.accesibilidad = "";
        if(resultado.accesibilidadParking && resultado.accesibilidadParking == 1)
          copiaResultado.accesibilidad += "Con estacionamiento exclusivo";
        if(resultado.accesibilidadEntrance && resultado.accesibilidadEntrance == 1) {
          if(copiaResultado.accesibilidad == "")
            copiaResultado.accesibilidad += "Con entrada accesible";
          else
            copiaResultado.accesibilidad += ", con entrada accesible";
        }
        if(resultado.accesibilidadRestroom && resultado.accesibilidadRestroom == 1) {
          if(copiaResultado.accesibilidad == "")
            copiaResultado.accesibilidad += "Con sanitarios accesibles";
          else
            copiaResultado.accesibilidad += ", con sanitarios accesibles";
        }
        if(resultado.accesibilidadSeating && resultado.accesibilidadSeating == 1) {
          if(copiaResultado.accesibilidad == "")
            copiaResultado.accesibilidad += "Con asientos accesibles";
          else
            copiaResultado.accesibilidad += ", con asientos accesibles";
        }
        copiaResultado.horarios = JSON.parse(copiaResultado.regularOpeningHours).weekdayDescriptions;
        copiaResultado.reseñas = [];
        let reseñasJSON = JSON.parse(copiaResultado.reviewsGoogle);
        reseñasJSON.forEach(r => {
          let reseña = {};
          reseña.nombreUsuario = r.authorAttribution.displayName;
          reseña.antiguedadReview = r.relativePublishTimeDescription;
          reseña.comentarioUsuario = r.originalText.text;
          reseña.valueReview = r.rating;
          reseña.userPhoto = r.authorAttribution.photoUri;
          copiaResultado.reseñas.push(reseña);
        });
        setPlace(copiaResultado);
        setReviews(copiaResultado.reseñas);
      } catch (error) {
        console.error('Error al obtener datos del lugar o registrar en el historial', error);
      }
    };

    const fetchFotos = async () => {
      try {
        const resultado = await handleFotosLugar(id); // Espera la resolución de la promesa

        let array = [];
        resultado.forEach(element => {
          array.push(element.URL);
        });
        setFotos(array);
      } catch (error) {
        console.error('Error al obtener foto del lugar', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const resultado = await handleCategoriasLugar(id); // Espera la resolución de la promesa
        let array = [];
        resultado.forEach(element => {
          array.push(element.categoria);
        });
        setCategorias(array);
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };

    fetchPlace();
    fetchFotos();
    fetchCategorias();
  }, [id, navigate]);

  if (!place) {
    return <div>Cargando...</div>; // Muestra un loader mientras se obtiene el lugar
  }

  const handleHomePageClick = () => {
    navigate('/');
  };

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
      let cad = `${openDay}: ${openTime} - ${closeTime}${openDay !== closeDay ? ` (${closeDay})` : ''}`;

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
        nombreLugar={place && place.nombre ? place.nombre : 'Nombre no disponible'}
        value={place && place.rating ? place.rating : 0.0}
        resumenLugar={place && place.descripcion ? place.descripcion : ''}
        direccionLugar={place && place.direccion ? place.direccion : 'Sin dirección registrada'}
        /* Para el siguiente parámetro [costoLugar]
          Si se cuenta con la información, se mandan como parámetros 1/2/3/4
          Ejemplo:
          Gratis -> {0} 
          Barato -> {1}
          ...
          Sino,
          Costo desconocido -> {null} */
        costoLugar={place && place.precioNivel != undefined && place.precioNivel != null ? place.precioNivel : null}
        /* Para los siguientes parámetros [accesibilidad, petFriendly, veganFriendy]
          Si se cuenta con la información, se mandan como parámetros null/true/false 
          Ejemplo:
          Es accesible a silla de ruedas -> {true} 
          No es accesible a silla de ruedas -> {false} 
          No se cuenta con la información -> {null} [Si no cuenta con la información, no aparecerá] */
        accesibilidadLugar={place && place.accesibilidad ? place.accesibilidad : ''}
        petFriendly={place.allowsDogs}
        veganFriendly={place.servesVegetarianFood}
        familiar={place.goodForChildren}
        goodForGroups={place.goodForGroups}
        metodoPago={null}
        website={place && place.webpage != undefined && place.webpage != null ? place.webpage : ''}
        /* Esta sección de horarios puede cambiar dependiendo de cómo traten la información */
        horarioLugar={place.horarios}
        /*  */
        categoria={categorias}
        /* Si no hay imágenes -> {null} */
        imagenesLugar={fotos}
        placeId={id}
        isFavoritoInicial={isFavorito}
        isDeseadoInicial={isDeseado}
        isLogged={isLogged}
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
