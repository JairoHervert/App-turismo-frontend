import axios from 'axios';

const crearUsuario = (correo, contraseña) => {
  fetch('http://localhost:3001/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo, contraseña }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
};