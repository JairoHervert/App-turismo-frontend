// componentes online
import { useState, useEffect } from 'react';
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

// itinerario de prueba (puede cambiarse a Itinerario1 o Itinerario3)
import itinerario from './ItinerariosDePrueba/Itinerario2';


function Planer({ setSelectedPlace }) {
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

  // state para el dia seleccionado en la barra de dias
  const initialSelectedDay = itinerario[todayFormatted] ? todayFormatted : Object.keys(itinerario)[0];
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay);
  console.log('selectedDay: ' + selectedDay);

  // Actualiza la semana mostrada según el día seleccionado
  useEffect(() => {
    setMonday(searchMonday(dayjs(selectedDay, 'DD-MM-YYYY')));
  }, [selectedDay]);

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



  // como el itinerario es un objeto, se debe extraer el array de lugares del día seleccionado, se usa para el drag and drop
  const [itineraryItems, setItineraryItems] = useState(itinerario[selectedDay]);

  // Efecto para actualizar el itinerario cuando cambia el día seleccionado
  useEffect(() => {
    setItineraryItems(itinerario[selectedDay] || []);
  }, [selectedDay]);

  // Función para reordenar los elementos del itinerario
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Si no hay un elemento sobre el cual se soltó, no hacer nada
    if (!over || active.id === over.id) return;

    // índices del elemento seleccionado pa mover y del destino
    const oldIndex = itineraryItems.findIndex((_, index) => `place-${index}` === active.id);
    const newIndex = itineraryItems.findIndex((_, index) => `place-${index}` === over.id);

    // copia del itinerario actual
    let updatedItinerary = [...itineraryItems];

    // Extraer el elemento que fue arrastrado
    const [movedItem] = updatedItinerary.splice(oldIndex, 1);

    // Insertar el elemento en su nueva posición
    updatedItinerary.splice(newIndex, 0, movedItem);

    // Actualizar los horarios después del cambio de posición
    updatedItinerary = updatedItinerary.map((item, index) => {
      // Mantener el horario original del lugar en el índice actual, por la consistencia
      return {
        ...item,
        placeTime: itineraryItems[index]?.placeTime || item.placeTime, // Preserva la hora del lugar original en esa posición
      };
    });

    // el último elemento del itinerario debe tener finalItem en true, por cuestiones de estilo
    updatedItinerary = updatedItinerary.map((item, index) => ({
      ...item,
      finalItem: index === updatedItinerary.length - 1,
    }));

    // Actuaklizamos el estado con el nuevo itinerario de manera local, esto debe hacerse en la bdd
    setItineraryItems(updatedItinerary);
    itinerario[selectedDay] = updatedItinerary;

    // Sugerencia/Comentario para el equipo de backend:
    // Aquí necesitamos enviar el itinerario actualizado al servidor o la bdd para guardar los cambios.
    // no lo simule porque pense usar jsons para simulacion de itinerarios, pero hacerlo con json server no es lo más adecuado porque debo importarlo y hacer funciones extra
    // como sugereancia podrian ghacer uso de algun endpoint que reciba el ID del itinerario (o la fecha, no se como lo esten manejando xd) y el nuevo orden de los lugares para actualizarlo en la base de datos.
    // Este endpoint debe aceptar el cuerpo del itinerario actualizado (updatedItinerary) o pueden modificar esta funcion 
    // para que retorne el itinerario actualizado y enviarlo desde el componente padre (ItineraryPage) al backend.
    // funcionChidaParaActualizarItinerarioEnBackend(updatedItinerary); <----- 
  };

  // Función para eliminar un elemento del itinerario, se pasa como prop a SortablePlaceItem para que pueda ser llamada desde ahí (al hacer click en el botón de eliminar)
  const handleDeleteItem = (indexToDelete) => {
    let updatedItinerary = [...itineraryItems];
    updatedItinerary.splice(indexToDelete, 1);

    // Reorganizar las horas después de eliminar un lugar (mantener las horas originales, por consistencia)
    updatedItinerary = updatedItinerary.map((item, index) => ({
      ...item,
      placeTime: itineraryItems[index]?.placeTime || item.placeTime, // Mantener las horas anteriores
      finalItem: index === updatedItinerary.length - 1, // Solo el último elemento debe tener finalItem: true
    }));

    setItineraryItems(updatedItinerary);
    itinerario[selectedDay] = updatedItinerary;

    // Nota para el equipo de backend: aquí también se debe enviar la actualización a la base de datos para reflejar la eliminación.
  };



  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className='mx-4 d-flex flex-column align-items-start'>

        {/* Contenido de la pestaña 'Plan' */}
        <Box className='d-flex'>
          <Box className='it_pa-week-days'>
            <IconButton color='black' aria-label='left arrow' onClick={handlePreviousWeek}>
              <LeftRow sx={{ fontSize: '2.2rem' }} />
            </IconButton>

            {/* Barra de días en semana */}
            <Typography variant='subtitle1' fontFamily={'poppins'} color='gray' className='fw-normal' sx={{ fontSize: '1.3rem' }}>L</Typography>

            <Box className='d-flex mx-2'>
              {/* Días de la semana a partir del lunes encontrado en la variable monday */}
              {[...Array(7).keys()].map((i) => {
                const day = monday.add(i, 'day');
                const dayFormatted = day.format('DD-MM-YYYY');

                //console.log('dayFormatted: ' + dayFormatted);
                const dayInItinerary = dayFormatted in itinerario;

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
                shouldDisableDate={shouldDisableDate}
                onChange={(newValue) => {
                  const formattedDate = newValue.format('DD-MM-YYYY');
                  setSelectedDay(formattedDate);
                  setMonday(searchMonday(newValue));
                }}
              />
            </LocalizationProvider>

          </Box>

        </Box> {/* Cierre de Box que aloja los botones de flecha y los días de la semana */}


        <Box className='ms-2 mt-4'>
          <Typography fontFamily={'poppins'} className='fw-normal it_pa-format-day-selected' sx={{ fontSize: '1.5rem' }}>
            {daysOfWeek[dayjs(selectedDay, 'DD-MM-YYYY').day()]}, {dayjs(selectedDay, 'DD-MM-YYYY').format('DD')} de {months[dayjs(selectedDay, 'DD-MM-YYYY').month()]} de {dayjs(selectedDay, 'DD-MM-YYYY').format('YYYY')}
          </Typography>
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
                    handleDeleteItem={() => handleDeleteItem(index)}
                  />
                ))}
              </Timeline>
            </SortableContext>
          </DndContext>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Planer;
