const db = require('../models/MySQL/db'); 

// Función auxiliar para simplificar el campo paymentOptions
const simplifyPaymentOptions = (paymentOptions) => {
    if (!paymentOptions) return "[]";
  
    const options = [];
    if (paymentOptions.acceptsCreditCards) options.push("Tarjetas de crédito");
    if (paymentOptions.acceptsDebitCards) options.push("Tarjetas de débito");
    if (paymentOptions.acceptsCashOnly) options.push("Solo efectivo");
    if (paymentOptions.acceptsNfc) options.push("NFC");
  
    return JSON.stringify(options);
  };

const registrarLugar = async (lugar) => {
    const query = `
    CALL LugarRegistro(
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );
  `;

  // Simplificar las reseñas

  const simplifiedReviews = lugar.reviews?.map((review) => ({
    author: review.authorAttribution?.displayName || 'Anónimo',
    rating: review.rating || 'No disponible',
    comment: review.text?.text || 'No disponible',
    relativePublishTimeDescription: review.relativePublishTimeDescription || null,
  })) || [];

  console.log('Reseñas procesadas para insertar:', JSON.stringify(simplifiedReviews, null, 2));

  // Seleccionar solo la primera foto
  const primeraFoto = lugar.photos && lugar.photos.length > 0 ? lugar.photos[0] : null;

  // Extraer información de la primera foto
  const fotoInfo = primeraFoto
    ? JSON.stringify({
        photoReference: primeraFoto.photoReference || null,
        widthPx: primeraFoto.widthPx || null,
        heightPx: primeraFoto.heightPx || null,
        authorAttributions: primeraFoto.authorAttributions || [],
      })
    : null;

  // Mapear priceLevel al formato numérico esperado
  const priceLevelMap = {
    PRICE_LEVEL_FREE: 0,
    PRICE_LEVEL_INEXPENSIVE: 1,
    PRICE_LEVEL_MODERATE: 2,
    PRICE_LEVEL_EXPENSIVE: 3,
    PRICE_LEVEL_VERY_EXPENSIVE: 4,
  };

  const priceLevel = priceLevelMap[lugar.priceLevel] ?? null; // Convertir o asignar null si no está definido

  const paymentOptions = simplifyPaymentOptions(lugar.paymentOptions);

  const parametros = [
    lugar.id || null,
    lugar.name || null,
    lugar.address || null,
    lugar.editorialSummary?.text || null,
    lugar.image || null,  //Por definir con photos.
    lugar.attributions || null,   //Falta solicitar este campo a la API
    lugar.location?.latitude || null,
    lugar.location?.longitude || null,
    fotoInfo, // Información de la primera foto, 
    JSON.stringify(lugar.types || []), // Convertir tipos a JSON
    lugar.internationalPhoneNumber || null,
    priceLevel, // Valor numérico de priceLevel
    JSON.stringify(lugar.priceRange || null), // Convertir rango de precio a JSON
    lugar.rating || null,
    JSON.stringify(lugar.currentOpeningHours || []), // Convertir horarios a JSON
    lugar.userRatingCount || null,
    lugar.websiteUri || null,
    lugar.goodForChildren || false,
    lugar.goodForGroups || false,
    //paymentOptions,
    JSON.stringify(lugar.paymentOptions || []),
    lugar.reservable || false,
    lugar.servesVegetarianFood || false,
    lugar.allowsDogs || false,      //Falta solicitar este campo a la API
    JSON.stringify(lugar.reviews || []),
    //JSON.stringify(simplifiedReviews || []), // Reseñas simplificadas    
    lugar.accessibilityOptions?.wheelchairAccessibleParking || false, // Validar si existe
    lugar.accessibilityOptions?.wheelchairAccessibleEntrance || false, // Validar si existe
    lugar.accessibilityOptions?.restroom || false, // Pensando si eliminar este campo ya que no lo da la API
    lugar.accessibilityOptions?.wheelchairAccessibleSeating || false, // Validar si existe
  ];

  try {
    const [results] = await db.promise().query(query, parametros);
    return results;
  } catch (error) {
    console.error('Error al registrar el lugar:', error.message);
    throw new Error('Error al guardar el lugar en la base de datos.');
  }

  // Por cada elemento en lugar.types, se debe llamar a RegistrarSubcategoria

};

module.exports = { registrarLugar };

/*

const db = require('../models/MySQL/db'); 

// Función auxiliar para simplificar el campo paymentOptions
const simplifyPaymentOptions = (paymentOptions) => {
    if (!paymentOptions) return "[]";
  
    const options = [];
    if (paymentOptions.acceptsCreditCards) options.push("Tarjetas de crédito");
    if (paymentOptions.acceptsDebitCards) options.push("Tarjetas de débito");
    if (paymentOptions.acceptsCashOnly) options.push("Solo efectivo");
    if (paymentOptions.acceptsNfc) options.push("NFC");
  
    return JSON.stringify(options);
  };

const registrarLugar = async (lugar) => {
  const query = `
    CALL LugarRegistro(
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );
  `;

  // Seleccionar máximo 2 fotos y convertirlas a JSON
  const fotos = lugar.photos
    ? JSON.stringify(lugar.photos.slice(0, 2).map(photo => photo.photoReference))
    : '[]';

  // Mapear priceLevel al formato numérico esperado
  const priceLevelMap = {
    PRICE_LEVEL_FREE: 0,
    PRICE_LEVEL_INEXPENSIVE: 1,
    PRICE_LEVEL_MODERATE: 2,
    PRICE_LEVEL_EXPENSIVE: 3,
    PRICE_LEVEL_VERY_EXPENSIVE: 4,
  };

  const priceLevel = priceLevelMap[lugar.priceLevel] ?? null; // Convertir o asignar null si no está definido

  const paymentOptions = simplifyPaymentOptions(lugar.paymentOptions);

  const parametros = [
    lugar.id || null,
    lugar.name || null,
    lugar.address || null,
    lugar.location?.latitud || null,
    lugar.location?.longitude || null,
    lugar.rating || null,
    fotos, // Solo 2 fotos
    lugar.editorialSummary || null,
    lugar.googleMapsUri || null,
    lugar.websiteUri || null,
    //lugar.image || null,
    //lugar.attributions || null,   
    JSON.stringify(lugar.types || []), // Convertir tipos a JSON
    lugar.internationalPhoneNumber || null,
    priceLevel, // Valor numérico de priceLevel
    JSON.stringify(lugar.priceRange || null), // Convertir rango de precio a JSON    
    JSON.stringify(lugar.currentOpeningHours || []), // Convertir horarios a JSON
    lugar.userRatingCount || null,
    lugar.goodForChildren || false,
    lugar.goodForGroups || false,
    paymentOptions,
    lugar.reservable || false,
    lugar.servesVegetarianFood || false,
    //lugar.allowsDogs || false,   Falta añadir ese campo para solicitarselo a la API
    JSON.stringify(lugar.reviews || []), // Convertir reseñas a JSON
    lugar.accessibilityOptions?.wheelchairAccessibleParking || false, // Validar si existe
    lugar.accessibilityOptions?.wheelchairAccessibleEntrance || false, // Validar si existe
    lugar.accessibilityOptions?.restroom || false, // Validar si existe
    lugar.accessibilityOptions?.wheelchairAccessibleSeating || false, // Validar si existe
  ];

  try {
    const [results] = await db.promise().query(query, parametros);
    return results;
  } catch (error) {
    console.error('Error al registrar el lugar:', error.message);
    throw new Error('Error al guardar el lugar en la base de datos.');
  }
};

module.exports = { registrarLugar };

*/


