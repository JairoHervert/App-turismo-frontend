import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/PlacePage.css';

import ButtonsMod from '../ButtonsMod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function HeaderLugar({ categoria }) {

  const getImagePath = (cat) => {
    return require(`../../img/Categorías/${cat}_banner.jpg`);
  };

  let headerImage;
  try {
    headerImage = getImagePath(categoria);
  } catch (error) {
    console.error("Imagen no encontrada para la categoría:", categoria);
    headerImage = null; // O usa una imagen predeterminada si lo deseas
  }

  const [image, setImage] = useState(headerImage);
  useEffect(() => {
    try {
      headerImage = getImagePath(categoria);
      setImage(headerImage);
    } catch (error) {
      console.error("Imagen no encontrada para la categoría:", categoria);
      headerImage = null; // O usa una imagen predeterminada si lo deseas
    }
  }, [categoria]);

  const navigate = useNavigate();

  const handleHomePageClick = () => {
    //Regresar a la pagina anterior
    navigate(-1);
  };

  return (
    <div className='pp-header-img'
      style={{
        backgroundImage: `url(${image})`,
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