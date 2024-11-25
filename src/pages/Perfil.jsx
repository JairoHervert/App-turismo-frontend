import React from 'react';
import { useEffect, useState } from 'react';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
// componentes
import InformacionHeader from '../components/perfil/InformacionHeader';
import InformacionPersonal from '../components/perfil/InformacionPersonal';
import CategoriasInteres from '../components/perfil/CategoriasInteres';
// estilos
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import '../css/Perfil.css';

import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { handleDatosUsuario } from '../pagesHandlers/user_handler';
import { isLogged } from '../schemas/isLogged';
import { useNavigate } from 'react-router-dom';

const categorias = ['Parques', 'Museos', 'Restaurantes', 'Cafeterías', 'Playas', 'Atracciones', 'Familiares', 'Hospitales', 'Empresas', 'Aeropuerto', 'Bar', 'Gym','Galería de Arte', 'Iglesia', 'Acuático'];

const Perfil = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [datos, setDatos] = useState();

  const obtenerNombreCompleto = (nombre, apellido) => {
    if (nombre && apellido) {
      return `${nombre} ${apellido}`;
    } else if (nombre) {
      return nombre;
    } else if (apellido) {
      return apellido;
    } else {
      return "";
    }
  };

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const loggedIn = await isLogged();
        if (!loggedIn.logged) {
          navigate('/login');
          return;
        }
      } catch (error) {
        console.log('El usuario no ha iniciado sesión', error);
        navigate('/login');
      }
    };

    const fetchDatos = async () => {
      try {
        const id = localStorage.getItem('id');
        console.log(id);
        
        const resultado = await handleDatosUsuario(id); // Espera la resolución de la promesa
        
        setDatos(resultado);
        console.log(resultado);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchLoginStatus();
    fetchDatos(); // Llama a la función para obtener los datos
  }, []);

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <NavBarHome
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

    <div className='perfil-usuario-background'>
    </div>
      <Container maxWidth='lg' className='md-4'>
        
        {/* Perfil Usuario Header */}
        <InformacionHeader
          nombreUsuario={datos && datos.username ? datos.username : 'Usuario'}
          itinerariosCreados={'46'}
          favoritos={datos && datos.nFavoritos != undefined && datos.nFavoritos != null ? datos.nFavoritos : '-'}
          deseados={datos && datos.nDeseados != undefined && datos.nDeseados != null ? datos.nDeseados : '-'}
        />    

        { /* Información Personal Usuario */}
        {datos ? (
          <InformacionPersonal
            correoElectronico={datos && datos.correo ? datos.correo : 'uncorreo2@gmail.com'}
            nombreCompleto={obtenerNombreCompleto(datos.nombre, datos.apellido)}
            fechaNacimiento={datos && datos.fechaNacimiento ? datos.fechaNacimiento : '10/10/2024'}
            telefono='+52 4455060396' // ESTA INFORMACIÓN SÓLO ES DE RELLENO HASTA QUE 
            pais='México'             // DEFINAN BIEN QUÉ VAN A PEDIR DE INFORMACIÓN
          />
        ) : (
          // Puedes agregar un mensaje de carga si lo prefieres
          <p>Cargando datos...</p>
        )}        
        { /* Categorías de Interés Usuario */}
        <CategoriasInteres
          categoriasUsuario={categorias}
        />

      </Container>
    

      <Footer
        showIncorporaLugar={false} />
    </ThemeProvider>
  );


};

export default Perfil;
