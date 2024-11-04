import React from 'react';
import '../css/TyC.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PoliticasPrivacidad = () => {
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
        <h1 className='TyC-header'>Políticas de Privacidad</h1>

        <div className='container'>
          <div className="row">
            <div className="col-12 col-md-4 TyC_navContainer order-1 order-md-1">
              <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end TyC_nav">
                <nav className="nav nav-pills flex-column TyC-nav">
                  <a className="nav-link TyC_navLink" href="#item-1">Información Recogida</a>
                  <a className="nav-link TyC_navLink" href="#item-2">Uso de la Información</a>
                  <a className="nav-link TyC_navLink" href="#item-3">Cookies</a>
                  <a className="nav-link TyC_navLink" href="#item-4">Enlaces a Terceros</a>
                  <a className="nav-link TyC_navLink" href="#item-5">Control de su Información Personal</a>
                </nav>
              </nav>
            </div>

            <div className="col-12 col-md-8 TyC_contentContainer order-2 order-md-2">
              <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2 TyC_content" tabIndex="0">
                <div id="item-1" className="TyC_section">
                  <h4 className="TyC_title">Información Recogida</h4>
                  <p className="TyC_text">
                    Nuestro sitio web podrá recoger información personal por ejemplo: Nombre, información de contacto como su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.
                  </p>
                </div>
                <div id="item-2" className="TyC_section">
                  <h4 className="TyC_title">Uso de la Información</h4>
                  <p className="TyC_text">
                    Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios. Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.
                  </p>
                  <p className="TyC_text">
                    Canasta_basica está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.
                  </p>
                </div>
                <div id="item-3" className="TyC_section">
                  <h4 className="TyC_title">Cookies</h4>
                  <p className="TyC_text">
                    Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.
                  </p>
                  <p className="TyC_text">
                    Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente noticias. Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.
                  </p>
                </div>
                <div id="item-4" className="TyC_section">
                  <h4 className="TyC_title">Enlaces a Terceros</h4>
                  <p className="TyC_text">
                    Este sitio web pudiera contener en laces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.
                  </p>
                </div>
                <div id="item-5" className="TyC_section">
                  <h4 className="TyC_title">Control de su Información Personal</h4>
                  <p className="TyC_text">
                    En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web. Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico. En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.
                  </p>
                  <p className="TyC_text">
                    Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.
                  </p>
                  <p className="TyC_text">
                    Canasta_basica Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.
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

export default PoliticasPrivacidad;