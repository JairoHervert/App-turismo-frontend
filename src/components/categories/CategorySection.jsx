// CategorySection.jsx
import React from 'react';
import PlaceCard from './PlaceCard';

function CategorySection({ places }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        {places.map((place, index) => (
          <div
            key={index}
            className="col-md-4 d-flex justify-content-center mb-4"
          >
            <PlaceCard
              imagen={place.imagen}
              name={place.name}
              description={place.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
