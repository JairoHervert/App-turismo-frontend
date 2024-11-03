const nodemailer = require('nodemailer');

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'canastabasica2024@gmail.com', // Cambia a tu correo
    pass: 'jfqn tvdl ppah vtkk' // Cambia a la contraseña de aplicación
  }
});

transporter.verify((error) => {
  if (error) {
    console.log('Error al configurar Nodemailer:', error);
  } else {
    console.log('Nodemailer configurado correctamente');
  }
});

module.exports = transporter;