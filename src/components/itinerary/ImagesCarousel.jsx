import React from 'react';
import '../../css/ItineraryPage.css';

function ImagesCarousel({ images }) {
  return (
    <div>
      <div id='placeImagesCarousel' className='carousel slide carousel-fade'>
        <div className='carousel-inner'>
          {/* para cada elemento de images se genera una pagina del carousel. Solo se asigna active al primer elemento*/}
          {images.map((image, index) => (
            <div 
              key={index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <img src={image} className='d-block w-100 rounded it_pa-image-carousel' alt='imagen del lugar' />
            </div>
          ))}
        </div>
        <button className='carousel-control-prev' type='button' data-bs-target='#placeImagesCarousel' data-bs-slide='prev'>
          <span className='carousel-control-prev-icon' aria-hidden='true'></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button className='carousel-control-next' type='button' data-bs-target='#placeImagesCarousel' data-bs-slide='next'>
          <span className='carousel-control-next-icon' aria-hidden='true'></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
    </div>
  );
}

export default ImagesCarousel;
