import React from 'react';

function ModalDetalleIt() {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-centered" role="document" >
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="col-8 position-relative"> {/* 70% of the width */}
                {/* Close button in the top left */}
                <button type="button" className="btn btn-primary position-absolute"  data-bs-dismiss="modal" style={{ top: '10px', left: '10px' }}>
                  Regresar
                </button>
                <h2>Dia 6</h2>
                <p>Contenido principal del lado izquierdo...</p>
              </div>
              <div className="col-4"> {/* 30% of the width */}
                <p>Contenido adicional del lado derecho...</p>
              </div>
            </div>
          </div>
      </div>
        </div>
      </div>
  );
}

export default ModalDetalleIt;
