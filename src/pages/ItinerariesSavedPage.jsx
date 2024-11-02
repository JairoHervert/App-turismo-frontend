import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ItineraryCard from '../components/CardItinerarios';
import SaveIcon from '../img/ItinerariesPage/icons/itineraries-guardar.png'
import '../css/ItinerariesSavedPage.css';


function ItinirariesSavePage() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const itineraries = [
        { id: 1, title: "Xochimilco", date: "26/07/2019", details: "Restaurante 'Fernando', florería 'Daniela', trajineras 'Xochimilco'", image: require("../img/ItinerariesPage/places/itineraries-Xochimilco.jpg")},
        { id: 2, title: "Grutas Tolantongo", date: "26/07/2019", details: "Hotel 'Estrella', restaurante 'El señor', gruta 'Tolantongo'", image: require("../img/ItinerariesPage/places/itineraries-Grutas.jpg")},
        { id: 3, title: "Acuario Inbursa", date: "26/07/2019", details: "Museo 'Soumaya', museo 'Jumex', cafetería 'Hello Kitty', plaza 'Antara', acuario 'Inbursa'", image: require("../img/ItinerariesPage/places/itineraries-Acuario.jpg")},
    ];

    return(
        <div>
            <Navbar
                showingresa={false}
                showRegistrate={false}
                transparentNavbar={false}
                lightLink={false}
                staticNavbar={false}
            />

            <div className="itineraries-container">
                <h1 className="page-title"><img src={SaveIcon} alt="save Icon" style={{ width: '40px', height: '40px' }} /> Itinerarios guardados</h1>
                {itineraries.map(itinerary => (
                    <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                ))}
            </div>

            <Footer showIncorporaLugar={false} />
        </div>
    );
    
}

export default ItinirariesSavePage;