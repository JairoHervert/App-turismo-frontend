import React, { useState } from 'react';
import { FormControl, FormLabel, TextField, Button, FormHelperText } from '@mui/material';
import { Box } from '@mui/material';

function ItemRegisterPlace({ nombre, ubicacion, descripcion, onSubmit }){

    const [formValues, setFormValues] = React.useState({
        nombre: nombre || '',
        ubicacion: ubicacion || '',
        descripcion: descripcion || ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
            setFormValues({
            ...formValues,
            [name]: value
            });
        };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return(

    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            label="Nombre del Lugar"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            required
        />
        <TextField
            label="Ubicación"
            name="ubicacion"
            value={formValues.ubicacion}
            onChange={handleChange}
            required
        />
        <TextField
            label="Descripción"
            name="descripcion"
            value={formValues.descripcion}
            onChange={handleChange}
            multiline
            rows={4}
            required
        />
        <Button type="submit" variant="contained">Enviar</Button>
    </Box>
    );
}

export default ItemRegisterPlace;