import React, { useEffect, useState } from 'react';
import '../../css/PlacePage.css';
import { Rating } from '@mui/material';

function Reviews({ resena}) {

  const [reseña, setReseña] = useState(resena);

  useEffect(() => {
    setReseña(resena);
  }, [resena]);

  return (
    <div className='pp-reviews-contenido'>
      { /* Información del Usuario en Review: Nombre de usuario, antigüedad, avatar*/}
      <div className='pp-reviews-informacion-usuario'>
        { /* Avatar del usuario */}
        <img 
          src={reseña.userPhoto}
          alt='user-photo'
          className='pp-reviews-avatar-usuario'
        />
        { /* Nombre del usuario y antigüedad */}
        <div className='pp-reviews-nombreUsuario-antiguedadComentario'>
          <div className='row gx-0'>
            <p className='mb-2'>{reseña.nombreUsuario}</p>
          </div>
          <div className='row gx-0'>
            <p style={{fontSize: '0.9rem'}}>{reseña.antiguedadReview}</p>
          </div>
        </div>

      </div>
      { /* Opinion Usuario y Calificación */}
      <div className='card pp-reviews-card-opinion-calificacion'>
        <div className='card-body'>
          <Rating 
              name='read-only' 
              defaultValue={0.0} 
              value={reseña.valueReview}
              readOnly 
              size='small'
              precision={0.1}
          />
          <p>{reseña.comentarioUsuario}</p>
        </div>
      </div>
      
    </div>
  );
}

export default Reviews;