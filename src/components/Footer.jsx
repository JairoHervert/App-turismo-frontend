import '../css/Footer.css';
import { Link } from 'react-router-dom';

function Footer({ showIncorporaLugar }) {
  return (
    <footer className='footer rosaMexicano text-center text-lg-start'>
      <div className='container p-4'>
        <section>
          <div className='row'>
            <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
              <h6>Itinerarios Canasta Básica</h6>
              <p>
                Descubre y organiza tus experiencias en la Ciudad de México, desde lugares icónicos hasta rincones menos conocidos.
              </p>
            </div>

            <hr className='w-100 clearfix d-md-none' />

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mt-3 explore-links'>
              <h6>Canasta Básica</h6>
                            
              {/* Mostrar el enlace de incorporar lugar si showIncorporaLugar es verdadero */}
              {showIncorporaLugar && (
                <p><Link to='/'>Incorpora un Lugar</Link></p>
              )}

              <p><Link to='/'>Terminos y Condiciones</Link></p>
              <p><Link to='/'>Sobre nosotros</Link></p>
            </div>

            <hr className='w-100 clearfix d-md-none' />

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mt-3 contact-info'>
              <h6>Contacto</h6>
              <p><i className='bi bi-house-fill'></i> Ciudad de México, México</p>
              <p><i className='bi bi-envelope-fill'></i> contacto@canastabasica.com</p>
              <p><i className='bi bi-telephone-fill'></i> +52 55 5555 5555</p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 social-media'>
              <h6>Síguenos</h6>
              <Link className='btn btn-primary btn-floating facebook' to='/' role='button'>
                <i className='bi bi-facebook'></i>
              </Link>
              <Link className='btn btn-primary btn-floating twitter' to='/' role='button'>
                <i className='bi bi-twitter-x'></i>
              </Link>
              <Link className='btn btn-primary btn-floating google' to='/' role='button'>
                <i className='bi bi-google'></i>
              </Link>
              <Link className='btn btn-primary btn-floating instagram' to='/' role='button'>
                <i className='bi bi-instagram'></i>
              </Link>
              <Link className='btn btn-primary btn-floating linkedin' to='/' role='button'>
                <i className='bi bi-linkedin'></i>
              </Link>
              <Link className='btn btn-primary btn-floating github' to='/' role='button'>
                <i className='bi bi-github'></i>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className='copyright'>
        © {new Date().getFullYear()} Itinerarios CDMX
      </div>
    </footer>
  );
}

export default Footer;
