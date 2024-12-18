import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../css/ItinerariesSavedPage.css";
import ThemeMaterialUI from "../components/ThemeMaterialUI";
import { ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Stack,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import ItemItinerarios from "../components/ItinerariosSaved/CardItinerarios";

import itinerarios from "../components/ItinerariosSaved/ItinerariosGuardados"; // Importa el arreglo de itinerarios

function ItinirariesSavePage() {

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Navbar
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
          >
            <BookmarkIcon
              color="primary"
              fontSize="inhert"
              className="it_pag-icono-book"
            />{" "}
            {/* Ahora usa el color primario del tema */}
            <h1 className="it-page-title">Itinerarios guardados</h1>
          </Stack>

          <TextField
            label="Buscar en itinerarios guardados"
            variant="outlined"
            size="small"
            sx={{ maxWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Box
          className="resume-calendar-container"
          sx={{ maxHeight: "65vh", overflowY: "auto" }}
        >
          {itinerarios.map((itinerario, index) => (
            <ItemItinerarios
              key={index}
              imagen={Object.values(itinerario)[0][0].placeImages[0]} // Usa la primera imagen del primer lugar del primer día
              detalles={Object.values(itinerario).flat().map(item => item.placeName)} // Mapea los nombres de los lugares
              fechaInicio={Object.keys(itinerario)[0]} // Usa la primera fecha como fecha de inicio
              fechaFin={Object.keys(itinerario).slice(-1)[0]} // Usa la última fecha como fecha de fin
              presupuesto="1000" // Puedes ajustar esto según tus datos
              viajantes="2" // Puedes ajustar esto según tus datos
              itinerario={itinerario} // Pasa el arreglo itinerario completo
            />
          ))}
        </Box>
      </Container>

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  );
}

export default ItinirariesSavePage;