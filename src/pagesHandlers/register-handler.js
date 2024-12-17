import axios from 'axios';
import Swal from 'sweetalert2';

const enviarCorreoVerificacion = async (nombre, correo) => {
  try {
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: nombre, 
        email: correo 
      })
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Correo de verificación enviado:', result);
      return true;
    } else {
      console.error('Error al enviar la solicitud de verificación:', result);
      return false;
    }
  } catch (error) {
    console.error('Error al enviar la solicitud de verificación:', error);
    return false;
  }
};

const handleRegistro = async (e, nombre, correo, contraseña) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/registro', {
      nombre,
      correo,
      contraseña,
    });
    console.log(response.data);
    if(response.data.resultado.id) {
      const responseCorreo = await enviarCorreoVerificacion(nombre, correo);
      if(responseCorreo)
        return response.data;
      else
        throw({error: 'Error mandando el correo de confirmación. Favor de reintentar'});
    } else if(response.data.resultado.warning) {
      const responseCorreo = await enviarCorreoVerificacion(nombre, correo);
      if(responseCorreo)
        return response.data;
      else
        throw({error: 'Error mandando el correo de confirmación. Favor de reintentar'});
    } else {
      throw(new Error('Algo falló en la solicitud'));
    }

  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error
    } else if(error.error) {
      return error.error;
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      return 'Algo falló en la solicitud';
    }
  }
};

const handleRegistroGoogle = async (nombre, apellido, correo, imagen, token) => {
  try {
    const response = await axios.post('http://localhost:3001/registroGoogle', {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      imagen: imagen,
      token: token,
    });

    console.log(response);
    console.log(response.data);
    console.log(response.data.resultado);

    if(response.data.resultado.id){
      Swal.fire({
        icon: 'success',
        title: 'Registro con Google exitoso',
        text: '¡Bienvenido! Has registrado tu cuenta de Google correctamente.',
        timer: 5000,
        showConfirmButton: false,
        willClose: () => {
          window.location.href = '/login'
        }
      })
    } else {
      console.log("OwO")
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Error:", error.response.data.error);
      Swal.fire({
        icon: 'error',
        title: 'Registro con Google fallido',
        text: error.response.data.error,
        timer: 5000,
        showConfirmButton: false
      });
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      Swal.fire({
        icon: 'error',
        title: 'Registro con Google fallido',
        text: 'Algo falló en la solicitud',
        timer: 5000,
        showConfirmButton: false
      });
    }
  }
};

// VERIFICACIÓN CON GOOGLE
const successGoogleHandler = async (tokenResponse) => {
  //console.log('Token de Google:', tokenResponse);
  const accessToken = tokenResponse.access_token;
  //console.log('Token de acceso:', accessToken);
  
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

    await handleRegistroGoogle(
      userInfo.data.given_name,
      userInfo.data.family_name,
      userInfo.data.email,
      userInfo.data.picture,
      userInfo.data.sub
    );
    console.log(userInfo);

  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
  }
};

const errorGoogleHandler = () => {
  console.log('Error al autenticar con Google');
};

// VERIFICACIÓN CON FACEBOOK
const responseFacebook = async (response) => {
  console.log(response);
  if(response.status && response.status == 'unknown') {
    return;
  }
  const { accessToken, name, userID } = response;
  const picture = `https://graph.facebook.com/${userID}/picture?type=large&access_token=${accessToken}`;

  try {
    const res = await axios.post('http://localhost:3001/registro_Facebook', {
      nombre: name,
      imagen: picture,
      facebookId: userID,
    });
    
    console.log("res", res);
    console.log(res.data.id);
    console.log(name, picture, userID);
    Swal.fire({
      icon: 'success',
      title: 'Registro con Facebook exitoso',
      text: '¡Bienvenido! Has iniciado sesión correctamente con Facebook.',
      timer: 5000,
      showConfirmButton: false,
      willClose: () => {
        window.location.href = '/login'
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario con Facebook:', error);
    Swal.fire({
      icon: 'error',
      title: 'Registro con Facebook fallido',
      text: error.response.data.error,
      timer: 5000,
      showConfirmButton: false
    });
  }
};

// Exports
export {
  handleRegistro,
  successGoogleHandler,
  errorGoogleHandler,
  responseFacebook
};
