import axios from 'axios';

export const fetchUsuarios = async () => {
  try {
    const response = await axios.get('http://localhost:3001/usuarios'); // Cambia el puerto si es necesario
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

export const login = async () => {
  try {
    const response = await axios.post('http://localhost:3001/iniciar-sesion', { correo, contraseña });
    if (response.data.id) {
      console.log("Inicio de sesión exitoso. ID de usuario:", response.data.id);
      return response.data.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
  }
}