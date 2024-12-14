import axios from 'axios';
import Swal from 'sweetalert2';

const handleLogin = async (e, correo, contraseña) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3001/iniciar-sesion', { correo, contraseña });
    if (response.data.resultado.id) {
      console.log("Inicio de sesión exitoso. ID de usuario:", response.data.resultado.id);

      return response.data;
    } else {
      //throw()
    }
  } catch (error) {
    // Mostrar el mensaje de error específico
    if (error.response && error.response.data && error.response.data.error) {
      alert_error(error.response.data.error);
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      alert_error('Algo falló en la solicitud');
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

    console.log(response.data.resultado.id);
    if(response.data.resultado.id) {
      console.log("Inicio de sesión exitoso. ID de usuario:", response.data.resultado.id);
      
      return response.data;
    }

  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Error:", error.response.data.error);
      alert(error.response.data.error);
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

// ----------------------------------------------------------------------
//                                GOOGLE
// ----------------------------------------------------------------------

const errorGoogleHandler = () => {
  console.log('Error al autenticar con Google');
};

// ----------------------------------------------------------------------
//                              FACEBOOK
// ----------------------------------------------------------------------

const responseFacebook = async (response) => {
  console.log(response);
  if(response.status && response.status === 'unknown') {
    return;
  }

  const { userID, accessToken } = response;
  const picture = `https://graph.facebook.com/${userID}/picture?type=large&access_token=${accessToken}`;

  try {
    const res = await axios.post('http://localhost:3001/login_Facebook', {
      token: userID,
      imagen: picture,
    });
    
    console.log(res.data);
    //console.log(res.data.resultado.id);
    //console.log(accessToken);

    if (res.data.resultado.id) {
      
      // guardar el token en localStorage
      localStorage.setItem('access_token', res.data.token);
      localStorage.setItem('id', res.data.resultado.id);
      localStorage.setItem('facebook_access_token', accessToken);

      // Verificar que se guardó bien
      console.log(localStorage.getItem('access_token'));
      console.log(localStorage.getItem('id'));

      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido! Has iniciado sesión correctamente con Facebook.',
        // timer: 5000,
        showConfirmButton: false,
        willClose: () => {
          window.location.href = '/'
        }
      });
    }
  } catch (error) {
    console.error('Error al registrar usuario con Facebook:', error);
    console.log(error);
    console.log(error.response.data.error);
    Swal.fire({
      icon: 'error',
      title: 'Inicio de sesión fallido',
      text: error.response.data.error,
      timer: 2000,
      showConfirmButton: false
    });
  }
};

function alert_error(mensaje) {
  Swal.fire({
    icon: 'error',
    title: 'Inicio de sesión fallido',
    text: mensaje,
    showConfirmButton: true
  });
};

// Exports
export {
  handleLogin,
  handleLoginGoogle,
  errorGoogleHandler,
  responseFacebook
};
