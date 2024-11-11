import axios from 'axios';

// Devuelve estado y datos de inicio de sesión
const isLogged = async() => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('access_token');
    const googleToken = localStorage.getItem('google_access_token');
    if(!id || !token) return {logged: false, data: null};
    if(googleToken) return {logged: true, data: 'Nombre de usuario'};
    const response = await axios.post('http://localhost:3001/isLogged', {id, token});
    return {logged: response.data.logged, data: response.data.decoded};
};

export {
  isLogged
}