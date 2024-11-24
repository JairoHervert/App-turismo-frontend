import { createTheme } from '@mui/material/styles';

const ThemeMaterialUI = createTheme({
  palette: {
    primary: {
      main: '#e4007c', // Rosa Mexicano
      dark: '#ca006b', // Rosa Mexicano más oscuro (hover)
      light: '#ff66a1', // Opcional: Rosa Mexicano claro
    },
    secondary: {
      main: '#489abb', // Azul Maya
      dark: '#2f6d9e', // Azul Maya más oscuro (hover)
      light: '#7ab1d5', // Opcional: Azul Maya claro
    },
    yellow: {
      main: '#f9a825', // Amarillo
      dark: '#c17900', // Amarillo más oscuro (hover)
      light: '#ffdb56', // Opcional: Amarillo claro
    },
    black: {
      main: '#000000',
      dark: '#000000',
      light: '#000000',
    },
    dark: {
      main: '#333333', // Gris oscuro
      dark: '#000000', //
      light: '#666666', // Gris claro
    },
    gray: {
      main: '#6c6c6c', // Gris
      dark: '#4a4a4a', // Gris más oscuro
      light: '#999999', // Gris claro
    },
    google: {
      main: '#db4437', // Rojo Google
      dark: '#a52714', // Rojo Google más oscuro (hover)
      light: '#ff5f52', // Opcional: Rojo Google claro
    },
    facebook: {
      main: '#1877f2', // Azul Facebook
      dark: '#115fba', // Azul Facebook más oscuro (hover)
      light: '#4c8cfa', // Opcional: Azul Facebook claro
    },
    lemon: {
      main: '#8bc34a', // Verde Lima
      dark: '#5a9216', // Verde Lima más oscuro (hover)
      light: '#bef67a', // Opcional: Verde Lima claro
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
    midtext: {
      fontSize: '1.25rem',
      fontWeight: 'medium',
    },
  },
});

export default ThemeMaterialUI;
