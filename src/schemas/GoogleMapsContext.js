import React, { createContext, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";

// Crear el contexto
const GoogleMapsContext = createContext();

// Proveedor del contexto
export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

// Hook para usar el contexto
export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};
