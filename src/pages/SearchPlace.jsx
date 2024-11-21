import React, { useState } from 'react';
import axios from 'axios';

const SearchPlaces = () => {
  const [query, setQuery] = useState('');
  const [lugares, setLugares] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null); // Token para la siguiente página
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  
  const buscarLugares = async (token = null) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/places/buscar-texto', { 
        query,
        pageToken: token,
      });
      setLugares((prevLugares) => [...prevLugares, ...response.data.places]); // Añade nuevos resultados
      setNextPageToken(response.data.nextPageToken); // Actualiza el token de la siguiente página
      setLoading(false);
    } catch (error) {
      console.error('Error al buscar lugares:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  const handleBuscar = () => {
    setLugares([]); // Limpia resultados previos
    setNextPageToken(null); // Limpia el token previo
    buscarLugares(); // Realiza la primera búsqueda
  };

  const handleCargarMas = () => {
    if (nextPageToken) {
      buscarLugares(nextPageToken); // Llama con el token para obtener más resultados
    }
  };

  return (
    <div>
      <h1>Búsqueda de Lugares</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Escribe un lugar..."
      />
      <button onClick={handleBuscar}>Buscar</button>

      <ul>
        {lugares.map((lugar, index) => (
          <li key={index}>
            <h3>{index + 1}. {lugar.name}</h3>
            <p><strong>ID:</strong> {lugar.id}</p>
            <p><strong>Dirección:</strong> {lugar.address}</p>
            <p><strong>Calificación:</strong> {lugar.rating || 'Sin calificación'}</p>
            <p><strong>Dirección Formateada:</strong> {lugar.formattedAddress || 'No disponible'}</p>
            
            {/* Fotos 

            <p><strong>Fotos:</strong></p>
            <ul>
              {lugar.photos?.map((photo, idx) => (
                <li key={idx}>
                  <a href={photo.googleMapsUri} target="_blank" rel="noopener noreferrer">
                    Ver foto {idx + 1}
                  </a>
                </li>
              ))}
            </ul>

            */}

            {/* Fotos */}
            <p><strong>Fotos:</strong></p>
            <ul>
              {lugar.photos?.map((photo, idx) => {
                const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.name.split('/')[3]}&key=${apiKey}`;
                return (
                  <li key={idx}>
                    <img src={photoUrl} alt={`Foto ${idx + 1} de ${lugar.name}`} style={{ width: '200px', height: 'auto' }} />
                  </li>
                );
              })}
            </ul>

            

            <p><strong>Google Maps:</strong> <a href={lugar.googleMapsUri} target="_blank" rel="noopener noreferrer">Ver en Google Maps</a></p>
            <p><strong>Sitio web:</strong> <a href={lugar.websiteUri} target="_blank" rel="noopener noreferrer">{lugar.websiteUri || 'No disponible'}</a></p>
            
            {/* Tipos */}
            <p><strong>Tipos:</strong> {lugar.types?.join(', ') || 'No disponible'}</p>

            <p>
              <strong>Nivel de Precio:</strong>
              {(() => {
                switch (lugar.priceLevel) {
                  case 'PRICE_LEVEL_INEXPENSIVE':
                    return 'Económico';
                  case 'PRICE_LEVEL_MODERATE':
                    return 'Moderado';
                  case 'PRICE_LEVEL_EXPENSIVE':
                    return 'Costoso';
                  case 'PRICE_LEVEL_VERY_EXPENSIVE':
                    return 'Muy Costoso';
                  default:
                    return 'No disponible';
                }
              })()}
            </p>

            {/* Agregar PriceRange */}
            <p>
              <strong>Rango de Precios:</strong>{' '}
              {lugar.priceRange || 'No disponible'}
            </p>

            <p><strong>Horario:</strong></p>
            <ul>
              {lugar.currentOpeningHours?.weekdayDescriptions?.map((description, idx) => (
                <li key={idx}>{description}</li>
              )) || <p>Horario no disponible</p>}
            </ul>
            <p><strong>Teléfono Internacional:</strong> {lugar.internationalPhoneNumber || 'No disponible'}</p>
            <p><strong>Número de Calificaciones:</strong> {lugar.userRatingCount || 'No disponible'}</p>

            {/* Accesibilidad */}
            <p><strong>Opciones de Accesibilidad:</strong></p>
              <ul>
                {lugar.accessibilityOptions ? (
                  Object.entries(lugar.accessibilityOptions).map(([key, value]) => (
                    <li key={key}>
                      {key.replace(/([A-Z])/g, ' $1')}: {value ? 'Sí' : 'No'}
                    </li>
                  ))
                ) : (
                  <li>No disponible</li>
                )}
              </ul>

            {/* Address Components */}
            <p><strong>Componentes de Dirección:</strong></p>
              <ul>
                {Array.isArray(lugar.addressComponents) ? (
                  lugar.addressComponents.map((component, idx) => (
                    <li key={idx}>
                      {component.longText} ({component.types?.join(', ') || 'Sin tipo'})
                    </li>
                  ))
                ) : (
                  <li>No disponible</li>
                )}
              </ul>

            {/* Booleanos */}
            <p><strong>¿Apto para Niños?:</strong> {lugar.goodForChildren === true ? 'Sí' : lugar.goodForChildren === false ? 'No' : 'No disponible'}</p>
            <p><strong>¿Apto para Grupos?:</strong> {lugar.goodForGroups === true ? 'Sí' : lugar.goodForGroups === false ? 'No' : 'No disponible'}</p>
            <p><strong>¿Reservable?:</strong> {lugar.reservable === true ? 'Sí' : lugar.reservable === false ? 'No' : 'No disponible'}</p>
            <p><strong>¿Sirve Comida Vegetariana?:</strong> {lugar.servesVegetarianFood === true ? 'Sí' : lugar.servesVegetarianFood === false ? 'No' : 'No disponible'}</p>

            {/* Reseñas */}
            <p><strong>Reseñas:</strong></p>
            <ul>
              {lugar.reviews?.map((review, idx) => (
                <li key={idx}>
                  <p><strong>Autor:</strong> {review.authorAttribution?.displayName || 'Anónimo'}</p>
                  <p><strong>Calificación:</strong> {review.rating || 'No disponible'}</p>
                  <p><strong>Comentario:</strong> {review.text?.text || 'No disponible'}</p>
                </li>
              ))}
            </ul>

            <p><strong>Opciones de Pago:</strong></p>
              <ul>
                {lugar.paymentOptions ? (
                  Object.entries(lugar.paymentOptions).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value ? 'Sí' : 'No'}
                    </li>
                  ))
                ) : (
                  <li>No disponible</li>
                )}
              </ul>


            <p><strong>Resumen Editorial:</strong> {lugar.editorialSummary?.text || 'No disponible'}</p>
          </li>
        ))}
      </ul>


      {nextPageToken && (
        <button onClick={handleCargarMas} disabled={loading}>
          {loading ? 'Cargando...' : 'Cargar más'}
        </button>
      )}
    </div>
  );
};

export default SearchPlaces;
