import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import CuadroLugar from '../components/deseados/UDCuadroLugar';
import MenuFiltros from '../components/deseados/MenuFiltros';
import '../css/DeseadosPage.css';

function DeseadosPage() {
  return (
    <div>
      <Navbar
        showingresa={false}
        showRegistrate={false}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <div className='us_de-container my-4'>
        <div className='d-flex justify-content-between align-items-center us_de-titulo-buscador'>
          <h1 className='fw-bolder fontMontserrat mb-4 us_de-deseados-text'>Deseados</h1>
          <div className='us_de-cont-buscador-filtro'>
            <div className='input-group us_de-buscador'>
              <input
                type='search'
                className='form-control rounded-start'
                placeholder='Buscar en deseados'
                aria-label='Search'
                aria-describedby='search-addon'
              />
              <button
                type='button'
                className='btn ud_de-btn-outline-secondary fw-medium'
                data-mdb-ripple-init
              >
                <span className='fw-semibold'>Buscar</span>
              </button>
            </div>

            {/* Botón de filtro, visible solo en pantallas chicas */}
            <div className='d-xl-none us_de-contenedor-filtro'>
              <button type='button' className='btn us_de-button-agregar' data-bs-toggle='modal' data-bs-target='#us_de-filtros-busqueda'>
                <i className='bi bi-funnel-fill us_de-icono me-2'></i><span className='fw-semibold'>Filtros</span>
              </button>
            </div>

            {/* Modal de filtro */}
            <div className='modal fade' id='us_de-filtros-busqueda' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>Filtros de búsqueda</h1>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className='modal-body'>
                    <MenuFiltros
                      modal={true} />
                  </div>
                  <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>
                    <button type='button' className='btn btn-primary'>Aplicar</button>
                  </div>
                </div>
              </div>
            </div>
          </div> {/* fin-row-grid */}
        </div> {/* fin-titulo_y_buscador */}

        <div className='row'>
          <div className='col-12 col-xl-9 us_de-scrollable-column'>
            <CuadroLugar
              nombreLugar='Álvaro Obregón'
              descripcionLugar='Descubre el encanto de Álvaro Obregón, donde la vida cultural y los sabores locales se fusionan. Pasea por plazas y callejones llenos de historia.'
              imagenLugar='home-places-alvaro-obregon.jpg'
              tiempoLugar='2 hrs'
              costoLugar='Gratis' />

            <CuadroLugar
              nombreLugar='Xochimilco'
              descripcionLugar='Sumérgete en la experiencia única de los canales de Xochimilco. Navega en trajineras y disfruta de la tradición y el folclore en un ambiente colorido.'
              imagenLugar='home-places-xochimilco.jpg'
              tiempoLugar='3 hrs'
              costoLugar='Gratis' />

            <CuadroLugar
              nombreLugar='Pirámides de Teotihuacan'
              descripcionLugar='Vive la majestuosidad de las antiguas pirámides. Sube a la cima del Sol y la Luna para una vista impresionante de este sitio arqueológico.'
              imagenLugar='home-places-piramides-teotihuacan.webp'
              tiempoLugar='4 hrs'
              costoLugar='200 MXN' />

            <CuadroLugar
              nombreLugar='Coyoacán'
              descripcionLugar='Explora las calles empedradas y plazas vibrantes de Coyoacán, un rincón bohemio lleno de cafés, arte y el ambiente acogedor de la Ciudad de México.'
              imagenLugar='home-places-coyoacan.jpg'
              tiempoLugar='2:30 hrs'
              costoLugar='100 MXN' />

            <CuadroLugar
              nombreLugar='Xochimilco'
              descripcionLugar='Recorre los canales de Xochimilco a bordo de una trajinera, disfruta de la música en vivo y degusta platillos tradicionales en un ambiente festivo.'
              imagenLugar='home-places-xochimilco.jpg'
              tiempoLugar='3 hrs'
              costoLugar='Gratis' />
          </div>
          <div className='col-12 col-lg-3 d-flex flex-column align-items-center d-none d-xl-block'>
            <div className='us_de-contenedor-filtros my-4 d-flex flex-column justify-content-center align-items-center'>
              <h2 className='fs-2 fw-semibold mt-2 fontMontserrat'>Filtros de búsqueda</h2>
              <MenuFiltros modal={false} />
            </div>

            <div>
              <button type='button' className='btn us_de-button-agregar fw-medium'>
                <i className='bi bi-person-heart us_de-icono me-2 fs-5'></i>
                Agregar rápidamente
              </button>
            </div>
          </div>
        </div> {/* fin-row-grid */}
      </div> {/* fin-container */}

      <Footer showIncorporaLugar={true} />
    </div>
  );
}

export default DeseadosPage;
