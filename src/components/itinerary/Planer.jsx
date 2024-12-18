// componentes online
import { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// timeline
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import { timelineOppositeContentClasses, } from '@mui/lab/TimelineOppositeContent';

// datePicker
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// iconos
import { KeyboardArrowLeftRounded as LeftRow, KeyboardArrowRightRounded as RightRow } from '@mui/icons-material';

// drag and drop (para arrastrar los elementos del itinerario y reordenarlos)
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortablePlaceItem from './SortablePlaceItem';

// estilos
import ThemeMaterialUI from '../ThemeMaterialUI';
import '../../css/ItineraryPage.css';

//Handler fotos y distancias API
import { handleFotosLugar } from '../../pagesHandlers/place-handler';

// itinerario de prueba (puede cambiarse a Itinerario1 o Itinerario3)
//import itinerario from './ItinerariosDePrueba/Itinerario2';

//botón
import ButtonsMod from '../ButtonsMod';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AlertDialog from './AddPlaces'; // Adjust the path as necessary


import Recomendados from './Recomendados';


function Planer({ idUsuario, setSelectedPlace, onSelectPlaces = () => {}, onUpdateItinerario = () => {}, distanciasTiempos, lugaresFiltrados = [], onUpdateDistanciasTiempos, onDeletePlace, idItinerario }) {
  const [calculated, setCalculated] = useState(false);
  const [lastDistances, setLastDistances] = useState(null);
  // arrays para el formato de la fecha
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // Encontrar el lunes de la semana actual mediante una funcion
  const searchMonday = (date) => {
    let day = dayjs(date);
    if (day.day() !== 1) {
      day = day.subtract(day.day() === 0 ? 6 : day.day() - 1, 'day');
    }
    return day;
  };

  const today = dayjs();
  const initialMonday = searchMonday(today);

  // state para la fecha del lunes de la semana
  const [monday, setMonday] = useState(initialMonday);
  const todayFormatted = today.format('DD-MM-YYYY');

  // Estado del itinerario
  const [itinerario, setItinerary] = useState({});

  // state para el dia seleccionado en la barra de dias
  //const initialSelectedDay = itinerario[todayFormatted] ? todayFormatted : Object.keys(itinerario)[0];
  const [selectedDay, setSelectedDay] = useState(todayFormatted);
  //console.log('selectedDay: ' + selectedDay);

  // Actualiza la semana mostrada según el día seleccionado
  useEffect(() => {
    setMonday(searchMonday(dayjs(selectedDay, 'DD-MM-YYYY')));
  }, [selectedDay]);

  // Obtener y transformar los datos de la base de datos
  useEffect(() => {
    const fetchItinerary = async () => {
      const idUsuarioLocal = idUsuario || localStorage.getItem('id');
      if (!idUsuarioLocal) {
        console.error('idUsuario no fue proporcionado y no se encontró en localStorage Planer.');
        return;
      }
  
      //console.log('El ID del usuario en el Planer.jsx es: ', idUsuarioLocal);
      try {
        //CAMBIAR EL IDITINERARIO PARA QUE SEA DE MANERA DINAMICA
        const response = await fetch(`http://localhost:3001/api/itinerario?idUsuario=${idUsuarioLocal}&idItinerario=${idItinerario}`);
        const data = await response.json();

        // Transformar los datos al formato esperado
          const transformedItinerary = {};

          for (const place of data) {
          //console.log('Datos del lugar:', place); // Aquí imprimimos los datos de cada lugar antes de procesarlos
          //alert(`Datos del lugar: ${JSON.stringify(place)}`);
          //console.log('Fecha enviada por lugar es:', place.fecha);
          console.log('El orden del lugar: ',place.nombre,' es ',place.orden);
          //console.log('Hora de llegada para el lugar ',place.nombre,' es: ',place.horaLlegada);
          //console.log('Hora de llegada para el lugar ',place.nombre,' es: ',place.horaSalida);
          const dateKey = place.fecha ? dayjs(place.fecha).format('DD-MM-YYYY') : 'NA'; // Usa 'sin-fecha' si no hay fecha
          //console.log('Fecha original en place.fecha:', dateKey);
          if (!transformedItinerary[dateKey]) {
            transformedItinerary[dateKey] = [];
          }

          // Parsear regularOpeningHours y buscar horas según el día
          let openHour = '00:00 am';
          let closeHour = '00:00 pm';

          if (place.regularOpeningHours) {
            //console.log('RegularOpeningHours encontrado:', place.regularOpeningHours);
            try {
              // Parsear el JSON de regularOpeningHours
              const openingHours = JSON.parse(place.regularOpeningHours);
              //console.log('Opening hours (parseado):', openingHours);
          
              if (openingHours.periods) {
                // Parsear la fecha de place.fecha para obtener el día de la semana
                const selectedDate = dayjs(dateKey, 'DD-MM-YYYY');
                //console.log('Fecha convertida con dayjs:', selectedDate.format('DD-MM-YYYY'));
                const dayOfWeek = selectedDate.day(); // Obtiene el día de la semana (0: domingo, ..., 6: sábado)
                //console.log('Fecha seleccionada:', dateKey);
                //console.log('Día de la semana:', dayOfWeek);
          
                // Buscar el periodo correspondiente al día de la semana
                const periodForDay = openingHours.periods.find(
                  (period) => period.open.day === dayOfWeek
                );
                //console.log('Periodo para el día seleccionado:', periodForDay);
          
                if (periodForDay) {
                  // Formatear horas de apertura y cierre en el formato deseado
                  openHour = `${(periodForDay.open.hour % 12 || 12)}:${periodForDay.open.minute
                    .toString()
                    .padStart(2, '0')} ${periodForDay.open.hour < 12 ? 'am' : 'pm'}`;
          
                  closeHour = `${(periodForDay.close.hour % 12 || 12)}:${periodForDay.close.minute
                    .toString()
                    .padStart(2, '0')} ${periodForDay.close.hour < 12 ? 'am' : 'pm'}`;
                  //console.log('Horario formateado de apertura:', openHour);
                  //console.log('Horario formateado de cierre:', closeHour);
                } else {
                  console.warn(`No se encontró un periodo para el día ${dayOfWeek} en place.fecha ${dateKey}`);
                }
              } else {
                console.warn('No se encontraron periodos en regularOpeningHours:', openingHours);
              }
            } catch (error) {
              console.error('Error al parsear regularOpeningHours:', error);
            }
          } else {
            console.warn('No se encontró regularOpeningHours para el lugar:', place);
          }

  
          // Fetch de las imágenes del lugar
          let placeImages = [];
          try {
            const resultado = await handleFotosLugar(place.idLugar); // Espera la resolución de la promesa
            placeImages = resultado.map((element) => `http://localhost:3000/fotosLugares/${element.URL}`);
          } catch (error) {
            console.error('Error al obtener foto del lugar', error);
            placeImages = ['https://www.dondeir.com/wp-content/uploads/2021/03/bibliotecas-mexico.jpg']; // Imagen predeterminada en caso de error
          }
          

          //console.log(`Imágenes para el lugar ${place.idLugar}:`, placeImages);

          // Parsear subcategorías
          const placeSubcategories = place.subcategorias 
          ? place.subcategorias.split(/,\s*/).slice(0, 3) // Toma solo las primeras 3 subcategorías
          : [];

          //console.log('Subcategorías procesadas:', placeSubcategories);
          //console.log('ANTES DE TRANSFORMAR ITINERARIO Hora de llegada para', place.nombre, ':', place.horaLlegada);
          console.log('FECHA DEL LUGAR ES', place.fecha);

          transformedItinerary[dateKey].push({
            placeTime: place.horaLlegada 
            ? place.horaLlegada.slice(0, 5) // Toma solo los primeros 5 caracteres (HH:MM)
            : `${10 + transformedItinerary[dateKey].length}:00`, // Genera una hora genérica si no está disponible
            placeTime1: place.horaSalida.slice(0, 5),
            placeFecha: place.fecha,
            placeId: place.idLugar,
            placeName: place.nombre || 'Sin nombre',
            placeDescription: place.descripcion || 'Sin descripción',
            placeLongDescription: place.descripcion || 'Sin descripción',
            placeThings: placeSubcategories,
            //placeThings: JSON.parse(place.tipos || '[]'), // Parsear tipos si están en formato JSON
            placeOpenHour: openHour || '00:00 am', // Hora genérica si no está disponible
            placeCloseHour: closeHour || '00:00 pm',
            placeOrden: transformedItinerary[dateKey].length + 1,
            //placeOrden: place.orden || transformedItinerary[dateKey].length + 1,
            latitude: place.latitud || 0,
            longitude: place.longitud || 0,
            placeAddress: place.direccion || 'Sin dirección',
            placePhone: place.teléfono || 'Sin teléfono',
            placeImages: placeImages, // Ruta para imágenes
            placeRating: parseFloat(place.rating) || 0,
            finalItem: false, // El último elemento en el array será marcado como `true`
          });
        }

        // Encuentra la primera fecha del itinerario disponible
        const firstDay = Object.keys(transformedItinerary).sort((a, b) => 
          dayjs(a, 'DD-MM-YYYY').isBefore(dayjs(b, 'DD-MM-YYYY')) ? -1 : 1
        )[0];

        setItinerary(transformedItinerary);
        setSelectedDay(firstDay); // Establece el primer día del itinerario como seleccionado
      } catch (error) {
        console.error('Error al obtener los datos del itinerario:', error);
      }
    };

    fetchItinerary();
  }, [idUsuario]);

  // como el itinerario es un objeto, se debe extraer el array de lugares del día seleccionado, se usa para el drag and drop
  const [itineraryItems, setItineraryItems] = useState([]);

  // Efecto para actualizar el itinerario cuando cambia el día seleccionado
  useEffect(() => {
    const currentDayItems = itinerario[selectedDay] || [];
  
    if (lugaresFiltrados.length > 0) {
      const filteredItems = currentDayItems.filter((item) =>
        lugaresFiltrados.some((filtered) => filtered.placeName === item.placeName)
      );
      if (JSON.stringify(filteredItems) !== JSON.stringify(itineraryItems)) {
        setItineraryItems(filteredItems);
      }
    } else {
      if (JSON.stringify(currentDayItems) !== JSON.stringify(itineraryItems)) {
        setItineraryItems(currentDayItems);
      }
    }
  }, [selectedDay, itinerario, lugaresFiltrados, itineraryItems]); 

  // Restablecer el cálculo al cambiar de día
  useEffect(() => {
    setCalculated(false); // Permite recalcular las horas al cambiar de día
    console.log(`Cambio al día: ${selectedDay}`);
  }, [selectedDay]);

  useEffect(() => {
    if (JSON.stringify(itineraryItems) !== JSON.stringify(lugaresFiltrados)) {
      onSelectPlaces(itineraryItems); // Enviar lugares al componente padre
    }
  }, [itineraryItems, onSelectPlaces, lugaresFiltrados]);

  useEffect(() => {
    console.log('distanciasTiempos:', distanciasTiempos);
  }, [distanciasTiempos]);

  //Convertir distanciatiempos en minutos, ya que puede dar horas

  const convertirATiempoEnMinutos = (tiempo) => {
    if (!tiempo || typeof tiempo !== 'string') {
      console.warn('Valor inesperado para tiempo:', tiempo); // Opcional: Ayuda a depurar
      return 0; // Si tiempo no es válido, devolvemos 0 minutos
    }
    
    // Expresión regular para capturar horas y minutos
    const horasMatch = tiempo.match(/(\d+)\s*hour[s]?/);   // Captura las horas
    const minutosMatch = tiempo.match(/(\d+)\s*min[s]?/);  // Captura los minutos
  
    // Si encuentra coincidencias, convierte a números, si no, asigna 0
    const horas = horasMatch ? parseInt(horasMatch[1], 10) : 0;
    const minutos = minutosMatch ? parseInt(minutosMatch[1], 10) : 0;
  
    return horas * 60 + minutos; // Retorna el tiempo total en minutos
  };  

  //Cálculo de la hora de salida de cada lugar

  // Función para calcular las horas de salida
  
  const calculateDepartureTimes = useCallback(() => {
    if (distanciasTiempos.length > 0 && itineraryItems.length > 1) {
      const updatedItinerary = [...itineraryItems];
      let hasChanges = false;
  
      // Hora base inicial para el primer lugar
      let currentTime = dayjs(itineraryItems[0]?.placeTime || "10:00", "HH:mm"); // Hora inicial del primer lugar
  
      for (let i = 0; i < updatedItinerary.length; i++) {
        const currentPlace = updatedItinerary[i];
        const tiempoTraslado = i > 0 ? convertirATiempoEnMinutos(distanciasTiempos[i - 1]?.tiempo) : 0;
        // Calcular hora de llegada basada en la hora de salida del lugar anterior y tiempo de traslado
        const newPlaceTime = i === 0 ? currentTime : currentTime.add(tiempoTraslado, "minute");
  
        // Calcular hora de salida basada en hora de llegada y tiempo de estancia
        const newPlaceTime1 = newPlaceTime.add(2, "hour"); // Estancia fija de 2 horas, ajustable
  
        // Actualizar los tiempos si hay cambios
        if (
          currentPlace.placeTime !== newPlaceTime.format("HH:mm") ||
          currentPlace.placeTime1 !== newPlaceTime1.format("HH:mm")
        ) {
          currentPlace.placeTime = newPlaceTime.format("HH:mm");
          currentPlace.placeTime1 = newPlaceTime1.format("HH:mm");
          hasChanges = true;
  
          console.log(`Lugar: ${currentPlace.placeName}`);
          console.log(`Nueva hora de llegada calculada: ${currentPlace.placeTime}`);
          console.log(`Nueva hora de salida calculada: ${currentPlace.placeTime1}`);
        }
  
        // Actualizar `currentTime` para el siguiente lugar
        currentTime = newPlaceTime1;
      }
  
      // Actualizar el estado solo si hubo cambios
      if (hasChanges) {
        setItineraryItems(updatedItinerary);
        setLastDistances(distanciasTiempos);
      }
    }
  }, [distanciasTiempos, itineraryItems]);

  //Para checar el estado de la hora de salida y de llegada
  useEffect(() => {
    if (itineraryItems.length > 0) {
      console.log(`Día seleccionado: ${selectedDay}`);
      itineraryItems.forEach((place, index) => {
        console.log(`Lugar ${index + 1}: ${place.placeName}`);
        console.log(`Hora de llegada: ${place.placeTime || "No definida"}`); // placeTime como horaLlegada
        console.log(`Hora de salida: ${place.placeTime1 || "Aún no calculada"}`); // horaSalida si está definida
        console.log(`Orden: ${place.placeOrden}`);
      });
    } else {
      console.log(`Día seleccionado: ${selectedDay}`);
      console.log('No hay lugares en este día.');
    }
  }, [itineraryItems, selectedDay]);

  // useEffect para disparar el cálculo cuando cambien los datos relevantes
  useEffect(() => {
    calculateDepartureTimes();
  }, [distanciasTiempos, itineraryItems, calculateDepartureTimes]); 
  
  // Notificar al padre cuando cambie el itinerario completo
  useEffect(() => {
    onUpdateItinerario(itinerario);
  }, [itinerario, onUpdateItinerario]);

  // Función para reordenar los elementos del itinerario
  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (!over || active.id === over.id) return;
  
    const oldIndex = itineraryItems.findIndex((_, index) => `place-${index}` === active.id);
    const newIndex = itineraryItems.findIndex((_, index) => `place-${index}` === over.id);
  
    let updatedItems = [...itineraryItems];
    const [movedItem] = updatedItems.splice(oldIndex, 1);
    updatedItems.splice(newIndex, 0, movedItem);
  
    // Recalcular el orden y las horas
    updatedItems = updatedItems.map((item, index) => {
      const newPlaceOrden = index + 1;
  
      // Calcular horas basadas en la posición
      let newPlaceTime = index === 0 ? dayjs("10:00", "HH:mm") : dayjs(updatedItems[index - 1].placeTime1, "HH:mm");
      let newPlaceTime1 = newPlaceTime.add(2, "hour"); // Asume estancia de 2 horas por lugar
  
      return {
        ...item,
        placeOrden: newPlaceOrden,
        placeTime: newPlaceTime.format("HH:mm"),
        placeTime1: newPlaceTime1.format("HH:mm"),
        finalItem: index === updatedItems.length - 1, // Marca el último lugar
      };
    });
  
    // Actualizar el itinerario global y local
    updateGlobalItinerary(updatedItems);
    setItineraryItems(updatedItems);
  };

  //Funcion para actualizar el itinerario global, en caso de que se hagan modificaciones de posicion y/o eliminacion
  const updateGlobalItinerary = (updatedItems) => {
    setItinerary((prevItinerary) => ({
      ...prevItinerary,
      [selectedDay]: updatedItems,
    }));
  };

  // Función para eliminar un elemento del itinerario, se pasa como prop a SortablePlaceItem para que pueda ser llamada desde ahí (al hacer click en el botón de eliminar)
  const handleDeleteItem = (indexToDelete,idLugar) => {
    let updatedItems = [...itineraryItems];
    updatedItems.splice(indexToDelete, 1);
  
    // Recalcular orden
    updatedItems = updatedItems.map((item, index) => ({
      ...item,
      placeOrden: index + 1, // Reasigna el orden basado en la nueva posición
      finalItem: index === updatedItems.length - 1, // Marca el último lugar
    }));
  
    // Actualizar el itinerario global y local
    updateGlobalItinerary(updatedItems); // Esto actualiza el itinerario global
    setItineraryItems(updatedItems); // Esto actualiza el local

    // Llamar a onDeletePlace para sincronizar con el servidor
    onDeletePlace(1, idLugar, indexToDelete);
  };













  // Función para deshabilitar fechas que no están en el itinerario
  const shouldDisableDate = (date) => {
    const formattedDate = date.format('DD-MM-YYYY');
    return !(formattedDate in itinerario);
  };

  // Manejar la navegación a la semana anterior
  const handlePreviousWeek = () => {
    const previousMonday = monday.subtract(7, 'day');
    setMonday(previousMonday);
  };

  // Manejar la navegación a la semana siguiente
  const handleNextWeek = () => {
    const nextMonday = monday.add(7, 'day');
    setMonday(nextMonday);
  };

  // Función para descargar el itinerario en PDF
  const handlePDF = () => {
    // Aquí se debe implementar la lógica para descargar el itinerario en PDF
    alert('Descargando PDF...');
  };

  const [open, setOpen] = useState(false);
  const [allPlaces, setAllPlaces] = useState([]); // Copia original de los lugares
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [acceptedPlaces, setAcceptedPlaces] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcceptPlace = (place) => {
    setAcceptedPlaces((prevAccepted) => {
      const updatedAccepted = [...prevAccepted, place];
      setSuggestedPlaces(
        allPlaces.filter((p) => !updatedAccepted.some((ap) => ap.idLugar === p.idLugar))
      );
      return updatedAccepted;
    });
  };

  useEffect(() => {
    console.log('Lugares sugeridos actualizados:', suggestedPlaces);
  }, [suggestedPlaces]);

  useEffect(() => {
    if (open) {
      setSuggestedPlaces(allPlaces);
    }
  }, [open, allPlaces]);

  const handleRemovePlace = (place) => {
    console.log('Eliminando lugar:', place);
    setAcceptedPlaces((prevAccepted) =>
      prevAccepted.filter((p) => p.idLugar !== place.idLugar)
    );
    // Reintroduce el lugar eliminado en lugares sugeridos
    setSuggestedPlaces((prevSuggested) =>
      [...prevSuggested, place]
    );
  };

  //AQUI AGREGARE LOS LUGARES ACEPTADOS AL ITINERARIO HASTA EL FINAL, DESPUES DEL ULTIMO ITINERARIO
  const handleConfirmPlaces = async () => {
    console.log('Lugares aceptados:', acceptedPlaces);
  
    if (acceptedPlaces.length === 0) return;

    // Fetch de las imágenes del lugar
    //let placeImages = ['https://www.dondeir.com/wp-content/uploads/2021/03/bibliotecas-mexico.jpg'];
  
    const currentItinerary = itinerario[selectedDay] || [];
    let lastPlaceTime = currentItinerary.length > 0
      ? dayjs(currentItinerary[currentItinerary.length - 1].placeTime1, "HH:mm")
      : dayjs("10:00", "HH:mm");

    // Arreglo auxiliar para almacenar imágenes y horarios preprocesados
    const lugaresPreprocesados = [];

    // Preprocesa cada lugar para obtener imágenes y horarios
    for (const place of acceptedPlaces) {
      let openHour = '00:00 am';
      let closeHour = '00:00 pm';
      let placeImages = [];

      // Procesar regularOpeningHours
      if (place.regularOpeningHours) {
        try {
          const openingHours = JSON.parse(place.regularOpeningHours);
          if (openingHours.periods) {
            const selectedDate = dayjs(selectedDay, 'DD-MM-YYYY');
            const dayOfWeek = selectedDate.day();

            const periodForDay = openingHours.periods.find(period => period.open.day === dayOfWeek);
            if (periodForDay) {
              openHour = `${(periodForDay.open.hour % 12 || 12)}:${periodForDay.open.minute
                .toString().padStart(2, '0')} ${periodForDay.open.hour < 12 ? 'am' : 'pm'}`;
              closeHour = `${(periodForDay.close.hour % 12 || 12)}:${periodForDay.close.minute
                .toString().padStart(2, '0')} ${periodForDay.close.hour < 12 ? 'am' : 'pm'}`;
            }
          }
        } catch (error) {
          console.error('Error al parsear regularOpeningHours:', error);
        }
      }

      // Obtener imágenes
      try {
        const resultado = await handleFotosLugar(place.idLugar);
        placeImages = resultado.map(element => `http://localhost:3000/fotosLugares/${element.URL}`);
      } catch (error) {
        console.error('Error al obtener foto del lugar', error);
        placeImages = ['https://www.dondeir.com/wp-content/uploads/2021/03/bibliotecas-mexico.jpg'];
      }

      // Guardar datos preprocesados
      lugaresPreprocesados.push({
        ...place,
        openHour,
        closeHour,
        placeImages,
      });
    }

    // Construir el nuevo arreglo del itinerario
    const newItineraryItems = lugaresPreprocesados.map((place, index) => {
    const placeTime = lastPlaceTime;
    const placeTime1 = placeTime.add(2, "hour");
    lastPlaceTime = placeTime1;
    console.log('DIA DEL ITINERARIO ES: ',selectedDay);
    const [day, month, year] = selectedDay.split("-"); // Divide la fecha
    const fechaMySQL = `${year}-${month}-${day}`; // Construye YYYY-MM-DD

    console.log("Fecha lista para MySQL:", fechaMySQL); // Salida: "2024-02-12"

  
      return {
        placeTime: placeTime.format("HH:mm"),
        placeTime1: placeTime1.format("HH:mm"),
        placeFecha: fechaMySQL,
        placeName: place.placeName || "Sin nombre",
        placeDescription: place.descripcion || "Sin descripción",
        placeLongDescription: place.descripcion || 'Sin descripcion extensa',
        placeThings: place.subcategorias 
        ? place.subcategorias.split(/,\s*/).slice(0, 3) // Toma solo las primeras 3 subcategorías
        : [],
        placeOpenHour: place.openHour || '00:00 am', //FALTA
        placeCloseHour: place.closeHour || '00:00 pm', //FALTA
        placeId: place.idLugar,
        placeOrden: currentItinerary.length + index + 1, // Orden del lugar
        latitude: place.latitud || 0,
        longitude: place.longitud || 0,
        placeAddress: place.direccion || 'Sin direccion',
        placePhone: place.teléfono || 'Sin telefono',
        placeImages: place.placeImages, // Ruta para imágenes
        placeRating: parseFloat(place.rating) || 0,
        finalItem: false,
      };
    });
  
    const updatedItinerary = [...currentItinerary, ...newItineraryItems];
  
    // Llama a la función del padre para actualizar distancias
    const lugaresConCoordenadas = updatedItinerary.map((lugar) => ({
      nombre: lugar.placeName,
      lat: lugar.latitude,
      lon: lugar.longitude,
    }));
  
    onUpdateDistanciasTiempos(lugaresConCoordenadas);
  
    setItinerary((prev) => ({
      ...prev,
      [selectedDay]: updatedItinerary,
    }));
  
    setItineraryItems(updatedItinerary);
    setAcceptedPlaces([]);
  };
  


  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className='mx-4 d-flex flex-column align-items-start'>

        {/* Contenido de la pestaña 'Plan' */}
        <Box className='d-flex'>
          <Box className='it_pa-week-days'>
            <IconButton color='black' aria-label='left arrow' onClick={() => setMonday(monday.subtract(7, 'day'))}>
              <LeftRow sx={{ fontSize: '2.2rem' }} />
            </IconButton>

            {/* Barra de días en semana */}
            <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>L</Typography>

            <Box className='d-flex mx-2'>
              {/* Días de la semana a partir del lunes encontrado en la variable monday */}
              {[...Array(7).keys()].map((i) => {
                const day = monday.add(i, 'day');
                const dayFormatted = day.format('DD-MM-YYYY');
                const dayInItinerary = itinerario[dayFormatted];

                //console.log('dayFormatted: ' + dayFormatted);
                //const dayInItinerary = dayFormatted in itinerario;

                // verificar condiciones para determinar la apariencia de los botones de los días
                let dayStyle = 'fw-light';
                if (dayFormatted === today.format('DD-MM-YYYY')) dayStyle += ' planer-dot-day-today';
                if (dayFormatted === selectedDay) dayStyle += ' planer-dot-day-selected fw-medium';
                if (dayInItinerary) dayStyle += ' planer-dot-day-enabled';
                else dayStyle += ' planer-dot-day-disabled';

                return (
                  <IconButton key={i} onClick={() => setSelectedDay(dayFormatted)} disabled={!dayInItinerary}>
                    <Typography
                      fontFamily={'poppins'}
                      color='dark'
                      className={dayStyle}
                    >
                      {day.date()}
                    </Typography>
                  </IconButton>
                );
              })}
            </Box>

            <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>D</Typography>

            <IconButton color='black' aria-label='right arrow' onClick={handleNextWeek}>
              <RightRow sx={{ fontSize: '2.2rem' }} />
            </IconButton>
          </Box>

          <Box className='mx-3 d-flex it_pa-datepicker-container'>
            {/* DatePicker */}
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>  {/* quitar el dapterLocale='es' si se perciben errores del input (undefined o NaN) */}
              <DatePicker
                className='it_pa-datepicker'
                label='Consulta por fecha'
                slotProps={{
                  textField: {
                    readOnly: true,  // Esto evita que se pueda escribir directamente en el campo
                    helperText: 'Selecciona una fecha',
                  }
                }}
                value={dayjs(selectedDay, 'DD-MM-YYYY')}
                shouldDisableDate={(date) => !itinerario[date.format('DD-MM-YYYY')]}
                onChange={(newValue) => {
                  const formattedDate = newValue.format('DD-MM-YYYY');
                  setSelectedDay(formattedDate);
                  setMonday(searchMonday(newValue));
                }}
              />
            </LocalizationProvider>

          </Box>

        </Box> {/* Cierre de Box que aloja los botones de flecha y los días de la semana */}


        <Box className='ms-2 mt-4' sx={{ fontSize: '1.5rem' }}>
          <Typography fontFamily={'poppins'} className='fw-normal it_pa-format-day-selected' sx={{ fontSize: '1.5rem' }}>
            {daysOfWeek[dayjs(selectedDay, 'DD-MM-YYYY').day()]}, {dayjs(selectedDay, 'DD-MM-YYYY').format('DD')} de {months[dayjs(selectedDay, 'DD-MM-YYYY').month()]} de {dayjs(selectedDay, 'DD-MM-YYYY').format('YYYY')}
          </Typography>

          <Box className='ms-2 mt-4' sx={{ display: 'flex', gap: '1rem' }}>
            {/*<ButtonsMod
              variant='secundario'
              textCont='Descargar PDF'
              width='auto'
              height='2.4rem'
              clickEvent={handlePDF}
              startIcon={<PictureAsPdfIcon />}
              type='submit'
            />*/}

            <ButtonsMod
              variant='secundario'
              textCont='Agregar Lugar'
              width='auto'
              height='2.4rem'
              clickEvent={handleClickOpen} // Abre el modal al hacer clic
              startIcon={<AddLocationIcon />}
              type='submit'
            />
          </Box>
        </Box>

        <Box className='my-4' sx={{ width: '100%' }}>

          {/* envolvente DndContext para el drag and drop de los elementos */}
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={itineraryItems.map((_, index) => `place-${index}`)}
              strategy={verticalListSortingStrategy}
            >
              <Timeline
                sx={{
                  [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                  },
                  overflowY: 'auto',
                  maxHeight: '80vh',
                  margin: 0,
                  padding: 0,
                }}
              >
                {itineraryItems.map((place, index) => (
                  <SortablePlaceItem
                    key={`place-${index}`}
                    place={place}
                    index={index}
                    setSelectedPlace={setSelectedPlace}
                    // como el botón de eliminar es parte del componente PlaceItemTimeline, se pasa la función handleDeleteItem como prop
                    handleDeleteItem={handleDeleteItem}
                  />
                ))}
              </Timeline>
            </SortableContext>
          </DndContext>
        </Box>

        {/* Modal AlertDialog */}
        <AlertDialog
          open={open}
          handleClose={handleClose}
          suggestedPlaces={suggestedPlaces}
          acceptedPlaces={acceptedPlaces}
          onAcceptPlace={handleAcceptPlace}
          onRemovePlace={handleRemovePlace}
          onConfirmPlaces={handleConfirmPlaces} // Pasa la función para confirmar los lugares aceptados
          allPlaces={allPlaces}            // Envía la copia original
          setAllPlaces={setAllPlaces}      // Envía el setter
        />
      </Box>
    </ThemeProvider>
  );
}

export default Planer;
