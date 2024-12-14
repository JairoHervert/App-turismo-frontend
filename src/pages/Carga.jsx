import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import img from '../img/grillo.png';

// componentes
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export default function CircularSize() {
  const message = "En un momento consultará su itinerario";

  return (
    <>
      <Navbar />
      <Stack spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{ height: '88vh' }}>
        <img src={img} alt="Grillo" style={{ width: '150px', height: '150px' }} />
        <Typography variant="h6" align="center" sx={{ color: '#e6007e', fontWeight: 'bold' }}>
          {message}
        </Typography>
        <CircularProgress size="6rem" sx={{ color: '#e6007e' }} />
      </Stack>
      <Footer />
    </>
  );
}