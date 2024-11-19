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


const categorias = ['Parques', 'Museos', 'Restaurantes', 'Cafeterías', 'Playas', 'Atracciones', 'Familiares', 'Hospitales', 'Empresas', 'Aeropuerto', 'Bar', 'Gym','Galería de Arte', 'Iglesia', 'Acuático'];

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
          nombreUsuario='juan-molina'
          itinerariosCreados='46'
          favoritos='0'
          deseados='23'
        />    

        { /* Información Personal Usuario */}
        <InformacionPersonal
          correoElectronico='uncorreo@gmail.com'
          nombreCompleto='César Peso Pluma'
          fechaNacimiento='10/10/2024'
          telefono='+52 4455060396' // ESTA INFORMACIÓN SÓLO ES DE RELLENO HASTA QUE 
          pais='México'             // DEFINAN BIEN QUÉ VAN A PEDIR DE INFORMACIÓN
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
