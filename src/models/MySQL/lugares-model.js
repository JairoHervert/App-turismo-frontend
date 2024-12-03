const db = require('./db'); 

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

  //console.log('Reseñas procesadas para insertar:', JSON.stringify(simplifiedReviews, null, 2));

  // Seleccionar solo la primera foto
  const primeraFoto = lugar.photos && lugar.photos.length > 0 ? lugar.photos[0] : null;

  // Extraer información de la primera foto
  const fotoInfo = primeraFoto
    ? JSON.stringify({
        name: primeraFoto.name || null,
        widthPx: primeraFoto.widthPx || null,
        heightPx: primeraFoto.heightPx || null,
        authorAttributions: primeraFoto.authorAttributions || [],
        googleMapsUri: primeraFoto.googleMapsUri || null,
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
    fotoInfo,  //Por definir con photos.
    lugar.attributions || null,   //Falta solicitar este campo a la API
    lugar.location?.latitude || null,
    lugar.location?.longitude || null,
    JSON.stringify(lugar.photos || []), // Información de las photos de Google,
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
    // Por cada elemento en lugar.types, se debe llamar a RegistrarSubcategoria
    const subcategorias = lugar.types || [];
    const todasSubcategorias = await obtenerTodasSubcategorias();
    for (const subcategoria of subcategorias) {
      const existeSubcategoria = todasSubcategorias.some((item) => item.id === subcategoria);
      if (existeSubcategoria) {
        const response = await db.promise().query('CALL RegistrarSubcategoria(?,?)', [lugar.id, subcategoria]);
      }
      // console.log('Subcategoría registrada:', response);
    }

    return results;
  } catch (error) {
    console.error('Error al registrar el lugar:', error.message);
    throw new Error('Error al guardar el lugar en la base de datos.');
  }


};

const obtenerTodasSubcategorias = async () => {
  const query = 'SELECT * FROM Subcategoria';
  return new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
          if (err) {
              reject(err);
          }
          const subcategorias = results || null;
          if (subcategorias && subcategorias.error)
              return reject(new Error(subcategorias.error));
          resolve(subcategorias);
      });
  });
}

const registrarFoto = async (idLugar, foto) => {
  const query = 'CALL RegistrarFoto(?, ?)';
  const parametros = [idLugar, foto];
  try {
    const [results] = await db.promise().query(query, parametros);
    if (results && results.error) {
      throw new Error(results.error);
    }
    return results;
  } catch (error) {
    console.error('Error al registrar la foto:', error.message);
    throw new Error('Error al guardar la foto en la base de datos.');
  }
}

const registrarFotoPrincipal = async (idLugar, foto) => {
  const query = 'UPDATE Lugar SET imagen = ? WHERE id = ?';
  const parametros = [foto, idLugar];
  try {
    const [results] = await db.promise().query(query, parametros);
    if (results && results.error) {
      throw new Error(results.error);
    }
    return results;
  } catch (error) {
    console.error('Error al registrar la foto principal:', error.message);
    throw new Error('Error al guardar la foto principal en la base de datos.');
  }
}

module.exports = { registrarLugar , obtenerTodasSubcategorias, registrarFoto, registrarFotoPrincipal };