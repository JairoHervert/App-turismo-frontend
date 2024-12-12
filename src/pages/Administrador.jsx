import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarAD from '../components/NavBarA';
import Footer from '../components/Footer';
import Dashboard from '../components/Administrador/Dashboard';
import FormularioLugar from '../components/Administrador/MainBox';
import Recibidos from '../components/Administrador/Recibidos';

function SearchHistoryPageHistory() {
  const location = useLocation();
  const lugar = location.state?.lugar;  // Aquí obtenemos los datos del lugar

  // Lista de lugares (simulada con un estado)
  const [lugares] = useState([
    { nombre: 'Lugar 1', estado: 'Aceptado' },
    { nombre: 'Lugar 2', estado: 'Rechazado' },
    { nombre: 'Lugar 3', estado: 'Aceptado' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLugar, setSelectedLugar] = useState(null);

  // Filtrar lugares según la categoría seleccionada
  const filteredLugares = lugares.filter(lugar => 
    selectedCategory === 'Todos' || lugar.estado === selectedCategory
  );

  // Actualizar el lugar seleccionado cada vez que se cambia la categoría
  useEffect(() => {
    if (filteredLugares.length > 0) {
      setSelectedLugar(filteredLugares[0]);  // Mostrar el primer lugar de la categoría seleccionada
    } else {
      setSelectedLugar(null);  // Si no hay lugares, se resetea el lugar seleccionado
    }
  }, [selectedCategory, filteredLugares]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);  // Cambiar la categoría
  };

  return (
    <div className='contenedor-cajas-admin vh-100 vw-100 ad-places-text'>
      <NavbarAD
        showingresa={false}
        showRegistrate={false}
        transparentNavbarAD={false}
        lightLink={false}
        staticNavbarAD={false}
      />

      {/* Contenedor principal para Dashboard y FormularioLugar */}
      <div className="contenedor-principal">
        <div className="">
          <Dashboard />
        </div>
        <div className="main-content-container">
  {/*  esta       
     <Recibidos
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          /> */}

          {/* Mostrar el lugar filtrado */}
          {selectedLugar ? (
            <FormularioLugar
              addplace={selectedLugar.nombre}
              nombre="Persona Ejemplo"
              correo="correo@ejemplo.com"
              date="16 de octubre del 2024"
              hour="2:30 p.m."
            />
            
          ) : (
            <p>No se encontraron lugares en esta categoría.</p>
          )}
        </div>
      </div>

      <FooterContainer />
    </div>
  );
}

const FooterContainer = () => (
  <div className="navbar-container-adp">
    <Footer showIncorporaLugar={false} />
  </div>
);

export default SearchHistoryPageHistory;
