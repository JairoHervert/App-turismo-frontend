import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 19.432608, lng: -99.133209 }; // Coordenadas iniciales de CDMX

function PlanRoute({ isLoaded, LugaresCoordenadas }) {
  const [directionsResponse, setDirectionsResponse] = useState(null); // Estado para la ruta
  const [error, setError] = useState(null); // Estado para errores en el servicio de direcciones

  useEffect(() => {
    // Solo ejecuta si el mapa está cargado y hay al menos dos puntos
    if (isLoaded && LugaresCoordenadas.length > 1) {
      const directionsService = new window.google.maps.DirectionsService();

      const waypoints = LugaresCoordenadas.slice(1, -1).map((punto) => ({
        location: { lat: punto.lat, lng: punto.lon },
        stopover: true,
      }));

      directionsService.route(
        {
          origin: { lat: LugaresCoordenadas[0].lat, lng: LugaresCoordenadas[0].lon },
          destination: {
            lat: LugaresCoordenadas[LugaresCoordenadas.length - 1].lat,
            lng: LugaresCoordenadas[LugaresCoordenadas.length - 1].lon,
          },
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error("Error al calcular la ruta:", status);
            setError(`Error al obtener la ruta: ${status}`);
          }
        }
      );
    }
  }, [isLoaded, LugaresCoordenadas]);

  if (!isLoaded) return <Typography>Cargando mapa...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ textAlign: "center", mt: 2, mb: 4 }}>
      <Typography fontWeight="bold" sx={{ mb: 2 }}>
        Consulta la ruta aquí
      </Typography>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {/* Renderiza la ruta */}
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}

        {/* Marcadores personalizados con nombre de lugar */}
        {LugaresCoordenadas.map((lugar, index) => (
          <Marker
            key={index}
            position={{ lat: lugar.lat, lng: lugar.lon }}
            label={{
              text: lugar.nombre || `Punto ${index + 1}`, // Usa el nombre o un texto por defecto
              fontWeight: "bold",
              color: "black",
            }}
          />
        ))}
      </GoogleMap>
    </Box>
  );
}

export default PlanRoute;
