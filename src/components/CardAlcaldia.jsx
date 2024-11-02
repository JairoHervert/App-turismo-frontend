import React from 'react';
import '../css/HomePage.css';
import { useNavigate } from 'react-router-dom';

function CardAlcaldia({nombreAlcaldia, nombreLugar, nombreImagen}) {

  const navigate = useNavigate();

    const handlePlacePageClick = () => {
        navigate('/placepage');
    };


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
            <button onClick={handlePlacePageClick} className='btn btn-cardAlcaldia me-2'>Conoce más</button>
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