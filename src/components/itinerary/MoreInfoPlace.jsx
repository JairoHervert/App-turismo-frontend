// componentes online
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography } from "@mui/material"

// estilos
import ThemeMaterialUI from '../ThemeMaterialUI';

function MoreInfoPlace() {
  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Box className='d-flex flex-column align-items-center mx-4'>
        <Typography variant='h3' >Información de lugar</Typography>
        <Typography variant='body1'>Aqui irá Información adicional del lugar, ademas de la que se muestra en el timeline</Typography>
      </Box>
    </ThemeProvider>
  )
}

export default MoreInfoPlace