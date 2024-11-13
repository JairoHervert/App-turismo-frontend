import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Categorias.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ItemFavoritos from '../components/categoria/ItemCategoria';
import { Card, CardMedia, CardActionArea, CardActions, CardContent, Typography, Button, IconButton, Box, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputAdornment } from '@mui/material';
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
      <div>
  

      <div className="search-category-background-category d-flex flex-column justify-content-center bg-color-category">
      <div className='item-align-categorias'>
<div className=''>


  </div>
  <h1 className='it-page-title'>¡Personaliza tu viaje!</h1>
</div>
<Button
    variant="contained"
    size="large"
    sx={{
      marginRight:'1300px',
      top:'-80px',
      backgroundColor: '#e4007c',
      '&:hover': {
        backgroundColor: '#c3006a', // Color al hacer hover (opcional)
      },
    }}
  >
    Regresar
  </Button>

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
            <Button
    variant="contained"
    size="large"
    sx={{
      backgroundColor: '#e4007c',
      '&:hover': {
        backgroundColor: '#c3006a', // Color al hacer hover (opcional)
      },
    }}
  >
    Limpiar selecciones
  </Button>
            {/* bi bi-funnel-fill" */}
            <div className="selection-list-category mt-3">
              {['Restaurantes', 'Museos', 'Bares', 'Zoológicos'].map((item, index) => (
                <div key={index} className="selection-item-category">
                  <span>{item}</span>
                  <span className="bi bi-trash"></span>
                </div>
              ))}
            </div>
            
            <Button
    variant="contained"
    size="large"
    sx={{
      backgroundColor: '#e4007c',
      '&:hover': {
        backgroundColor: '#c3006a', // Color al hacer hover (opcional)
      },
      marginTop:'8px'
    }}
  >
    Regresar
  </Button>          </div>
        </div>
      </div>

      <Footer showIncorporaLugar={false} />
    </div>
    </div>
  );
}

export default SearchCategoryPage;
