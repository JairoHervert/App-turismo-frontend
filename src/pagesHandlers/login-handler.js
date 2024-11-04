import axios from 'axios';
import Swal from 'sweetalert2';

const handleLogin = async (e, correo, contraseña) => {
  e.preventDefault();

  if (!correo || !contraseña) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Todos los campos son obligatorios',
      timer: 2000,
      showConfirmButton: false
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, ingrese un correo electrónico válido',
      timer: 2000,
      showConfirmButton: false
    });
    return;
  }

  try {
    const response = await axios.post('http://localhost:3001/iniciar-sesion', { correo, contraseña });
    // console.log(response.data);
    if (response.data.resultado.id) {
      console.log("Inicio de sesión exitoso. ID de usuario:", response.data.resultado.id);
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('id', response.data.resultado.id);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido! Has iniciado sesión correctamente.',
        timer: 2000,
        showConfirmButton: false,
        willClose: () => {
          window.location.href = '/'
        }
      });
    }
  } catch (error) {
    // Mostrar el mensaje de error específico
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Error:", error.response.data.error);
      Swal.fire({
        icon: 'error',
        title: 'Inicio de sesión fallido',
        text: error.response.data.error,
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      Swal.fire({
        icon: 'error',
        title: 'Inicio de sesión fallido',
        text: 'Algo falló en la solicitud',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }
};

const handleLoginGoogle = async (correo, nombre, imagen, token) => {
  try {
    const response = await axios.post('http://localhost:3001/iniciar_sesionGoogle', {
      correo,
      nombre,
      imagen,
      token,
    });

    console.log(response);

    /*if(response.data !== 'El correo ya está registrado.'){
      window.location.href = '/';
    } else {
      console.log("OwO")
    }*/
    Swal.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso',
      text: '¡Bienvenido! Has iniciado sesión correctamente.',
      timer: 2000,
      showConfirmButton: false,
      willClose: () => {
        window.location.href = '/'
      }
    })
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Error:", error.response.data.error);
      Swal.fire({
        icon: 'error',
        title: 'Inicio de sesión fallido',
        text: error.response.data.error,
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      Swal.fire({
        icon: 'error',
        title: 'Inicio de sesión fallido',
        text: 'Algo falló en la solicitud',
        timer: 2000,
        showConfirmButton: false
      });
    }
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
    await handleLoginGoogle(
      userInfo.data.email,
      userInfo.data.name,
      userInfo.data.picture,
      userInfo.data.sub);
    
      // Mostrar un SweetAlert de éxito si el registro es exitoso

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
