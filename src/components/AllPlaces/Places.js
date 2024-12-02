// imagenes de prueba
import chapultepec from '../../img/Categorias/chapultepec.png';
import piramidesTeotihuacan from '../../img/piramides-teotihuacan.webp';
import museoFridaKahlo from '../../img/Categorias/mfk.png';
import museoAntropologia from '../../img/Categorias/mna.png';
import angelDeLaIndependencia from '../../img/Categorias/pdlr.png';
import xochimilco from '../../img/Categorias/xoch.png';
import zocalo from '../../img/Categorias/zocalo.png';
import azcapotzalco from '../../img/HomePage/places/home-places-azcapotzalco.jpg';
import coyoacan from '../../img/HomePage/places/home-places-coyoacan.jpg';
import gustavoAMadero from '../../img/HomePage/places/home-places-gustavo.jpg';
import iztacalco from '../../img/HomePage/places/home-places-iztacalco.jpg';
import magdalena from '../../img/HomePage/places/home-places-magdalena.jpg';
import miguelHidalgo from '../../img/HomePage/places/home-places-miguel-hidalgo.jpg';

const Places = [
  {
    nombre: 'Ángel de la Independencia',
    descripcion: 'Visita uno de los monumentos más emblemáticos de la Ciudad de México. Disfruta de la vista panorámica desde la cima y conoce la historia de este monumento.',
    imagen: angelDeLaIndependencia,
    categorias: 'Historia',
    direccion: 'Paseo de la Reforma, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Xochimilco',
    descripcion: 'Sumérgete en la experiencia única de los canales de Xochimilco. Navega en trajineras y disfruta de la tradición y el folclore en un ambiente colorido.',
    imagen: xochimilco,
    categorias: 'Juegos recreativos al aire libre',
    direccion: 'Embarcadero Nuevo Nativitas, Xochimilco, Ciudad de México',
    rating: 5,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Zócalo',
    descripcion: 'Visita el corazón de la Ciudad de México, donde la historia y la cultura se encuentran. Descubre la Cated ral Metropolitana y el Palacio Nacional.',
    imagen: zocalo,
    categorias: 'Historia',
    direccion: 'Plaza de la Constitución, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Azcapotzalco',
    descripcion: 'Azcapotzalco es una de las 16 alcaldías de la Ciudad de México, ubicada al norte de la capital. Conoce su historia, cultura y tradiciones.',
    imagen: azcapotzalco,
    categorias: 'Historia',
    direccion: 'Azcapotzalco, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Coyoacán',
    descripcion: 'Explora las calles empedradas y plazas vibrantes de Coyoacán, un rincón bohemio lleno de cafés, arte y el ambiente acogedor de la Ciudad de México.',
    imagen: coyoacan,
    categorias: 'Parques',
    direccion: 'Coyoacán, Ciudad de México',
    rating: 5,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Gustavo A. Madero',
    descripcion: 'Gustavo A. Madero es una de las 16 alcaldías de la Ciudad de México, ubicada al norte de la capital. Conoce su historia, cultura y tradiciones.',
    imagen: gustavoAMadero,
    categorias: 'Historia',
    direccion: 'Gustavo A. Madero, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Iztacalco',
    descripcion: 'Iztacalco es una de las 16 alcaldías de la Ciudad de México, ubicada en el oriente de la capital. Conoce su historia, cultura y tradiciones.',
    imagen: iztacalco,
    categorias: 'Historia',
    direccion: 'Iztacalco, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Magdalena Contreras',
    descripcion: 'Magdalena Contreras es una de las 16 alcaldías de la Ciudad de México, ubicada en el sur de la capital. Conoce su historia, cultura y tradiciones.',
    imagen: magdalena,
    categorias: 'Historia',
    direccion: 'Magdalena Contreras, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Miguel Hidalgo',
    descripcion: 'Miguel Hidalgo es una de las 16 alcaldías de la Ciudad de México, ubicada en el poniente de la capital. Conoce su historia, cultura y tradiciones.',
    imagen: miguelHidalgo,
    categorias: 'Historia',
    direccion: 'Miguel Hidalgo, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Chapultepec',
    descripcion: 'Descubre el encanto de Chapultepec, donde la vida cultural y los sabores locales se fusionan. Pasea por plazas y callejones llenos de historia.',
    imagen: chapultepec,
    categorias: 'Parques',
    direccion: 'Bosque de Chapultepec, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Pirámides de Teotihuacan',
    descripcion: 'Vive la majestuosidad de las antiguas pirámides. Sube a la cima del Sol y la Luna para una vista impresionante de este sitio arqueológico.',
    imagen: piramidesTeotihuacan,
    categorias: 'Historia',
    direccion: 'San Juan Teotihuacan, Estado de México',
    rating: 5,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Museo Frida Kahlo',
    descripcion: 'Conoce la vida y obra de la pintora mexicana más reconocida a nivel mundial. Admira sus obras y descubre la historia de esta artista.',
    imagen: museoFridaKahlo,
    categorias: 'Museos',
    direccion: 'Londres 247, Del Carmen, Coyoacán, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Museo Nacional de Antropología',
    descripcion: 'Explora la historia de México a través de las salas de este museo. Descubre la riqueza cultural y arqueológica de las civilizaciones prehispánicas.',
    imagen: museoAntropologia,
    categorias: 'Museos',
    direccion: 'Av. Paseo de la Reforma s/n, Polanco, Ciudad de México',
    rating: 5,
    teléfono: '+52 555 555 1234'
  },
  {
    nombre: 'Miguel Hidalgo',
    descripcion: 'Miguel Hidalgo es una de las 16 alcaldías de la Ciudad de México, ubicada en el poniente de la capital. Conoce su historia, cultura y tradiciones.',
    imagen: miguelHidalgo,
    categorias: 'Historia',
    direccion: 'Miguel Hidalgo, Ciudad de México',
    rating: 4,
    teléfono: '+52 555 555 1234'
  }
];

export default Places;