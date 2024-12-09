import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ButtonsMod from '../ButtonsMod';
import { Star as StarIcon, StarBorder as StarBorderIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';
import '../../css/HomePage.css';

function PlaceCard({ id, isLogged, imagen, name, description, isClickedDeseados, isClickedFavoritos, onDeseadosClick, onFavoritosClick }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/placepage/${id}`);
  };

  const image = imagen ? imagen : require(`../../img/HomePage/places/home-places-ven-carranza.jpg`);
  
  return (
    <div className="card mb-4 custom-card">
      <div className="position-relative">
        <img src={image} className="card-img-top" alt={name} />
        <div className="position-absolute top-0 start-0 p-2">
        {isLogged ?
          <>
          <Button
            variant="outlined"
            className="pc-btn-deseados"
            onClick={onDeseadosClick}
            size="small"
            sx={{
              borderColor: 'white',
              color:'#FFC001',
              backgroundColor: 'white',
              marginLeft: '5px',
              '&:hover': {
                color: '#FAC902',
              },
              minWidth: '40px', // Personaliza el ancho mínimo del botón
              minHeight: '40px', // Personaliza el alto mínimo del botón
            }}
          >
            {isClickedDeseados ? <StarIcon /> : <StarBorderIcon />}
          </Button>
          <Button
            variant="outlined"
            className="pc-btn-favoritos"
            onClick={onFavoritosClick}
            size="small" 
            sx={{
              borderColor:'white',
              color: 'red',
              backgroundColor: 'white',
              marginLeft: '5px',
              '&:hover': {
                color: 'red',
              },
              minWidth: '40px', // Personaliza el ancho mínimo del botón
              minHeight: '40px', // Personaliza el alto mínimo del botón

            }}
          >
            {isClickedFavoritos ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
          </>
        :
          ''
        }
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text description-text">{description}</p>
        <div className="btn-sm learn-more-btn">
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