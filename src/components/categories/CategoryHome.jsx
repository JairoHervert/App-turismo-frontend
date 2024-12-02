// App.jsx
import React, { useState, useEffect } from 'react';
import CategorySection from './CategorySection';
import { handleCategorias4Lugar, handleCategorias4LugarUsuario } from '../../pagesHandlers/place-handler';
import { useNavigate } from 'react-router-dom';

import '../../css/HomePage.css';
import { Navigate } from 'react-router-dom';
import { handleFavoritos, handleDeseados } from '../../pagesHandlers/favDeseados-handler';
import places from './CategoriesArrays';
const CategoryHome = ({ isLogged, id }) => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomCategories, setRandomCategories] = useState([]);
  const [clickedDeseados, setClickedDeseados] = useState({});
  const [clickedFavoritos, setClickedFavoritos] = useState({});

  const allCategories = ["Deportes", "Comida Rápida", "Restaurante", "Cafeteria", "Bar", "Arte", "Historia", "Museos", "Educativos", "Compras", "Parques", "Juegos Recreativos al Aire Libre", "Juegos Recreativos Bajo Techo", "Zoológicos", "Religión"];

  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const getRandomCategories = () => {
      const shuffled = allCategories.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    };

    const fetchLugares = async () => {
      try {
        let resultado;
        if (id) {
          resultado = await handleCategorias4LugarUsuario(
            id,
            randomCategories[0],
            randomCategories[1],
            randomCategories[2],
            randomCategories[3]
          );
          // Inicializa los estados basados en los valores iniciales
          const initialDeseados = {};
          const initialFavoritos = {};
          resultado.forEach((place) => {
            initialDeseados[place.id] = place.esDeseado;
            initialFavoritos[place.id] = place.esFavorito;
          });
          setClickedDeseados(initialDeseados);
          setClickedFavoritos(initialFavoritos);
        } else {
          resultado = await handleCategorias4Lugar(
            randomCategories[0],
            randomCategories[1],
            randomCategories[2],
            randomCategories[3]
          );
        }
        setLugares(resultado);
        console.log(resultado);
      } catch (error) {
        console.error('Error al obtener foto del lugar', error);
      }
    };

    const randomCategories = getRandomCategories();
    setRandomCategories(randomCategories);
    setSelectedCategory(randomCategories[Math.floor(Math.random() * randomCategories.length)]);
    fetchLugares();
  }, [id]); // Ahora escuchamos cambios en `id`

  const toggleDeseados = async (placeId) => {
    if (!isLogged) {
      navigate("/login");
      return;
    }

    try {
      const newState = await handleDeseados(id, placeId); // Llama a tu función SQL
      let estado = false;
      if(newState.message)
        estado = newState.message == "Lugar agregado a deseados";
      setClickedDeseados((prevState) => ({
        ...prevState,
        [placeId]: estado,
      }));
    } catch (error) {
      console.error("Error al cambiar deseados:", error);
    }
  };

  const toggleFavoritos = async (placeId) => {
    if (!isLogged) {
      navigate("/login");
      return;
    }

    try {
      const newState = await handleFavoritos(id, placeId); // Llama a tu función SQL
      let estado = false;
      if(newState.message)
        estado = newState.message == "Lugar agregado a favoritos";
      setClickedFavoritos((prevState) => ({
        ...prevState,
        [placeId]: estado,
      }));
    } catch (error) {
      console.error("Error al cambiar favoritos:", error);
    }
  };

  const filteredPlaces = lugares.filter(place => place.categoria === selectedCategory);

  return (
    <div>
      <nav className="nav mt-3 secondary-nav">
        {randomCategories.map(category => (
          <button
            key={category}
            className={`nav-link ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <br />
      <CategorySection
        isLogged={isLogged}
        places={filteredPlaces}
        clickedDeseados={clickedDeseados}
        clickedFavoritos={clickedFavoritos}
        onDeseadosClick={toggleDeseados}
        onFavoritosClick={toggleFavoritos}
      />
    </div>
  );
};

export default CategoryHome;
