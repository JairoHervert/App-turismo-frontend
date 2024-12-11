import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Star as StarIcon, StarBorder as StarBorderIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import '../../css/DeseadosPage.css';

function UDCuadroLugar({
  nombreLugar,
  descripcionLugar,
  imagenLugar,
  tiempoLugar,
  costoLugar,
  idLugar
}) {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isDeseado, setIsDeseado] = useState(false);

  const informacionLugar = () => {
    navigate(`/placepage/${idLugar}`);
  };

  const handleFavoritosClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleDeseadosClick = (e) => {
    e.stopPropagation();
    setIsDeseado(!isDeseado);
  };

  const esURL = imagenLugar.startsWith('http://') || imagenLugar.startsWith('https://');
  const imagenSrc = esURL ? imagenLugar : `${process.env.PUBLIC_URL}/fotosLugares/${imagenLugar}`;

  return (
    <div 
      className="row d-flex justify-content-between align-items-center rounded us_de-border-target p-3 me-1 mb-3 position-relative cursor-pointer" 
      onClick={informacionLugar}
    >
      {/* Botones en la esquina superior derecha */}
      <Box className="position-absolute d-flex gap-0 UD_buttons_star_heart">
        <Button
          variant="outlined"
          className="pc-btn-deseados"
          onClick={handleDeseadosClick}
          size="small"
          sx={{
            borderColor: 'white',
            color:'#FFC001',
            backgroundColor: 'white',
            marginLeft: '5px',
            '&:hover': {
              color: '#FAC902',
            },
            minWidth: '40px', // Personaliza el ancho mínimo del botón
            minHeight: '40px', // Personaliza el alto mínimo del botón
          }}
        >
          {isDeseado ? <StarIcon /> : <StarBorderIcon />}
        </Button>
        <Button
          variant="outlined"
          className="pc-btn-favoritos"
          onClick={handleFavoritosClick}
          size="small"
          sx={{
            borderColor:'white',
            color: 'red',
            backgroundColor: 'white',
            marginLeft: '5px',
            '&:hover': {
              color: 'red',
            },
            minWidth: '40px', // Personaliza el ancho mínimo del botón
            minHeight: '40px', // Personaliza el alto mínimo del botón
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      </Box>

      {/* Contenido del lugar */}
      <div className="col-12 col-md-4 ud_contenedor-imagen-lugar">
        <img src={imagenSrc} className="us_de-imagen-lugar rounded" alt={nombreLugar} />
      </div>

      <div className="col-12 col-md-8 d-flex flex-column justify-content-center align-items-center ud-lugar-info-col">
        <h1 className="fontMontserrat fs-2 fw-semibold">{nombreLugar}</h1>
        <hr className="us_de-divider" />
        <p className="text-center">{descripcionLugar}</p>

        <div className="us_de-icons d-flex justify-content-center align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-cash-coin fs-5 fontRosaMexicano"></i>
            <p className="fw-medium mb-0">Costo: <span className="fw-semibold">{costoLugar}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UDCuadroLugar;
