import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon, MailOutline as MailOutlineIcon } from '@mui/icons-material';
import '../../css/AdministradorLugares.css';

const Recibidos = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    { title: 'Todos', icon: null },
    { title: ' Aceptados ', icon: <CheckCircleIcon /> },
    { title: 'Rechazados', icon: <CancelIcon /> },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems = categories.find(category => category.title === selectedCategory)?.items || [];

  return (
    <Box className="recibidos-container-admin-places" marginTop={'95px'} maxHeight={'250px'}>
      {/* Header del componente Recibidos */}
      <Box className="recibidos-header-admin-places" display="flex" alignItems="center">
        <MailOutlineIcon sx={{ color: 'black', fontSize: { xs: 16, sm: 20 } }} />
        <Typography
          variant="h5"
          className="recibidos-header-title-admin-places"
          sx={{ fontSize: { xs: '0.9rem', sm: '1.2rem' }, fontWeight: 600 }}
        >
          Recibidos
        </Typography>
      </Box>

      {/* Botones de filtro, organizados en columna */}
   <Box className="recibidos-filter-buttons-admin-places" display="flex" flexDirection="column" gap={1}>
        {categories.map((category) => (
          <Button
            key={category.title}
            variant="contained"
            onClick={() => handleCategoryChange(category.title)}
            sx={{
              backgroundColor: '#e4007c',
              '&:hover': {
                backgroundColor: '#c3006a',
              },
              fontSize: { xs: '0.6rem', sm: '0.8rem' },
              padding: { xs: '4px 8px', sm: '6px 12px' },
            }}
          >
            {category.icon} {category.title}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Recibidos;
