// InfoDialog.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box } from '@mui/material';

function InfoDialog({ open, onClose, titulo, fecha, detalles }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Información sobre el itinerario</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <Typography variant="body1">
                        <strong>Nombre:</strong> {titulo}
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="body1">
                        <strong>Fecha:</strong> {fecha}
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="body1">
                        <strong>Lugares:</strong> {detalles}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default InfoDialog;
