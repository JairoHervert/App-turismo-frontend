import React from 'react';

function MenuFiltros({ modal, selectedAlcaldias, selectedCategorias, onFilterChange, onCategoryChange }) { // NUEVO: Props para categorías
    // Manejo de alcaldías seleccionadas
    const toggleAlcaldia = (alcaldia) => {
      const newSelectedAlcaldias = selectedAlcaldias.includes(alcaldia)
        ? selectedAlcaldias.filter((item) => item !== alcaldia) // Quita si ya está seleccionada
        : [...selectedAlcaldias, alcaldia]; // Agrega si no está seleccionada
  
      onFilterChange(newSelectedAlcaldias); // Notifica al padre
    };

    // Manejo de categorías seleccionadas // NUEVO
    const toggleCategoria = (categoria) => {
      const newSelectedCategorias = selectedCategorias.includes(categoria)
        ? selectedCategorias.filter((item) => item !== categoria) // Quita si ya está seleccionada
        : [...selectedCategorias, categoria]; // Agrega si no está seleccionada

      onCategoryChange(newSelectedCategorias); // Notifica al padre
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
                {[ // Lista de alcaldías
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
                      checked={selectedAlcaldias.includes(alcaldia)} // Verifica si está seleccionada
                      onChange={() => toggleAlcaldia(alcaldia)} // Maneja el cambio
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
                {[ // NUEVO: Lista de categorías
                  'Arcades',
                  'Arena de luchas',
                  'Arte y cultura',
                  'Bares',
                  'Bibliotecas',
                  'Boleras',
                  'Buffets',
                  'Cafeterías',
                  'Clubes',
                  'Comida rápida',
                  'Compras',
                  'Karaokes',
                  'Aventura',
                  'Historia',
                  'Religión',
                  'Mariscos',
                  'Museos',
                  'Parques',
                  'Parques de diversiones',
                  'Parques de skate',
                  'Patinaje sobre hielo',
                  'Restaurantes',
                  'Restaurantes africanos',
                  'Restaurantes americanos',
                  'Restaurantes asiáticos',
                  'Restaurantes brasileños',
                  'Restaurantes de medio oriente',
                  'Restaurantes europeos',
                  'Restaurantes mexicanos',
                  'Salones de té',
                  'SteakHouses',
                  'Zoológicos',
                ].map((categoria) => (
                  <li key={categoria}>
                    <input
                      type="checkbox"
                      id={`categoria-${categoria}`}
                      checked={selectedCategorias.includes(categoria)} // NUEVO: Verifica si la categoría está seleccionada
                      onChange={() => toggleCategoria(categoria)} // NUEVO: Maneja el cambio
                    />
                    <label htmlFor={`categoria-${categoria}`}>{categoria}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div> {/* fin del accordion */}
    </div>
  );
}

export default MenuFiltros;
