import axios from 'axios';

const handleLogin = async (e, correo, contraseña) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/iniciar-sesion', { correo, contraseña });
    // console.log(response.data);
    if (response.data.resultado.id) {
      console.log("Inicio de sesión exitoso. ID de usuario:", response.data.resultado.id);
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('id', response.data.resultado.id);
      window.location.href = '/';
    } else {
      console.log("Credenciales incorrectas.");
      alert("Credenciales incorrectas.");
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    alert("Error al intentar iniciar sesión.");
  }
};

// VERIFICACIÓN CON GOOGLE
const successGoogleHandler = async (tokenResponse) => {
  console.log('Token de Google:', tokenResponse);
  const accessToken = tokenResponse.access_token;
  console.log('Token de acceso:', accessToken);
  
  // Llama a Google UserInfo API para obtener los datos del usuario
  try {
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log('Información del usuario:', userInfo.data);
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
  }
};

const errorGoogleHandler = () => {
  console.log('Error al autenticar con Google');
};

// VERIFICACIÓN CON FACEBOOK
const responseFacebook = (response) => {
  console.log(response); // Maneja la respuesta de autenticación aquí
};

// Exports
export {
  handleLogin,
  successGoogleHandler,
  errorGoogleHandler,
  responseFacebook
};
