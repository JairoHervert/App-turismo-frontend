import axios from 'axios';

const handleDatosLugar = async (id) => {
  try {
    const response = await axios.post('http://localhost:3001/lugar_datos', { id });
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
};

const handleFotosLugar = async (id) => {
  try {
    const response = await axios.post('http://localhost:3001/lugar_fotos', { id });
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
};

const handleSubcategoriasLugar = async (id) => {
  try {
    const response = await axios.post('http://localhost:3001/lugar_subcategorias', { id });
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
};

export {
  handleDatosLugar,
  handleFotosLugar,
  handleSubcategoriasLugar,
};