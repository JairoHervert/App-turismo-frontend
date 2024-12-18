import React, { useState, useRef } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import ThemeMaterialUI from "./ThemeMaterialUI";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 19.432608, // Latitud de CDMX
  lng: -99.133209, // Longitud de CDMX
};

function Mapa({ isLoaded }) {
  const [selected, setSelected] = useState(null); // Lugar seleccionado
  const [searchTerm, setSearchTerm] = useState(""); // Texto de búsqueda
  const autocompleteRef = useRef(null); // Referencia del Autocomplete

  // Manejar cuando un lugar es seleccionado en el Autocomplete
  const handlePlaceSelected = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const location = place.geometry.location;
      setSelected({ lat: location.lat(), lng: location.lng() });
    }
  };

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <div style={{ padding: "20px", borderRadius: "8px" }}>
        {/* Barra de Búsqueda */}
        <div style={{ marginBottom: "20px", display: "flex" }}>
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceSelected}
          >
            <TextField
              label="Buscar lugares"
              variant="outlined"
              size="small"
              sx={{ width: 400 }}
              margin="dense"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Autocomplete>
        </div>

        {/* Mapa */}
        <div style={{ borderRadius: "8px", overflow: "hidden" }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={selected || center}
            zoom={12}
          >
            {/* Marcador en la ubicación seleccionada */}
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Mapa;
