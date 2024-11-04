// validations.js

// Validación para nombre
export const validateName = (name) => {
    if (!name) {
      return "El nombre es obligatorio.";
    } else if (name.length < 3) {
      return "El nombre debe tener al menos 3 caracteres.";
    }
    return "";
  };
  
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
  export const validatePassword = (password) => {
    if (!password) {
      return "La contraseña es obligatoria.";
    } else if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return "La contraseña debe incluir al menos una letra mayúscula y un número.";
    }
    return "";
  };
  
  // Validación para confirmación de contraseña
  export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "Confirma tu contraseña.";
    } else if (password !== confirmPassword) {
      return "Las contraseñas no coinciden.";
    }
    return "";
  };
  