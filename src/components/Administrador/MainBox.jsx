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
    nombreLugar: "Palacio de Bellas Artes",
    categoria: "Educativo",
    direccion: "Av. Juárez, Centro Histórico, Alcaldía Cuauhtémoc",
    descripcion: "El Palacio de Bellas Artes es uno de los edificios más emblemáticos de la...",
    costoEntrada: "$85 MXN",
    diasApertura: "Lunes, martes y jueves",
    horarioApertura: "07:00 a.m.",
    horarioCierre: "11:00 p.m.",
    serviciosAdicionales: "Visitas guiadas, Tienda de recuerdos, Cafetería",
    correoElectronico: "informes@inba.gob.mx",
    telefono: "+52 55 5512 2593",
    sitioWeb: "www.museopalaciodebellasartes.gob.mx"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Aquí puedes agregar código adicional si necesitas controlar el tamaño
      // y el ajuste de los componentes.
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
    <Box className="formulario-container-admin" sx={{ overflow: 'hidden' }}>
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
      <Box className="formulario-box-admin">
        <Grid container spacing={2}>
          {/* Nombre del lugar */}
          <Grid item xs={12} className="formulario-grid-item-admin">
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
          <Grid item xs={12} className="formulario-grid-item-admin">
            <Select
              fullWidth
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              variant="outlined"
              size="small"
              className="formulario-input-admin"
            >
              <MenuItem value="Educativo">Educativo</MenuItem>
              <MenuItem value="Cultural">Cultural</MenuItem>
              <MenuItem value="Turístico">Turístico</MenuItem>
            </Select>
          </Grid>

          {/* Dirección */}
          <Grid item xs={12} className="formulario-grid-item-admin">
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
          <Grid item xs={12} className="formulario-grid-item-admin">
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
          <Grid item xs={4} className="formulario-grid-item-admin">
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
          <Grid item xs={4} className="formulario-grid-item-admin">
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

          {/* Horario de apertura */}
          <Grid item xs={4} className="formulario-grid-item-admin">
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

          {/* Horario de cierre */}
          <Grid item xs={4} className="formulario-grid-item-admin">
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
          <Grid item xs={12} className="formulario-grid-item-admin">
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

          {/* Correo electrónico */}
          <Grid item xs={6} className="formulario-grid-item-admin">
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

          {/* Teléfono de contacto */}
          <Grid item xs={6} className="formulario-grid-item-admin">
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
          <Grid item xs={12} className="formulario-grid-item-admin">
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
          <Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 4,
    gap: 2, // Asegura que haya un espacio constante entre los botones
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
      </Box>
    </Box>
  );
};

export default FormularioLugar;
