import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import '../../css/AdministradorLugares.css';

const MainBox = ({ lugares = [] }) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Aquí puedes manejar los cambios de tamaño si es necesario.
    });

    const formContainer = document.querySelector('.formulario-container-admin-places');
    if (formContainer) {
      resizeObserver.observe(formContainer);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Box
      className="formulario-container-admin-places"
      sx={{ overflow: 'hidden', padding: 2, backgroundColor: 'white', borderRadius: 2 }}
    >
      {/* Encabezado "Solicitudes" */}
      <Typography 
        variant="h4" 
        className="fw-bolder fontMontserrat mb-4 us_de-deseados-text" 
        sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '1.8rem', textAlign:'center' }}
      >
        Solicitudes
      </Typography>

      <Grid2 container spacing={0}>
        {lugares.length > 0 ? (
          lugares.map((lugar, index) => (
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
              <Button
                variant="text"
                fullWidth
                sx={{
                  display: 'flex',
                  fontFamily: 'Montserrat',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textTransform: 'none', // Quitar el texto en mayúsculas
                  padding: '8px 16px',
                  color: 'inherit', // Mantener el color del texto
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#e0f7fa', // Cambiar color al pasar el puntero
                  },
                }}
              >
                <Typography variant="body1" sx={{ flex: 1 }}>
                  {lugar.NombrePersona}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#ff007f', fontWeight: 'bold', flex: 1, textAlign: 'center' }}
                >
                  Agregar: {lugar.nombreLugar}
                </Typography>
                <Typography variant="body1" sx={{ flex: 1, textAlign: 'right' }}>
                  Categoría: {lugar.categoria}
                </Typography>
              </Button>
            </Grid2>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', width: '100%' }}>
            No hay lugares disponibles para mostrar.
          </Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default MainBox;
