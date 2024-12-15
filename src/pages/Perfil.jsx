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
import categorias from '../components/preferencias/CategoriasPref';

import { handleDatosUsuario, handleTodasCategoriasUsuario } from '../pagesHandlers/user_handler';
import { isLogged } from '../schemas/isLogged';

const Perfil = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [datos, setDatos] = useState(null);
  const [profileImage, setProfileImage] = useState('https://upload.wikimedia.org/wikipedia/commons/4/41/Siberischer_tiger_de_edit02.jpg');
  const [categoriasInteres, setCategorias] = useState([]);

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
        let id = localStorage.getItem('id');
        
        const resultado = await handleDatosUsuario(id); // Espera la resolución de la promesa
        if(!resultado)
          navigate('/');
        let datos = {};
        datos.id = id;
        datos.correo = resultado.correo;
        datos.nombre = resultado.nombre;
        datos.apellido = resultado.apellido;
        datos.imagen = resultado.imagen;
        datos.sexo = resultado.sexo;
        datos.preferenciaAlimenticia = resultado.preferenciaAlimenticia;
        datos.requiereAccesibilidad = resultado.requiereAccesibilidad;

        // Convertir la cadena a un objeto Date
        const fecha = new Date(resultado.fechaNacimiento);
        // Formatear a DD-MM-YYYY
        const dia = String(fecha.getDate()).padStart(2, '0'); // Asegurar 2 dígitos
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
        const anio = fecha.getFullYear();
        // Combinar el formato
        const fechaFormateada = `${dia}-${mes}-${anio}`;
        datos.fechaNacimiento = fechaFormateada;

        datos.nDeseados = resultado.nDeseados;
        datos.nFavoritos = resultado.nFavoritos;
        datos.nItinerarios = resultado.nItinerarios;

        setDatos(datos);
        setProfileImage(datos.imagen);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const id = localStorage.getItem('id');

        const resultado = await handleTodasCategoriasUsuario(id);
        if(!resultado)
          navigate('/');
        
        setCategorias(resultado);
      } catch (error) {
        console.error('Error al obtener las categorías del usuario: ', error)
      }
    }

    fetchLoginStatus();
    fetchDatos();
    fetchCategorias();
  }, []);

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <NavBarHome
        showingresa={true}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false} />

      <Box className='perfil-usuario-background'></Box>
      <Container maxWidth='lg' className='md-4' sx={{ minHeight: '80vh' }}>

        {/* Perfil Usuario Header */}
        <InformacionHeader
          idUsuario={datos && datos.id ? datos.id : null}
          nombreUsuario={datos && datos.username ? datos.username : 'Usuario'}
          nom={datos && datos.nombre ? datos.nombre : ''}
          ape={datos && datos.apellido ? datos.apellido : ''}
          correo={datos && datos.correo ? datos.correo : ''}
          /* Si el usuario ya cuenta con una imagen para el avatar (ya sea porque
            inicio sesión con fb o google), se le puede mandar como parámetro la
            imagen */
          avatar={profileImage}
          /* Si no cuenta con foto de perfil, su avatar sería un fondo genérico y 
             la primera letra de su nombre de usuario */
          //avatar={null}
          itinerariosCreados={datos && datos.nItinerarios !== undefined && datos.nItinerarios !== null ? datos.nItinerarios : '-'}
          favoritos={datos && datos.nFavoritos !== undefined && datos.nFavoritos !== null ? datos.nFavoritos : '-'}
          deseados={datos && datos.nDeseados !== undefined && datos.nDeseados !== null ? datos.nDeseados : '-'}
        />

        { /* Información Personal Usuario */}
        {datos ? (
          <InformacionPersonal
            id={datos && datos.id ? datos.id : ''}
            correoElectronico={datos && datos.correo ? datos.correo : 'uncorreo2@gmail.com'}
            nombre={datos && datos.nombre ? datos.nombre : 'Sin especificar'}
            apellido={datos && datos.apellido ? datos.apellido : 'Sin especificar'}
            fechaNacimiento={datos && datos.fechaNacimiento ? datos.fechaNacimiento : 'Sin especificar'}
            genero={datos && datos.sexo ? datos.sexo : 'Sin especificar'}
            preferenciaAlimenticia={datos && datos.preferenciaAlimenticia ? datos.preferenciaAlimenticia : 'Sin especificar'}
            discapacidadMotriz={datos && datos.requiereAccesibilidad ? datos.requiereAccesibilidad : 'Sin especificar'}
          />

        ):(
          <p>Cargando datos...</p>
        )}
        { /* Categorías de Interés Usuario */}
        <CategoriasInteres
          idUsuario={ datos && datos.id ? datos.id : null }
          categoriasUsuario={ categoriasInteres }
        />

      </Container>


      <Footer
        showIncorporaLugar={false} />
    </ThemeProvider>
  );


};

export default Perfil;
