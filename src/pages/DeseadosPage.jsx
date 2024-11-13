import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import StarIcon from '@mui/icons-material/StarRateRounded';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import CuadroLugar from '../components/deseados/UDCuadroLugar';
import MenuFiltros from '../components/deseados/MenuFiltros';

import { handleDeseados } from '../pagesHandlers/user_handler';
import { useEffect, useState } from 'react';
import { isLogged } from '../schemas/isLogged';
import { useNavigate } from 'react-router-dom';
import '../css/DeseadosPage.css';

function DeseadosPage() {
  //const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [deseados, setDeseados] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

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
        navigate('./login');
      }
    };

    const fetchDeseados = async () => {
      try {
        const id = localStorage.getItem('id');
        console.log(id);
        
        const resultado = await handleDeseados(id); // Espera la resolución de la promesa
        setDeseados(resultado);
        console.log(deseados);
      } catch (error) {
        console.error('Error al obtener lugares deseados:', error);
      }
    };

    fetchLoginStatus();
    fetchDeseados(); // Llama a la función para obtener los datos
  }, []);

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Navbar
        showingresa={false}
        showRegistrate={false}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <div className='us_de-container my-4'>
        <div className='d-flex justify-content-between align-items-center us_de-titulo-buscador'>
          <div className='d-flex justify-content-between align-items-center'>
            <StarIcon color='yellow' fontSize='inhert' className='us_de-icono-estrella mb-4 me-2'/>
            <h1 className='fw-bolder fontMontserrat mb-4 us_de-deseados-text'>Deseados</h1>
          </div>
          <div className='us_de-cont-buscador-filtro'>
            <TextField 
              label="Buscar en deseados" 
              variant="outlined" 
              size="small" 
              sx={{ maxWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Botón de filtro, visible solo en pantallas chicas */}
            <div className='d-xl-none us_de-contenedor-filtro'>
              <button type='button' className='btn us_de-button-agregar' data-bs-toggle='modal' data-bs-target='#us_de-filtros-busqueda'>
                <i className='bi bi-funnel-fill us_de-icono me-2'></i><span className='fw-semibold'>Filtros</span>
              </button>
            </div>

            {/* Modal de filtro */}
            <div className='modal fade' id='us_de-filtros-busqueda' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>Filtros de búsqueda</h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className='modal-body'>
                    <MenuFiltros
                      modal={true} />
                  </div>
                  <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>
                    <button type='button' className='btn btn-primary'>Aplicar</button>
                  </div>
                </div>
              </div>
            </div>
          </div> {/* fin-row-grid */}
        </div> {/* fin-titulo_y_buscador */}

        <div className='row'>
          <div id='contenedorDeseados' className='col-12 col-xl-9 us_de-scrollable-column'>
            {deseados && deseados.length > 0 ? (
              deseados.map((lugar, index) => (
                <CuadroLugar
                  key={index} // Usa un identificador único si está disponible, por ejemplo, 'lugar.id'
                  idLugar={lugar.id}
                  nombreLugar={lugar.nombre}
                  descripcionLugar={lugar.descripcion}
                  imagenLugar={lugar.imagen}
                  tiempoLugar={lugar.tiempo}
                  costoLugar={lugar.costo}
                />
              ))
            ) : (
              <p>No se encontraron lugares deseados.</p>
            )}
            {/*<CuadroLugar
              nombreLugar='Álvaro Obregón'
              descripcionLugar='Descubre el encanto de Álvaro Obregón, donde la vida cultural y los sabores locales se fusionan. Pasea por plazas y callejones llenos de historia.'
              imagenLugar='home-places-alvaro-obregon.jpg'
              tiempoLugar='2 hrs'
              costoLugar='Gratis' />

            <CuadroLugar
              nombreLugar='Xochimilco'
              descripcionLugar='Sumérgete en la experiencia única de los canales de Xochimilco. Navega en trajineras y disfruta de la tradición y el folclore en un ambiente colorido.'
              imagenLugar='home-places-xochimilco.jpg'
              tiempoLugar='3 hrs'
              costoLugar='Gratis' />

            <CuadroLugar
              nombreLugar='Pirámides de Teotihuacan'
              descripcionLugar='Vive la majestuosidad de las antiguas pirámides. Sube a la cima del Sol y la Luna para una vista impresionante de este sitio arqueológico.'
              imagenLugar='home-places-piramides-teotihuacan.webp'
              tiempoLugar='4 hrs'
              costoLugar='200 MXN' />

            <CuadroLugar
              nombreLugar='Coyoacán'
              descripcionLugar='Explora las calles empedradas y plazas vibrantes de Coyoacán, un rincón bohemio lleno de cafés, arte y el ambiente acogedor de la Ciudad de México.'
              imagenLugar='home-places-coyoacan.jpg'
              tiempoLugar='2:30 hrs'
              costoLugar='100 MXN' />

            <CuadroLugar
              nombreLugar='Xochimilco'
              descripcionLugar='Recorre los canales de Xochimilco a bordo de una trajinera, disfruta de la música en vivo y degusta platillos tradicionales en un ambiente festivo.'
              imagenLugar='home-places-xochimilco.jpg'
              tiempoLugar='3 hrs'
              costoLugar='Gratis' />
              */}
          </div>
          <div className='col-12 col-lg-3 d-flex flex-column align-items-center d-none d-xl-block'>
            <div className='us_de-contenedor-filtros my-4 d-flex flex-column justify-content-center align-items-center'>
              <h2 className='fs-2 fw-semibold mt-2 fontMontserrat'>Filtros de búsqueda</h2>
              <MenuFiltros modal={false} />
            </div>

            <div>
              <button type='button' className='btn us_de-button-agregar fw-medium'>
                <i className='bi bi-person-heart us_de-icono me-2 fs-5'></i>
                Agregar rápidamente
              </button>
            </div>
          </div>
        </div> {/* fin-row-grid */}
      </div> {/* fin-container */}

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  );
}

export default DeseadosPage;
