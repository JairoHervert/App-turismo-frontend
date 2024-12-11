import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import StarIcon from '@mui/icons-material/StarRateRounded';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
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
import grillo from '../img/grillo.png';

function DeseadosPage() {
  const navigate = useNavigate();
  const [deseados, setDeseados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlcaldias, setSelectedAlcaldias] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPorPagina = 3;

  const startIndex = (page - 1) * itemsPorPagina;

  const obtenerDeseadosFiltrados = () => {
    const term = searchTerm.toLowerCase();
    return deseados.filter((lugar) =>
      (lugar.nombre.toLowerCase().includes(term) ||
        (lugar.descripcion && lugar.descripcion.toLowerCase().includes(term))) &&
      (selectedAlcaldias.length === 0 || selectedAlcaldias.some((alcaldia) => lugar.direccion.includes(alcaldia)))
    );
  };

  const currentItems = obtenerDeseadosFiltrados().slice(startIndex, startIndex + itemsPorPagina);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const handleFilterChange = (newAlcaldias) => {
    setSelectedAlcaldias(newAlcaldias);
    setPage(1);
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
        const resultado = await handleDeseados(id);
        setDeseados(resultado);
      } catch (error) {
        console.error('Error al obtener lugares deseados:', error);
      }
    };

    fetchLoginStatus();
    fetchDeseados();
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

      <div className="us_de-container my-4">
        <div className="d-flex justify-content-between align-items-center us_de-titulo-buscador">
          <div className="d-flex justify-content-between align-items-center">
            <StarIcon color="yellow" fontSize="inhert" className="us_de-icono-estrella mb-4 me-2" />
            <h1 className="fw-bolder fontMontserrat mb-4 us_de-deseados-text">Deseados</h1>
          </div>
          <div className="us_de-cont-buscador-filtro">
            <TextField
              label="Buscar en deseados"
              variant="outlined"
              size="small"
              sx={{ maxWidth: 250 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-9">
            {currentItems && currentItems.length > 0 ? (
              currentItems.map((lugar, index) => (
                <CuadroLugar
                  key={index}
                  idLugar={lugar.id}
                  nombreLugar={lugar.nombre}
                  descripcionLugar={lugar.descripcion}
                  imagenLugar={lugar.imagen}
                  tiempoLugar={lugar.tiempo}
                  costoLugar={lugar.costo}
                />
              ))
            ) : (
              <Box
                className='d-flex justify-content-center align-items-center flex-column'
                sx={{ minHeight: '50vh' }}
              >
                <Typography
                  className='fw-medium text-center'
                  sx={{ fontSize: '2rem', fontFamily: 'poppins', mb: 2 }}
                >
                  No tienes lugares en tu lista de deseados
                </Typography>
                <Box
                  component='img'
                  src={grillo}
                  alt='Grillo'
                  sx={{
                    width: '10rem', // Ajusta el ancho
                    height: 'auto', // Mantén la proporción
                  }}
                />
              </Box>
            )}
            <Box className="d-flex justify-content-center mt-4 mb-4">
              <Stack spacing={2} className="d-flex justify-content-center">
                <Pagination
                  count={Math.ceil(obtenerDeseadosFiltrados().length / itemsPorPagina)}
                  page={page}
                  onChange={handleChangePage}
                  color="secondary"
                />
              </Stack>
            </Box>

          </div>
          <div className='col-12 col-lg-3 d-flex flex-column align-items-center d-none d-xl-block'>
            <div className='us_de-contenedor-filtros my-4 d-flex flex-column justify-content-center align-items-center'>
              <h2 className='fs-2 fw-semibold mt-2 fontMontserrat'>Filtros de búsqueda</h2>
              <MenuFiltros modal={false} selectedAlcaldias={selectedAlcaldias} onFilterChange={handleFilterChange} />
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
