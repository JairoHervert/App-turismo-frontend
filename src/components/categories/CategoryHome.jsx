// App.jsx
import React, { useState, useEffect } from 'react';
import CategorySection from './CategorySection';
import '../../css/HomePage.css';
import places from './CategoriesArrays';
const CategoryHome = () => {

  const allCategories = ["Deportes", "Comida Rápida", "Restaurante", "Cafetería", "Bar", "Arte", "Historia", "Museos", "Educativos", "Compras", "Parques", "Juegos Recreativos al Aire Libre", "Juegos Recreativos Bajo Techo", "Zoológicos", "Religión"];
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomCategories, setRandomCategories] = useState([]);
  const [clickedDeseados, setClickedDeseados] = useState({});
  const [clickedFavoritos, setClickedFavoritos] = useState({});

  useEffect(() => {
    const getRandomCategories = () => {
      const shuffled = allCategories.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    };

    const randomCategories = getRandomCategories();
    setRandomCategories(randomCategories);
    setSelectedCategory(randomCategories[Math.floor(Math.random() * randomCategories.length)]);
  }, []);

  const handleButtonDeseadosClick = (name) => {
    setClickedDeseados(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };

  const handleButtonFavoritosClick = (name) => {
    setClickedFavoritos(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };

  const filteredPlaces = places.filter(place => place.category === selectedCategory);

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
