import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import '../../css/AdministradorLugares.css';

const MainBox = ({ lugares = [], selectedCategory, setLugares }) => {
  const navigate = useNavigate();

  const filteredLugares = lugares.filter(
    (lugar) =>
      selectedCategory === 'Todos' || lugar.categoria === selectedCategory
  );

  const handleAction = (lugar, action) => {
    setLugares((prevLugares) => {
      const updatedLugares = prevLugares.map((l) =>
        l.nombreLugar === lugar.nombreLugar
          ? { ...l, categoria: action }
          : l
      );
      return updatedLugares;
    });

    if (action === 'Leídos') {
      navigate('/Admin-Page', { state: { lugar } });
    }
  
    if (action === 'Aceptados') {
      setLugares((prevLugares) => {
        const updatedLugares = prevLugares.map((l) =>
          l.nombreLugar === lugar.nombreLugar
            ? { ...l, categoria: 'Aceptados' }
            : l
        );
        return updatedLugares;
      });
    }
  };

  return (
    <Box
      className="formulario-container-admin-places ad-places-text"
      sx={{
        overflow: 'hidden',
        padding: 2,
        marginLeft: 'auto',
        backgroundColor: 'white',
        borderRadius: 2,
        maxHeight: '500px',
        overflowY: 'auto',
        overflowX: 'auto',
      }}
    >
      <Typography
        variant="h4"
        className="fw-bolder fontMontserrat mb-4 ad-places-text"
        sx={{
          fontFamily: 'Montserrat',
          fontWeight: 'bold',
          fontSize: '1.8rem',
          textAlign: 'center',
        }}
      >
        Solicitudes
      </Typography>

      <Grid2 container spacing={0}>
        {filteredLugares.length > 0 ? (
          filteredLugares.map((lugar, index) => (
            <Grid2
              item
              xs={12}
              key={index}
              sx={{
                padding: '8px 0',
                borderBottom: '1px solid #ccc',
                width: '100%',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
                <Typography variant="body1" sx={{ flex: 1, fontWeight: 'bold', fontFamily: 'montserrat' }}>
                  {lugar.NombrePersona} ({lugar.correoPersona})
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#ff007f',
                    fontWeight: 'bold',
                    flex: 2,
                    textAlign: 'center',
                    fontFamily: 'montserrat',
                  }}
                >
                  Agregar: {lugar.nombreLugar}
                </Typography>
                <Typography variant="body1" sx={{ flex: 1, textAlign: 'right', fontWeight: 'bold', fontFamily: 'montserrat' }}>
                  Categoría: {lugar.categoria || 'Ninguna'}
                </Typography>
              </Box>

              {lugar.categoria === 'Ninguna' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end', marginTop: '10px' }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleAction(lugar, 'Leídos')}
                    sx={{ fontSize: '0.8rem', padding: '4px 8px', width: '120px' }}
                  >
                    Leer
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleAction(lugar, 'Aceptados')}
                    sx={{ fontSize: '0.8rem', padding: '4px 8px', width: '120px' }}
                  >
                    Aceptar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleAction(lugar, 'Rechazados')}
                    sx={{ fontSize: '0.8rem', padding: '4px 8px', width: '120px' }}
                  >
                    Rechazar
                  </Button>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', marginTop: '10px' }}>
                  Ya {lugar.categoria.toLowerCase()}
                </Typography>
              )}
            </Grid2>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
            No hay lugares disponibles
          </Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default MainBox;
