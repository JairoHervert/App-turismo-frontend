import React from 'react';
import mapImage from '../img/HomePage/mapa.png';


function FullSizeMapPlaceholder() {
    return (
        <div
            style={{
                width: '100%',
                height: '500px', // Ajusta el alto
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <img
                src={mapImage}
                alt="Mapa estático"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Ajusta la imagen para cubrir todo el área sin distorsión
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '1.2em',
                    textAlign: 'center',
                }}
            >
                Próximamente: Mapa interactivo
            </div>
        </div>
    );
}

export default FullSizeMapPlaceholder;