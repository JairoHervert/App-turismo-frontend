import React from 'react';

function DescripcionLugar({nombreImagen}) {

    return (
      <section className='place-page container-fluid'>
        <div className='place-row row justify-content-center gx-0'>
            {/* Left Site */}
            <div className='col-md-4 place-left-site'>
                <div className='card card-descripcion-lugar'>
                    <div className='map-placeholder'>
                        {/* para poner el mapa */}
                    </div>
                    <a className='link-google-maps' href='#'>Ver en GoogleMaps</a>
                    <div className='description-left row gx-0'>
                        <div className='col-1 col-icon'>
                            <i class="bi bi-geo-alt-fill"></i>
                        </div>
                        <div className='col'>
                        <p className='place-description'>De La Ciudadela 4, Colonia Centro, Centro, Cuauhtémoc, 06040 Ciudad de México, CDMX</p>
                        </div>
                    </div>
                    <div className='row gx-0'>
                        <div className='col-1 col-icon'>
                            <i class="bi bi-currency-dollar"></i>
                        </div>
                        <div className='col'>
                            <p className='place-description'>Sin costo</p>
                        </div>
                        
                    </div>
                    <div className='row gx-0'>
                        <div className='col-1 col-icon'>
                        <i class="bi bi-person-wheelchair"></i>
                        </div>
                        <div className='col'>
                            <p className='place-description'>Accesible con silla de ruedas</p>
                        </div>
                    </div>
                    <div className='row gx-0'>
                        <div className='col-1 col-icon'>
                            <i class="bi bi-clock"></i>
                        </div>
                        <div className='col'>
                            <p className='place-description'>Todos los días de 8:30 a 19:30 hrs</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            {/* Right Site */}
            <div className='col-md-8 place-right-site'>
                <h2 className='place-title'>
                    Biblioteca de México
                </h2>
                <div className='row gx-0 place-score'>
                    <div className='score'>
                        <h3 className='score-text'>4.8</h3>
                    </div>
                    <div className='stars'>
                        {/* de a mientras */}
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                    </div>
                </div>
                <p className='place-text'>
                    Desde su fundación, a comienzos de 1990, la revista Biblioteca de México ha publicado 172 números impresos y 4 números digitales. A lo largo de más de 30 años, ha dado espacio a trabajos de creación, investigación y crítica a autores de habla hispana y de otros idiomas. Pensada originalmente como una revista de letras en el sentido clásico y más generoso del término, que busca dar relieve y difusión a obras inasequibles de los acervos de la biblioteca misma, en esta nueva etapa digital también se tiene el propósito de acercarse a las nuevas generaciones de lectores, publicando a jóvenes escritores e ilustradores. Se trata, así, de sostener un esfuerzo de divulgación literaria que, de la manera más incluyente, brinde hospitalidad a la belleza y la inteligencia de la creación.
                </p>
                
                {/* Seccion galería 
                <div className='row place-img gx-0'>
                    <div className='col-md-5 col-big-img'>
                        <div className='place-big-img'></div>
                    </div>
                    <div className='col-md-7 col-little-img'>
                        <div className='row gx-0'>
                            <div className='col'>
                                <div className='place-little-img'></div>
                            </div>
                            <div className='col'>
                                <div className='place-little-img'></div>
                            </div>
                        </div>
                        <div className='row gx-0'>
                            <div className='col '>
                                <div className='place-little-img'></div>
                            </div>
                            <div className='col '>
                                <div className='place-little-img'></div>
                            </div>
                        </div>
                    </div>
                </div>*/}
                


                {/* Seccion galería */}
                <div className='place-img'>

                    <div className='big-img'>

                        </div>

                    <div className='col-md-7 col-little-img'>
                        <div className='row gx-0 fila-1'>
                                <div className='place-little-img'></div>
                                <div className='place-little-img'></div>
                        </div>
                        <div className='row gx-0 fila-2'>
                                <div className='place-little-img'></div>
                                <div className='place-little-img'></div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        
        
      </section>
      
    );
  }

  export default DescripcionLugar;