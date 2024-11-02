import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import CuadroLugar from '../components/deseados/UDCuadroLugar';
import '../css/UsuarioDeseados.css';

function UsuarioDeseados() {
  return (
    <div>
      <Navbar
        showingresa={false}
        showRegistrate={false}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <div className='us_de-container my-5'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className='fw-bolder fontMontserrat mb-4 us_de-deseados-text'>Deseados</h1>

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
              Buscar
            </button>
          </div>
        </div> {/* fin-titulo_y_buscador */}

        <div className='row'>
          <div className='col-12 col-lg-9 us_de-scrollable-column'>
            <CuadroLugar
              nombreLugar='Álvaro Obregón'
              descripcionLugar='Descubre el encanto de Ávaro Obregón, donde la vida cultural y los sabores locales se fusionan. Pasea por plazas y callejones llenos de historia.'
              imagenLugar='home-places-alvaro-obregon.jpg'
              tiempoLugar='2 hrs'
              costoLugar='Gratis' />

            <CuadroLugar
              nombreLugar='Xochimilco'
              descripcionLugar='Sumérgete en la experiencia única de los canales de Xochimilco. Navega en trajineras y disfruta de la tradición y el folclor en un ambiente colorido.'
              imagenLugar='home-places-xochimilco.jpg'
              tiempoLugar='3 hrs'
              costoLugar='Gratis' />

            <CuadroLugar
              nombreLugar='Pirámides de Teotihuacan'
              descripcionLugar='Vive la majestuosidad de las antiguas pirámides. Sube a la cima del Sol y la Luna para una vista impresionante de este sitio arqueológico.'
              imagenLugar='home-places-piramides-teotihuacan.webp'
              tiempoLugar='4 hrs'
              costoLugar='200mxn' />

            <CuadroLugar
              nombreLugar='Coyoacán'
              descripcionLugar='Explora las calles empedradas y plazas vibrantes de Coyoacán, un rincón bohemio lleno de cafés, arte y el ambiente acogedor de la Ciudad de México.'
              imagenLugar='home-places-coyoacan.jpg'
              tiempoLugar='2:30 hrs'
              costoLugar='100mxn' />

            <CuadroLugar
              nombreLugar='Xochimilco'
              descripcionLugar='Recorre los canales de Xochimilco a bordo de una trajinera, disfruta de la música en vivo y degusta platillos tradicionales en un ambiente festivo.'
              imagenLugar='home-places-xochimilco.jpg'
              tiempoLugar='3 hrs'
              costoLugar='Gratis' />


          </div>

          <div className='col-12 col-lg-3 d-flex flex-column align-items-center'>
            <div className='us_de-contenedor-filtros my-4 d-flex flex-column justify-content-center align-items-center'>
              <h2 className='fs-2 fw-semibold mt-2 fontMontserrat'>Filtros de busqueda</h2>

              <div className='accordion' id='accordionFiltro'>
                {/* Primer acordeón: abierto por defecto */}
                <div className='accordion-item us_de-accordion-item'>
                  <h2 className='accordion-header fw-bold' id='us_de-filtro-alcaldias'>
                    <button
                      className='accordion-button us_de-accordion-button fw-semibold'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseOne'
                      aria-expanded='true'
                      aria-controls='collapseOne'
                    >
                      Alcaldias
                    </button>
                  </h2>
                  <div
                    id='collapseOne'
                    className='accordion-collapse collapse show'
                    aria-labelledby='us_de-filtro-alcaldias'
                    data-bs-parent='#accordionFiltro'
                  >
                    <div className='accordion-body ud_de-accordion-body'>
                      <ul className='list-unstyled'>
                        <li><input type='checkbox' id='option1' /> <label htmlFor='option1'>Álvaro Obregón</label></li>
                        <li><input type='checkbox' id='option2' /> <label htmlFor='option2'>Azcapotzalco</label></li>
                        <li><input type='checkbox' id='option3' /> <label htmlFor='option3'>Benito Juárez</label></li>
                        <li><input type='checkbox' id='option4' /> <label htmlFor='option4'>Coyoacán</label></li>
                        <li><input type='checkbox' id='option5' /> <label htmlFor='option5'>Cuajimalpa</label></li>
                        <li><input type='checkbox' id='option6' /> <label htmlFor='option6'>Cuauhtémoc</label></li>
                        <li><input type='checkbox' id='option7' /> <label htmlFor='option7'>Gustavo A. Madero</label></li>
                        <li><input type='checkbox' id='option8' /> <label htmlFor='option8'>Iztacalco</label></li>
                        <li><input type='checkbox' id='option9' /> <label htmlFor='option9'>Iztapalapa</label></li>
                        <li><input type='checkbox' id='option10' /> <label htmlFor='option10'>Magdalena C.</label></li>
                        <li><input type='checkbox' id='option11' /> <label htmlFor='option11'>Miguel Hidalgo</label></li>
                        <li><input type='checkbox' id='option12' /> <label htmlFor='option12'>Milpa Alta</label></li>
                        <li><input type='checkbox' id='option13' /> <label htmlFor='option13'>Tláhuac</label></li>
                        <li><input type='checkbox' id='option14' /> <label htmlFor='option14'>Tlalpan</label></li>
                        <li><input type='checkbox' id='option15' /> <label htmlFor='option15'>Venustiano Carranza</label></li>
                        <li><input type='checkbox' id='option16' /> <label htmlFor='option16'>Xochimilco</label></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Segundo acordeón: cerrado por defecto */}
                <div className='accordion-item us_de-accordion-item'>
                  <h2 className='accordion-header fw-bold' id='ud_de-filtro-categorias'>
                    <button
                      className='accordion-button collapsed us_de-accordion-button fw-semibold'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseTwo'
                      aria-expanded='false'
                      aria-controls='collapseTwo'
                    >
                      Categorias
                    </button>
                  </h2>
                  <div
                    id='collapseTwo'
                    className='accordion-collapse collapse'
                    aria-labelledby='ud_de-filtro-categorias'
                    data-bs-parent='#accordionFiltro'
                  >
                    <div className='accordion-body ud_de-accordion-body'>
                      <ul className='list-unstyled'>
                        <li><input type='checkbox' id='option19' /> <label htmlFor='option19'>Turisticos</label></li>
                        <li><input type='checkbox' id='option22' /> <label htmlFor='option22'>No convencionales</label></li>
                        <li><input type='checkbox' id='option21' /> <label htmlFor='option21'>Gastronomía</label></li>
                        <li><input type='checkbox' id='option26' /> <label htmlFor='option26'>Naturaleza</label></li>
                        <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Familiar</label></li>
                        <li><input type='checkbox' id='option24' /> <label htmlFor='option24'>Museos</label></li>
                        <li><input type='checkbox' id='option17' /> <label htmlFor='option17'>Música</label></li>
                        <li><input type='checkbox' id='option20' /> <label htmlFor='option20'>Cultura</label></li>
                        <li><input type='checkbox' id='option23' /> <label htmlFor='option23'>Danza</label></li>
                        <li><input type='checkbox' id='option25' /> <label htmlFor='option25'>Sitios religiosos</label></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> {/* fin del accordion */}
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

export default UsuarioDeseados;
