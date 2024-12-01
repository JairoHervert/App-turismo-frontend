// App.jsx
import React, { useState, useEffect } from 'react';
import CategorySection from './CategorySection';
import { handleCategorias4Lugar, handleCategorias4LugarUsuario } from '../../pagesHandlers/place-handler';
import { useNavigate } from 'react-router-dom';

import '../../css/HomePage.css';
import { Navigate } from 'react-router-dom';

const CategoryHome = ({isLogged, id}) => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomCategories, setRandomCategories] = useState([]);
  const [clickedDeseados, setClickedDeseados] = useState({});
  const [clickedFavoritos, setClickedFavoritos] = useState({});
  
  const allCategories = ["Deportes", "Comida Rápida", "Restaurante", "Cafeteria", "Bar", "Arte", "Historia", "Museos", "Educativos", "Compras", "Parques", "Juegos Recreativos al Aire Libre", "Juegos Recreativos Bajo Techo", "Zoológicos", "Religión"];

  const places = [
    // Deportes
    { categoria: "Deportes", imagen: "1", nombre: "Lugar Deportivo 1", descripcion: "Descripción larga del lugar deportivo 1." },
    { categoria: "Deportes", imagen: "2", nombre: "Lugar Deportivo 2", descripcion: "Descripción larga del lugar deportivo 2." },
    { categoria: "Deportes", imagen: "3", nombre: "Lugar Deportivo 3", descripcion: "Descripción larga del lugar deportivo 3." },
    { categoria: "Deportes", imagen: "4", nombre: "Lugar Deportivo 4", descripcion: "Descripción larga del lugar deportivo 4." },
    { categoria: "Deportes", imagen: "5", nombre: "Lugar Deportivo 5", descripcion: "Descripción larga del lugar deportivo 5." },
    { categoria: "Deportes", imagen: "6", nombre: "Lugar Deportivo 6", descripcion: "Descripción larga del lugar deportivo 6." },

    // Comida Rápida
    { categoria: "Comida Rápida", imagen: "1", nombre: "Lugar de Comida Rápida 1", descripcion: "Este restaurante de comida rápida es conocido por sus deliciosas hamburguesas y papas fritas. El servicio es rápido y eficiente, y los precios son razonables. Es un lugar perfecto para una comida rápida y sabrosa." },
    { categoria: "Comida Rápida", imagen: "2", nombre: "Lugar de Comida Rápida 2", descripcion: "Un lugar de comida rápida que ofrece una amplia variedad de opciones, incluyendo pizzas, sándwiches y ensaladas. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y amable. Es un lugar ideal para una comida rápida y deliciosa." },
    { categoria: "Comida Rápida", imagen: "3", nombre: "Lugar de Comida Rápida 3", descripcion: "Este restaurante de comida rápida es conocido por sus deliciosos tacos y burritos. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y eficiente. Es un lugar perfecto para una comida rápida y sabrosa." },
    { categoria: "Comida Rápida", imagen: "4", nombre: "Lugar de Comida Rápida 4", descripcion: "Un lugar de comida rápida que ofrece una amplia variedad de opciones, incluyendo pollo frito, hamburguesas y ensaladas. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y amable. Es un lugar ideal para una comida rápida y deliciosa." },
    { categoria: "Comida Rápida", imagen: "5", nombre: "Lugar de Comida Rápida 5", descripcion: "Este restaurante de comida rápida es conocido por sus deliciosas pizzas y pastas. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y eficiente. Es un lugar perfecto para una comida rápida y sabrosa." },
    { categoria: "Comida Rápida", imagen: "6", nombre: "Lugar de Comida Rápida 6", descripcion: "Un lugar de comida rápida que ofrece una amplia variedad de opciones, incluyendo sándwiches, wraps y ensaladas. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y amable. Es un lugar ideal para una comida rápida y deliciosa." },

    // Restaurante
    { categoria: "Restaurante", imagen: "1", nombre: "Restaurante 1", descripcion: "Este restaurante ofrece una experiencia gastronómica única con una amplia variedad de platos internacionales. Los ingredientes son frescos y de alta calidad, y el servicio es excepcional. Es un lugar perfecto para una cena elegante." },
    { categoria: "Restaurante", imagen: "2", nombre: "Restaurante 2", descripcion: "Un restaurante que ofrece una amplia variedad de platos locales e internacionales. Los ingredientes son frescos y de alta calidad, y el servicio es amable y eficiente. Es un lugar ideal para una comida deliciosa y memorable." },
    { categoria: "Restaurante", imagen: "3", nombre: "Restaurante 3", descripcion: "Este restaurante es conocido por sus deliciosos mariscos y platos de pescado. Los ingredientes son frescos y de alta calidad, y el servicio es excepcional. Es un lugar perfecto para una cena elegante y sabrosa." },
    { categoria: "Restaurante", imagen: "4", nombre: "Restaurante 4", descripcion: "Un restaurante que ofrece una amplia variedad de platos vegetarianos y veganos. Los ingredientes son frescos y de alta calidad, y el servicio es amable y eficiente. Es un lugar ideal para una comida deliciosa y saludable." },
    { categoria: "Restaurante", imagen: "5", nombre: "Restaurante 5", descripcion: "Este restaurante es conocido por sus deliciosos platos de carne y parrilladas. Los ingredientes son frescos y de alta calidad, y el servicio es excepcional. Es un lugar perfecto para una cena elegante y sabrosa." },
    { categoria: "Restaurante", imagen: "6", nombre: "Restaurante 6", descripcion: "Un restaurante que ofrece una amplia variedad de platos italianos, incluyendo pastas, pizzas y risottos. Los ingredientes son frescos y de alta calidad, y el servicio es amable y eficiente. Es un lugar ideal para una comida deliciosa y memorable." },

    // Cafeteria
    { categoria: "Cafeteria", imagen: "1", nombre: "Cafeteria 1", descripcion: "Esta cafetería es conocida por sus deliciosos cafés y pasteles. El ambiente es acogedor y relajante, y el servicio es amable y eficiente. Es un lugar perfecto para disfrutar de una taza de café y un pastel." },
    { categoria: "Cafeteria", imagen: "2", nombre: "Cafeteria 2", descripcion: "Una cafetería que ofrece una amplia variedad de cafés, tés y pasteles. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar ideal para disfrutar de una taza de café y un pastel." },
    { categoria: "Cafeteria", imagen: "3", nombre: "Cafeteria 3", descripcion: "Esta cafetería es conocida por sus deliciosos desayunos y brunches. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar perfecto para disfrutar de una comida deliciosa y relajante." },
    { categoria: "Cafeteria", imagen: "4", nombre: "Cafeteria 4", descripcion: "Una cafetería que ofrece una amplia variedad de sándwiches, ensaladas y pasteles. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar ideal para disfrutar de una comida deliciosa y relajante." },
    { categoria: "Cafeteria", imagen: "5", nombre: "Cafeteria 5", descripcion: "Esta cafetería es conocida por sus deliciosos helados y postres. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar perfecto para disfrutar de un postre delicioso y relajante." },
    { categoria: "Cafeteria", imagen: "6", nombre: "Cafeteria 6", descripcion: "Una cafetería que ofrece una amplia variedad de bebidas frías y calientes, así como pasteles y postres. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar ideal para disfrutar de una bebida y un postre." },

    // Bar
    { categoria: "Bar", imagen: "1", nombre: "Bar 1", descripcion: "Este bar es conocido por sus deliciosos cócteles y su ambiente animado. El servicio es amable y eficiente, y los precios son razonables. Es un lugar perfecto para disfrutar de una noche divertida con amigos." },
    { categoria: "Bar", imagen: "2", nombre: "Bar 2", descripcion: "Un bar que ofrece una amplia variedad de bebidas, incluyendo cervezas, vinos y cócteles. El ambiente es animado y acogedor, y el servicio es amable y eficiente. Es un lugar ideal para disfrutar de una noche divertida con amigos." },
    { categoria: "Bar", imagen: "3", nombre: "Bar 3", descripcion: "Este bar es conocido por sus deliciosas tapas y su ambiente animado. El servicio es amable y eficiente, y los precios son razonables. Es un lugar perfecto para disfrutar de una noche divertida con amigos." },
    { categoria: "Bar", imagen: "4", nombre: "Bar 4", descripcion: "Un bar que ofrece una amplia variedad de bebidas y aperitivos. El ambiente es animado y acogedor, y el servicio es amable y eficiente. Es un lugar ideal para disfrutar de una noche divertida con amigos." },
    { categoria: "Bar", imagen: "5", nombre: "Bar 5", descripcion: "Este bar es conocido por sus deliciosas cervezas artesanales y su ambiente animado. El servicio es amable y eficiente, y los precios son razonables. Es un lugar perfecto para disfrutar de una noche divertida con amigos." },
    { categoria: "Bar", imagen: "6", nombre: "Bar 6", descripcion: "Un bar que ofrece una amplia variedad de bebidas y cócteles. El ambiente es animado y acogedor, y el servicio es amable y eficiente. Es un lugar ideal para disfrutar de una noche divertida con amigos." },

    // Arte
    { categoria: "Arte", imagen: "1", nombre: "Lugar de Arte 1", descripcion: "Este lugar de arte es conocido por sus impresionantes exposiciones de arte contemporáneo. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar perfecto para los amantes del arte." },
    { categoria: "Arte", imagen: "2", nombre: "Lugar de Arte 2", descripcion: "Un lugar de arte que ofrece una amplia variedad de exposiciones de arte moderno y contemporáneo. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar ideal para los amantes del arte." },
    { categoria: "Arte", imagen: "3", nombre: "Lugar de Arte 3", descripcion: "Este lugar de arte es conocido por sus impresionantes exposiciones de arte clásico y contemporáneo. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar perfecto para los amantes del arte." },
    { categoria: "Arte", imagen: "4", nombre: "Lugar de Arte 4", descripcion: "Un lugar de arte que ofrece una amplia variedad de exposiciones de arte contemporáneo y moderno. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar ideal para los amantes del arte." },
    { categoria: "Arte", imagen: "5", nombre: "Lugar de Arte 5", descripcion: "Este lugar de arte es conocido por sus impresionantes exposiciones de arte contemporáneo y moderno. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar perfecto para los amantes del arte." },
    { categoria: "Arte", imagen: "6", nombre: "Lugar de Arte 6", descripcion: "Un lugar de arte que ofrece una amplia variedad de exposiciones de arte clásico y contemporáneo. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar ideal para los amantes del arte." },

    // Historia
    { categoria: "Historia", imagen: "1", nombre: "Lugar Histórico 1", descripcion: "Este lugar histórico es conocido por su rica historia y su impresionante arquitectura. Es un lugar perfecto para aprender sobre el pasado y disfrutar de la belleza del lugar." },
    { categoria: "Historia", imagen: "2", nombre: "Lugar Histórico 2", descripcion: "Un lugar histórico que ofrece una amplia variedad de exposiciones y tours. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del lugar." },
    { categoria: "Historia", imagen: "3", nombre: "Lugar Histórico 3", descripcion: "Este lugar histórico es conocido por su rica historia y su impresionante arquitectura. Es un lugar perfecto para aprender sobre el pasado y disfrutar de la belleza del lugar." },
    { categoria: "Historia", imagen: "4", nombre: "Lugar Histórico 4", descripcion: "Un lugar histórico que ofrece una amplia variedad de exposiciones y tours. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del lugar." },
    { categoria: "Historia", imagen: "5", nombre: "Lugar Histórico 5", descripcion: "Este lugar histórico es conocido por su rica historia y su impresionante arquitectura. Es un lugar perfecto para aprender sobre el pasado y disfrutar de la belleza del lugar." },
    { categoria: "Historia", imagen: "6", nombre: "Lugar Histórico 6", descripcion: "Un lugar histórico que ofrece una amplia variedad de exposiciones y tours. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del lugar." },

    // Museos
    { categoria: "Museos", imagen: "1", nombre: "Museo 1", descripcion: "Este museo es conocido por sus impresionantes colecciones de arte y artefactos históricos. Es un lugar perfecto para aprender sobre la historia y disfrutar de la belleza del arte." },
    { categoria: "Museos", imagen: "2", nombre: "Museo 2", descripcion: "Un museo que ofrece una amplia variedad de exposiciones de arte y artefactos históricos. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del arte." },
    { categoria: "Museos", imagen: "3", nombre: "Museo 3", descripcion: "Este museo es conocido por sus impresionantes colecciones de arte y artefactos históricos. Es un lugar perfecto para aprender sobre la historia y disfrutar de la belleza del arte." },
    { categoria: "Museos", imagen: "4", nombre: "Museo 4", descripcion: "Un museo que ofrece una amplia variedad de exposiciones de arte y artefactos históricos. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del arte." },
    { categoria: "Museos", imagen: "5", nombre: "Museo 5", descripcion: "Este museo es conocido por sus impresionantes colecciones de arte y artefactos históricos. Es un lugar perfecto para aprender sobre la historia y disfrutar de la belleza del arte." },
    { categoria: "Museos", imagen: "6", nombre: "Museo 6", descripcion: "Un museo que ofrece una amplia variedad de exposiciones de arte y artefactos históricos. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del arte." },

    // Educativos
    { categoria: "Educativos", imagen: "1", nombre: "Lugar Educativo 1", descripcion: "Este lugar educativo es conocido por sus excelentes programas y su ambiente inspirador. Es un lugar perfecto para aprender y crecer." },
    { categoria: "Educativos", imagen: "2", nombre: "Lugar Educativo 2", descripcion: "Un lugar educativo que ofrece una amplia variedad de programas y actividades. Es un lugar ideal para aprender y crecer." },
    { categoria: "Educativos", imagen: "3", nombre: "Lugar Educativo 3", descripcion: "Este lugar educativo es conocido por sus excelentes programas y su ambiente inspirador. Es un lugar perfecto para aprender y crecer." },
    { categoria: "Educativos", imagen: "4", nombre: "Lugar Educativo 4", descripcion: "Un lugar educativo que ofrece una amplia variedad de programas y actividades. Es un lugar ideal para aprender y crecer." },
    { categoria: "Educativos", imagen: "5", nombre: "Lugar Educativo 5", descripcion: "Este lugar educativo es conocido por sus excelentes programas y su ambiente inspirador. Es un lugar perfecto para aprender y crecer." },
    { categoria: "Educativos", imagen: "6", nombre: "Lugar Educativo 6", descripcion: "Un lugar educativo que ofrece una amplia variedad de programas y actividades. Es un lugar ideal para aprender y crecer." },

    // Compras
    { categoria: "Compras", imagen: "1", nombre: "Lugar de Compras 1", descripcion: "Descripción del lugar de compras 1." },
    { categoria: "Compras", imagen: "2", nombre: "Lugar de Compras 2", descripcion: "Descripción del lugar de compras 2." },
    { categoria: "Compras", imagen: "3", nombre: "Lugar de Compras 3", descripcion: "Descripción del lugar de compras 3." },
    { categoria: "Compras", imagen: "4", nombre: "Lugar de Compras 4", descripcion: "Descripción del lugar de compras 4." },
    { categoria: "Compras", imagen: "5", nombre: "Lugar de Compras 5", descripcion: "Descripción del lugar de compras 5." },
    { categoria: "Compras", imagen: "6", nombre: "Lugar de Compras 6", descripcion: "Descripción del lugar de compras 6." },

    // Parques
    { categoria: "Parques", imagen: "1", nombre: "Parque 1", descripcion: "Descripción del parque 1." },
    { categoria: "Parques", imagen: "2", nombre: "Parque 2", descripcion: "Descripción del parque 2." },
    { categoria: "Parques", imagen: "3", nombre: "Parque 3", descripcion: "Descripción del parque 3." },
    { categoria: "Parques", imagen: "4", nombre: "Parque 4", descripcion: "Descripción del parque 4." },
    { categoria: "Parques", imagen: "5", nombre: "Parque 5", descripcion: "Descripción del parque 5." },
    { categoria: "Parques", imagen: "6", nombre: "Parque 6", descripcion: "Descripción del parque 6." },

    // Juegos Recreativos al Aire Libre
    { categoria: "Juegos Recreativos al Aire Libre", imagen: "1", nombre: "Juego Recreativo al Aire Libre 1", descripcion: "Descripción del juego recreativo al aire libre 1." },
    { categoria: "Juegos Recreativos al Aire Libre", imagen: "2", nombre: "Juego Recreativo al Aire Libre 2", descripcion: "Descripción del juego recreativo al aire libre 2." },
    { categoria: "Juegos Recreativos al Aire Libre", imagen: "3", nombre: "Juego Recreativo al Aire Libre 3", descripcion: "Descripción del juego recreativo al aire libre 3." },
    { categoria: "Juegos Recreativos al Aire Libre", imagen: "4", nombre: "Juego Recreativo al Aire Libre 4", descripcion: "Descripción del juego recreativo al aire libre 4." },
    { categoria: "Juegos Recreativos al Aire Libre", imagen: "5", nombre: "Juego Recreativo al Aire Libre 5", descripcion: "Descripción del juego recreativo al aire libre 5." },
    { categoria: "Juegos Recreativos al Aire Libre", imagen: "6", nombre: "Juego Recreativo al Aire Libre 6", descripcion: "Descripción del juego recreativo al aire libre 6." },

    // Juegos Recreativos Bajo Techo
    { categoria: "Juegos Recreativos Bajo Techo", imagen: "1", nombre: "Juego Recreativo Bajo Techo 1", descripcion: "Descripción del juego recreativo bajo techo 1." },
    { categoria: "Juegos Recreativos Bajo Techo", imagen: "2", nombre: "Juego Recreativo Bajo Techo 2", descripcion: "Descripción del juego recreativo bajo techo 2." },
    { categoria: "Juegos Recreativos Bajo Techo", imagen: "3", nombre: "Juego Recreativo Bajo Techo 3", descripcion: "Descripción del juego recreativo bajo techo 3." },
    { categoria: "Juegos Recreativos Bajo Techo", imagen: "4", nombre: "Juego Recreativo Bajo Techo 4", descripcion: "Descripción del juego recreativo bajo techo 4." },
    { categoria: "Juegos Recreativos Bajo Techo", imagen: "5", nombre: "Juego Recreativo Bajo Techo 5", descripcion: "Descripción del juego recreativo bajo techo 5." },
    { categoria: "Juegos Recreativos Bajo Techo", imagen: "6", nombre: "Juego Recreativo Bajo Techo 6", descripcion: "Descripción del juego recreativo bajo techo 6." },

    // Zoológicos
    { categoria: "Zoológicos", imagen: "1", nombre: "Zoológico 1", descripcion: "Descripción del zoológico 1." },
    { categoria: "Zoológicos", imagen: "2", nombre: "Zoológico 2", descripcion: "Descripción del zoológico 2." },
    { categoria: "Zoológicos", imagen: "3", nombre: "Zoológico 3", descripcion: "Descripción del zoológico 3." },
    { categoria: "Zoológicos", imagen: "4", nombre: "Zoológico 4", descripcion: "Descripción del zoológico 4." },
    { categoria: "Zoológicos", imagen: "5", nombre: "Zoológico 5", descripcion: "Descripción del zoológico 5." },
    { categoria: "Zoológicos", imagen: "6", nombre: "Zoológico 6", descripcion: "Descripción del zoológico 6." },

    // Religión
    { categoria: "Religión", imagen: "1", nombre: "Lugar Religioso 1", descripcion: "Descripción del lugar religioso 1." },
    { categoria: "Religión", imagen: "2", nombre: "Lugar Religioso 2", descripcion: "Descripción del lugar religioso 2." },
    { categoria: "Religión", imagen: "3", nombre: "Lugar Religioso 3", descripcion: "Descripción del lugar religioso 3." },
    { categoria: "Religión", imagen: "4", nombre: "Lugar Religioso 4", descripcion: "Descripción del lugar religioso 4." },
    { categoria: "Religión", imagen: "5", nombre: "Lugar Religioso 5", descripcion: "Descripción del lugar religioso 5." },
    { categoria: "Religión", imagen: "6", nombre: "Lugar Religioso 6", descripcion: "Descripción del lugar religioso 6." },
  ];

  const [lugares, setLugares] = useState(places);

  useEffect(() => {
    const getRandomCategories = () => {
      const shuffled = allCategories.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    };

    const fetchLugares = async () => {
      try {
        //console.log("cats a buscar", randomCategories);
        console.log("idCategory Home", id);
        let resultado;
        if (id) {
          resultado = await handleCategorias4LugarUsuario(
            id,
            randomCategories[0],
            randomCategories[1],
            randomCategories[2],
            randomCategories[3]
          );
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

  const handleButtonDeseadosClick = (nombre) => {
    if(isLogged) {
      setClickedDeseados(prevState => ({
        ...prevState,
        [nombre]: !prevState[nombre]
      }));
    } else {
      navigate('/login')
    }
  };

  const handleButtonFavoritosClick = (nombre) => {
    if(isLogged) {
      setClickedFavoritos(prevState => ({
        ...prevState,
        [nombre]: !prevState[nombre]
      }));
    } else {
      navigate('/login')
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
        onDeseadosClick={handleButtonDeseadosClick}
        onFavoritosClick={handleButtonFavoritosClick}
      />
    </div>
  );
};

export default CategoryHome;
