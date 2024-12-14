import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Stack } from '@mui/material';

import '../../css/History.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AlertD from '../alert';

function SearchHistoryBox ({ searchHistory, onEliminarLugar }) {
  // Modal - Eliminar un item del historial 
  const alertRef = useRef();
  const [idItemEliminar, setIdItemEliminar] = useState(null);

  const handleOpenModal = (id) => {
    setIdItemEliminar(id);
    if (alertRef.current) {
        alertRef.current.handleClickOpen();
    }
  }

  const Borrar = () => {
    if (idItemEliminar) {
      onEliminarLugar(idItemEliminar);
    }
  }

  // Funciones para las fechas en el historial
  const obtenerFechaLocal = (fecha) => {
    const fechaObj = new Date(fecha);
    fechaObj.setMinutes(fechaObj.getMinutes() + fechaObj.getTimezoneOffset());
    return fechaObj;
  }

  const formatoFecha = (fecha) => {

  const fechaLocal = obtenerFechaLocal(fecha);

  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fechaLocal.toLocaleDateString('es-ES', opciones);
  }

  const fechaHoy = obtenerFechaLocal(new Date()).toISOString().split('T')[0];

  return (
    <Card>
      {/* Contenido Historial */}
      <CardContent>
      {searchHistory.map((day) => (
        <div key={day.date}>

        <Typography className='date-text-history'>
          {day.date === fechaHoy ? `Hoy - ${formatoFecha(day.date)}` : formatoFecha(day.date)}
        </Typography>
        
        {/* Se mapean los items y se muestran en una lista */}
        <List dense>
          {day.items.map((item, index) => (

            <ListItem
              key={item.id || index}
              sx={{ paddingLeft: '0', transition: '0.2s', positon: 'relative', '&:hover': { backgroundColor: 'rgba(185, 229, 247, 0.5)', cursor: 'pointer' } }}
              secondaryAction={
                /* Ícono para borrar Item */
                <IconButton 
                  // onClick={() => onEliminarLugar(item.id)}
                  onClick={() => handleOpenModal(item.id)}
                >
                  <CloseIcon sx={{ width: '0.8rem', height: '0.8rem' }}/>
                </IconButton>
              }
            >

              {/* Texto descriptivo del Item/Lugar */}
              <ListItemText
                primary={
                  <Stack direction='row' alignItems='center' justifyContent='flex-start' className='history-lista-texto'>
                    {/* Hora de consulta del lugar */}
                    <Typography variant='body2' className='query-time-history me-2'>{item.time}</Typography>
                    {/* Nombre del lugar */}
                    <Typography variant='body1'>
                      <Link to={`/placepage/${item.id}`} className='query-text-history'>
                        {item.query}
                      </Link>
                    </Typography>
                  </Stack>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
      ))}
      </CardContent>

      <AlertD
        ref={alertRef}
        titulo='¿Estas seguro de eliminar este ítem?'
        mensaje='Esta acción no se puede deshacer'
        boton1='Aceptar'
        boton2='Cancelar'
        onConfirm={Borrar}
      />
    </Card>
  );
};

export default SearchHistoryBox;
