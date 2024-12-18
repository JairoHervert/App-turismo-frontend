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

    console.log(response.data.resultado.id);
    if(response.data.resultado.id){
      console.log("Registro exitoso. ID de usuario:", response.data.resultado.id);
      return response.data;
    } else {
      throw(new Error('Error desconocido'));
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      return 'Algo falló en la solicitud';
    }
  }
};

const errorGoogleHandler = () => {
  console.log('Error al autenticar con Google');
};

// VERIFICACIÓN CON FACEBOOK
const responseFacebook = async (response) => {
  const { accessToken, name, userID } = response;
  const picture = `https://graph.facebook.com/${userID}/picture?type=large&access_token=${accessToken}`;

  try {
    const res = await axios.post('http://localhost:3001/registro_Facebook', {
      nombre: name,
      imagen: picture,
      facebookId: userID,
    });
    
    if(res.data.id) {
      console.log("Registro exitoso. ID de usuario:", res.data.id);
      return res.data;
    } else {
      throw(new Error('Error desconocido'));
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      return 'Algo falló en la solicitud';
    }
  }
};

// Exports
export {
  handleRegistro,
  handleRegistroGoogle,
  errorGoogleHandler,
  responseFacebook
};
