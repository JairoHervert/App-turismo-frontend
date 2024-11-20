import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import StarIcon from '@mui/icons-material/StarRateRounded';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CuadroLugar from '../components/deseados/UDCuadroLugar';
import MenuFiltros from '../components/deseados/MenuFiltros';

import { handleDeseados } from '../pagesHandlers/user_handler';
import { isLogged } from '../schemas/isLogged';
import { useNavigate } from 'react-router-dom';
import '../css/DeseadosPage.css';

function DeseadosPage() {
  const navigate = useNavigate(); // Inicializa useNavigate
  // Declara el estado `deseados`
  const [deseados, setDeseados] = useState([]);
  // Datos de prueba, tuve que hacerlo así porque no tengo acceso a la base de datos (no quiero instalar mysql xd)
  const lugares = [
    { nombre: 'Álvaro Obregón', descripcion: 'Descubre el encanto de Álvaro Obregón, donde la vida cultural y los sabores locales se fusionan. Pasea por plazas y callejones llenos de historia.', imagen: 'home-places-alvaro-obregon.jpg', tiempo: '2 hrs', costo: 'Gratis' },
    { nombre: 'Xochimilco', descripcion: 'Sumérgete en la experiencia única de los canales de Xochimilco. Navega en trajineras y disfruta de la tradición y el folclore en un ambiente colorido.', imagen: 'home-places-xochimilco.jpg', tiempo: '3 hrs', costo: 'Gratis' },
    { nombre: 'Pirámides de Teotihuacan', descripcion: 'Vive la majestuosidad de las antiguas pirámides. Sube a la cima del Sol y la Luna para una vista impresionante de este sitio arqueológico.', imagen: 'home-places-piramides-teotihuacan.webp', tiempo: '4 hrs', costo: '200 MXN' },
    { nombre: 'Coyoacán', descripcion: 'Explora las calles empedradas y plazas vibrantes de Coyoacán, un rincón bohemio lleno de cafés, arte y el ambiente acogedor de la Ciudad de México.', imagen: 'home-places-coyoacan.jpg', tiempo: '2:30 hrs', costo: '100 MXN' },
    { nombre: 'Xochimilco (Repetido)', descripcion: 'Recorre los canales de Xochimilco a bordo de una trajinera, disfruta de la música en vivo y degusta platillos tradicionales en un ambiente festivo.', imagen: 'home-places-xochimilco.jpg', tiempo: '3 hrs', costo: 'Gratis' },
    { nombre: 'Álvaro Obregón', descripcion: 'Descubre el encanto de Álvaro Obregón, donde la vida cultural y los sabores locales se fusionan. Pasea por plazas y callejones llenos de historia.', imagen: 'home-places-alvaro-obregon.jpg', tiempo: '2 hrs', costo: 'Gratis' },
    { nombre: 'Xochimilco', descripcion: 'Sumérgete en la experiencia única de los canales de Xochimilco. Navega en trajineras y disfruta de la tradición y el folclore en un ambiente colorido.', imagen: 'home-places-xochimilco.jpg', tiempo: '3 hrs', costo: 'Gratis' },
    { nombre: 'Pirámides de Teotihuacan', descripcion: 'Vive la majestuosidad de las antiguas pirámides. Sube a la cima del Sol y la Luna para una vista impresionante de este sitio arqueológico.', imagen: 'home-places-piramides-teotihuacan.webp', tiempo: '4 hrs', costo: '200 MXN' },
    { nombre: 'Coyoacán', descripcion: 'Explora las calles empedradas y plazas vibrantes de Coyoacán, un rincón bohemio lleno de cafés, arte y el ambiente acogedor de la Ciudad de México.', imagen: 'home-places-coyoacan.jpg', tiempo: '2:30 hrs', costo: '100 MXN' },
    { nombre: 'Xochimilco (Repetido)', descripcion: 'Recorre los canales de Xochimilco a bordo de una trajinera, disfruta de la música en vivo y degusta platillos tradicionales en un ambiente festivo.', imagen: 'home-places-xochimilco.jpg', tiempo: '3 hrs', costo: 'Gratis' },
  ];

  // Estado para manejar la página actual
  const [page, setPage] = useState(1);
  const itemsPorPagina = 3;

  // Calcula los cuadros de lugares a mostrar en la página actual basado en `deseados`
  const startIndex = (page - 1) * itemsPorPagina;
  const currentItems = deseados.slice(startIndex, startIndex + itemsPorPagina);

  // Función para manejar el cambio de página
  const handleChangePage = (e, value) => {
    setPage(value);
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

    const fetchDeseados = async () => {
      try {
        const id = localStorage.getItem('id');
        console.log(id);
        
        const resultado = await handleDeseados(id); // Espera la resolución de la promesa
        setDeseados(resultado);
        console.log(resultado);
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
          </div>
        </div>

        <div className='row'>
        <div className='col-12 col-xl-9'>
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((lugar, index) => (
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
          <Box className='d-flex justify-content-center mt-4 mb-4'>
            <Stack spacing={2} className='d-flex justify-content-center'>
              <Pagination 
                count={Math.ceil(deseados.length / itemsPorPagina)} 
                page={page} 
                onChange={handleChangePage} 
                color='secondary' 
              />
            </Stack>
          </Box>

          
            {/*{currentItems.map((lugar, index) => (
              <CuadroLugar
                key={index}
                nombreLugar={lugar.nombre}
                descripcionLugar={lugar.descripcion}
                imagenLugar={lugar.imagen}
                tiempoLugar={lugar.tiempo}
                costoLugar={lugar.costo}
              />
            ))}

            <Box className='d-flex justify-content-center mt-4 mb-4'>
              <Stack spacing={2} className='d-flex justify-content-center'>
                <Pagination 
                  count={Math.ceil(lugares.length / itemsPorPagina)} 
                  page={page} 
                  onChange={handleChangePage} 
                  color='secondary' 
                />
              </Stack>
            </Box>*/}
          
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
        </div>
      </div>

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  );
}

export default DeseadosPage;
