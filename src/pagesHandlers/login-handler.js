import axios from 'axios';

const handleLogin = async (e, correo, contraseña) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3001/iniciar-sesion', { correo, contraseña });
    if (response.data.resultado.id) {
      console.log("Inicio de sesión exitoso. ID de usuario:", response.data.resultado.id);
      return response.data;
    } else {
      throw(new Error('Algo falló en la solicitud'));
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

// ----------------------------------------------------------------------
//                                GOOGLE
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
//                              FACEBOOK
// ----------------------------------------------------------------------

const responseFacebook = async (response) => {
  const { userID, accessToken } = response;
  const picture = `https://graph.facebook.com/${userID}/picture?type=large&access_token=${accessToken}`;

  try {
    const res = await axios.post('http://localhost:3001/login_Facebook', {
      token: userID,
      imagen: picture,
    });

    if (res.data.resultado.id) {
      console.log("Inicio de sesión exitoso. ID de usuario:", res.data.resultado.id);
      return res.data;
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
  handleLogin,
  handleLoginGoogle,
  errorGoogleHandler,
  responseFacebook
};
