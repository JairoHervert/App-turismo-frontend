import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

import '../../css/History.css';

const SearchHistoryBox = ({ searchHistory, date, onEliminarLugar }) => {
  return (

    
    <div className="search-history-box-history d-flex flex-column rounded">
      
      <p className="date-text-history">Hoy - {date}</p>
      <div className="search-history-list-history">
        
        {searchHistory.map((item, index) => (
          <div
            key={item.id || index} // Usa item.id si está disponible, de lo contrario, usa el índice como respaldo
            className="search-history-item-history d-flex justify-content-between align-items-center"
          >
            <div className="item-left-history d-flex align-items-center">
              
              <input type="checkbox" className="checkbox-history me-2" />
              <small className="query-time-history me-2">{item.time}</small>
              <Link to={`/placepage/${item.idLugar}`} className="query-text-history">
                {item.query}
              </Link>
            </div>
            {/* Ícono de tres puntos para opciones */}
            <div
              className="menu-icon-history"
              onClick={() => onEliminarLugar(item.idLugar)} // Llama a la función para eliminar
              style={{ cursor: 'pointer' }} // Cambia el cursor al pasar sobre el ícono
            >
              ⋮
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistoryBox;
