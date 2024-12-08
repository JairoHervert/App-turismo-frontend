import React from 'react';
import { Box, Typography, Container, Paper, useMediaQuery, useTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import NavbarAD from '../components/NavBarA';
import Footer from '../components/Footer';
import Dashboard from '../components/Administrador/Dashboard';
import ThemeMaterialUI from '../components/ThemeMaterialUI';
import StatCard from '../components/dashboard/statcard';
import RatedPlaces from '../components/dashboard/ratedplaces';
import PopularCategories from '../components/dashboard/popularplaces';
import RecentRequests from '../components/dashboard/recentrequest';

function DashboardAdmin() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ThemeProvider theme={ThemeMaterialUI}>
            <NavbarAD
                showingresa={false}
                showRegistrate={false}
                transparentNavbarAD={false}
                lightLink={false}
                staticNavbarAD={false}
            />

            <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, minHeight: '100vh', width: '100%' }}>
                    {!isMobile && <Dashboard />}
                    <Box sx={{ flexGrow: 1, width: '100%', ...(isMobile && { mt: 2 }) }}>
                        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.98)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                            <Box sx={{ mb: { xs: 2, sm: 4 } }}>
                                <Typography variant="h4" gutterBottom>
                                    Dashboard
                                </Typography>
                                <Typography color="textSecondary" variant="subtitle1">
                                    Visualiza los datos clave en un solo lugar
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, sm: 2 }, mb: { xs: 2, sm: 3 } }}>
                                {[
                                    { title: "Itinerarios creados", value: "1,259", subtitle: "Itinerarios creados por cuentas registradas y de invitado" },
                                    { title: "Usuarios registrados activos", value: "892", value2: "260 ", subtitle: "usuarios más respecto al mes pasado" },
                                    { title: "Cuentas eliminadas", value: "126", subtitle: "Eliminadas debido a inactividad" }
                                ].map((cardData, index) => (
                                    <Box key={index} sx={{ flex: 1 }}>
                                        <StatCard {...cardData} />
                                    </Box>
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex',  flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, sm: 2 }, mb: { xs: 2, sm: 3 } }}>
                                <RatedPlaces
                                    places={[
                                        { id: '#3534', name: 'Taquería Juan', zone: 'Centro de la Ciudad de México', timesAdded: 12, rating: 5 },
                                        { id: '#4534', name: 'Museo Jumex', zone: 'Norte de la Ciudad de México', timesAdded: 35, rating: 4 },
                                        { id: '#0214', name: 'Lago Hola', zone: 'Sur de la Ciudad de México', timesAdded: 35, rating: 4 }
                                    ]}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, sm: 2 }, mt: { xs: 1, sm: 2 } }}>
                                <Box sx={{ flex: 1 }}>
                                    <PopularCategories
                                        categories={[
                                            { name: 'Naturaleza', percentage: 30 },
                                            { name: 'Gastronomia', percentage: 35 },
                                            { name: 'Culturales', percentage: 35 }
                                        ]}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <RecentRequests
                                        requests={[
                                            { name: "Brandon S.", place: "Papalote Museo del Niño", time: "Hace 2 días" },
                                            { name: "Sofia R.", place: "Cineteca Nacional", time: "Hace 2 días" },
                                            { name: "Emily W.", place: "Museo Frida Kahlo", time: "Hace 3 días" }
                                        ]}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>

            <Footer showIncorporaLugar={false} />
        </ThemeProvider>
    );
}

export default DashboardAdmin;