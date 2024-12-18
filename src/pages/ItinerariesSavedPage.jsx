import React, { useEffect, useState, useRef } from "react";
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
  const isFetching = useRef(false); // Flag para evitar múltiples llamadas

  useEffect(() => {
    const fetchItinerarios = async () => {
      if (isFetching.current) return; // Evita ejecutar si ya se está ejecutando
      isFetching.current = true;

      try {
        const response = await HandleObtenerItinerarios(localStorage.getItem("id"));

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
      } finally {
        isFetching.current = false; // Libera el flag
      }
    };

    fetchItinerarios();
  }, []); // Dependencias vacías garantizan que solo se ejecute en el montaje

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
            if (!eventos.length) return null; // Evita errores si eventos está vacío
            console.log("Eventos:", eventos[0]);
            const fechaInicio = eventos[0]?.fechaInicio?.split("T")[0] || "N/A";
            const fechaFin = eventos[0]?.fechaFin?.split("T")[0] || "N/A";
            const detalles = eventos.map((evento) => evento.NombreLugar || "Lugar desconocido");
            const imagenLugar = eventos[0]?.Imagen || "default.jpg";
            console.log("Imagen:", imagenLugar);

            return (
              <ItemItinerarios
                key={idItinerario}
                id={idItinerario}
                imagen={`${process.env.PUBLIC_URL}/fotosLugares/${imagenLugar}`} 
                detalles={detalles} 
                fechaInicio={fechaInicio}
                fechaFin={fechaFin} 
                itinerario={eventos}
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
