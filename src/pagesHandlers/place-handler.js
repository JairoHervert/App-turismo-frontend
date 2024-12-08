import axios from 'axios';

const handleAllPlaces = async () => {
  try {
    const response = await axios.post('http://localhost:3001/lugares_todos', { });
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

const handleCategoriasLugar = async (id) => {
  try {
    const response = await axios.post('http://localhost:3001/lugar_categorias', { id });
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

const handleCategorias4Lugar = async (cat1, cat2, cat3, cat4) => {
  try {
    const response = await axios.post('http://localhost:3001/lugar_getLugaresPor4Categorias', { cat1, cat2, cat3, cat4 });
    if(response.data.resultado.datos) {
      const datos = response.data.resultado.datos;
      return datos;
    }
    else
      return [];

  } catch (error) {
    if(error.response.data.error) {
      console.error("Error: ", error.response.data.error)
    } else {
      console.error("Error: ", error);
    }
  }
};

const handleCategorias4LugarUsuario = async (id, cat1, cat2, cat3, cat4) => {
  try {
    const response = await axios.post('http://localhost:3001/lugar_getLugaresPor4CategoriasUsuario', { id, cat1, cat2, cat3, cat4 });
    if(response.data.resultado.datos) {
      const datos = response.data.resultado.datos;
      return datos;
    }
    else
      return [];

  } catch (error) {
    if(error.response.data.error) {
      console.error("Error: ", error.response.data.error)
    } else {
      console.error("Error: ", error);
    }
  }
};

const handleCategorias = async () => {
  try {
    const response = await axios.post('http://localhost:3001/getCategorias', {});
    if(response.data.resultado.datos) {
      const datos = response.data.resultado.datos;
      return datos;
    }
    else
      return [];

  } catch (error) {
    if(error.response.data.error) {
      console.error("Error: ", error.response.data.error)
    } else {
      console.error("Error: ", error);
    }
  }
};

export {
  handleAllPlaces,
  handleDatosLugar,
  handleFotosLugar,
  handleCategoriasLugar,
  handleSubcategoriasLugar,
  handleCategorias4Lugar,
  handleCategorias4LugarUsuario,
  handleCategorias,
};