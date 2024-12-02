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
        
        const resultado = await handleDatosUsuario(id); // Espera la resolución de la promesa
        if(!resultado)
          navigate('/');
        let datos = resultado;
        datos.id = id;
        // Convertir la cadena a un objeto Date
        const fecha = new Date(datos.fechaNacimiento);

        // Formatear a DD-MM-YYYY
        const dia = String(fecha.getDate()).padStart(2, '0'); // Asegurar 2 dígitos
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
        const anio = fecha.getFullYear();

        // Combinar el formato
        const fechaFormateada = `${dia}-${mes}-${anio}`;
        datos.fechaNacimiento = fechaFormateada;
        setDatos(datos);
        setProfileImage(datos.imagen);
        console.log("Resultado consulta", datos);
        console.log("Resultado imagen", datos.imagen);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchLoginStatus();
    fetchDatos(); // Llama a la función para obtener los datos
  }, []);

  const categorias = [
    {
      id: 1,
      nombre: 'Deportes',
      subcategorias: [
        { id: 101, nombre: 'Arena' },
        { id: 102, nombre: 'Athletic Field' },
        { id: 103, nombre: 'Golf Course' },
        { id: 104, nombre: 'Ice Skating Rink' },
        { id: 105, nombre: 'Sports Club' },
        { id: 106, nombre: 'Playground' },
        { id: 107, nombre: 'Sports Activity Location' },
        { id: 108, nombre: 'Swimming Pool' },
      ],
    },
    {
      id: 2,
      nombre: 'Comida Rápida',
      subcategorias: [
        { id: 201, nombre: 'Bagel Shop' },
        { id: 202, nombre: 'Acai Shop' },
        { id: 203, nombre: 'Bakery' },
        { id: 204, nombre: 'Fast Food Restaurant' },
        { id: 205, nombre: 'Ice Cream Shop' },
      ],
    },
    {
      id: 3,
      nombre: 'Historia',
      subcategorias: [
        { id: 301, nombre: 'Historical Place' },
        { id: 302, nombre: 'Monument' },
        { id: 303, nombre: 'Historial Landmark' },
      ],
    },
  ];


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
          itinerariosCreados={datos && datos.nItinerarios != undefined && datos.nItinerarios != null ? datos.nItinerarios : '-'}
          favoritos={datos && datos.nFavoritos != undefined && datos.nFavoritos != null ? datos.nFavoritos : '-'}
          deseados={datos && datos.nDeseados != undefined && datos.nDeseados != null ? datos.nDeseados : '-'}
        />

        { /* Información Personal Usuario */}
        {datos ? (
          <InformacionPersonal
          id={datos && datos.id ? datos.id : ''}
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
          categoriasUsuario={ categorias }
        />

      </Container>


      <Footer
        showIncorporaLugar={false} />
    </ThemeProvider>
  );


};

export default Perfil;
