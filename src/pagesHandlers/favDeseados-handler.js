import axios from 'axios';

const handleDeseados = async (idUsuario, IdLugar) => {
  console.log("handleDeseadosrecibe", idUsuario, IdLugar);
  try {
    const responseEsDeseado = await handleEsDeseado(idUsuario, IdLugar);

    if (responseEsDeseado.esDeseado) {
      const response = await axios.post('http://localhost:3001/eliminar-deseados', { idUsuario, IdLugar });
      console.log("handleDeseados", response);
      return response.data;   
    }
    else{
      const response = await axios.post('http://localhost:3001/agregar-deseados', { idUsuario, IdLugar });
      console.log("handleDeseados", response);
      return response.data;
    }
  } catch (error) {      
    throw new Error(error.response?.data?.error || 'Error al agregar a deseados');
  }
}

const handleFavoritos = async (idUsuario, IdLugar) => {
  try {
    const responseEsFavorito = await handleEsFavorito(idUsuario, IdLugar);
    console.log(responseEsFavorito);

    if (responseEsFavorito.esFavorito) {
      const response = await axios.post('http://localhost:3001/eliminar-favoritos', { idUsuario, IdLugar });
      return response.data;
    }
    else{
      const response = await axios.post('http://localhost:3001/agregar-favoritos', { idUsuario, IdLugar });
      return response.data;
    }
    
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al agregar a favoritos');
  }

}

const handleEsDeseado = async (idUsuario, IdLugar) => {
  const response = await axios.post('http://localhost:3001/es-deseado', { idUsuario, IdLugar });
  console.log("handleEsDeseado", response);
  return response.data;
};

const handleEsFavorito = async (idUsuario, IdLugar) => {
  const response = await axios.post('http://localhost:3001/es-favorito', { idUsuario, IdLugar });
  console.log("handleEsFavorito", response);
  return response.data;
};

const handleEliminarFavorito = async (idUsuario, IdLugar) => {
  try{

  const response = await axios.post('http://localhost:3001/eliminar-favoritos', { idUsuario, IdLugar });
  return response.data;

  }
  catch (error) {
    throw new Error(error.response?.data?.error || 'Error al eliminar de favoritos');
  }
  
};

export { 
    handleFavoritos,
    handleDeseados,
    handleEsFavorito,
    handleEsDeseado,
    handleEliminarFavorito
}    