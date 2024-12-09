// App.jsx
import React, { useState, useEffect } from 'react';
import CategorySection from './CategorySection';
import { handleCategorias4Lugar, handleCategorias4LugarUsuario } from '../../pagesHandlers/place-handler';
import { useNavigate } from 'react-router-dom';

import '../../css/HomePage.css';
import { Navigate } from 'react-router-dom';
import { handleFavoritos, handleDeseados } from '../../pagesHandlers/favDeseados-handler';
import { handleUserCategorias } from '../../pagesHandlers/user_handler';
import { handleCategorias } from '../../pagesHandlers/place-handler';
import places from './CategoriesArrays';

const CategoryHome = ({ isLogged, id }) => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomCategories, setRandomCategories] = useState([]);
  const [clickedDeseados, setClickedDeseados] = useState({});
  const [clickedFavoritos, setClickedFavoritos] = useState({});

  const allCategories = ["Arcades", "Arenas de luchas", "Arte y cultura", "Bares", "Bibliotecas", "Boleras", "Bufés", "Cafeterías", "Clubes", "Comida rápida y botanas", "Compras y souvenirs", "Karaokes", "Lugares de Aventura", "Lugares históricos", "Lugares religiosos", "Marisquerías", "Museos", "Parques", "Parques de diversiones", "Parques de skate", "Patinaje sobre hielo", "Restaurantes", "Restaurantes africanos", "Restaurantes americanos", "Restaurantes asiáticos", "Restaurantes brasileños", "Restaurantes de medio oriente", "Restaurantes europeos", "Restaurantes mexicanos", "Salones de té", "Steak houses", "Zoológicos"];

  const [categorias, setCategorias] = useState([]);
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const getRandomCategories = (categorias) => {
      const shuffled = categorias.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    };

    const getCategorias = async () => {
      try {
        let lista_categorias;
        if(id) {
          const resultado = await handleUserCategorias(id);
          console.log(id);
          console.log(resultado);

          const categoriasFavoritas = resultado.filter(categoria => categoria.esFavorita === 1);
          let categoriasCompletas = [...categoriasFavoritas];

          if (categoriasCompletas.length < 4) {
            const categoriasNoFavoritas = resultado.filter(
              categoria => categoria.esFavorita !== 1 && !categoriasCompletas.includes(categoria)
            );

            while (categoriasCompletas.length < 4 && categoriasNoFavoritas.length > 0) {
              const randomIndex = Math.floor(Math.random() * categoriasNoFavoritas.length);
              categoriasCompletas.push(categoriasNoFavoritas[randomIndex]);
              categoriasNoFavoritas.splice(randomIndex, 1); // Evitar duplicados
            }
          }
          lista_categorias = categoriasCompletas;
          setCategorias(categoriasCompletas);
        } else {
          const resultado = await handleCategorias(id);
          lista_categorias = resultado;
          setCategorias(resultado);
        }
        console.log('Categorias seleccionadas:', lista_categorias);
        const randomCategories = getRandomCategories(lista_categorias);
        setRandomCategories(randomCategories);
        setSelectedCategory(randomCategories.length > 0 ? randomCategories[Math.floor(Math.random() * randomCategories.length)].nombre : "");
      } catch (error) {
        console.error('No se pudieron conseguir las categorías', error);
      }
    }

    getCategorias();
  }, [id]); // Ahora escuchamos cambios en `id`

  useEffect(() => {
    const fetchLugares = async () => {
      try {
        let resultado;
        console.log("fetchLugares", randomCategories);
        if (id) {
          resultado = await handleCategorias4LugarUsuario(
            id,
            randomCategories[0].nombre,
            randomCategories[1].nombre,
            randomCategories[2].nombre,
            randomCategories[3].nombre
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
            randomCategories[0].nombre,
            randomCategories[1].nombre,
            randomCategories[2].nombre,
            randomCategories[3].nombre
          );
        }
        setLugares(resultado);
        console.log(resultado);
      } catch (error) {
        console.error('Error al obtener foto del lugar', error);
      }
    };

    fetchLugares();
  }, [randomCategories]); 

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
  console.log("filteredPlaces", filteredPlaces)

  return (
    <div>
      <nav className="nav mt-3 secondary-nav">
      {randomCategories.map(category => (
        <button
          key={category.id} // Usa una clave única, como el ID
          className={`nav-link ${selectedCategory === category.nombre ? "active" : ""}`}
          onClick={() => setSelectedCategory(category.nombre)} // Usa `nombre` como categoría seleccionada
        >
          {category.nombre} {/* Renderiza el nombre de la categoría */}
        </button>
      ))}
      </nav>

      <br />
      {<CategorySection
        isLogged={isLogged}
        places={filteredPlaces}
        clickedDeseados={clickedDeseados}
        clickedFavoritos={clickedFavoritos}
        onDeseadosClick={toggleDeseados}
        onFavoritosClick={toggleFavoritos}
      />}
    </div>
  );
};

export default CategoryHome;
