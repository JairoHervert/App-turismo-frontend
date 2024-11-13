import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/SuccessPage.css';
import imagenRegistroExitoso from '../img/success-page.png';
import { SuccessfullRegistration } from '../pagesHandlers/sucessPage-handler';
import React from 'react';
import { useEffect } from 'react';

function ConfirmacionRegistro() {

  const [isConfirmed, setIsConfirmed] = React.useState(false);

  const Confirmed = async () => {
    const token = window.location.pathname.split('/')[2];
    const response = await SuccessfullRegistration(token);
    console.log(response);
    setIsConfirmed(response);
  }

  useEffect(() => {
    Confirmed();
  }, []);

if(isConfirmed){
  return (
    <div>
      <div className='vh-100 container d-flex flex-column justify-content-center align-items-center text-center'>
          <div className='mb-2'>
            <img src={imagenRegistroExitoso} alt='imagen de registro' className='co_re-imagen' />
          </div>
          <div>
            <h1 className='fw-bolder fontMontserrat co_re-titulo mb-5'>¡Registro exitoso!</h1>
            <h2 className='fw-medium fs-3'>Juntos exploraremos lo desconocido. Que cada destino te lleve a un recuerdo inolvidable.</h2>
            <h3 className='fs-3'>Por favor, procede a <Link className='co_re-iniciar-sesion' to='/login'>Iniciar sesion</Link> para continuar.</h3>
          </div>
      </div>
      <Footer showIncorporaLugar={false} />
    </div>
  );
}
else{
  // Mostrar registro no exitoso
  return (
    <div>
      <div className='vh-100 container d-flex flex-column justify-content-center align-items-center text-center'>
          <div className='mb-2'>
            {/* <img src={imagenRegistroExitoso} alt='imagen de registro' className='co_re-imagen' /> */}
          </div>
          <div>
            <h1 className='fw-bolder fontMontserrat co_re-titulo mb-5'>¡Registro no exitoso!</h1>
            <h2 className='fw-medium fs-3'>Lo sentimos, no se ha podido confirmar tu registro.</h2>
            <h3 className='fs-3'>Por favor, intenta de nuevo o vuelve a <Link className='co_re-iniciar-sesion' to='/register'>registro</Link> para continuar.</h3>
          </div>
      </div>
      <Footer showIncorporaLugar={false} />
    </div>
  );

}
}
export default ConfirmacionRegistro;