import React from 'react';
// import css
import '../css/HomePage.css';
// import imgs
import favorito from '../img/logo-star.svg';


function CardAlcaldia({nombreAlcaldia, nombreLugar, nombreImagen}) {
  
  const imagen = require(`../img/HomePage/places/home-places-${nombreImagen}.jpg`);

  return (
    <div className='card' 
    style={{
      backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${imagen})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
        <div className='card-body'>
          <div className='card-body-buttons'>
            <div className='btn-botones'>
            <button className='btn-favoritos'>
            <i className="bi bi-bookmark"></i>
            </button>
            <button className='btn-deseados'>
            <i className="bi bi-star"></i>
            </button>
            </div>
            <button className='btn btn-out-primary me-2'>Conoce más</button>
          </div>
            <div className='card-body-text'>
              <p>{nombreLugar}</p>
              <h5>{nombreAlcaldia}</h5>
            </div>
        </div>
    </div>
  );
}

// no tiene uso de momento
function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className}>
    </div>
  );
}

export {CardAlcaldia,Arrow};