// App.jsx
import React, { useState } from 'react';
import CategorySection from './CategorySection';

import '../../css/HomePage.css';



const CategoryHome = () => {

    const [selectedCategory, setSelectedCategory] = useState("No convencionales");

    const places = [
        { category: "No convencionales", imagen: '1', name: "Cafebrería el Péndulo", description: "Agradable cafetería/librería con varias áreas para disfrutar de un rico café y una bonita escalera." },
        { category: "No convencionales", imagen: "2", name: "Palacio Postal", description: "El Palacio Postal o la Quinta Casa de Correos es un edificio del Centro Histórico construido por el italiano Adamo Boari y el mexicano Gonzalo Garita." },
        { category: "No convencionales", imagen: "3", name: "Fuente de Tláloc", description: "Mosaicos de piedra adornan la Fuente de Tláloc, en honor al dios del agua y trazan símbolos del pasado de México." },
        { category: "No convencionales", imagen: "4", name: "Museo de Arte Popular", description: " Observa artesanías mexicanas como alebrijes, textiles y cerámica, celebrando la riqueza cultural de México en un espacio vibrante." },
        { category: "No convencionales", imagen: "5", name: "Museo Casa de León Trotsky", description: "Este museo te introduce en la vida y la trascendencia del revolucionario ruso y su relación con importantes personalidades del país." },
        { category: "No convencionales", imagen: "6", name: "Biblioteca de México", description: "Disfruta de historias ancestrales, de fantasmas y espíritus que han pasado de generación en generación." },

        { category: "Turísticos", imagen: "1", name: "Cafebrería el Péndulo", description: "Agradable cafetería/librería con varias áreas para disfrutar de un rico café y una bonita escalera." },
        { category: "Turísticos", imagen: "2", name: "Palacio Postal", description: "El Palacio Postal o la Quinta Casa de Correos es un edificio del Centro Histórico construido por el italiano Adamo Boari y el mexicano Gonzalo Garita." },
        { category: "Turísticos", imagen: "3", name: "Fuente de Tláloc", description: "Mosaicos de piedra adornan la Fuente de Tláloc, en honor al dios del agua y trazan símbolos del pasado de México." },
        { category: "Turísticos", imagen: "4", name: "Museo de Arte Popular", description: " Observa artesanías mexicanas como alebrijes, textiles y cerámica, celebrando la riqueza cultural de México en un espacio vibrante." },
        { category: "Turísticos", imagen: "5", name: "Museo Casa de León Trotsky", description: "Este museo te introduce en la vida y la trascendencia del revolucionario ruso y su relación con importantes personalidades del país." },
        { category: "Turísticos", imagen: "6", name: "Biblioteca de México", description: "Disfruta de historias ancestrales, de fantasmas y espíritus que han pasado de generación en generación." },

        { category: "Gastronomía", imagen: "1", name: "Cafebrería el Péndulo", description: "Agradable cafetería/librería con varias áreas para disfrutar de un rico café y una bonita escalera." },
        { category: "Gastronomía", imagen: "2", name: "Palacio Postal", description: "El Palacio Postal o la Quinta Casa de Correos es un edificio del Centro Histórico construido por el italiano Adamo Boari y el mexicano Gonzalo Garita." },
        { category: "Gastronomía", imagen: "3", name: "Fuente de Tláloc", description: "Mosaicos de piedra adornan la Fuente de Tláloc, en honor al dios del agua y trazan símbolos del pasado de México." },
        { category: "Gastronomía", imagen: "4", name: "Museo de Arte Popular", description: " Observa artesanías mexicanas como alebrijes, textiles y cerámica, celebrando la riqueza cultural de México en un espacio vibrante." },
        { category: "Gastronomía", imagen: "5", name: "Museo Casa de León Trotsky", description: "Este museo te introduce en la vida y la trascendencia del revolucionario ruso y su relación con importantes personalidades del país." },
        { category: "Gastronomía", imagen: "6", name: "Biblioteca de México", description: "Disfruta de historias ancestrales, de fantasmas y espíritus que han pasado de generación en generación." },

        { category: "Museos", imagen: "1", name: "Cafebrería el Péndulo", description: "Agradable cafetería/librería con varias áreas para disfrutar de un rico café y una bonita escalera." },
        { category: "Museos", imagen: "2", name: "Palacio Postal", description: "El Palacio Postal o la Quinta Casa de Correos es un edificio del Centro Histórico construido por el italiano Adamo Boari y el mexicano Gonzalo Garita." },
        { category: "Museos", imagen: "3", name: "Fuente de Tláloc", description: "Mosaicos de piedra adornan la Fuente de Tláloc, en honor al dios del agua y trazan símbolos del pasado de México." },
        { category: "Museos", imagen: "4", name: "Museo de Arte Popular", description: " Observa artesanías mexicanas como alebrijes, textiles y cerámica, celebrando la riqueza cultural de México en un espacio vibrante." },
        { category: "Museos", imagen: "5", name: "Museo Casa de León Trotsky", description: "Este museo te introduce en la vida y la trascendencia del revolucionario ruso y su relación con importantes personalidades del país." },
        { category: "Museos", imagen: "6", name: "Biblioteca de México", description: "Disfruta de historias ancestrales, de fantasmas y espíritus que han pasado de generación en generación." },
    ];

    const filteredPlaces = places.filter(place => place.category === selectedCategory);

    return (
        <div>
            <nav className="nav mt-3 secondary-nav">
                <button
                    className={`nav-link ${selectedCategory === "Turísticos" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("Turísticos")}
                >
                    Turísticos
                </button>
                <button
                    className={`nav-link ${selectedCategory === "No convencionales" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("No convencionales")}
                >
                    No convencionales
                </button>
                <button
                    className={`nav-link ${selectedCategory === "Gastronomía" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("Gastronomía")}
                >
                    Gastronomía
                </button>
                <button
                    className={`nav-link ${selectedCategory === "Museos" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("Museos")}
                >
                    Museos
                </button>
            </nav>

            <br />
            <CategorySection places={filteredPlaces} />
        </div>
    );
};

export default CategoryHome;
