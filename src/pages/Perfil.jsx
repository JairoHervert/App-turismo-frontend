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
import { Box } from '@mui/system';


const categorias = ['Deportes', 'Comida Rápida', 'Restaurante', 'Cafetería', 'Bar', 'Arte', 'Historia', 'Museos', 'Educativos', 'Compras', 'Parques', 'Juegos recreativos al aire libre', 'Juegos recreativos bajo techo', 'Zoológicos', 'Religión'];

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

      <Box className='perfil-usuario-background'></Box>
      <Container maxWidth='lg' className='md-4'>

        {/* Perfil Usuario Header */}
        <InformacionHeader
          nombreUsuario='paola_reyes'
          /* Si el usuario ya cuenta con una imagen para el avatar (ya sea porque
            inicio sesión con fb o google), se le puede mandar como parámetro la
            imagen */
          avatar='https://upload.wikimedia.org/wikipedia/commons/4/41/Siberischer_tiger_de_edit02.jpg'
          /* Si no cuenta con foto de perfil, su avatar sería un fondo genérico y 
             la primera letra de su nombre de usuario */
          //avatar={null}
          itinerariosCreados='46'
          favoritos='0'
          deseados='23'
        />

        { /* Información Personal Usuario */}
        <InformacionPersonal
          correoElectronico='uncorreo@gmail.com'
          nombre=''
          apellido=''
          fechaNacimiento={null}
        />

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
