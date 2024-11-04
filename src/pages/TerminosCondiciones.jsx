import React from 'react';
import '../css/TyC.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const TerminosCondiciones = () => {
  return (
    <div>
      <NavBar
        showingresa={false}
        showRegistrate={true}
        transparentNavbar={false}
        lightLink={false}
        staticNavbar={false}
      />

      <div className='TyC'>
        <h1 className='TyC-header'>Términos y Condiciones</h1>
        <div className='container'>
          <div className="row">
            <div className="col-12 col-md-4 TyC_navContainer order-1 order-md-1">
              <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end TyC_nav">
                <nav className="nav nav-pills flex-column TyC-nav">
                  <a className="nav-link TyC_navLink" href="#item-1">Información Relevante</a>
                  <a className="nav-link TyC_navLink" href="#item-2">Licencia</a>
                  <a className="nav-link TyC_navLink" href="#item-3">Uso No Autorizado</a>
                  <a className="nav-link TyC_navLink" href="#item-4">Propiedad</a>
                  <a className="nav-link TyC_navLink" href="#item-5">Política de Reembolso y Garantía</a>
                  <a className="nav-link TyC_navLink" href="#item-6">Comprobación Antifraude</a>
                  <a className="nav-link TyC_navLink" href="#item-7">Privacidad</a>
                </nav>
              </nav>
            </div>

            <div className="col-12 col-md-8 TyC_contentContainer order-2 order-md-2">
              <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2 TyC_content" tabIndex="0">
                <div id="item-1" className="TyC_section">
                  <h4 className="TyC_title">Información Relevante</h4>
                  <p className="TyC_text">
                    Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios así como la compra de nuestros productos implicará que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todas los productos que son ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas o presentadas por una página web tercera y en tal caso estarían sujetas a sus propios Términos y Condiciones. En algunos casos, para adquirir un producto, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña.
                  </p>
                  <p className="TyC_text">
                    El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para la compra de alguno de nuestros productos. www.canasta_basica.com no asume la responsabilidad en caso de que entregue dicha clave a terceros.
                  </p>
                  <p className="TyC_text">
                    Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura (en caso de existir) y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. En algunos casos puede que se requiera una verificación por medio de correo electrónico.
                  </p>
                  <p className="TyC_text">
                    Los precios de los productos ofrecidos en esta Tienda Online es válido solamente en las compras realizadas en este sitio web.
                  </p>
                </div>
                <div id="item-2" className="TyC_section">
                  <h4 className="TyC_title">Licencia</h4>
                  <p className="TyC_text">
                    Canasta_Basica a través de su sitio web concede una licencia para que los usuarios utilicen los productos que son vendidos en este sitio web de acuerdo a los Términos y Condiciones que se describen en este documento.
                  </p>
                </div>
                <div id="item-3" className="TyC_section">
                  <h4 className="TyC_title">Uso No Autorizado</h4>
                  <p className="TyC_text">
                    En caso de que aplique (para venta de software, templetes, u otro producto de diseño y programación) usted no puede colocar uno de nuestros productos, modificado o sin modificar, en un CD, sitio web o ningún otro medio y ofrecerlos para la redistribución o la reventa de ningún tipo.
                  </p>
                </div>
                <div id="item-4" className="TyC_section">
                  <h4 className="TyC_title">Propiedad</h4>
                  <p className="TyC_text">
                    Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan sin ningún tipo de garantía, expresa o implícita. En ningún esta compañía será responsables de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos.
                  </p>
                </div>
                <div id="item-5" className="TyC_section">
                  <h4 className="TyC_title">Política de Reembolso y Garantía</h4>
                  <p className="TyC_text">
                    En el caso de productos que sean mercancías irrevocables no-tangibles, no realizamos reembolsos después de que se envíe el producto, usted tiene la responsabilidad de entender antes de comprarlo. Le pedimos que lea cuidadosamente antes de comprarlo. Hacemos solamente excepciones con esta regla cuando la descripción no se ajusta al producto. Hay algunos productos que pudieran tener garantía y posibilidad de reembolso pero este será especificado al comprar el producto. En tales casos la garantía solo cubrirá fallas de fábrica y sólo se hará efectiva cuando el producto se haya usado correctamente. La garantía no cubre averías o daños ocasionados por uso indebido. Los términos de la garantía están asociados a fallas de fabricación y funcionamiento en condiciones normales de los productos y sólo se harán efectivos estos términos si el equipo ha sido usado correctamente. Esto incluye:
                  </p>
                  <ul className="TyC_list">
                    <li>De acuerdo a las especificaciones técnicas indicadas para cada producto.</li>
                    <li>En condiciones ambientales acorde con las especificaciones indicadas por el fabricante.</li>
                    <li>En uso específico para la función con que fue diseñado de fábrica.</li>
                    <li>En condiciones de operación eléctricas acorde con las especificaciones y tolerancias indicadas.</li>
                  </ul>
                </div>
                <div id="item-6" className="TyC_section">
                  <h4 className="TyC_title">Comprobación Antifraude</h4>
                  <p className="TyC_text">
                    La compra del cliente puede ser aplazada para la comprobación antifraude. También puede ser suspendida por más tiempo para una investigación más rigurosa, para evitar transacciones fraudulentas.
                  </p>
                </div>
                <div id="item-7" className="TyC_section">
                  <h4 className="TyC_title">Privacidad</h4>
                  <p className="TyC_text">
                    Este www.canasta_basica.com garantiza que la celta de vigo noticias información personal que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales.
                  </p>
                  <p className="TyC_text">
                    La suscripción a boletines de correos electrónicos publicitarios es voluntaria y podría ser seleccionada al momento de crear su cuenta.
                  </p>
                  <p className="TyC_text">
                    Canasta_Basica reserva los derechos de cambiar o de modificar estos términos sin previo aviso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer showIncorporaLugar={false} />
    </div>
  );
};

export default TerminosCondiciones;