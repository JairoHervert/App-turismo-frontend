import React from 'react';
import { useState } from 'react';
import { Rating } from '@mui/material';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';

function DescripcionLugar({nombreLugar, resumenLugar, placeDireccion, placeCosto, placeAccesibilidad, placeHorario, lugarImagenes, value}) {
    const [isClickedDeseados, setIsClickedDeseados] = useState(false);
    const [isClickedFavoritos, setIsClickedFavoritos] = useState(false);

    const handleButtonDeseadosClick = () => {
        setIsClickedDeseados(!isClickedDeseados);
    };

    const handleButtonFavoritosClick = () => {
        setIsClickedFavoritos(!isClickedFavoritos);
    };

    const breakPoint = useMediaQuery('(max-width: 960px');

    const galeria = () => {
        if (!lugarImagenes || lugarImagenes.length === 0) {
          return <p>No hay imágenes disponibles.</p>;
        }
        return (
            <ImageList
                sx={{ width: '100%',  height: 450 , marginTop: 2 }}
                variant='quilted'
                cols={breakPoint ? 2 : 3}
                gap={8}
            >
                {/* se muestran máximo 10 imágenes, pero la pueden cambiar si son más */}
                {lugarImagenes.slice(0, 10).map((imagen, index) => (
                    /* para que la primera imagen ocupe más espacio */
                    <ImageListItem key={index} cols={index === 0 ? 2 : 1} rows={index === 0 ? 2 : 1}>
                        <img
                        src={imagen}
                        loading='lazy'
                        style={{ objectFit: 'cover' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        );
    };

    return (
      <section className='place-page container-fluid'>
        <div className='place-row row justify-content-center gx-0'>
            {/* Left Site */}
            <div className='col-md-4 place-left-site'>
                <div className='card card-descripcion-lugar'>
                    <div className='map-placeholder'>
                    {/* para poner el mapa */}
                    </div>
                    <a className='link-google-maps' href='#'>Ver en GoogleMaps</a>
                    <div className='description-left row gx-0'>
                        <div className='col-1 col-icon'>
                            <i className="bi bi-geo-alt-fill"></i>
                        </div>
                        <div className='col'>
                        <p className='place-description'>{placeDireccion}</p>
                        </div>
                    </div>
                    <div className='row gx-0'>
                        <div className='col-1 col-icon'>
                            <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className='col'>
                            <p className='place-description'>{placeCosto}</p>
                        </div>
                        
                    </div>
                    <div className='row gx-0'>
                        <div className='col-1 col-icon'>
                        <i className="bi bi-person-wheelchair"></i>
                        </div>
                        <div className='col'>
                            <p className='place-description'>{placeAccesibilidad}</p>
                        </div>
                    </div>
                    <div className='row gx-0'>
                        <div className='col-1 col-icon'>
                            <i className="bi bi-clock"></i>
                        </div>
                        <div className='col'>
                            <p className='place-description'>{placeHorario}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            {/* Right Site */}
            <div className='col-md-8 place-right-site'>
                <h2 className='place-title'>
                    {nombreLugar}
                </h2>
                <div className='row gx-0 place-score'>
                    <div className='place-score-stars'>
                        <div className='score'>
                            <h2 className='score-text'>4.8</h2>
                        </div>
                        <div className='stars'>
                            <Rating 
                                name='read-only' 
                                defaultValue={value} 
                                readOnly 
                                size='large'
                                precision={0.1}/>
                        </div>
                    </div>
                    <div className='place-buttons'>
                        <button className={`btn ${isClickedDeseados ? 'btn-placeOnClick' : 'btn-light'} btn-placePage-button`} onClick={handleButtonDeseadosClick}>
                            <i className='bi bi-bookmark'></i>
                        </button>
                        <button className={`btn ${isClickedFavoritos ? 'btn-placeOnClick' : 'btn-light'} btn-placePage-button`} onClick={handleButtonFavoritosClick}>
                            <i className='bi bi-star'></i>
                        </button>
                    </div>
                </div>
                <p className='place-text'>
                    {resumenLugar}
                </p>

                {/* Sección galería */}
                <div className="place-img">
                    {galeria()}
                </div>

            </div>
        </div>
        
        
      </section>
      
    );
  }

  export default DescripcionLugar;