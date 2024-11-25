import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PlacePage.css';

import DeportesImg from '../../img/PlacePage/Deportes.jpg';
import ComidaRapidaImg from '../../img/PlacePage/ComidaRapida.jpg';
import RestauranteImg from '../../img/PlacePage/Restaurante.jpg';
import CafeteriaImg from '../../img/PlacePage/Cafeteria.jpg';
import BarImg from '../../img/PlacePage/Bar.jpg';
import ArteImg from '../../img/PlacePage/Arte.jpg';
import HistoriaImg from '../../img/PlacePage/Historia.jpg';
import MuseosImg from '../../img/PlacePage/Museo.jpg';
import EducativosImg from '../../img/PlacePage/Educativos.jpg';
import ComprasImg from '../../img/PlacePage/Compras.jpg';
import ParquesImg from '../../img/PlacePage/Parque.jpg';
import JuegosLibreImg from '../../img/PlacePage/JuegosAire.jpg';
import JuegosTechoImg from '../../img/PlacePage/JuegosTecho.jpg';
import ZoologicosImg from '../../img/PlacePage/Zoologico.jpg';
import ReligionImg from '../../img/PlacePage/Religion.jpg';

import ButtonsMod from '../ButtonsMod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function HeaderLugar({ categoria }) {
    const navigate = useNavigate();

    const handleHomePageClick = () => {
            navigate('/');
        };

    const imagenesHeader = {
        'Deportes': DeportesImg,
        'Comida Rápida': ComidaRapidaImg,
        'Restaurante': RestauranteImg,
        'Cafetería': CafeteriaImg,
        'Bar': BarImg,
        'Arte': ArteImg,
        'Historia': HistoriaImg,
        'Museos': MuseosImg,
        'Educativos': EducativosImg,
        'Compras': ComprasImg,
        'Parques': ParquesImg,
        'Juegos recreativos al aire libre': JuegosLibreImg,
        'Juegos recreativos bajo techo': JuegosTechoImg,
        'Zoológicos': ZoologicosImg,
        'Religión': ReligionImg,
    }

    const headerImage = imagenesHeader[categoria];

  return (
    <div className='pp-header-img'
        style={{
            backgroundImage: `url(${headerImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}
    >
        
        <div className='pp-header-btn'>
        <ButtonsMod
            variant='principal'
            textCont='Regresar'
            clickEvent={handleHomePageClick}
            startIcon={<ArrowBackIcon />}
        />
        </div>

    </div>
  );
}

export default HeaderLugar;