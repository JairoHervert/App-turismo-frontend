import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ButtonsMod from '../ButtonsMod';
import { StarBorder as StarBorderIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import '../../css/HomePage.css';

function PlaceCard({ id, isLogged, imagen, name, description, isClickedDeseados, isClickedFavoritos, onDeseadosClick, onFavoritosClick }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/placepage/${id}`);
  };

  const image = imagen ? (imagen.startsWith('http') ? imagen : `${process.env.PUBLIC_URL}/fotosLugares/${imagen}`) : require(`../../img/HomePage/places/home-places-ven-carranza.jpg`);
  
  return (
    <div className="card mb-4 custom-card">
      <div className="position-relative">
        <img src={image} className="card-img-top" alt={name} />
        <div className="position-absolute top-0 start-0 p-2">
          {isLogged ?
          <>
            <button
              className={`btn ${isClickedDeseados ? 'pc-btnOnClick' : 'btn-light'} pc-btn-deseados`}
              onClick={onDeseadosClick}
            >
              <StarBorderIcon />
            </button>
            <button
              className={`btn ${isClickedFavoritos ? 'pc-btnOnClick' : 'btn-light'} pc-btn-favoritos`}
              onClick={onFavoritosClick}
            >
              <FavoriteBorderIcon />
            </button>
          </>
          :
            ''
          }
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text description-text">{description}</p>
        <div className=" btn-sm learn-more-btn">
          <ButtonsMod
            clickEvent={handleViewMore}
            variant="secundario"
            textCont="Ver más"
            width="auto"
            height="2rem"
          />
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;