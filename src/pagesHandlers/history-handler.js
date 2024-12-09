import axios from 'axios';

// Función para registrar el historial
const registrarHistorial = async (idUsuario, idLugar) => {
    try {
      const response = await axios.post('http://localhost:3001/historial', {
        idUsuario,
        idLugar,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error al registrar el historial:', error);
    }
  };
  
  // Función para obtener el historial
  const obtenerHistorial = async (idUsuario) => {
    try {
      const response = await axios.get('http://localhost:3001/historial', {
        params: { idUsuario },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el historial:', error);
      return [];
    }
  };
  
  // Función para borrar el historial
  const borrarHistorial = async (idUsuario) => {
    try {
      const response = await axios.delete('http://localhost:3001/historial', {
        data: { idUsuario },
      });
      return response.data.message;
    } catch (error) {
      console.error('Error al borrar el historial:', error);
      throw new Error('No se pudo borrar el historial.');
    }
  };
  
  // Exporta las funciones
  export { registrarHistorial, obtenerHistorial, borrarHistorial };
