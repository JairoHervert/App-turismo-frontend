import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  InputAdornment,
} from '@mui/material';
import '../../css/Admin2.css';

const FormularioLugar = ({ nombre, correo, date, hour, addplace }) => {
  const [formData, setFormData] = useState({
    nombreLugar: "",
    categoria: "",
    direccion: "",
    descripcion: "",
    costoEntrada: "",
    diasApertura: "",
    horarioApertura: "",
    horarioCierre: "",
    serviciosAdicionales: "",
    correoElectronico: "",
    telefono: "",
    sitioWeb: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Lógica para manejar redimensionamientos (si es necesario)
    });

    const formContainer = document.querySelector('.formulario-container-admin');
    if (formContainer) {
      resizeObserver.observe(formContainer);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Box
      className="formulario-container-admin"
      sx={{
        overflow: 'hidden',
        margin: '0 auto',
        padding: { xs: 2, sm: 4, md: 6 },
        maxWidth: { xs: '100%', sm: '90%', md: '70%' },
      }}
    >
      {/* Header */}
      <Typography variant="h4" className="formulario-header-title-admin">
        Agregar {addplace}
      </Typography>
      <Typography className="formulario-subtitle-admin">
        {nombre} - {correo} <br />
        {date}, {hour}
      </Typography>

      {/* Subtítulo */}
      <Typography variant="subtitle1" className="formulario-subtitle-section-admin">
        Actualizar datos del lugar registrado
      </Typography>

      {/* Contenedor con fondo blanco */}
      <Box className="formulario-box-admin" sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
        <Grid container spacing={2}>
          {/* Nombre del lugar */}
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              label="Nombre del lugar"
              name="nombreLugar"
              value={formData.nombreLugar}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>

          {/* Categoría */}
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              label="Categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>

          {/* Dirección */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección del lugar"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>

          {/* Descripción */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Descripción del lugar"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>

          {/* Costo de entrada */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Costo de entrada"
              name="costoEntrada"
              value={formData.costoEntrada}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>

          {/* Días de apertura */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Días de apertura"
              name="diasApertura"
              value={formData.diasApertura}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>

          {/* Horarios */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Horario de apertura"
              name="horarioApertura"
              value={formData.horarioApertura}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Horario de cierre"
              name="horarioCierre"
              value={formData.horarioCierre}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>

          {/* Servicios adicionales */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Servicios adicionales"
              name="serviciosAdicionales"
              value={formData.serviciosAdicionales}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>

          {/* Contacto */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Correo electrónico"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono de contacto"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>

          {/* Sitio web */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sitio web"
              name="sitioWeb"
              value={formData.sitioWeb}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            />
          </Grid>

          {/* Botones */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Button
                className="formulario-button-reject-admin"
                variant="contained"
                sx={{
                  backgroundColor: '#e4007c',
                  '&:hover': {
                    backgroundColor: '#c3006a',
                  },
                }}
              >
                Rechazar
              </Button>
              <Button
                className="formulario-button-accept-admin"
                variant="contained"
                sx={{
                  backgroundColor: '#e4007c',
                  '&:hover': {
                    backgroundColor: '#c3006a',
                  },
                }}
              >
                Aceptar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FormularioLugar;
