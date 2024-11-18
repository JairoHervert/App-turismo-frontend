import React, { useState } from "react";
import '../css/preferencias.css';

import img1 from "../img/pref_user/category1.png";
import img2 from "../img/pref_user/category2.png";
import img3 from "../img/pref_user/category3.png";
import img4 from "../img/pref_user/category4.png";
import img5 from "../img/pref_user/category5.png";
import img6 from "../img/pref_user/category6.png";
import img7 from "../img/pref_user/category7.png";
import img8 from "../img/pref_user/category8.png";

function Preferencias() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [discapacidad, setDiscapacidad] = useState(false);
    const [preferenciaAlimenticia, setPreferenciaAlimenticia] = useState("ninguna");


    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const categorias = [
        { id: 1, nombre: "Turísticos", imagen: img1 },
        { id: 2, nombre: "No convencionales", imagen: img2 },
        { id: 3, nombre: "Gastronomía", imagen: img3 },
        { id: 4, nombre: "Naturaleza", imagen: img4 },
        { id: 5, nombre: "Familiar", imagen: img5 },
        { id: 6, nombre: "Sitios religiosos", imagen: img6 },
        { id: 7, nombre: "Museos", imagen: img7 },
        { id: 8, nombre: "Deportes", imagen: img8 },
        // Agrega más categorías según sea necesario
    ];

    const toggleSeleccion = (id) => {
        setCategoriasSeleccionadas((prev) =>
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        );
    };


    const handleOmitir = () => {
        // Cierra el modal sin guardar la información
        document.getElementById("exampleModalToggle").click();
    };

    return (
        <div>
            {/* Primer Modal */}
            <div className="modal fade " id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content  pref-border-modal">
                        <div className="modal-header">
                            <h5 className="modal-title pref-titulo" id="exampleModalToggleLabel">Preferencias</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pref-content">
                            <p>Para ofrecerte una mejor experiencia, necesitamos conocerte mejor.</p>
                            <div className="mb-3">
                                <label className="form-label">Nombre(s)</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellido(s)</label>
                                <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha de nacimiento</label>
                                <input type="date" className="form-control" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Preferencia alimenticia</label>
                                <select className="form-select" value={preferenciaAlimenticia} onChange={(e) => setPreferenciaAlimenticia(e.target.value)}>
                                    <option value="ninguna">Ninguna</option>
                                    <option value="vegetariano">Vegetariano</option>
                                    <option value="vegano">Vegano</option>
                                </select>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" checked={discapacidad} onChange={(e) => setDiscapacidad(e.target.checked)} />
                                <label className="form-check-label">¿Tienes alguna discapacidad motriz?</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={handleOmitir}
                            >
                                Omitir
                            </button>
                            <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {/* Segundo Modal */}
                <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content pref-border-modal">
                            <div className="modal-header">
                                <h5 className="modal-title pref-titulo" id="exampleModalToggleLabel2">Categorías de agrado</h5>
                            </div>
                            <div className="modal-body pref-content">
                                <p>Selecciona las categorías de actividades que más te interesan.</p>
                                <div className="row">
                                    {categorias.map((categoria) => (
                                        <div key={categoria.id} className="col-6 col-md-4 col-lg-3 mb-3" >
                                            <div
                                                onClick={() => toggleSeleccion(categoria.id)}
                                                className={`pref-categoriaUser ${categoriasSeleccionadas.includes(categoria.id) ? 'seleccionada' : ''}`}
                                                style={{
                                                    backgroundImage: `url(${categoria.imagen})`,
                                                }}
                                            >
                                                <div className="titulo">
                                                    {categoria.nombre}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Volver</button>
                                <button className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preferencias;