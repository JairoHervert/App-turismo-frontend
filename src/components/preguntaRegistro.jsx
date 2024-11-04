import React, { useState } from 'react';
import angelImage from '../img/HomePage/angel.jpeg';
import '../css/HomePage.css';


function PreguntaRegistro() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Simula el estado de registro del usuario

    return (
        <div className="w-100 pr-0">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 p-3 pr-1" >
                        <div className="row">
                            <div className="col-12 col-md-7 d-flex flex-column justify-content-center pr-2" >
                                <h2 className="pregunta">
                                    {isLoggedIn ? '¡Bienvenido!' : '¿Ya te encuentras registrado?'}
                                </h2>
                                <div className="pr-pitch">
                                    {isLoggedIn ? (
                                        <>
                                            <p>
                                                ¡Disfruta de todas las funcionalidades de nuestra app y lleva la organización de tus viajes al siguiente nivel! Con nuestra app, puedes crear itinerarios personalizados y recibir recomendaciones basadas en tus intereses!
                                            </p>

                                            <p>
                                                Aprovecha todas las herramientas que hemos desarrollado para que planear tu viaje sea tan emocionante como vivirlo. ¡Explora, organiza y disfruta al máximo cada momento de tu aventura!
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p>
                                                ¡Regístrate ahora y lleva la organización de tus viajes al siguiente nivel! Nuestra app te permite
                                                crear un itinerario personalizado de manera fácil y rápida, ayudándote a disfrutar de cada destino al máximo.
                                                Con una cuenta, tendrás acceso a herramientas exclusivas para que planear sea tan emocionante como el viaje mismo.
                                            </p>
                                            <p>
                                                No dejes que la falta de planificación te haga perder momentos únicos. <strong>¡Regístrate ahora y comienza a crear el itinerario de tus sueños!</strong>
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
                                <img
                                    src={angelImage}
                                    alt="Ángel de la independencia"
                                    className="img-fluid pr-img"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreguntaRegistro;
