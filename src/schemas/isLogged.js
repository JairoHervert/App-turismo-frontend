import axios from 'axios';

// Devuelve estado y datos de inicio de sesión

// Notas Aarón: Falta hacer una petición a la base que me regrese el username para poder llenar la variable nombreUsuario.
const isLogged = async() => {
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('access_token');
  const googleToken = localStorage.getItem('google_access_token');
  const facebookToken = localStorage.getItem('facebook_access_token');
  let nombreUsuario = 'Nombre de usuario';
  let imagen = '';
  if(!id || !token)
    return {logged: false, data: null};
  if(googleToken) {
    const response = await axios.post('http://localhost:3001/isLogged', {id, token});
    if(!response.data.logged) {
      localStorage.removeItem('id');
      return {logged: false, data: null};
    }
    // Nombre en el NavBar
    if(response.data.decoded.username)
      nombreUsuario = response.data.decoded.username;
    else if(response.data.decoded.nombre)
      nombreUsuario = response.data.decoded.nombre;
    else if(response.data.decoded.correo)
      nombreUsuario = response.data.decoded.correo;
    // Imagen de perfil
    if(response.data.decoded.imagen)
      imagen = response.data.decoded.imagen;
    return {logged: true, data: {id: id, username: nombreUsuario, imagen: imagen}};
  }
  else if(facebookToken) {
    const response = await axios.post('http://localhost:3001/isLogged', {id, token});
    if(!response.data.logged) {
      localStorage.removeItem('id');
      return {logged: false, data: null};
    }
    // Nombre en el NavBar
    if(response.data.decoded.username)
      nombreUsuario = response.data.decoded.username;
    else if(response.data.decoded.nombre)
      nombreUsuario = response.data.decoded.nombre;
    else if(response.data.decoded.correo)
      nombreUsuario = response.data.decoded.correo;
    // Imagen de perfil
    if(response.data.decoded.imagen)
      imagen = response.data.decoded.imagen;
    return {logged: true, data: {id: id, username: nombreUsuario, imagen: imagen}};
  }
  else {
    // Aquí solo sería modificar la respuesta de la petición en el backend para que me regrese el username y no el token decoded,
    // es decir, hay que hacer una petición a la base de acuerdo con el correo que hay en decoded y que me regrese el username.
    const response = await axios.post('http://localhost:3001/isLogged', {id, token});
    if(!response.data.logged) {
      localStorage.removeItem('id');
      return {logged: false, data: null};
    }
    // Nombre en el NavBar
    if(response.data.decoded.username)
      nombreUsuario = response.data.decoded.username;
    else if(response.data.decoded.nombre)
      nombreUsuario = response.data.decoded.nombre;
    else if(response.data.decoded.correo)
      nombreUsuario = response.data.decoded.correo;
    // Imagen de perfil
    if(response.data.decoded.imagen)
      imagen = response.data.decoded.imagen;
    return {logged: response.data.logged, data: {id: id, username: nombreUsuario, imagen: imagen}};
  }
};

export {
  isLogged
}