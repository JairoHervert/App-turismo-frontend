import React from 'react';
import { DialogTitle, DialogContent, IconButton, Typography, Box, Divider, Checkbox } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../../css/AllPlaces.css';

function MenuFilters({ setIsModalOpen, selectedFilters, setSelectedFilters }) {
  const alcaldias = [
    'Álvaro Obregón',
    'Azcapotzalco',
    'Benito Juárez',
    'Coyoacán',
    'Cuajimalpa',
    'Cuauhtémoc',
    'Gustavo A. Madero',
    'Iztacalco',
    'Iztapalapa',
    'Magdalena C.',
    'Miguel Hidalgo',
    'Milpa Alta',
    'Tláhuac',
    'Tlalpan',
    'Venustiano Carranza',
    'Xochimilco',
  ];

  const categorias = [
    'Salud y Bienestar',
    'Deportes',
    'Comida Rápida',
    'Restaurante',
    'Cafetería',
    'Bar',
    'Arte',
    'Historia',
    'Museos',
    'Educativos',
    'Compras',
    'Parques',
    'Juegos recreativos al aire libre',
    'Juegos recreativos bajo techo',
    'Zoológicos',
    'Religión',
  ];

  // analiza si el checkbox fue seleccionado o no para mostrrlo en el modl
  const handleCheckboxChange = (filterType, filterValue) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[filterType].includes(filterValue);
      const updatedFilters = isSelected
        ? prev[filterType].filter((item) => item !== filterValue)
        : [...prev[filterType], filterValue];
      return { ...prev, [filterType]: updatedFilters };
    });
  };

  return (
    <Box>
      <DialogTitle>
        <Typography fontFamily={'Poppins'} fontSize={'1.5rem'}>
          Filtros de búsqueda
        </Typography>

        <IconButton
          aria-label='close'
          onClick={() => setIsModalOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ maxWidth: '35rem' }}>
        <Box className='d-flex'>
          {/* Sección Alcaldías */}
          <Box className='all_places-filter-alcaldia'>
            <Typography className='fw-medium mb-1' fontSize={'1.1rem'} fontFamily={'Poppins'}>
              Alcaldías
            </Typography>
            <FormGroup>
              {alcaldias.map((alcaldia) => (
                <FormControlLabel
                  key={alcaldia}
                  control={
                    <Checkbox
                      checked={selectedFilters.alcaldias.includes(alcaldia)}
                      onChange={() => handleCheckboxChange('alcaldias', alcaldia)}
                    />
                  }
                  label={alcaldia}
                />
              ))}
            </FormGroup>
          </Box>
          <Divider sx={{ my: 3 }} />

          {/* Sección Categorías */}
          <Box>
            <Typography className='fw-medium mb-1' fontSize={'1.1rem'} fontFamily={'Poppins'}>
              Categorías
            </Typography>
            <FormGroup>
              {categorias.map((categoria) => (
                <FormControlLabel
                  key={categoria}
                  control={
                    <Checkbox
                      checked={selectedFilters.categorias.includes(categoria)}
                      onChange={() => handleCheckboxChange('categorias', categoria)}
                    />
                  }
                  label={categoria}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>
      </DialogContent>
    </Box>
  );
}

export default MenuFilters;
