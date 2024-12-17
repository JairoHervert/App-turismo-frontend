
function errorHandler(error) {
  //let resultado = "Algo sucedió mal procesando la solicitud.";
  let resultado = error;
  switch(error) {
    case "correo_no_registrado":
      resultado = "Correo no registrado.";
      break;
    case "correo_ya_registrado":
      resultado = "Este correo ya se encuentra registrado.";
      break;
    case "correo_no_confirmado":
      resultado = "La cuenta no ha sido confirmada. Revisa tu correo para confirmar tu cuenta.";
      break;
    case "correo_invalido":
      resultado = "Dirección de correo inválida.";
      break;
    case "cuenta_no_registrada":
      resultado = "Cuenta no registrada."
      break;
    case "cuenta_ya_registrada":
      resultado = "Esta cuenta ya se encuentra registrada.";
      break;
    case "error_conexion":
      resultado = "Error de conexión";
      break;
    case "Can't add new command when connection is in closed state":
      resultado = "Conexión cerrada con la base";
      break;
  }
  return resultado;
};

module.exports = { errorHandler };