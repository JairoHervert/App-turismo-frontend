import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button, Box, Typography } from '@mui/material';

function AdministratorForm({ open, onClose }) {
    const [categoria, setCategoria] = useState('');

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={false}>
        <DialogTitle>
            <Typography variant="h6" fontWeight="bold">
            Actualizar datos del lugar registrado
            </Typography>
        </DialogTitle>
        <DialogContent>
            <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 2,
            }}
            >
            <TextField
                name="nombre"
                label="Nombre del lugar"
                variant="outlined"
                fullWidth
                sx={{
                '& .MuiInputBase-root': {
                    borderRadius: 1,
                },
                }}
            />
            <TextField
                name="categoria"
                label="Categoría"
                variant="outlined"
                fullWidth
                select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                sx={{
                '& .MuiInputBase-root': {
                    borderRadius: 1,
                },
                }}
            >
                <MenuItem value="">Seleccione una categoría</MenuItem>
                <MenuItem value="opcion1">Opción 1</MenuItem>
                <MenuItem value="opcion2">Opción 2</MenuItem>
            </TextField>
            <TextField
                name="direccion"
                label="Dirección del lugar"
                variant="outlined"
                fullWidth
                sx={{
                '& .MuiInputBase-root': {
                    borderRadius: 1,
                },
                }}
            />
            <TextField
                name="descripcion"
                label="Descripción del lugar"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                sx={{
                '& .MuiInputBase-root': {
                    borderRadius: 1,
                },
                }}
            />
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
                }}
            >
                <TextField
                name="diasApertura"
                label="Días de apertura"
                variant="outlined"
                fullWidth
                sx={{
                    '& .MuiInputBase-root': {
                    borderRadius: 1,
                    },
                }}
                />
                <TextField
                name="costoIngreso"
                label="Costo de ingreso"
                variant="outlined"
                fullWidth
                sx={{
                    '& .MuiInputBase-root': {
                    borderRadius: 1,
                    },
                }}
                />
            </Box>
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
                }}
            >
                <TextField
                name="horaApertura"
                label="Hora de apertura"
                variant="outlined"
                fullWidth
                sx={{
                    '& .MuiInputBase-root': {
                    borderRadius: 1,
                    },
                }}
                />
                <TextField
                name="horaCierre"
                label="Hora de cierre"
                variant="outlined"
                fullWidth
                sx={{
                    '& .MuiInputBase-root': {
                    borderRadius: 1,
                    },
                }}
                />
            </Box>
            <TextField
                name="serviciosAdicionales"
                label="Servicios adicionales"
                variant="outlined"
                fullWidth
                sx={{
                '& .MuiInputBase-root': {
                    borderRadius: 1,
                },
                }}
            />
            <TextField
                name="correoElectronico"
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                sx={{
                '& .MuiInputBase-root': {
                    borderRadius: 1,
                },
                }}
            />
            <TextField
                name="telefono"
                label="Teléfono de contacto"
                variant="outlined"
                fullWidth
                sx={{
                '& .MuiInputBase-root': {
                    borderRadius: 1,
                },
                }}
            />
            <TextField
                name="sitioWeb"
                label="Sitio web"
                variant="outlined"
                fullWidth
                sx={{
                '& .MuiInputBase-root': {
                    borderRadius: 1,
                },
                }}
            />
            </Box>
        </DialogContent>
        <DialogActions
            sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            }}
        >
            <Button variant="contained" color="primary" onClick={onClose}>
            Actualizar
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
            </Button>
        </DialogActions>
        </Dialog>
    );
}

export default AdministratorForm;