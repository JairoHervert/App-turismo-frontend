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


const categorias = ['Deportes', 'Comida Rápida', 'Restaurante', 'Cafetería', 'Bar', 'Arte', 'Historia', 'Museos', 'Educativos', 'Compras', 'Parques', 'Juegos recreativos al aire libre','Juegos recreativos bajo techo', 'Zoológicos', 'Religión'];

const Perfil = () => {

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
