const axios = require('axios');

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

// Autocompletar lugares
const buscarLugares = async (input) => {
  const url = 'https://places.googleapis.com/v1/places:autocomplete';

  const body = {
    input,
    location: { lat: 19.4326, lng: -99.1332 }, // Coordenadas de la CDMX
    radius: 50000, // Radio en metros (30 km)
  };


  try {
    const response = await axios.post(url, { input }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
    });

    // Agrega este log para inspeccionar la respuesta
    //console.log('Respuesta de la API de Google Places:', JSON.stringify(response.data, null, 2));

    if (!response.data.suggestions || !Array.isArray(response.data.suggestions)) {
      console.error('Error: La API no devolvió predicciones:', response.data);
      return [];
    }

    return response.data.suggestions.map((item) => ({
      place_id: item.placePrediction.place_id,
      main_text: item.placePrediction.structuredFormat.mainText.text,
  secondary_text: item.placePrediction.structuredFormat.secondaryText.text,
    }));
  } catch (error) {
    console.error('Error en buscarLugares:', error.response?.data || error.message);
    throw new Error('Error al buscar lugares en la API de Google');
  }
};

//TextSearch y el uso de la informacion de los campos que nos da por el lugar.
const buscarLugaresPorTexto = async (query,pageToken = null) => {
  const url = 'https://places.googleapis.com/v1/places:searchText';

  const body = {
    textQuery: query,
    //includedType: 'museum', // Limita a museos
    //strictTypeFiltering: true, // Aplica el filtro estricto
    languageCode: 'es', // Idioma preferido
    regionCode: 'MX', // Código de región para México
    pageSize: 20, // Resultados por página
    priceLevels: [
      'PRICE_LEVEL_INEXPENSIVE', // Económico
      'PRICE_LEVEL_MODERATE',    // Moderado
      'PRICE_LEVEL_EXPENSIVE',   // Costoso
      'PRICE_LEVEL_VERY_EXPENSIVE' // Muy costoso
    ],
    locationBias: {
      circle: {
        center: { latitude: 19.4326, longitude: -99.1332 }, // Coordenadas de CDMX
        radius: 50000, // Radio en metros (50 km)
      },
    },
    //rankPreference: 'DISTANCE', // Clasificación basada en distancia
    //includedType: 'museum', // Filtrar solo por museos
  };

  if (pageToken) {
    body.pageToken = pageToken; // Agregar el token de página si está disponible
  }

  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey, // Clave de API
        'X-Goog-FieldMask': 'places.displayName,places.id,places.formattedAddress,places.location,places.rating,places.photos,places.googleMapsUri,places.websiteUri,places.types,places.priceLevel,places.currentOpeningHours,places.internationalPhoneNumber,places.userRatingCount,places.reviews,places.paymentOptions,places.editorialSummary,places.accessibilityOptions,places.addressComponents,places.priceRange,places.goodForChildren,places.goodForGroups,places.reservable,places.servesVegetarianFood,nextPageToken,places.allowsDogs,places.restroom,places.attributions',
      },
    });

    console.log('Respuesta de la API:', JSON.stringify(response.data, null, 2));


    // [
    //   [],
    //   [],
    //   20 lugares

    // ]
    // [
    //   [],
    //   [],
    //   20 lugares

    // ]
    

    // final
    // [
    //   [],
    //   [],
    //   [],
    //   [],
    //   1000 lugares
    //   []
    // ]


    if (!response.data.places || !Array.isArray(response.data.places)) {
      console.error('Error: La API no devolvió resultados válidos:', response.data);
      return { places: [], nextPageToken: null };
    }

    return {
      places: response.data.places.map((place) => ({
        name: place.displayName?.text || 'Nombre no disponible',
        id: place.id,     
        address: place.formattedAddress || 'Dirección no disponible',
        location: place.location,
        rating: place.rating || 'Sin calificación',
        formattedAddress: place.formattedAddress,
        photos: place.photos,
        googleMapsUri: place.googleMapsUri,
        websiteUri: place.websiteUri,
        types: place.types,
        priceLevel: place.priceLevel,
        currentOpeningHours: place.currentOpeningHours,
        internationalPhoneNumber: place.internationalPhoneNumber,
        userRatingCount: place.userRatingCount,
        reviews: place.reviews,
        paymentOptions: place.paymentOptions,
        editorialSummary: place.editorialSummary,
        accessibilityOptions: place.accessibilityOptions,
        addressComponents: place.addressComponents,
        priceRange: place.priceRange
        ? `${place.priceRange.startPrice.units} ${place.priceRange.startPrice.currencyCode} - ${place.priceRange.endPrice.units} ${place.priceRange.endPrice.currencyCode}`
        : 'No disponible',
        goodForChildren: place.goodForChildren,
        goodForGroups: place.goodForGroups,
        reservable: place.reservable,
        servesVegetarianFood: place.servesVegetarianFood,
        allowsDogs: place.allowsDogs,
        restroom: place.restroom, 
        attributions: place.attributions,
      })),
      nextPageToken: response.data.nextPageToken || null, // Devuelve el token para la siguiente página, aqui esta el token que te da la API en caso de que exista el token.
    };
  } catch (error) {
    console.error('Error en buscarLugaresPorTexto:', error.response?.data || error.message);
    throw new Error(
      `Error al buscar lugares por texto: ${error.response?.status} - ${error.response?.data?.error?.message || 'Sin mensaje'}`
    );
  }
};



module.exports = {
  buscarLugares,
  buscarLugaresPorTexto,
};
