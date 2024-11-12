import axios from 'axios';

// Devuelve estado y datos de inicio de sesión

// Notas Aarón: Falta hacer una petición a la base que me regrese el username para poder llenar la variable nombreUsuario.
const isLogged = async() => {
  const id = localStorage.getItem('id');
    const token = localStorage.getItem('access_token');
    const googleToken = localStorage.getItem('google_access_token');
    const facebookToken = localStorage.getItem('facebook_access_token');
    const nombreUsuario = 'Nombre de usuario';
    if(!id || !token)
      return {logged: false, data: null};
    if(googleToken)
      return {logged: true, data: nombreUsuario};
    if(facebookToken)
      return {logged: true, data: nombreUsuario};
    // Aquí solo sería modificar la respuesta de la petición en el backend para que me regrese el username y no el token decoded,
    // es decir, hay que hacer una petición a la base de acuerdo con el correo que hay en decoded y que me regrese el username.
    const response = await axios.post('http://localhost:3001/isLogged', {id, token});
    console.log(response.data.decoded);
    nombreUsuario = response.data.decoded.correo;
    return {logged: response.data.logged, data: nombreUsuario};
};

export {
  isLogged
}