import axios from 'axios';
import Swal from 'sweetalert2';

const handleLogin = async (e, correo, contraseña) => {
  e.preventDefault();

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
        timer: 3000,
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
        timer: 5000,
        showConfirmButton: false
      });
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      Swal.fire({
        icon: 'error',
        title: 'Inicio de sesión fallido',
        text: 'Algo falló en la solicitud',
        timer: 5000,
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

    console.log(response.data.id.id);

    // guardar el token en localStorage
    localStorage.setItem('access_token', token);
    localStorage.setItem('google_access_token', token);
    localStorage.setItem('id', response.data.id.id);

    // Verificar que se guardó bien
    console.log(localStorage.getItem('access_token'));
    console.log(localStorage.getItem('id'));

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

// ----------------------------------------------------------------------
//                                GOOGLE
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
//                              FACEBOOK
// ----------------------------------------------------------------------

const responseFacebook = async (response) => {
  console.log(response);
  console.log(response.status);
  console.log(response.status == 'unknown');
  if(response.status == 'unknown') {
    return;
  }
  const { userID, accessToken } = response;

  try {
    const res = await axios.post('http://localhost:3001/login_Facebook', {
      token: userID,
    });
    
    if (res.data.resultado.id) {
      
      // guardar el token en localStorage
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('id', res.data.resultado.id);

      // Verificar que se guardó bien
      console.log(localStorage.getItem('access_token'));
      console.log(localStorage.getItem('id'));

      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido! Has iniciado sesión correctamente con Facebook.',
        timer: 2000,
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

// Exports
export {
  handleLogin,
  successGoogleHandler,
  errorGoogleHandler,
  responseFacebook
};
