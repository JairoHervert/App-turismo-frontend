import React, { useState } from 'react';
import PlaceCard from './PlaceCard';

function CategorySection({ isLogged, places, clickedDeseados, clickedFavoritos, onDeseadosClick, onFavoritosClick }) {
  // Limita el número de places a 6
  const limitedPlaces = places.slice(0, 6);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {limitedPlaces.map((place, index) => (
          <div
            key={index}
            className="col-md-4 d-flex justify-content-center mb-4"
          >
            <PlaceCard
              id={place.id}
              isLogged={isLogged}
              imagen={place.imagen}
              name={place.nombre}
              description={place.descripcion}
              isClickedDeseados={clickedDeseados[place.id]}
              isClickedFavoritos={clickedFavoritos[place.id]}
              onDeseadosClick={() => onDeseadosClick(place.id)}
              onFavoritosClick={() => onFavoritosClick(place.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;