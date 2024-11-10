import React from 'react';
import '../../css/Detalles.css';

function LugarDetalle({ lugar }) {
  if (!lugar || !lugar.images) return null;

  return (
    <div className="lugar-detalle p-3  rounded shadow-sm">
      <div id="carouselLugarDetalle" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {lugar.images.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <img src={image} className="d-block w-100 lugar-imagen rounded" alt={`${lugar.title} ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselLugarDetalle" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselLugarDetalle" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="lugar-info-container mt-3">
        <div className="lugar-info p-3">
          <h3 className="text-primary">{lugar.title}</h3>
          <p className="mb-1">
            <strong>Calificación:</strong> {lugar.rating} <i className="bi bi-star-fill text-warning"></i>
          </p>
          <p className="mb-1">
            <strong>Dirección:</strong> {lugar.address}
          </p>
          <p className="mb-1">
            <strong>Horario de estancia del usuario:</strong> {lugar.time}
          </p>
          <p className="mb-1">
            <strong>Descripción:</strong> {lugar.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LugarDetalle;
