const axios = require('axios');

// Realiza una solicitud GET al servidor en el endpoint /usuarios
axios.get('http://localhost:3001/usuarios')
  .then(response => {
    console.log('Usuarios:', response.data);
  })
  .catch(error => {
    console.error('Error al obtener usuarios:', error.message);
  });