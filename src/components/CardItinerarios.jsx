import React from 'react';
import '../css/ItinerariesCard.css';
import pdfIcon from '../img/ItinerariesPage/icons/itineraries-descargar-pdf.png'
import deleteIcon from '../img/ItinerariesPage/icons/itineraries-eliminar.png'

const ItineraryCard = ({ itinerary }) => {
    return (
        <div className="itinerary-card">
            <img src={itinerary.image} alt={itinerary.title} className="itinerary-image" />
            <div className="itinerary-info">
                <h2>{itinerary.title}</h2>
                <p>Lugares: {itinerary.details}</p>
                <button className="more-info-button">Más información</button>
                
            </div>
            <div className="actions">
                <p>Fecha: {itinerary.date}</p>
                <button className="repeat-button">Repetir</button>
                <div className="icons">
                    <button className="pdf-icon">
                        <img src={pdfIcon} alt="PDF Icon" style={{ width: '20px', height: '20px' }} />
                    </button>
                    <button className="delete-icon">
                        <img src={deleteIcon} alt="delete Icon" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItineraryCard;

