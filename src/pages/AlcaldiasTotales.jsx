import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import CardAlcaldiasTotales from '../components/Alcaldias/CardAlcaldiasTotales';
import NavBarHome from '../components/NavBar';
import Footer from '../components/Footer';
import PlaceIcon from '@mui/icons-material/Place';


function AlcaldiasTotales() {

    const datosTarjetas = [
        {
            id: 1,
            titulo: 'Álvaro Obregón',
            descripcion: 'Alcaldía ubicada al poniente de la CDMX, conocida por sus áreas residenciales y comerciales.',
            imagen: 'alvaro-obregon',
        },
        {
            id: 2,
            titulo: 'Azcapotzalco',
            descripcion: 'Alcaldía al noroeste de la CDMX, con una rica historia industrial y cultural.',
            imagen: 'azcapotzalco',
        },
        {
            id: 3,
            titulo: 'Benito Juárez',
            descripcion: 'Alcaldía céntrica, destacada por su desarrollo urbano y calidad de vida.',
            imagen: 'benito-juarez',
        },
        {
            id: 4,
            titulo: 'Coyoacán',
            descripcion: 'Alcaldía al sur de la CDMX, famosa por su centro histórico y ambiente bohemio.',
            imagen: 'coyoacan',
        },
        {
            id: 5,
            titulo: 'Cuajimalpa de Morelos',
            descripcion: 'Alcaldía al poniente, conocida por su zona boscosa y el área de Santa Fe.',
            imagen: 'cuajimalpa',
        },
        {
            id: 6,
            titulo: 'Cuauhtémoc',
            descripcion: 'Corazón de la CDMX, alberga el Centro Histórico y numerosos puntos de interés.',
            imagen: 'cuauhtemoc',
        },
        {
            id: 7,
            titulo: 'Gustavo A. Madero',
            descripcion: 'Alcaldía al norte, hogar de la Basílica de Guadalupe y áreas industriales.',
            imagen: 'gustavo',
        },
        {
            id: 8,
            titulo: 'Iztacalco',
            descripcion: 'Alcaldía en el oriente, combina zonas residenciales con áreas industriales.',
            imagen: 'iztacalco',
        },
        {
            id: 9,
            titulo: 'Iztapalapa',
            descripcion: 'La alcaldía más poblada, conocida por su cultura y tradiciones.',
            imagen: 'iztapalapa',
        },
        {
            id: 10,
            titulo: 'La Magdalena Contreras',
            descripcion: 'Alcaldía al suroeste, destacada por sus áreas naturales y tradiciones.',
            imagen: 'magdalena',
        },
        {
            id: 11,
            titulo: 'Miguel Hidalgo',
            descripcion: 'Alcaldía con zonas emblemáticas como Polanco y Chapultepec.',
            imagen: 'miguel-hidalgo',
        },
        {
            id: 12,
            titulo: 'Milpa Alta',
            descripcion: 'Alcaldía rural al sur, conocida por sus tradiciones y producción agrícola.',
            imagen: 'milpa-alta',
        },
        {
            id: 13,
            titulo: 'Tláhuac',
            descripcion: 'Alcaldía al sureste, combina áreas urbanas con zonas rurales y chinampas.',
            imagen: 'tlahuac',
        },
        {
            id: 14,
            titulo: 'Tlalpan',
            descripcion: 'La alcaldía más extensa, con bosques y zonas urbanas al sur de la CDMX.',
            imagen: 'tlalpan',
        },
        {
            id: 15,
            titulo: 'Venustiano Carranza',
            descripcion: 'Alcaldía céntrica, alberga el Aeropuerto Internacional de la Ciudad de México.',
            imagen: 'ven-carranza',
        },
        {
            id: 16,
            titulo: 'Xochimilco',
            descripcion: 'Famosa por sus canales y trajineras, patrimonio cultural de la humanidad.',
            imagen: 'xochimilco',
        },
    ];

    return (
        <>
            <NavBarHome />
            <Grid sx={{ marginBottom: '1.5rem', padding: { xs: '0 2rem', sm: '0 2rem', md: '0 3rem' } }}>
            <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <PlaceIcon sx={{ fontSize: '2.5rem', marginRight: '0.5rem', color: '#C80164' }} />
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'Monsterrat, sans-serif',
                        fontSize: '3rem',
                        fontWeight: 700,
                        textAlign: 'center',
                    }}
                >
                    Alcaldías de la Ciudad de México
                </Typography>
            </Grid>

            <Grid container spacing={2} justifyContent="center" alignItems="center" >
                {datosTarjetas.map((datos) => (
                    <Grid
                        item
                        key={datos.id}
                        xs={12} sm={6} md={4}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <CardAlcaldiasTotales
                            tituloAlcaldia={datos.titulo}
                            descripcion={datos.descripcion}
                            imagen={datos.imagen}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid >
            <Footer />
        </>
    );
}

export default AlcaldiasTotales;