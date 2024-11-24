import React from 'react';
import '../../css/PlacePage.css';
import { Rating } from '@mui/material';

function Reviews({ nombreUsuario, antiguedadReview, comentarioUsuario, valueReview, userPhoto}) {


  return (
    <div className='review-content'>
      <div className='review-user-section-left'>
        <img src={userPhoto} alt='user-photo' className='review-user-photo' />
        <div className='review-user-information'>
          <div className='row gx-0'>
            <p className='mb-2'>{nombreUsuario}</p>
          </div>
          <div className='row gx-0'>
            <p>Hace {antiguedadReview}</p>
          </div>
        </div>
      </div>
      <div className='card review-description'>
        <div className='card-body'>
          <div className='row review-description-score'>
          <Rating 
              name='read-only' 
              defaultValue={valueReview} 
              readOnly 
              size='small'
              precision={0.1}
          />
          </div>
          <div className='review-description-opinion'>
            <p>{comentarioUsuario}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;