import React from 'react';

function PlaceCard({ imagen, name, description }) {

  const image = imagen ? require(`../../img/HomePage/category/lugar${imagen}.png`) : '';
  return (
    <div className="card mb-4 custom-card">
      <div className="position-relative">
        <img src={image} className="card-img-top" alt={name} />
        <div className="position-absolute top-0 start-0 p-2">
          <button className="btn btn-light me-1"><i className="bi bi-bookmark"></i></button>
          <button className="btn btn-light"><i className="bi bi-star"></i></button>
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text description-text">{description}</p>
        <button className="btn btn-sm btn-outline-primary learn-more-btn">Ver más</button>
      </div>
    </div>
  );
}

export default PlaceCard;
