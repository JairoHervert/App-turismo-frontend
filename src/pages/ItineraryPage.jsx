// componentes online
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Container, Stack, TextField, InputAdornment } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';


// iconos
import CloseIcon from '@mui/icons-material/Close';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import SearchRoundedIcon from '@mui/icons-material/Search';

// componentes locales
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ButtonsMod from '../components/ButtonsMod';
import Planer from '../components/itinerary/Planer';
import PlanRoute from '../components/itinerary/PlanRoute';
import MoreInfoPlace from '../components/itinerary/MoreInfoPlace';

// estilos
import ThemeMaterialUI from '../components/ThemeMaterialUI';

//Funcion de calculo de distancia entre lugares
import { calcularDistanciasYTiempo } from '../pagesHandlers/itinerary-handler';

function ItineraryPage() {
  // Estado global para guardar todo el itinerario
  const [itinerarioCompleto, setItinerarioCompleto] = useState({});
  // Mueve los hooks dentro de la función
  const [distanciasTiempos, setDistanciasTiempos] = useState([]);
  const [lugares, setLugares] = useState([]);
  // Nuevo estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLugares, setFilteredLugares] = useState([]);
  const [idUsuario, setIdUsuario] = useState(null); // Estado para el idUsuario

  useEffect(() => {
    // Obtener el idUsuario desde localStorage
    const idUsuarioLocal = localStorage.getItem('id');
    if (idUsuarioLocal) {
      setIdUsuario(idUsuarioLocal);
      console.log('ID del usuario:', idUsuarioLocal);
    } else {
      console.error('No se encontró el ID del usuario en localStorage');
    }
  }, []);

  useEffect(() => {
    async function obtenerDistancias() {
      if (lugares.length > 1) {
        const lugaresConCoordenadas = lugares.map((lugar) => ({
          nombre: lugar.placeName,
          lat: lugar.latitude,
          lon: lugar.longitude,
        }));

        // Llamada a la función calcularDistanciasYTiempo
        const resultados = await calcularDistanciasYTiempo(lugaresConCoordenadas);
        setDistanciasTiempos(resultados); // Guarda los resultados en el estado
        // Agregar un console.log para verificar los resultados
      //console.log('Resultados de distancias y tiempos:', resultados);
      }
    }

    obtenerDistancias();
  }, [lugares]); // Solo recalcular si los lugares cambian

  // estado para manejar el estado de la pestaña activa, ya sea 'Plan' o 'Ruta'
  const [activeTab, setActiveTab] = useState('Plan');

  // estado para el lugar seleccionado
  const [selectedPlace, setSelectedPlace] = useState(null);

  // estados para manejar el estado del modal de informacion del lugar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Agregar evento de resize al montar el componente
    window.addEventListener('resize', handleResize);

    // Limpiar el evento de resize cuando se desmonte el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  //Checa el estado de los lugares que son modificados por el planer y estos los recibe el componente padre
  useEffect(() => {
    console.log("Lugares actuales recibidos del componente padre:", lugares);
  }, [lugares]);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    if (windowWidth < 1200) {
      setIsModalOpen(true);
    }
  };

  // Filtrar lugares cada vez que cambia el término de búsqueda o los lugares disponibles
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Resetea solo si había lugares filtrados previamente
      if (filteredLugares.length > 0) {
        setFilteredLugares([]);
      }
    } else {
      const filtered = lugares.filter((lugar) =>
        lugar.placeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Solo actualiza si el nuevo filtro es diferente
      if (JSON.stringify(filtered) !== JSON.stringify(filteredLugares)) {
        setFilteredLugares(filtered);
      }
    }
  }, [searchTerm, lugares, filteredLugares]);

  // Manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Estado para controlar el modal del boton de finalizar
  const [openModalFinality, setOpenModalFinality] = useState(false);

  const handleOpenModalFinality = () => {
    setOpenModalFinality(true);
  };
  const handleCloseModalFinality = () => {
    setOpenModalFinality(false);
  };

  // Función para guardar los datos del itinerario desde Planer
  const handleItinerarioUpdate = (nuevoItinerario) => {
    setItinerarioCompleto(nuevoItinerario); // Guarda el itinerario completo
  };

  //Este es la confirmacion de finalizar y aqui se guarda el itinerario actualizado en la base de datos.
  // Confirmar y guardar el itinerario completo
  const handleConfirmFinality = async () => {
    setOpenModalFinality(false); // Cierra el modal

    try {
      // Transformar los datos del itinerario completo
      const lugaresBody = Object.keys(itinerarioCompleto).flatMap((fecha) =>
        itinerarioCompleto[fecha].map((lugar) => ({
          idLugar: lugar.placeId,
          orden: lugar.placeOrden,
          // Convertir la fecha a formato 'YYYY-MM-DD'
          fecha: lugar.placeFecha ? new Date(lugar.placeFecha).toISOString().split('T')[0] : null,
          horaLlegada: lugar.placeTime,
          horaSalida: lugar.placeTime1,
        }))
      );

      console.log('Datos enviados al servidor:', {
        idUsuario: idUsuario,
        idItinerario: 1, //CAMBIAR EL IDITINERARIO
        lugares: lugaresBody,
      });

      // Enviar al backend
      const response = await fetch('http://localhost:3001/api/guardar-itinerario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idUsuario: idUsuario,
          idItinerario: 1, //CAMBIAR EL IDITINERARIO
          lugares: lugaresBody,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        //AQUI AGREGAR LA VENTANA O ALERTA.
        console.log('Itinerario guardado exitosamente:', result);
        navigate('/itinerary');
      } else {
        console.error('Error al guardar el itinerario:', result.error);
        alert('Hubo un error al guardar el itinerario');
      }
    } catch (error) {
      console.error('Error en la solicitud para guardar el itinerario:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  // Función para eliminar un lugar en la base de datos y en el estado local
  const handleDeletePlace = async (idItinerario, idLugar, indexToDelete) => {
    try {
      // Llamada al backend para eliminar el lugar
      const response = await fetch('http://localhost:3001/api/eliminar-lugar', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idItinerario,
          idLugar,
        }),
      });

      if (response.ok) {
        console.log(`Lugar con ID ${idLugar} eliminado exitosamente`);

        // Actualizar el estado local eliminando el lugar
        const updatedLugares = [...lugares]; // Crear una copia de los lugares
        updatedLugares.splice(indexToDelete, 1); // Eliminar el lugar del índice
        setLugares(updatedLugares); // Actualizar el estado
      } else {
        const error = await response.json();
        console.error('Error al eliminar el lugar en el backend:', error);
        alert('Hubo un problema al eliminar el lugar en el servidor');
      }
    } catch (error) {
      console.error('Error en la solicitud al servidor:', error);
      alert('No se pudo conectar con el servidor para eliminar el lugar');
    }
  };

  const navigate = useNavigate();

  const handleRegresarClick = () => {
    navigate('/Categorias-page');
  }

  const handleFinalizarClick = () => {
    navigate('/itinerary');
  }

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Navbar
        showingresa={false}
        showRegistrate={false}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <Container maxWidth='lg' className='my-4'>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems='center' className='mb-4 it_pa-title-search' justifyContent={{ sm: 'space-between' }}>

          {/* Titulo */}
          <Stack direction='row' spacing={1} alignItems='center' className='mb-2'>
            <MapRoundedIcon color='google' fontSize='inhert' sx={{ fontSize: '3rem' }} />
            <Typography variant='h1' className='fw-bold' sx={{ fontSize: '3rem' }}>Itinerario</Typography>
          </Stack>

          {/* Buscador */}
          <TextField
            label='Buscar algun lugar en tu itinerario'
            variant='outlined'
            size='small'
            sx={{ maxWidth: 250 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>  {/* Cierre de Stack que aloja el titulo y el buscador */}


        <Grid container spacing={2} className='it_pa-planer-and-moreinfo-container'>
          {/* Lado izquierdo del itinerario, planer y ruta */}
          <Grid className='it_pa-planer-container'>
            <Card>
              {/* Titulo y botones de pestañas 'Plan' y 'Ruta' */}
              <Box className='mx-4 d-flex flex-column align-items-start'>
                <Typography variant='h3' fontFamily={'poppins'} className='fw-semibold mt-3' sx={{ fontSize: '1.9rem' }}>Plan por día</Typography>

                <Box className='d-flex my-4 gap-4'>
                  <Typography
                    variant='h2'
                    fontFamily={'poppins'}
                    className='fw-normal'
                    sx={{
                      fontSize: '1.4rem',
                      cursor: 'pointer',
                      borderBottom: activeTab === 'Plan' ? '3px solid #e6007e' : 'none',
                    }}
                    onClick={() => setActiveTab('Plan')}
                  >Plan</Typography>

                  <Typography
                    variant='h2'
                    fontFamily={'poppins'}
                    className='fw-normal'
                    sx={{
                      fontSize: '1.4rem',
                      cursor: 'pointer',
                      borderBottom: activeTab === 'Ruta' ? '3px solid #e6007e' : 'none',
                    }}
                    onClick={() => setActiveTab('Ruta')}
                  >Ruta</Typography>

                </Box>
              </Box>  {/* Cierre de Box que aloja el titulo y los botones de pestaña */}

              {/* Renderizado condicional de la pestaña activa */}
              {activeTab === 'Plan' ? (
                <Planer idUsuario={idUsuario} setSelectedPlace={handlePlaceSelect} onSelectPlaces={setLugares} distanciasTiempos={distanciasTiempos} lugaresFiltrados={filteredLugares} onUpdateItinerario={handleItinerarioUpdate} onDeletePlace={handleDeletePlace} />
              ) : (
                <PlanRoute distanciasTiempos={distanciasTiempos}/>
              )}
            </Card>
          </Grid>

          {/* Lado derecho del itinerario, mas informacion del lugar */}
          {windowWidth >= 1200 && (
            <Grid className='it_pa-more-info-container'>
              <MoreInfoPlace place={selectedPlace} />
            </Grid>
          )}

          <Box>
            <Dialog
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <DialogTitle>
                <Typography fontFamily={'poppins'} variant='h6'>
                  Información del Lugar
                </Typography>
                <IconButton
                  aria-label='close'
                  onClick={() => setIsModalOpen(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ maxWidth: '35rem' }}>
                <MoreInfoPlace place={selectedPlace} />
              </DialogContent>
            </Dialog>
          </Box>

        </Grid>

        {/* Botones de regresar y finalizar */}
        <Stack direction='row' sx={{ justifyContent: 'space-between', margin: '30px 0 30px 0' }}>
          <ButtonsMod
            variant='principal'
            textCont='Regresar'
            clickEvent={handleRegresarClick}
          />
          <ButtonsMod
            variant='principal'
            textCont='Finalizar'
            clickEvent={handleOpenModalFinality}
          />
        </Stack>

        {/* Modal de confirmación para "Finalizar" */}
        <Dialog
          open={openModalFinality}
          onClose={handleCloseModalFinality}
          aria-labelledby='finality-dialog-title'
          aria-describedby='finality-dialog-description'
        >
          <DialogTitle id='finality-dialog-title'>
            <Typography fontFamily={'poppins'} className='fw-medium fs-5 text-center'>¿Deseas finalizar tu itinerario?</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='finality-dialog-description'>
              <Typography fontFamily={'poppins'} className='fw-normal text-center'>Confirma si deseas finalizar este itinerario. Podrás consultarlo más tarde en la sección de .</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonsMod
              variant='secundario'
              textCont='Cancelar'
              clickEvent={handleCloseModalFinality}
            />
            <ButtonsMod
              variant='principal'
              textCont='Finalizar'
              // para backend: aqui podrian modificar la funcion para que guarde el itinerario en la bdd o algo asi
              clickEvent={handleConfirmFinality}
            />

          </DialogActions>
        </Dialog>

      </Container> {/* Cierre de Container principal */}
      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  )
}

export default ItineraryPage