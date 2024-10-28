// App.jsx
import React, { useState } from 'react';
import CategorySection from './CategorySection';
import lugar1 from '../../img/HomePage/category/lugar1.png';
import lugar2 from '../../img/HomePage/category/lugar2.png';
import lugar3 from '../../img/HomePage/category/lugar3.png';
import lugar4 from '../../img/HomePage/category/lugar4.png';
import lugar5 from '../../img/HomePage/category/lugar5.png';
import lugar6 from '../../img/HomePage/category/lugar6.png';
import '../../css/HomePage.css';


const App = () => {
    const [selectedCategory, setSelectedCategory] = useState("No convencionales");

    const places = [
        { category: "No convencionales", image: lugar1, name: "Cafebrería el Péndulo", description: "Agradable cafetería/librería con varias áreas para disfrutar de un rico café y una bonita escalera." },
        { category: "No convencionales", image: lugar2, name: "Palacio Postal", description: "El Palacio Postal o la Quinta Casa de Correos es un edificio del Centro Histórico construido por el italiano Adamo Boari y el mexicano Gonzalo Garita." },
        { category: "No convencionales", image: lugar3, name: "Fuente de Tláloc", description: "Mosaicos de piedra adornan la Fuente de Tláloc, en honor al dios del agua y trazan símbolos del pasado de México." },
        { category: "No convencionales", image: lugar4, name: "Museo de Arte Popular", description: " Observa artesanías mexicanas como alebrijes, textiles y cerámica, celebrando la riqueza cultural de México en un espacio vibrante." },
        { category: "No convencionales", image: lugar5, name: "Museo Casa de León Trotsky", description: "Este museo te introduce en la vida y la trascendencia del revolucionario ruso y su relación con importantes personalidades del país." },
        { category: "No convencionales", image: lugar6, name: "Biblioteca de México", description: "Disfruta de historias ancestrales, de fantasmas y espíritus que han pasado de generación en generación." },

        { category: "Turísticos", image: lugar1, name: "Cafebrería el Péndulo", description: "Agradable cafetería/librería con varias áreas para disfrutar de un rico café y una bonita escalera." },
        { category: "Turísticos", image: lugar2, name: "Palacio Postal", description: "El Palacio Postal o la Quinta Casa de Correos es un edificio del Centro Histórico construido por el italiano Adamo Boari y el mexicano Gonzalo Garita." },
        { category: "Turísticos", image: lugar3, name: "Fuente de Tláloc", description: "Mosaicos de piedra adornan la Fuente de Tláloc, en honor al dios del agua y trazan símbolos del pasado de México." },
        { category: "Turísticos", image: lugar4, name: "Museo de Arte Popular", description: " Observa artesanías mexicanas como alebrijes, textiles y cerámica, celebrando la riqueza cultural de México en un espacio vibrante." },
        { category: "Turísticos", image: lugar5, name: "Museo Casa de León Trotsky", description: "Este museo te introduce en la vida y la trascendencia del revolucionario ruso y su relación con importantes personalidades del país." },
        { category: "Turísticos", image: lugar6, name: "Biblioteca de México", description: "Disfruta de historias ancestrales, de fantasmas y espíritus que han pasado de generación en generación." },

        { category: "Gastronomía", image: lugar1, name: "Cafebrería el Péndulo", description: "Agradable cafetería/librería con varias áreas para disfrutar de un rico café y una bonita escalera." },
        { category: "Gastronomía", image: lugar2, name: "Palacio Postal", description: "El Palacio Postal o la Quinta Casa de Correos es un edificio del Centro Histórico construido por el italiano Adamo Boari y el mexicano Gonzalo Garita." },
        { category: "Gastronomía", image: lugar3, name: "Fuente de Tláloc", description: "Mosaicos de piedra adornan la Fuente de Tláloc, en honor al dios del agua y trazan símbolos del pasado de México." },
        { category: "Gastronomía", image: lugar4, name: "Museo de Arte Popular", description: " Observa artesanías mexicanas como alebrijes, textiles y cerámica, celebrando la riqueza cultural de México en un espacio vibrante." },
        { category: "Gastronomía", image: lugar5, name: "Museo Casa de León Trotsky", description: "Este museo te introduce en la vida y la trascendencia del revolucionario ruso y su relación con importantes personalidades del país." },
        { category: "Gastronomía", image: lugar6, name: "Biblioteca de México", description: "Disfruta de historias ancestrales, de fantasmas y espíritus que han pasado de generación en generación." },

        { category: "Museos", image: lugar1, name: "Cafebrería el Péndulo", description: "Agradable cafetería/librería con varias áreas para disfrutar de un rico café y una bonita escalera." },
        { category: "Museos", image: lugar2, name: "Palacio Postal", description: "El Palacio Postal o la Quinta Casa de Correos es un edificio del Centro Histórico construido por el italiano Adamo Boari y el mexicano Gonzalo Garita." },
        { category: "Museos", image: lugar3, name: "Fuente de Tláloc", description: "Mosaicos de piedra adornan la Fuente de Tláloc, en honor al dios del agua y trazan símbolos del pasado de México." },
        { category: "Museos", image: lugar4, name: "Museo de Arte Popular", description: " Observa artesanías mexicanas como alebrijes, textiles y cerámica, celebrando la riqueza cultural de México en un espacio vibrante." },
        { category: "Museos", image: lugar5, name: "Museo Casa de León Trotsky", description: "Este museo te introduce en la vida y la trascendencia del revolucionario ruso y su relación con importantes personalidades del país." },
        { category: "Museos", image: lugar6, name: "Biblioteca de México", description: "Disfruta de historias ancestrales, de fantasmas y espíritus que han pasado de generación en generación." },
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

export default App;
