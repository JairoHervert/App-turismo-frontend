import React, { useRef, useState } from "react";
import { GoogleMap, useLoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import ThemeMaterialUI from './ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 19.432608, // Latitud de CDMX
  lng: -99.133209, // Longitud de CDMX
};

const MapWithSearch = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY, // Reemplaza con tu clave de API
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const autocompleteRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (!isLoaded) return <div>Cargando mapa...</div>;

  // Opciones para restringir el autocomplete
  const autocompleteOptions = {
    bounds: {
      north: 19.592757, // Límite norte de CDMX
      south: 19.12228,  // Límite sur de CDMX
      east: -98.940154, // Límite este de CDMX
      west: -99.363648, // Límite oeste de CDMX
    },
    strictBounds: true, // Activar restricción estricta
    componentRestrictions: { country: "mx" }, // Restringir solo a México
  };

  const handlePlaceSelected = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      setSelected({
        lat: location.lat(),
        lng: location.lng(),
      });
    }
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <div style={{ paddingRight: "20px", paddingLeft:'20px', paddingTop:'5px', borderRadius: "8px" }}>
        <div style={{ marginBottom: "20px", display: "flex",  }}>
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceSelected}
            options={autocompleteOptions}
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
        <div style={{ borderRadius: "8px", overflow: "hidden" }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={selected || center}
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MapWithSearch;


/* 
import React from 'react';
import mapImage from '../img/HomePage/mapa.png';


function FullSizeMapPlaceholder() {
    return (
        <div
            style={{
                width: '100%',
                height: '500px', // Ajusta el alto
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <img
                src={mapImage}
                alt="Mapa estático"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Ajusta la imagen para cubrir todo el área sin distorsión
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '1.2em',
                    textAlign: 'center',
                }}
            >
                Próximamente: Mapa interactivo
            </div>
        </div>
    );
}

export default FullSizeMapPlaceholder;

*/