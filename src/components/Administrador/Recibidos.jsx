import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon, MailOutline as MailOutlineIcon } from '@mui/icons-material';

const Recibidos = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    { title: 'Todos', items: ['Ejemplo 1', 'Ejemplo 2', 'Ejemplo 3'] },
    { title: 'No leídos', items: ['Ejemplo 1'] },
    { title: 'Aceptados', items: ['Ejemplo 2'] },
    { title: 'Rechazados', items: ['Ejemplo 3'] },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = categories.find(category => category.title === selectedCategory)?.items || [];

  return (
    <Box className="recibidos-container-admin" marginTop={'65px'} maxHeight={'300px'}>
      {/* Header del componente Recibidos */}
      <Box className="recibidos-header-admin">
        <MailOutlineIcon sx={{ color: 'black' }} />
        <Typography variant="h5" className="recibidos-header-title-admin">
          Recibidos
        </Typography>
      </Box>

      {/* Botones de filtro, organizados en columna */}
      <Box className="recibidos-filter-buttons-admin">
        {categories.map((category) => (
          <Button
          sx={{
            backgroundColor: '#e4007c',
            '&:hover': {
              backgroundColor: '#c3006a',
            },
          }}
            key={category.title}
            variant="contained"
            onClick={() => handleCategoryChange(category.title)}
            className={`recibidos-filter-button-admin ${selectedCategory === category.title ? 'recibidos-filter-button-active-admin' : ''}`}
          >
            {category.title === 'Aceptados' ? <CheckCircleIcon /> : null}
            {category.title === 'Rechazados' ? <CancelIcon /> : null}
            {category.title}
          </Button>
        ))}
      </Box>

      {/* Lista filtrada de items */}
      {/* <Box className="recibidos-item-list-admin">
        {filteredItems.map((item, index) => (
          <Typography key={index} variant="body1" className="recibidos-item-admin">
            {item}
          </Typography>
        ))}
      </Box> */}
    </Box>
  );
};

export default Recibidos;
