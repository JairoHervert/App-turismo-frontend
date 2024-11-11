// validations.js

// Validación para correo electrónico
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "El correo es obligatorio.";
  } else if (!emailRegex.test(email)) {
    return "El correo no es válido.";
  }
  return "";
};

// Validación para contraseña
export const validatePasswordNotEmpty = (password) => {
  return password ? "" : "La contraseña es obligatoria.";
};
