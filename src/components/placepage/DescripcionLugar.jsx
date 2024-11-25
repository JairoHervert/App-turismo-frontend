import React, { useState } from 'react';
// Material UI
import { Rating, Box, Chip } from '@mui/material';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
// Íconos
import { StarBorder as StarBorderIcon, FavoriteBorder as FavoriteBorderIcon, Pets as PetsIcon, Place as PlaceIcon, AttachMoney as AttachMoneyIcon, Payment as PaymentIcon } from '@mui/icons-material';
import { Accessible as AccessibleIcon, AccessTime as AccessTimeIcon, FamilyRestroom as FamilyRestroomIcon, Grass as GrassIcon, Language as LanguageIcon, Category as CategoryIcon, Groups as GroupsIcon } from '@mui/icons-material';

function DescripcionLugar({ nombreLugar, resumenLugar, direccionLugar, costoLugar, accesibilidadLugar, petFriendly, veganFriendly, familiar, goodForGroups, metodoPago, website, horarioLugar, categoria, imagenesLugar, value }) {
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
        sx={{ width: '100%', height: 450, marginTop: 2 }}
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
            <a className='pp-informacion-lugar-card-link' href='#'>Ver en GoogleMaps</a>

            { /* Subsección - Información del lugar */}
            { /* Direccion */}
            <div className='row gx-0 pp-informacion-lugar-contenido'>
              <div className='col-1 pp-informacion-lugar-iconos'>
                <PlaceIcon fontSize='small' className='pp-informacion-lugar-iconos' />
              </div>
              <div className='col'>
                <p>{direccionLugar}</p>
              </div>
            </div>
            { /* Costo del lugar */}
            {costoLugar !== undefined && (
              <div className='row gx-0'>
                <div className='col-1 pp-informacion-lugar-iconos'>
                  <AttachMoneyIcon fontSize='small' className='pp-informacion-lugar-iconos' />
                </div>
                <div className='col'>
                  <p>{{
                    0: 'Gratis',
                    1: 'Barato',
                    2: 'Moderado',
                    3: 'Caro',
                    4: 'Muy caro'
                  }[costoLugar] || 'Costo desconocido'}
                  </p>
                </div>
              </div>
            )}
            { /* Accesibilidad Silla de Ruedas */}
            {accesibilidadLugar !== null && (
              <div className='row gx-0'>
                <div className='col-1 pp-informacion-lugar-iconos'>
                  <AccessibleIcon fontSize='small' className='pp-informacion-lugar-iconos' />
                </div>
                <div className='col'>
                  <p>{accesibilidadLugar ? 'Accesible con silla de ruedas' : 'No es accesible con silla de ruedas'}</p>
                </div>
              </div>
            )}
            { /* Pet Friendly */}
            {petFriendly !== null && (
              <div className='row gx-0'>
                <div className='col-1 pp-informacion-lugar-iconos'>
                  <PetsIcon className='col-1 pp-informacion-lugar-iconos' fontSize='small' />
                </div>
                <div className='col'>
                  <p>{petFriendly ? 'Pet-Friendly' : 'No se permiten mascotas'}</p>
                </div>
              </div>
            )}
            { /* Vegan Friendly */}
            {veganFriendly !== null && (
              <div className='row gx-0'>
                <div className='col-1 pp-informacion-lugar-iconos'>
                  <GrassIcon className='col-1 pp-informacion-lugar-iconos' fontSize='small' />
                </div>
                <div className='col'>
                  <p>{veganFriendly ? 'Vegan Friendly' : 'No es Vegan-Friendly'}</p>
                </div>
              </div>
            )}
            { /* Familiar */}
            {familiar !== null && (
              <div className='row gx-0'>
                <div className='col-1 pp-informacion-lugar-iconos'>
                  <FamilyRestroomIcon className='col-1 pp-informacion-lugar-iconos' fontSize='small' />
                </div>
                <div className='col'>
                  <p>{familiar ? 'Familiar' : 'Solo mayores de 18 años'}</p>
                </div>
              </div>
            )}
            { /* Good for Groups 
                    --------- En esta sección cambien la descripción, pues no sé
                              cómo te lo da la API */}
            {goodForGroups !== null && (
              <div className='row gx-0'>
                <div className='col-1 pp-informacion-lugar-iconos'>
                  <GroupsIcon className='col-1 pp-informacion-lugar-iconos' fontSize='small' />
                </div>
                <div className='col'>
                  <p>{goodForGroups ? 'Grupal' : 'No grupal weon'}</p>
                </div>
              </div>
            )}
            { /* Método de pago
                    --------- En esta sección cambien la descripción, pues no sé
                              cómo te lo da la API */}
            {metodoPago !== null && (
              <div className='row gx-0'>
                <div className='col-1 pp-informacion-lugar-iconos'>
                  <PaymentIcon className='col-1 pp-informacion-lugar-iconos' fontSize='small' />
                </div>
                <div className='col'>
                  <p>{metodoPago ? 'Método' : 'Un método'}</p>
                </div>
              </div>
            )}
            { /* Horario */}
            <div className='row gx-0'>
              <div className='col-1 pp-informacion-lugar-iconos'>
                <AccessTimeIcon fontSize='small' className='pp-informacion-lugar-iconos' />
              </div>
              <div className='col'>
                {horarioLugar && horarioLugar.length > 0 ? (
                  horarioLugar.map((horario, index) => (
                    <p key={index} className='pp-informacion-lugar-horario-item'> {horario} </p>
                  ))
                ) : (
                  <p>No hay horarios disponibles</p>
                )}
              </div>
            </div>
            { /* Web Site Sitio */}
            {website && website.trim() !== '' && (
              <div className='row gx-0'>
                <div className='col-1 pp-informacion-lugar-iconos'>
                  <LanguageIcon className='col-1 pp-informacion-lugar-iconos' fontSize='small' />
                </div>
                <div className='col'>
                  <a className='pp-informacion-lugar-card-link' href={website}>Sitio Web</a>
                </div>
              </div>
            )}
            { /* Categoría */}
            <div className='row gx-0 pp-informacion-lugar-categoria'>
              <div className='col-1 pp-informacion-lugar-iconos'>
                <CategoryIcon className='col-1 pp-informacion-lugar-iconos' fontSize='small' />
              </div>
              <div className='col'>
                <p>{categoria}</p>
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
                  precision={0.1} />
              </div>
            </div>
            { /* Guardar en Favoritos y Deseados */}
            <div className='pp-informacion-principal-btns'>
              <button className={`btn ${isClickedDeseados ? 'pp-btnOnClick' : 'btn-light'} pp-btn-deseados`} onClick={handleButtonDeseadosClick}>
                <StarBorderIcon />
              </button>
              <button className={`btn ${isClickedFavoritos ? 'pp-btnOnClick' : 'btn-light'} pp-btn-favoritos`} onClick={handleButtonFavoritosClick}>
                <FavoriteBorderIcon />
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