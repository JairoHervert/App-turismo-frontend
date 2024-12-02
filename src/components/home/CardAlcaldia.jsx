import React from 'react';
import '../../css/HomePage.css';
import { useNavigate } from 'react-router-dom';
import ButtonsMod from '../ButtonsMod';

function CardAlcaldia({ nombreAlcaldia, nombreLugar, nombreImagen }) {

  const navigate = useNavigate();

  const handlePlacePageClick = () => {
    navigate('/placepage');
  };


  const imagen = require(`../../img/HomePage/places/home-places-${nombreImagen}.jpg`);

  return (
    <div className='card'
      style={{
        backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${imagen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className='card-body'>
        <div className='card-body-buttons'>
          <ButtonsMod
            variant='secundario'
            textCont='Ver lugares'
            width='auto'
            height='2.5rem'
            clickEvent={handlePlacePageClick}
          />
        </div>
        <div className='card-body-text'>
          <p className='card-body-text-p'>{nombreLugar}</p>
          <h5 className='card-body-text-h5'>{nombreAlcaldia}</h5>
        </div>
      </div>
    </div>
  );
}

export default CardAlcaldia;