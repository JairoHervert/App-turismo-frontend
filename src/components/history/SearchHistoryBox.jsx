import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Stack } from '@mui/material';

import '../../css/History.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function SearchHistoryBox ({ searchHistory, onEliminarLugar }) {

  const formatoFecha = (fecha) => {
    // Se crea un objeto Date a partir de la fecha pasada
    const fechaObj = new Date(fecha);
  
    // Formato de fecha
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fechaObj.toLocaleDateString('es-ES', opciones);
  }

  const fechaHoy = new Date().toISOString().split('T')[0];
  
  const handleCheckboxChange = (event, itemId) => {
    console.log(`Checkbox changed for item ID: ${itemId}, checked: ${event.target.checked}`);
  }

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
                <IconButton onClick={() => onEliminarLugar(item.id)} >
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
    </Card>
  );
};

export default SearchHistoryBox;
