// InfoDialog.jsx
import React from 'react';
import { pink } from '@mui/material/colors';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box } from '@mui/material';
import ButtonsMod from '../ButtonsMod';

function InfoDialog({ open, onClose, titulo, fechaInicio, fechaFinal, presupuesto, viajantes, detalles }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ fontFamily: 'Montserrat, sans-serif', color: pink[600], fontWeight: 'bold' }}>Información sobre el itinerario</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <Typography variant="body1">
                        <strong>Nombre:</strong> Itinerario {titulo}
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="body1">
                        <strong>Fecha de inicio:</strong> {fechaInicio}
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="body1">
                        <strong>Fecha de fin:</strong> {fechaFinal}
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="body1">
                        <strong>Presupuesto:</strong> ${presupuesto}
                    </Typography>
                </Box>                
                <Box mb={2}>
                    <Typography variant="body1">
                        <strong>Número de viajantes: </strong> {viajantes}
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="body1">
                        <strong>Lugares visitados: </strong>
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                        {detalles.map((detalle, index) => (
                            <Typography key={index} component="li" variant="body2">
                                {detalle}
                            </Typography>
                        ))}
                    </Box>
                </Box>

            </DialogContent>
            <DialogActions>
                <ButtonsMod textCont='Salir'  height='2rem' width='auto' clickEvent={onClose} color="secondary"/>
            </DialogActions>
        </Dialog>
    );
}

export default InfoDialog;
