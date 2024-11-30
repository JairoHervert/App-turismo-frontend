import React from 'react';
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

const Perfil = () => {

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
          categoriasUsuario={ categorias }
        />

      </Container>


      <Footer
        showIncorporaLugar={false} />
    </ThemeProvider>
  );


};

export default Perfil;
