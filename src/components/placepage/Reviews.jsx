import React from 'react';
import '../../css/PlacePage.css';
import userPhoto from '../../img/PlacePage/place-user.png';

function Reviews({ nombreUsuario, antiguedadReview, comentarioUsuario }) {


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
            <div className='col stars'>
              {/* de a mientras */}
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
            </div>
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