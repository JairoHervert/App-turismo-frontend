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

const handleRegistro = async (e, nombre, correo, contraseña, contraseña2) => {
  e.preventDefault();
  // setError('');

  if (!nombre || !correo || !contraseña || !contraseña2) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Todos los campos son obligatorios',
      timer: 5000,
      showConfirmButton: false
    });
    return;
  }

  const nameRegex =  /^[A-ZÁÉÍÓÚÜ][a-záéíóúü]+(?:\s[A-ZÁÉÍÓÚÜa-záéíóúü]+|('[A-ZÁÉÍÓÚÜa-záéíóúü]+))*$/; 
  if (!nameRegex.test(nombre) || nombre.length < 3) {
    Swal.fire({
      icon: 'error',
      title: 'Error en el nombre',
      text: 'El nombre debe comenzar con una letra mayúscula, solo contener letras y tener al menos 3 caracteres.',
      timer: 5000,
      showConfirmButton: false
    });
    return;
  }

  const emailRegex = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$/;
  if (!emailRegex.test(correo)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, ingrese un correo electrónico válido',
      timer: 5000,
      showConfirmButton: false
    });
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(contraseña)) {
    Swal.fire({
      icon: 'error',
      title: 'Error en la contraseña',
      text: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.',
      timer: 5000,
      showConfirmButton: false
    });
    return;
  }
  
  if(contraseña != contraseña2) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Las contraseñas no coinciden',
      timer: 5000,
      showConfirmButton: false,
    });
    return;
  }

  try {
    
    const response = await axios.post('http://localhost:3001/registro', {
      nombre,
      correo,
      contraseña,
    });
    console.log(response.data);

    if(response.data !== 'El correo ya está registrado.'){
      await enviarCorreoVerificacion(nombre, correo);
      Swal.fire({
        icon: 'success',
        title: 'Registro iniciado correctamente',
        text: 'El siguiente paso es aceptar el correo de confirmación para poder ingresar a tu cuenta.',
        // timer: 5000,
        showConfirmButton: true,
        willClose: () => {
          window.location.href = '/'
        }
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El correo ya está registrado',
        timer: 5000,
        showConfirmButton: false,
      });
    }
    // navigate('/');
  } catch (err) {
    const errorMsg = err.response?.data?.error || 'Error de conexión';
    // setError('Error al registrar usuario: ' + errorMsg);
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Algo falló en la solicitud',
      timer: 5000,
      showConfirmButton: false
    });
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

    if(response.data !== 'El correo ya está registrado.'){
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
        title: 'Registro con Googl fallido',
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
