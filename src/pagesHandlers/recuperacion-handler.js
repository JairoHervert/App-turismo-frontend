import axios from 'axios';
import Swal from 'sweetalert2';


const handleRecupreacion = async (correo) => {
        try {
          // Solicitud al servidor para verificar usuario y generar token
          const response = await axios.post('http://localhost:3001/forgot-password', { correo });
          
          // Si el usuario está registrado, se procede con el flujo
          if (response.data.message === 'Usuario registrado') {
            const nombre = response.data.nombre;

      
            // Enviar correo al usuario con la información
            const correoEnviado = await enviarCorreoRecuperacion(nombre, correo);
      
            if (!correoEnviado) {
              Swal.fire({
                icon: 'success',
                title: 'Correo enviado',
                text: 'El siguiente paso es verificar tu correo para restablecer tu contraseña.',
                showConfirmButton: true,
                willClose: () => {
                  window.location.href = '/';
                },
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo enviar el correo de recuperación. Inténtalo más tarde.',
              });
            }
          } else {
            // Si el servidor indica que el usuario no está registrado
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El correo no está registrado.',
              timer: 5000,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error('Error en handleForgotPassword:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.error || 'Error al solicitar recuperación.',
            timer: 5000,
            showConfirmButton: false,
          });
        }
      };
      
      // Función para enviar el correo
      const enviarCorreoRecuperacion = async (name, email) => {
        console.log(name, email);
        try {
        const response = await axios.post('http://localhost:3001/Correo-Recuperacion', {
            name,
            email,
        });
          return response.ok;
        } catch (error) {
          return true;
        }
    };

    const handleActualizar = async (token, nuevaContrasena) => {


        // Solicitud al servidor para actualizar la contraseña
        const response = await axios.post('http://localhost:3001/actualizar-contrasena', { token, nuevaContrasena });
  
        if (response.data.message === 'Contraseña actualizada exitosamente.') {
          Swal.fire({
            icon: 'success',
            title: 'Contraseña actualizada exitosamente',
            text: 'Tu contraseña ha sido actualizada correctamente. Inicia sesión con tu nueva contraseña.',
            showConfirmButton: true,
            willClose: () => {
              window.location.href = '/login';
            },
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la contraseña. Inténtalo más tarde.',
          });
        }


    };

// Exports
export {
    handleRecupreacion,
    handleActualizar
  };  