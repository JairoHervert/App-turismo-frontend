import React from 'react';
import '../../css/PlacePage.css';
import { Rating } from '@mui/material';

function Reviews({ nombreUsuario, antiguedadReview, comentarioUsuario, valueReview, userPhoto}) {

  return (
    <div className='pp-reviews-contenido'>
      { /* Información del Usuario en Review: Nombre de usuario, antigüedad, avatar*/}
      <div className='pp-reviews-informacion-usuario'>
        { /* Avatar del usuario */}
        <img 
          src={userPhoto}
          alt='user-photo'
          className='pp-reviews-avatar-usuario'
        />
        { /* Nombre del usuario y antigüedad */}
        <div className='pp-reviews-nombreUsuario-antiguedadComentario'>
          <div className='row gx-0'>
            <p className='mb-2'>{nombreUsuario}</p>
          </div>
          <div className='row gx-0'>
            <p>Hace {antiguedadReview}</p>
          </div>
        </div>

      </div>
      { /* Opinion Usuario y Calificación */}
      <div className='card pp-reviews-card-opinion-calificacion'>
        <div className='card-body'>
          <Rating 
              name='read-only' 
              defaultValue={valueReview} 
              readOnly 
              size='small'
              precision={0.1}
          />
          <p>{comentarioUsuario}</p>
        </div>
      </div>
      
    </div>
  );
}

export default Reviews;