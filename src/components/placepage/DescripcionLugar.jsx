import React, {useState} from 'react';
// Material UI
import { Rating } from '@mui/material';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
// Íconos
import { StarBorder as StarBorderIcon, FavoriteBorder as FavoriteBorderIcon} from '@mui/icons-material';

function DescripcionLugar({nombreLugar, resumenLugar, direccionLugar, costoLugar, accesibilidadLugar, horarioLugar, imagenesLugar, value}) {
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
        if (!imagenesLugar || imagenesLugar.length === 0) {
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
                {imagenesLugar.slice(0, 10).map((imagen, index) => (
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
      <section className='pp-descripcion-lugar container-fluid'>
        
        <div className='row gx-0 pp-descripcion-lugar-row'>

            {/* Sección - Tarjeta azul con Información del Lugar */}
            <div className='col-md-4 pp-informacion-lugar'>
                <div className='card pp-informacion-lugar-card'>
                    
                    { /* Subsección - Mapa del lugar */}
                    <div className='pp-informacion-lugar-card-mapa'>
                    {/* para poner el mapa, de a mientras es una imagen*/}
                    </div>
                    <a className='pp-informacion-lugar-card-link-GoogleMaps' href='#'>Ver en GoogleMaps</a>
                    
                    { /* Subsección - Información del lugar */}
                    { /* Direccion */}
                    <div className='row gx-0 pp-informacion-lugar-contenido'>
                        <div className='col-1 pp-informacion-lugar-iconos'>
                            <i className='bi bi-geo-alt-fill'></i>
                        </div>
                        <div className='col'>
                            <p>{direccionLugar}</p>
                        </div>
                    </div>
                    { /* Costo del lugar */}
                    <div className='row gx-0'>
                        <div className='col-1 pp-informacion-lugar-iconos'>
                            <i className='bi bi-currency-dollar'></i>
                        </div>
                        <div className='col'>
                            <p>{costoLugar}</p>
                        </div>
                    </div>
                    { /* Accesibilidad Silla de Ruedas */}
                    <div className='row gx-0'>
                        <div className='col-1 pp-informacion-lugar-iconos'>
                        <i className='bi bi-person-wheelchair'></i>
                        </div>
                        <div className='col'>
                            <p>{accesibilidadLugar}</p>
                        </div>
                    </div>
                    { /* Horario */}
                    <div className='row gx-0'>
                        <div className='col-1 pp-informacion-lugar-iconos'>
                            <i className='bi bi-clock'></i>
                        </div>
                        <div className='col'>
                            <p>{horarioLugar}</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Sección - Información Principal: Nombre lugar, Calificación, Drescripción, Imágenes */}
            <div className='col-md-8 pp-informacion-principal'>
                { /* Nombre del lugar */}
                <h2 className='pp-informacion-principal-nombre-lugar'>
                    {nombreLugar}
                </h2>
                { /* Calificación del lugar */}
                <div className='row gx-0 pp-informacion-principal-calificacion'>
                    <div className='pp-informacion-principal-calificacion-contenido'>
                        <div className='pp-informacion-principal-calificacion-titulo'>
                            <h2>{value}</h2>
                        </div>
                        <div className='pp-informacion-principal-calificacion-valor'>
                            <Rating 
                                name='read-only' 
                                defaultValue={value} 
                                readOnly 
                                size='large'
                                precision={0.1}/>
                        </div>
                    </div>
                    { /* Guardar en Favoritos y Deseados */}
                    <div className='pp-informacion-principal-btns'>
                        <button className={`btn ${isClickedDeseados ? 'pp-btnOnClick' : 'btn-light'} pp-btn-deseados`} onClick={handleButtonDeseadosClick}>
                            <StarBorderIcon/>
                        </button>
                        <button className={`btn ${isClickedFavoritos ? 'pp-btnOnClick' : 'btn-light'} pp-btn-favoritos`} onClick={handleButtonFavoritosClick}>
                            <FavoriteBorderIcon/>
                        </button>
                    </div>
                </div>
                {/* Descripción del lugar */}
                <p>
                    {resumenLugar}
                </p>
                {/* Impagenes del lugar */}
                <div className='pp-informacion-principal-imagenes'>
                    {galeria()}
                </div>
            </div>

        </div>
      </section>
      
    );
  }

  export default DescripcionLugar;