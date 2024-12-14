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

const handleCompletarPerfil = async (id, username, nombre, apellido, fechaNacimiento, sexo, alimentacion, discapacidad) => {
  try {
    const response = await axios.post('http://localhost:3001/user_completar_perfil', {id, username, nombre, apellido, fechaNacimiento, sexo, alimentacion, discapacidad});
    if(response.data.resultado.datos) {
      return response.data.resultado.datos;
    }
  } catch (error) {
    if(error.response.data.error) {
      console.error("Error: ", error.response.data.error);
    } else { 
      console.error("Error: ", error);
    }
  }
}

const handleActualizarCategorias = async (id, categorias) => {
  try {
    const response = await axios.post('http://localhost:3001/user_actualizar_categorias', {id, categorias});
    if(response.data.resultado.datos) {
      return response.data.resultado.datos;
    }
  } catch (error) {
    if(error.response.data.error) {
      console.error("Error: ", error.response.data.error);
    } else { 
      console.error("Error: ", error);
    }
  }
}

const handleGuardarDatos = async (id, nombre, apellido, fecha) => {
  try {
    const response = await axios.post('http://localhost:3001/user_guardar_datos', { id, nombre, apellido, fecha });
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
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Error:", error.response.data.error);
    } else {
      console.error("Error al intentar obtener favoritos:", error);
    }
  }
}

const handleCategorias = async (id) => {
  try {
    const response = await axios.post('http://localhost:3001/user_categorias', { id });
    if(response.data.resultado.categorias) {
      const favoritos = response.data.resultado.categorias;
      console.log(favoritos);
      return favoritos;
    }
    
  }
  catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Error:", error.response.data.error);
    } else {
      console.error("Error al intentar obtener favoritos:", error);
    }
  }
}

const handleTodasCategoriasUsuario = async (id) => {

  try {
    const response = await axios.post('http://localhost:3001/user_todas_categorias', { id });
    if(response.data.resultado.categorias) {
      return response.data.resultado.categorias;
    }
  }
  catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Error:", error.response.data.error);
    } else {
      console.error("Error al intentar obtener categorias favoritas:", error);
    }
  }
}

export {
  handleDatosUsuario,
  handleCompletarPerfil,
  handleActualizarCategorias,
  handleGuardarDatos,
  handleDeseados,
  handleFavoritos,
  handleCategorias,
  handleTodasCategoriasUsuario,
}