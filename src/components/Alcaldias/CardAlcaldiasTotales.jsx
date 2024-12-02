import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonsMod from '../ButtonsMod';
import { useNavigate } from 'react-router-dom';

export default function CardAlcaldiasTotales({ tituloAlcaldia, descripcion, imagen }) {
    const link = '/Buscador';
    const img = imagen ? require(`../../img/HomePage/places/home-places-${imagen}.jpg`) : '';

    const navigate = useNavigate();

    const funcionAEjecutar = () => {
        navigate(link);
    };

    return (
        <Card
            sx={{
                width: 600,
                height: 300,
                boxShadow: 3,
                margin: '1rem auto', // Ajusta el margen para centrar la tarjeta
                borderRadius: '3px',
            }}
        >
            <CardMedia
                component="img"
                alt={tituloAlcaldia}
                height="140"
                image={img}
                sx={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    objectFit: 'cover',
                }}
            />
            <CardContent sx={{ padding: '1rem', height: '100px',overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {tituloAlcaldia}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {descripcion}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingBottom: '1rem' }}>
                <ButtonsMod
                    variant='principal'
                    textCont='Ver lugares'
                    width='auto'
                    height='2rem'
                    clickEvent={funcionAEjecutar}
                    type='submit'
                />
            </CardActions>
        </Card>
    );
}
