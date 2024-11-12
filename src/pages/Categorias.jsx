import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Categorias.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ItemFavoritos from '../components/categoria/ItemCategoria';

import Imagen1 from '../img/Categorias/zocalo.png';
import Imagen2 from '../img/Categorias/chapultepec.png';
import Imagen3 from '../img/Categorias/mfk.png';
import Imagen5 from '../img/Categorias/pdlr.png';
import Imagen4 from '../img/Categorias/mna.png';
import Imagen6 from '../img/Categorias/xoch.png';

function SearchCategoryPage() { 
  const navigate = useNavigate();


  return (
    <div className='vh-100 vw-100'>
      <Navbar
        showingresa={false}
        showRegistrate={false}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      {/* Encabezado de la página */}
      <div className="text-center-category my-4">
        <h1 className='fw-bolder fontMontserrat mb-4 us_de-deseados-text text-ptv-category'>Personaliza tu viaje</h1>
        <button className="btn-category mt-3 btn-config-reg-category">Regresar</button>
      </div>

      <div className="search-category-background-category d-flex flex-column justify-content-center">
        
        <div className="container-category">
          {/* Caja izquierda con las categorías */}
          <div className="left-box-category">
            {/* Descripción bajo el encabezado */}
            <div className="controls-container-category justify-content-center">
              <p>¿Tienes alguna idea de que lugares visitar? Según tu perfil hemos seleccionado unos para ti:</p>
            </div>

            {/* Categorías con imágenes y selección */}
            <div className='space-images-category'>
                <div className='item-propiedades-space'>
            <ItemFavoritos
              imagen={Imagen1}
              nombre='Zocalo'
            />
                </div>
                <div className='item-propiedades-space'>
            <ItemFavoritos
              imagen={Imagen2}
              nombre='Castillo de Chapultepec'
            />
                </div>
                <div className='item-propiedades-space'>
            <ItemFavoritos
              imagen={Imagen3}
              nombre='Museo Frida Kahlo'
            />
                </div>
                <div className='item-propiedades-space'>
            <ItemFavoritos
              imagen={Imagen4}
              nombre='Museo nacional de antropología'
            />
                </div>
                <div className='item-propiedades-space'>
            <ItemFavoritos
              imagen={Imagen5}
              nombre='Paseo de la reforma'
            />
                </div>
                <div className='item-propiedades-space'>
            <ItemFavoritos
              imagen={Imagen6}
              nombre='Xochimilco'
            />
                </div>


            </div>

            {/* Botones de navegación */}
            <div className="navigation-buttons-category">
              <button className="nav-button-category">❮</button>
              <button className="nav-button-category">❯</button>
            </div>
          </div>

          {/* Caja derecha con las selecciones */}
          <div className="right-box-category">
            <h5 className="selection-title-category">Selecciones</h5>
            <button className="btn-clear-category">Limpiar selecciones</button> 
            {/* bi bi-funnel-fill" */}
            <div className="selection-list-category mt-3">
              {['Restaurantes', 'Museos', 'Bares', 'Zoológicos'].map((item, index) => (
                <div key={index} className="selection-item-category">
                  <span>{item}</span>
                  <span className="bi bi-trash"></span>
                </div>
              ))}
            </div>
            
            <button className="btn-category-back mt-3">Regresar</button>
          </div>
        </div>
      </div>

      <Footer showIncorporaLugar={false} />
    </div>
  );
}

export default SearchCategoryPage;
