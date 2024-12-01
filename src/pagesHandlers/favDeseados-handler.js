import axios from 'axios';

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
const handleDeseados = async (idUsuario, IdLugar) => {
    try {

        const responseEsDeseado = await handleEsDeseado(idUsuario, IdLugar);

        if (responseEsDeseado.esDeseado) {
            const response = await axios.post('http://localhost:3001/eliminar-deseados', { idUsuario, IdLugar });
            return response.data;   
        }
        else{
        const response = await axios.post('http://localhost:3001/agregar-deseados', { idUsuario, IdLugar });
        return response.data;
        }

    } catch (error) {      
        throw new Error(error.response?.data?.error || 'Error al agregar a deseados');
    }
}

const handleEsFavorito = async (idUsuario, IdLugar) => {
    const response = await axios.post('http://localhost:3001/es-favorito', { idUsuario, IdLugar });
    return response.data;
};
  
const handleEsDeseado = async (idUsuario, IdLugar) => {
    console.log(idUsuario, IdLugar);
    const response = await axios.post('http://localhost:3001/es-deseado', { idUsuario, IdLugar });
    return response.data;
};


export { 
    handleFavoritos,
    handleDeseados,
    handleEsFavorito,
    handleEsDeseado
}    