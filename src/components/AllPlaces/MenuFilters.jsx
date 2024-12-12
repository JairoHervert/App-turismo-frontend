import React from 'react';
import { DialogTitle, DialogContent, IconButton, Typography, Box, Divider, Checkbox } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../../css/AllPlaces.css';

function MenuFilters({ setIsModalOpen, selectedFilters, onApplyFilters  }) {
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

  {/* Nuevas categorías de lugares turísticos */}
  const categorias = [
    'Arcades',
    'Arena de luchas',
    'Arte y cultura',
    'Bares',
    'Bibliotecas',
    'Boleras',
    'Buffets',
    'Cafeterías',
    'Clubes',
    'Comida rápida',
    'Compras',
    'Karaoke',
    'Aventura',
    'Historia',
    'Religión',
    'Mariscos',
    'Museos',
    'Parques',
    'Parques de diversiones',
    'Parques de skate',
    'Patinaje sobre hielo',
    'Restaurantes',
    'Restaurantes africanos',
    'Restaurantes americanos',
    'Restaurantes asiáticos',
    'Restaurantes brasileños',
    'Restaurantes de medio oriente',
    'Restaurantes europeros',
    'Restaurantes mexicanos',
    'Salones de té',
    'SteakHouses',
    'Zoológicos',
  ];

  // analiza si el checkbox fue seleccionado o no para mostrrlo en el modl
  const handleCheckboxChange = (filterType, filterValue) => {
    const isSelected = selectedFilters[filterType].includes(filterValue);
    const updatedFilters = isSelected
      ? selectedFilters[filterType].filter((item) => item !== filterValue)
      : [...selectedFilters[filterType], filterValue];
    
    // Llama a onApplyFilters con los nuevos filtros
    onApplyFilters({ ...selectedFilters, [filterType]: updatedFilters });
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
          <Divider sx={{ my: 3 }} />

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
        </Box>
      </DialogContent>
    </Box>
  );
}

export default MenuFilters;
