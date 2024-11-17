import React from 'react';

function MenuFiltros({ modal }) {
  return (
    <div>
      <div className={`accordion ${modal ? 'us_de-modal-filtro' : ''}`} id='accordionFiltro'>
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
              Alcaldías
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
              Categorías
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
                <li><input type='checkbox' id='option19' /> <label htmlFor='option19'>Salud y Bienestar</label></li>
                <li><input type='checkbox' id='option22' /> <label htmlFor='option22'>Deportes</label></li>
                <li><input type='checkbox' id='option21' /> <label htmlFor='option21'>Comida Rápida</label></li>
                <li><input type='checkbox' id='option26' /> <label htmlFor='option26'>Restaurante</label></li>
                <li><input type='checkbox' id='option26' /> <label htmlFor='option26'>Cafetería</label></li>
                <li><input type='checkbox' id='option26' /> <label htmlFor='option26'>Bar</label></li>
                <li><input type='checkbox' id='option26' /> <label htmlFor='option26'>Arte</label></li>
                <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Historia</label></li>
                <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Museos</label></li>
                <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Educativos</label></li>
                <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Compras</label></li>
                <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Parques</label></li>
                <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Juegos recreativos al aire libre</label></li>
                <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Juegos recreativos bajo techo</label></li>
                <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Zoológicos</label></li>
                <li><input type='checkbox' id='option18' /> <label htmlFor='option18'>Religión</label></li>
              </ul>
            </div>
          </div>
        </div>
      </div> {/* fin del accordion */}
    </div>
  );
}

export default MenuFiltros;
