import React from 'react';

function MenuFiltros({ modal, selectedAlcaldias, onFilterChange }) {
    const toggleAlcaldia = (alcaldia) => {
      const newSelectedAlcaldias = selectedAlcaldias.includes(alcaldia)
        ? selectedAlcaldias.filter((item) => item !== alcaldia) // Quita si ya está seleccionada
        : [...selectedAlcaldias, alcaldia]; // Agrega si no está seleccionada
  
      onFilterChange(newSelectedAlcaldias); // Notifica al padre
    };
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
            <div className="accordion-body ud_de-accordion-body">
              <ul className="list-unstyled">
                {[
                  'Álvaro Obregón',
                  'Azcapotzalco',
                  'Benito Juárez',
                  'Coyoacán',
                  'Cuajimalpa',
                  'Cuauhtémoc',
                  'Gustavo A. Madero',
                  'Iztacalco',
                  'Iztapalapa',
                  'Magdalena C.',
                  'Miguel Hidalgo',
                  'Milpa Alta',
                  'Tláhuac',
                  'Tlalpan',
                  'Venustiano Carranza',
                  'Xochimilco',
                ].map((alcaldia) => (
                  <li key={alcaldia}>
                    <input
                      type="checkbox"
                      id={`alcaldia-${alcaldia}`}
                      checked={selectedAlcaldias.includes(alcaldia)}
                      onChange={() => toggleAlcaldia(alcaldia)}
                    />
                    <label htmlFor={`alcaldia-${alcaldia}`}>{alcaldia}</label>
                  </li>
                ))}
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
