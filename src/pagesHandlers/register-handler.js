import axios from 'axios';

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
      alert("Usuario registrado con éxito, solo accede a tu correo para verificar tu cuenta. " + result.message); // Muestra el mensaje de confirmación
    } else {
      alert('Hubo un error al enviar el correo de verificación');
    }
  } catch (error) {
    console.error('Error al enviar la solicitud de verificación:', error);
  }
};

const handleRegistro = async (e, nombre, correo, contraseña) => {
  e.preventDefault();
  // setError('');
  try {
    
    const response = await axios.post('http://localhost:3001/registro', {
      nombre,
      correo,
      contraseña,
    });
    console.log(response.data);

    if(response.data !== 'El correo ya está registrado.'){
      await enviarCorreoVerificacion(nombre, correo);
      window.location.href = '/';
    }
    else{
      alert('El correo ya está registrado.');
    }
    // navigate('/');
  } catch (err) {
    const errorMsg = err.response?.data?.error || 'Error de conexión';
    // setError('Error al registrar usuario: ' + errorMsg);
    console.error(err);
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
  handleRegistro,
  successGoogleHandler,
  errorGoogleHandler,
  responseFacebook
};
