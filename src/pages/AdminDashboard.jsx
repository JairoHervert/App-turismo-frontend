import React from 'react';
import NavbarAD from '../components/NavBarA';
import Footer from '../components/Footer';
import Dashboard from '../components/Administrador/Dashboard';
import {Box, Grid2, Typography, Container, Paper, Card, CardContent} from '@mui/material';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import StatCard from '../components/dashboard/statcard';
import RatedPlaces from '../components/dashboard/ratedplaces';
import PopularCategories from '../components/dashboard/popularplaces';
import RecentRequests from '../components/dashboard/recentrequest';

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
        <ThemeProvider theme={ThemeMaterialUI}>
            <NavbarAD
                showingresa={false}
                showRegistrate={false}
                transparentNavbarAD={false}
                lightLink={false}
                staticNavbarAD={false}
            />
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <Container maxWidth="xl" sx={{ my: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* Menú lateral */}
                            <Dashboard />

                        {/* Contenido principal */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Paper elevation={3} sx={{
                                p: 3,
                                borderRadius: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                            }}>
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h4" gutterBottom>
                                        Dashboard
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Visualiza los datos clave en un solo lugar
                                    </Typography>
                                </Box>

                                <Grid2 container spacing={2} sx={{ mb: 3 }}>
                                    <Grid2 item xs={12} md={4}>
                                        <StatCard
                                            title="Itinerarios creados"
                                            value="1,259"
                                            subtitle="Itinerarios creados por cuentas registradas y de invitado"
                                        />
                                    </Grid2>
                                    <Grid2 item xs={12} md={4}>
                                        <StatCard
                                            title="Usuarios registrados activos"
                                            value="892"
                                            subtitle="260 usuarios más respecto al mes pasado"
                                        />
                                    </Grid2>
                                    <Grid2 item xs={12} md={4}>
                                        <StatCard
                                            title="Cuentas eliminadas"
                                            value="126"
                                            subtitle="Eliminadas debido a inactividad"
                                        />
                                    </Grid2>
                                </Grid2>

                                {/* Sección de calificación */}
                                <RatedPlaces
                                    places={[
                                        { id: '#3534', name: 'Taquería Juan', zone: 'Centro de la Ciudad de México', timesAdded: 12, rating: 5 },
                                        { id: '#4534', name: 'Museo Jumex', zone: 'Norte de la Ciudad de México', timesAdded: 35, rating: 4 },
                                        { id: '#0214', name: 'Lago Hola', zone: 'Sur de la Ciudad de México', timesAdded: 35, rating: 4 }
                                    ]}
                                />

                                <Grid2 container spacing={2} sx={{ mt: 2}}>
                                    
                                    <Grid2 item xs={12} md={6}>
                                        <PopularCategories
                                            categories={[
                                                {name: 'Naturaleza', percentage: 30},
                                                {name: 'Naturaleza', percentage: 35},
                                                {name: 'Naturaleza', percentage: 45}
                                            ]}
                                        />
                                    </Grid2>

                                    <Grid2 item xs={12} md={10}>
                                        <RecentRequests
                                            requests={[
                                                { name: "Brandon S.", place: "Papalote Museo del Niño", time: "Hace 2 días" },
                                                { name: "Sofia R.", place: "Cineteca Nacional", time: "Hace 2 días" },
                                                { name: "Emily W.", place: "Museo Frida Kahlo", time: "Hace 3 días" }
                                            ]}
                                        />
                                    </Grid2>


                                </Grid2>
                            </Paper>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Footer showIncorporaLugar={false} />
        </ThemeProvider>
    );
}

export default DashboardAdmin;