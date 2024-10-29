import React from 'react';
import angelImage from '../img/HomePage/angel.jpeg';

function RegistrationPrompt() {
    return (
        <div className="w-100" style={{ backgroundColor: '#cce7f0', padding: '20px 0' }}>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 p-3" style={{ backgroundColor: '#cce7f0', borderRadius: '5px' }}>
                        <div className="row">
                            <div className="col-12 col-md-7 d-flex flex-column justify-content-center" style={{ padding: '10px' }}>
                                <h2 className="pregunta" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>¿Ya te encuentras registrado?</h2>
                                <div className="pitch" style={{ fontSize: '1rem', lineHeight: '1.4', textAlign: 'justify' }}>
                                    <p style={{ marginBottom: '8px' }}>
                                        ¡Regístrate ahora y lleva la organización de tus viajes al siguiente nivel! Nuestra app te permite
                                        crear un itinerario personalizado de manera fácil y rápida, ayudándote a disfrutar de cada destino al máximo.
                                        Con una cuenta, tendrás acceso a herramientas exclusivas para que planear sea tan emocionante como el viaje mismo.
                                    </p>
                                    <p style={{ marginBottom: '8px' }}>
                                        No dejes que la falta de planificación te haga perder momentos únicos. <strong>¡Regístrate ahora y comienza a crear el itinerario de tus sueños!</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
                                <img
                                    src={angelImage}
                                    alt="Ángel de la independencia"
                                    className="img-fluid"
                                    style={{ borderRadius: '5px', maxHeight: '400px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPrompt;
