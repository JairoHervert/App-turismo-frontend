import React from 'react';
import PlaceCard from './PlaceCard';

function CategorySection({ isLogged, places, clickedDeseados, clickedFavoritos, onDeseadosClick, onFavoritosClick }) {
  //console.log(places);
  return (
    <div className="container">
      <div className="row justify-content-center">
        {places.map((place, index) => (
          <div
            key={index}
            className="col-md-4 d-flex justify-content-center mb-4"
          >
            <PlaceCard
              isLogged={isLogged}
              imagen={place.imagen}
              name={place.nombre}
              description={place.descripcion}
              isClickedDeseados={clickedDeseados[place.nombre]}
              isClickedFavoritos={clickedFavoritos[place.nombre]}
              onDeseadosClick={() => onDeseadosClick(place.nombre)}
              onFavoritosClick={() => onFavoritosClick(place.nombre)}
              id={place.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;