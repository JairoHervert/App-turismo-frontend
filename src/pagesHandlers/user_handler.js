import axios from 'axios';

const handleDatosUsuario = async (id) => {
  try {
    const response = await axios.post('http://localhost:3001/user_datos', { id });
    if(response.data.resultado.datos) {
      const datos = response.data.resultado.datos;
      return datos;
    }

  } catch (error) {
    if(error.response.data.error) {
      console.error("Error: ", error.response.data.error)
    } else {
      console.error("Error: ", error);
    }
  }
}

const handleDeseados = async (id) => {

  try {
    const response = await axios.post('http://localhost:3001/user_deseados', { id });
    if(response.data.resultado.deseados) {
      const deseados = response.data.resultado.deseados;
      console.log(deseados);
      return deseados;
    }
    
  }
  catch (error) {
    // Mostrar el mensaje de error específico
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Error:", error.response.data.error);
    } else {
      console.error("Error al intentar obtener los lugares deseados:", error);
    }
  }

}

const handleFavoritos = async (id) => {

  try {
    const response = await axios.post('http://localhost:3001/user_favoritos', { id });
    if(response.data.resultado.favoritos) {
      const favoritos = response.data.resultado.favoritos;
      console.log(favoritos);
      return favoritos;
    }
    
  }
  catch (error) {
    // Mostrar el mensaje de error específico
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Error:", error.response.data.error);
    } else {
      console.error("Error al intentar obtener favoritos:", error);
    }
  }

}
export {
  handleDatosUsuario,
  handleDeseados,
  handleFavoritos,
}