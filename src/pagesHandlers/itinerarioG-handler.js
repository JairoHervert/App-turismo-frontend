import axios from 'axios';

const HandleObtenerItinerarios = async (idUsuario) => {
    try {
      const response = await axios.post('http://localhost:3001/obtener-itinerarios', { idUsuario});
      return response.data;   

  } catch (error) {      
    console.log(error.response?.data?.error || 'Error al agregar a deseados');
  }
}

export { HandleObtenerItinerarios };
