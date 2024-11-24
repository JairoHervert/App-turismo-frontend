import React from 'react';
import NavbarAD from '../components/NavBarA';
import Footer from '../components/Footer';
import Dashboard from '../components/Administrador/Dashboard';
import {Box, Grid2} from '@mui/material';
import StatCard from '../components/dashboard/statcard';
import RatedPlaces from '../components/dashboard/ratedplaces';
import PopularCategories from '../components/dashboard/popularplaces';
import RecentRequests from '../components/dashboard/recentrequest';
import { Card, CardMedia, CardActionArea, CardContent, Typography, Button, IconButton,Container,useMediaQuery,useTheme} from '@mui/material';

function DashboardAdmin(){

    const chartData = [
        { name: 'Ene', value: 20 },
        { name: 'Feb', value: 30 },
        { name: 'Mar', value: 25 },
        { name: 'Abr', value: 40 },
        { name: 'May', value: 28 },
        { name: 'Jun', value: 32 }
    ];

    return(
        
        <div className='vh-100 vw-100'>
            <NavbarAD
                showingresa={false}
                showRegistrate={false}
                transparentNavbarAD={false}
                lightLink={false}
                staticNavbarAD={false}
            />

            <div className='contenedor-cajas-admin d-flex justify-content-between w-100'>
                
                <div className='contenedor-cajas-admin d-flex justify-content-between w-100 '>
                    <Box marginX={2} sx={{ display: 'flex' }}>
                        <Dashboard />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box
                            component="main"
                            sx={{
                            flexGrow: 1,
                            p: 3,
                            mt: 8,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                            }}
                        >
                            <Container maxWidth="xl">
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h4" gutterBottom>
                                        Dashboard
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Visualiza los datos clave en un solo lugar
                                    </Typography>
                                </Box>

                                <Grid2 container spacing={3} sx={{ mb: 3 }}>
                                    <Grid2 item xs={12} md={4}>
                                        <StatCard
                                            title="Itinerarios creados"
                                            value="1,259 itinerarios creados"
                                            subtitle="Itinerarios creados por cuentas registradas y de invitado"
                                            data={chartData}
                                        />
                                    </Grid2>
                                    <Grid2 item xs={12} md={4}>
                                        <StatCard
                                            title="Usuarios registrados activos"
                                            value="892 usuarios"
                                            subtitle="260 usuarios más respecto al mes pasado"
                                            data={chartData}
                                        />
                                    </Grid2>
                                    <Grid2 item xs={12} md={4}>
                                        <StatCard
                                            title="Cuentas eliminadas"
                                            value="126 cuentas"
                                            subtitle="Eliminadas debido a inactividad"
                                            data={chartData}
                                        />
                                    </Grid2>
                                    <Grid2 item xs={12} md={4}>
                                        <RatedPlaces />
                                    </Grid2>
                                    <Grid2 item xs={12} md={4}>
                                        <PopularCategories />
                                    </Grid2>
                                    <Grid2 item xs={12} md={4}>
                                        <RecentRequests />
                                    </Grid2>
                                </Grid2>
                            </Container>
                        </Box>
                    </Box>
                </div>
            </div>

            <Footer showIncorporaLugar={false} />
        </div>
    );

}

export default DashboardAdmin;