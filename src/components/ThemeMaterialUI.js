import { createTheme } from '@mui/material/styles';

const ThemeMaterialUI = createTheme({
  palette: {
    primary: {
      main: '#e4007c', // Rosa Mexicano
      dark: '#b30063', // Rosa Mexicano más oscuro (hover)
      light: '#ff66a1', // Opcional: Rosa Mexicano claro
    },
    secondary: {
      main: '#489abb', // Azul Maya
      dark: '#2f6d9e', // Azul Maya más oscuro (hover)
      light: '#7ab1d5', // Opcional: Azul Maya claro
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    rem3: {
      fontSize: '3rem',
      fontWeight: 'bold',
    },
    rem2: {
      fontSize: '2rem',
      fontWeight: 'medium',
    },
  },
});

export default ThemeMaterialUI;
