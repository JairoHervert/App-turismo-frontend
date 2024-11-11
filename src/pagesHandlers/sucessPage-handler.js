import axios from 'axios';

// import Swal from 'sweetalert2';

const SuccessfullRegistration = async (token) => {
  // Verifica si el correo del token esta verificado con jwt, busca el correo en la db y actualiza el campo confirmacion a 1
  // Retorna true si el correo fue verificado y actualizado correctamente, false en caso contrario, no utiliza sweetalert
  try {
    const response = await axios.post('http://localhost:3001/confirm-email', {
      token
    });
    console.log(response.data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
  
}

// Exports
export {
  SuccessfullRegistration
};
