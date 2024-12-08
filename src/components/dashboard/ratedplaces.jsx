import React from 'react';
import {Card,CardContent,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Rating,useTheme,useMediaQuery} from '@mui/material';

function RatedPlacesTable({ places }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card
        elevation={3}
        sx={{
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}
        >
        <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
            Lugares mejor calificados
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
            En los últimos 30 días, estos lugares son los mejor calificados por los usuarios
            </Typography>
            <TableContainer component={Paper}>
            <Table
                size={isSmallScreen ? 'small' : 'medium'}
                aria-label="Tabla de lugares mejor calificados"
            >
                <TableHead>
                <TableRow>
                    <TableCell>ID del lugar</TableCell>
                    <TableCell>Nombre del lugar</TableCell>
                    <TableCell>Zona a la que pertenece</TableCell>
                    <TableCell># de veces agregado</TableCell>
                    <TableCell>Calificación</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {places.map((place) => (
                    <TableRow key={place.id}>
                    <TableCell>{place.id}</TableCell>
                    <TableCell>{place.name}</TableCell>
                    <TableCell>{place.zone}</TableCell>
                    <TableCell>{place.timesAdded}</TableCell>
                    <TableCell>
                        <Rating value={place.rating} readOnly size={isSmallScreen ? 'small' : 'medium'} />
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </CardContent>
        </Card>
    );
}

export default RatedPlacesTable;