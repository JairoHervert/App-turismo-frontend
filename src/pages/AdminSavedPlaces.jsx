import React from "react";
import NavbarAD from '../components/NavBarA';
import Footer from "../components/Footer";
import "../css/ItinerariesSavedPage.css";
import ThemeMaterialUI from "../components/ThemeMaterialUI";
import { ThemeProvider } from "@mui/material/styles";
import {Container,Stack,TextField,Box,InputAdornment, Paper} from "@mui/material";
import {Search as SearchIcon,Bookmark as BookmarkIcon,} from "@mui/icons-material";
import AdminPlacesSaved from "../components/PlacesAd/AdminPlacesSaved";
import Dashboard from '../components/Administrador/Dashboard';

import PlacesSaved from "../components/PlacesAd/PlacesSaved";

function AdminSavedPlaces() {

return (
    <ThemeProvider theme={ThemeMaterialUI}>
        <NavbarAD
            showingresa={false}
            showRegistrate={false}
            transparentNavbar={false}
            lightLink={false}
            staticNavbar={false}
        />

        <Container maxWidth="lg" className="it-my-4">
            <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems="center"
            className="it-mb-4"
            justifyContent={{ sm: "space-between" }}
            >
            
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    className="it-mb-2"
                    sx={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    <BookmarkIcon
                    color="primary"
                    fontSize="inhert"
                    className="it_pag-icono-book"
                    />{" "}
                    {/* Ahora usa el color primario del tema */}
                    <h1 className="it-page-title" >Tus lugares</h1>
                </Stack>

            </Stack>

            <Box
                className="resume-calendar-container"
                sx={{ maxHeight: "65vh", overflowY: "auto" }}
                >
                {PlacesSaved.map((itinerario, index) => (
                    <AdminPlacesSaved
                    key={index}
                    imagen={itinerario.imagen}
                    nombre={itinerario.nombre}
                    detalles={itinerario.detalles}
                    rating={itinerario.rating}
                    categoria={itinerario.categoria}
                    />
                ))}
            </Box>

        </Container>

        <Footer showIncorporaLugar={true} />
    </ThemeProvider>
    );
}

export default AdminSavedPlaces;