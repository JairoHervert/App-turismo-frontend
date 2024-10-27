import React from 'react';
import '../css/Login1.css';

function LoginPage() {
  return (
    <div className="login-container vh-100 d-flex">
      {/* Columna izquierda */}
      <div className="login-left text-white d-none d-md-flex flex-column align-items-center justify-content-center">
        <h1 className="display-4 fw-bold text-center fontMontserrat">Lorem ipsum dolor sit amet.</h1>
        <p className="text-center mt-3 px-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores minus odio dolorem odit omnis sint blanditiis tenetur excepturi eligendi ad?</p>
        <small className="mt-5">ART BY Brandon Peso Pluma</small>
      </div>

      {/* Columna derecha */}
      <div className="login-right d-flex flex-column align-items-center justify-content-center p-4">
        <h3 className="mb-4 fontMontserrat">Inicia sesion</h3>

        <form className="w-100" style={{ maxWidth: '400px' }}>
          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="email">Correo:</label>
            <input type="email" id="email" className="form-control form-control-lg" />
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" value="" id="keepLoggedIn" />
            <label className="form-check-label" htmlFor="keepLoggedIn">
              Mantener sesión iniciada
            </label>
          </div>

          <button className="btn btn-primary btn-lg w-100 mb-3" type="button">Accede</button>

          <p className="text-muted">o bien inicia sesion con:</p>

          <button className="btn btn-outline-secondary w-100 mb-2" type="button">Continua con Google</button>
          <button className="btn btn-outline-secondary w-100 mb-2" type="button">Continua con Apple</button>
          <button className="btn btn-outline-secondary w-100 mb-4" type="button">Continua con Facebook</button>

          <p className="small text-muted mb-2">¿olvidaste tu contgraseña?</p>
          <p>¿No tienes una cuenta? <a href="#!" className="fontRosaMexicano">Registrate aqui</a></p>
          <p>Regresar a la <a className="fontRosaMexicano" href="/">pagina de inicio</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
