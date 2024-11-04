import axios from 'axios';

const isLogged = async() => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('access_token');
    if(!id || !token) return false;
    const response = await axios.post('http://localhost:3001/isLogged', {id, token});
    console.log(response.data);
    return true;
};

export {
  isLogged
}