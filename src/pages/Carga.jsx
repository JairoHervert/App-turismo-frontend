import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import img from '../img/grillo.png';

// Componentes
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export default function CircularSize() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const executedRef = React.useRef(false); // Flag interno

  useEffect(() => {
    // Verifica si la lógica ya se ejecutó
    if (executedRef.current) return;
    executedRef.current = true;

    const loadDataAndSendRequest = async () => {
      try {
        const idUsuario = localStorage.getItem('id');
        const numeroPersonas = localStorage.getItem('numeroViajantes');
        const fechaInicioDayjs = localStorage.getItem('fechaInicio');
        const fechaFinDayjs = localStorage.getItem('fechaFin');
        const presupuesto = localStorage.getItem('presupuesto');
        const checkboxOptions = localStorage.getItem('checkboxOptions');

        if (!idUsuario || !numeroPersonas || !fechaInicioDayjs || !fechaFinDayjs) {
          throw new Error('Faltan datos esenciales en localStorage.');
        }

        const fechaInicio = dayjs(fechaInicioDayjs).format('YYYY-MM-DD');
        const fechaFin = dayjs(fechaFinDayjs).format('YYYY-MM-DD');
        const checkboxOptionsObject = checkboxOptions ? JSON.parse(checkboxOptions) : {};
        const goodForGroups = numeroPersonas > 4;
        const restricciones = {
          impedimentoFisico: checkboxOptionsObject.disability || false,
          familiar: checkboxOptionsObject.family || false,
          vegetarianFriendly: checkboxOptionsObject.vegan || false,
          petFriendly: checkboxOptionsObject.pet || false,
          goodForGroups,
        };

        const requestData = {
          idUsuario,
          numeroPersonas,
          fechaInicio,
          fechaFin,
          horaInicio: '09:00',
          horaFin: '21:00',
          gradoAleatoriedad: 50,
          duracionActividad: 2.5,
          duracionComida: 2.5,
          presupuesto,
          restricciones,
          latitudInicial: 19.436511157306374,
          longitudInicial: -99.13954113405046,
        };

        console.log('Datos a enviar al servidor:', requestData);

        const response = await axios.post('http://localhost:3001/algoritmo/generarItinerario', requestData);

        if (response.status !== 200) {
          throw new Error('Error al comunicarse con el servidor');
        }

        const result = response.data;
        console.log('Respuesta del servidor:', result);

        navigate('/itinerary', { state: { result } });
      } catch (error) {
        console.error('Error durante la carga o la petición:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDataAndSendRequest();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Stack spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{ height: '88vh' }}>
          <img src={img} alt="Grillo" style={{ width: '150px', height: '150px' }} />
          <Typography variant="h6" align="center" sx={{ color: '#e6007e', fontWeight: 'bold' }}>
            En un momento consultará su itinerario
          </Typography>
          <CircularProgress size="6rem" sx={{ color: '#e6007e' }} />
        </Stack>
        <Footer />
      </>
    );
  }

  return null;
}
