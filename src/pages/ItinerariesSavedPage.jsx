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

import itinerariosGuardados from "../components/ItinerariosSaved/ItinerariosGuardados";

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
          {itinerariosGuardados.map((itinerario, index) => (
            <ItemItinerarios
              key={index}
              imagen={itinerario.imagen}
              detalles={itinerario.detalles}
              fechaInicio={itinerario.fechaInicio}
              fechaFin={itinerario.fechaFin}
              presupuesto={itinerario.presupuesto}
              viajantes={itinerario.viajantes}
            />
          ))}
        </Box>
      </Container>

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  );
}

export default ItinirariesSavePage;
