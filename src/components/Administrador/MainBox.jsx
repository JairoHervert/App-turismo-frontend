import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, InputAdornment } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/Admin2.css';

const FormularioLugar = ({ addplace, lugares, setLugares }) => {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const lugar = state?.lugar || {}; 

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

  const handleAction = (lugar, action) => {
    const updatedLugares = lugares.map((l) =>
      l.nombreLugar === lugar.nombreLugar
        ? { ...l, categoria: action }
        : l
    );
    setLugares(updatedLugares); 

    if (action === 'Leídos') {
      navigate('/Admin-Page-Places', { state: { lugar } });
    }
  };

  useEffect(() => {
    if (lugar) {
      setFormData({
        nombreLugar: lugar.nombreLugar || "",
        categoria: lugar.categoria || "",
        direccion: lugar.direccion || "",
        descripcion: lugar.descripcion || "",
        costoEntrada: lugar.costoEntrada || "",
        diasApertura: lugar.diasApertura || "",
        horarioApertura: lugar.horarioApertura || "",
        horarioCierre: lugar.horarioCierre || "",
        serviciosAdicionales: lugar.serviciosAdicionales || "",
        correoElectronico: lugar.correoElectronico || "",
        telefono: lugar.telefono || "",
        sitioWeb: lugar.sitioWeb || "",
      });
    }
  }, [lugar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitAccept = () => {
    //alert('Lugar aceptado');
    
    // Cambiar la categoría a "Aceptados"
    const updatedLugar = { ...lugar, categoria: 'Aceptados' };
    
    handleAction(updatedLugar, 'Aceptados');
    
    // Navegar a la página de administración de lugares, pasando el lugar como parte del estado de la navegación
    navigate('/Admin-Page-Places', { state: { categoria: 'Aceptados', lugar: updatedLugar } });
  };
  

  const handleSubmitReject = () => {
    //alert('Lugar rechazado');
    navigate('/Admin-Page-Places');
  };

  return (
    <Box className="formulario-container-admin" sx={{ overflow: 'hidden', margin: '0 auto', padding: { xs: 2, sm: 4, md: 6 }, maxWidth: { xs: '100%', sm: '90%', md: '70%' } }}>
      <Typography variant="h4" className="formulario-header-title-admin">Agregar {formData.nombreLugar}</Typography>
      <Typography className="formulario-subtitle-admin">{lugar.NombrePersona} - {lugar.correoPersona}</Typography>

      <Typography variant="subtitle1" className="formulario-subtitle-section-admin" sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>
        Actualizar datos del lugar registrado
      </Typography>

      <Box className="formulario-box-admin" sx={{ borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nombre del lugar" name="nombreLugar" value={formData.nombreLugar} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Categoría" name="categoria" value={formData.categoria} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Dirección del lugar" name="direccion" value={formData.direccion} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Descripción del lugar" name="descripcion" value={formData.descripcion} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Costo de entrada" name="costoEntrada" value={formData.costoEntrada} onChange={handleChange} variant="outlined" size="small" InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Días de apertura" name="diasApertura" value={formData.diasApertura} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Horario de apertura" name="horarioApertura" value={formData.horarioApertura} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField fullWidth label="Horario de cierre" name="horarioCierre" value={formData.horarioCierre} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Servicios adicionales" name="serviciosAdicionales" value={formData.serviciosAdicionales} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Correo electrónico" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Teléfono de contacto" name="telefono" value={formData.telefono} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Sitio web" name="sitioWeb" value={formData.sitioWeb} onChange={handleChange} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 2 }}>
              <Button onClick={handleSubmitReject} variant="contained" sx={{ backgroundColor: '#e4007c', '&:hover': { backgroundColor: '#c3006a' } }}>Rechazar</Button>
              <Button onClick={handleSubmitAccept} variant="contained" sx={{ backgroundColor: '#e4007c', '&:hover': { backgroundColor: '#c3006a' } }}>Aceptar</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FormularioLugar;
