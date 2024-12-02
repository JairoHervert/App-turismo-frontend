import { useNavigate } from 'react-router-dom';
import '../../css/DeseadosPage.css';

function UDCuadroLugar({ nombreLugar, descripcionLugar, imagenLugar, tiempoLugar, costoLugar, idLugar, isFavorite, toggleFavorite }) {
  const navigate = useNavigate();

  const informacionLugar = () => {
    navigate(`/placepage/${idLugar}`);
  };

  const handleFavoriteClick = () => {
    // Acción al hacer clic en el ícono de corazón, por ahora solo imprime un mensaje en la consola
    //console.log('Lugar agregado a favoritos');
    //e.stopPropagation();
    toggleFavorite(nombreLugar);
  };

  const esURL = imagenLugar.startsWith('http://') || imagenLugar.startsWith('https://');
  const imagenSrc = esURL ? imagenLugar : require(`../../img/HomePage/places/${imagenLugar}`);

  return (
    <div 
      className='row d-flex justify-content-between align-items-center rounded us_de-border-target p-3 me-1 mb-3 position-relative cursor-pointer' 
      onClick={informacionLugar}
    >
      <div 
        className={`us_de-favorite-icon ${isFavorite ? 'favorite-active' : ''}`}
        onClick={handleFavoriteClick}
      >
        <i className='bi bi-heart-fill'></i>
      </div>

      <div className='col-12 col-md-4 ud_contenedor-imagen-lugar'>
        <img src={imagenSrc} className='us_de-imagen-lugar rounded' alt={nombreLugar} />
      </div>

      <div className='col-12 col-md-8 d-flex flex-column justify-content-center align-items-center ud-lugar-info-col'>
        <h1 className='fontMontserrat fs-2 fw-semibold'>{nombreLugar}</h1>
        <hr className='us_de-divider' />
        <p className='text-center'>{descripcionLugar}</p>

        <div className='us_de-icons d-flex justify-content-center align-items-center gap-3'>
          <div className='d-flex align-items-center gap-2'>
            <i className='bi bi-hourglass-bottom fs-5 fontRosaMexicano'></i>
            <p className='fw-medium mb-0'>Tiempo: <span className='fw-semibold'>{tiempoLugar}</span></p>
          </div>
          <div className='d-flex align-items-center gap-2'>
            <i className='bi bi-cash-coin fs-5 fontRosaMexicano'></i>
            <p className='fw-medium mb-0'>Costo: <span className='fw-semibold'>{costoLugar}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UDCuadroLugar;
