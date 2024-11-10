import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/ConfirmacionRegistro.css';
import imagenRegistroExitoso from '../img/confirmacion-registro.png';

function ConfirmacionRegistro() {
  return (
    <div>
      <div className='vh-100 container d-flex flex-column justify-content-center align-items-center text-center'>
          <div className='mb-2'>
            <img src={imagenRegistroExitoso} alt='Imagen de registro' className='co_re-imagen' />
          </div>
          <div>
            <h1 className='fw-bolder fontMontserrat co_re-titulo mb-5'>¡Registro exitoso!</h1>
            <h2 className='fw-medium fs-3 co_re-text'>Juntos exploraremos lo desconocido. Que cada destino te lleve a un recuerdo inolvidable.</h2>
            <h3 className='fs-3 co_re-text'>Por favor, procede a <Link className='co_re-iniciar-sesion' to='/login'>Iniciar sesión</Link> para continuar.</h3>
          </div>
      </div>

      <Footer showIncorporaLugar={false} />
    </div>
  )
}

export default ConfirmacionRegistro;
