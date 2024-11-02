import React from 'react';
import userPhoto from '../../img/PlacePage/place-user.png';

function Reviews() {
  
    return (
        <div className='review-content'>
            <div className='review-user-section-left'>
                <img src={userPhoto} alt='user-photo' className='review-user-photo' />
                <div className='review-user-information'>
                    <div className='row gx-0'>
                        <h4>Brandon Segura</h4>
                    </div>
                    <div className='row gx-0'>
                        <p>Hace 10 meses</p>
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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae rem eligendi, quas officia recusandae eum aliquam soluta, repellat alias deleniti, sunt enim iste sapiente natus molestias. Soluta animi itaque doloremque cupiditate? Molestias aspernatur, nam ut maiores incidunt repellendus? Debitis, ea!
                        Lorem ipsum dolor sit, amet consectetur adipisicime?</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reviews;