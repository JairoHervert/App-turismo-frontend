import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon, MailOutline as MailOutlineIcon } from '@mui/icons-material';
import '../../css/Admin2.css';

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
      <Box className="recibidos-header-admin" display="flex" alignItems="center">
        <MailOutlineIcon sx={{ color: 'black', fontSize: { xs: 16, sm: 20 } }} />
        <Typography 
          variant="h5" 
          className="recibidos-header-title-admin" 
          sx={{ fontSize: { xs: '0.9rem', sm: '1.2rem' }, fontWeight: 600 }}
        >
          Recibidos
        </Typography>
      </Box>

      {/* Botones de filtro, organizados en columna */}
      <Box className="recibidos-filter-buttons-admin" display="flex" flexDirection="column" gap={1}>
        {categories.map((category) => (
          <Button
            key={category.title}
            variant="contained"
            onClick={() => handleCategoryChange(category.title)}
            className={`recibidos-filter-button-admin ${selectedCategory === category.title ? 'recibidos-filter-button-active-admin' : ''}`}
            sx={{
              backgroundColor: '#e4007c',
              '&:hover': {
                backgroundColor: '#c3006a',
              },
              fontSize: { xs: '0.6rem', sm: '0.8rem' }, 
              padding: { xs: '4px 8px', sm: '6px 12px' }, 
            }}
          >
            {category.title === 'Aceptados' ? <CheckCircleIcon sx={{ fontSize: { xs: 14, sm: 18 } }} /> : null}
            {category.title === 'Rechazados' ? <CancelIcon sx={{ fontSize: { xs: 14, sm: 18 } }} /> : null}
            {category.title}
          </Button>
        ))}
      </Box>


    </Box>
  );
};

export default Recibidos;
