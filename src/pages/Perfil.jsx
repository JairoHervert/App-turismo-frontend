import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

import { handleDatosUsuario } from '../pagesHandlers/user_handler';
import { isLogged } from '../schemas/isLogged';

const categorias = ['Deportes', 'Comida Rápida', 'Restaurante', 'Cafetería', 'Bar', 'Arte', 'Historia', 'Museos', 'Educativos', 'Compras', 'Parques', 'Juegos recreativos al aire libre', 'Juegos recreativos bajo techo', 'Zoológicos', 'Religión'];

const Perfil = () => {
  console.log("PERFIL.JSX")
  const navigate = useNavigate(); // Inicializa useNavigate
  const [datos, setDatos] = useState(null);
  const [profileImage, setProfileImage] = useState('https://upload.wikimedia.org/wikipedia/commons/4/41/Siberischer_tiger_de_edit02.jpg');

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
        if(!resultado)
          navigate('/');
        setDatos(resultado);
        setProfileImage(resultado.imagen);
        console.log("Resultado consulta", resultado);
        console.log("Resultado imagen", resultado.imagen);
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
          nombreUsuario={datos && datos.username ? datos.username : 'Usuario'}
          /* Si el usuario ya cuenta con una imagen para el avatar (ya sea porque
            inicio sesión con fb o google), se le puede mandar como parámetro la
            imagen */
          avatar={profileImage}
          /* Si no cuenta con foto de perfil, su avatar sería un fondo genérico y 
             la primera letra de su nombre de usuario */
          //avatar={null}
          itinerariosCreados={'-'}
          favoritos={datos && datos.nFavoritos != undefined && datos.nFavoritos != null ? datos.nFavoritos : '-'}
          deseados={datos && datos.nDeseados != undefined && datos.nDeseados != null ? datos.nDeseados : '-'}
        />

        { /* Información Personal Usuario */}
        {datos ? (
          <InformacionPersonal
          correoElectronico={datos && datos.correo ? datos.correo : 'uncorreo2@gmail.com'}
          nombre={datos && datos.nombre ? datos.nombre : 'Sin especificar'}
          apellido={datos && datos.apellido ? datos.apellido : 'Sin especificar'}
          fechaNacimiento={datos && datos.fechaNacimiento ? datos.fechaNacimiento : 'Sin especificar'}
        />

        ):(
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
