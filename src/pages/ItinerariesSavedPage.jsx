import React, { useEffect, useState } from "react";
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
import { HandleObtenerItinerarios } from "../pagesHandlers/itinerarioG-handler";

function ItinirariesSavePage() {
  const [itinerarios, setItinerarios] = useState([]); // Estado para los itinerarios agrupados

  useEffect(() => {
    const fetchItinerarios = async () => {
      try {
        const response = await HandleObtenerItinerarios(localStorage.getItem("id"));
        console.log("Datos obtenidos de la API:", response);
  
        // Asegúrate de usar la propiedad correcta
        const data = Array.isArray(response) ? response : response.data;
  
        if (!Array.isArray(data)) {
          console.error("La respuesta no es un arreglo:", data);
          return;
        }
  
        // Agrupa los datos por idItinerario
        const groupedItinerarios = data.reduce((acc, item) => {
          if (!acc[item.idItinerario]) {
            acc[item.idItinerario] = [];
          }
          acc[item.idItinerario].push(item);
          return acc;
        }, {});
  
        // Convierte el objeto agrupado en un array para renderizarlo
        setItinerarios(Object.entries(groupedItinerarios)); // [ [idItinerario, eventos[]], ... ]
      } catch (error) {
        console.error("Error al obtener los itinerarios:", error);
      }
    };
  
    fetchItinerarios();
  }, []);
  

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
            />
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
          {itinerarios.map(([idItinerario, eventos], index) => {
            const fechaInicio = eventos[0]?.fechaInicio.split("T")[0];
            const fechaFin = eventos[0]?.fechaFin.split("T")[0];
            const detalles = eventos.map((evento) => evento.NombreLugar || "Lugar desconocido");

            return (
              <ItemItinerarios
                key={idItinerario}
                imagen={eventos[0]?.placeImages?.[0]} // Usa la primera imagen del primer evento
                detalles={detalles} // Muestra los nombres de los lugares
                fechaInicio={fechaInicio} // Usa la fecha de inicio del primer evento
                fechaFin={fechaFin} // Usa la fecha de fin del primer evento
                itinerario={eventos} // Pasa todos los eventos del itinerario
              />
            );
          })}
        </Box>
      </Container>

      <Footer showIncorporaLugar={true} />
    </ThemeProvider>
  );
}

export default ItinirariesSavePage;
