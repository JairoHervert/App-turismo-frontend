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
    name: 'Ángel de la Independencia',
    description: 'Visita uno de los monumentos más emblemáticos de la Ciudad de México. Disfruta de la vista panorámica desde la cima y conoce la historia de este monumento.',
    image: angelDeLaIndependencia,
    category: 'Historia',
    address: 'Paseo de la Reforma, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Xochimilco',
    description: 'Sumérgete en la experiencia única de los canales de Xochimilco. Navega en trajineras y disfruta de la tradición y el folclore en un ambiente colorido.',
    image: xochimilco,
    category: 'Juegos recreativos al aire libre',
    address: 'Embarcadero Nuevo Nativitas, Xochimilco, Ciudad de México',
    rating: 5,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Zócalo',
    description: 'Visita el corazón de la Ciudad de México, donde la historia y la cultura se encuentran. Descubre la Cated ral Metropolitana y el Palacio Nacional.',
    image: zocalo,
    category: 'Historia',
    address: 'Plaza de la Constitución, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Azcapotzalco',
    description: 'Azcapotzalco es una de las 16 alcaldías de la Ciudad de México, ubicada al norte de la capital. Conoce su historia, cultura y tradiciones.',
    image: azcapotzalco,
    category: 'Historia',
    address: 'Azcapotzalco, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Coyoacán',
    description: 'Explora las calles empedradas y plazas vibrantes de Coyoacán, un rincón bohemio lleno de cafés, arte y el ambiente acogedor de la Ciudad de México.',
    image: coyoacan,
    category: 'Parques',
    address: 'Coyoacán, Ciudad de México',
    rating: 5,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Gustavo A. Madero',
    description: 'Gustavo A. Madero es una de las 16 alcaldías de la Ciudad de México, ubicada al norte de la capital. Conoce su historia, cultura y tradiciones.',
    image: gustavoAMadero,
    category: 'Historia',
    address: 'Gustavo A. Madero, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Iztacalco',
    description: 'Iztacalco es una de las 16 alcaldías de la Ciudad de México, ubicada en el oriente de la capital. Conoce su historia, cultura y tradiciones.',
    image: iztacalco,
    category: 'Historia',
    address: 'Iztacalco, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Magdalena Contreras',
    description: 'Magdalena Contreras es una de las 16 alcaldías de la Ciudad de México, ubicada en el sur de la capital. Conoce su historia, cultura y tradiciones.',
    image: magdalena,
    category: 'Historia',
    address: 'Magdalena Contreras, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Miguel Hidalgo',
    description: 'Miguel Hidalgo es una de las 16 alcaldías de la Ciudad de México, ubicada en el poniente de la capital. Conoce su historia, cultura y tradiciones.',
    image: miguelHidalgo,
    category: 'Historia',
    address: 'Miguel Hidalgo, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Chapultepec',
    description: 'Descubre el encanto de Chapultepec, donde la vida cultural y los sabores locales se fusionan. Pasea por plazas y callejones llenos de historia.',
    image: chapultepec,
    category: 'Parques',
    address: 'Bosque de Chapultepec, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Pirámides de Teotihuacan',
    description: 'Vive la majestuosidad de las antiguas pirámides. Sube a la cima del Sol y la Luna para una vista impresionante de este sitio arqueológico.',
    image: piramidesTeotihuacan,
    category: 'Historia',
    address: 'San Juan Teotihuacan, Estado de México',
    rating: 5,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Museo Frida Kahlo',
    description: 'Conoce la vida y obra de la pintora mexicana más reconocida a nivel mundial. Admira sus obras y descubre la historia de esta artista.',
    image: museoFridaKahlo,
    category: 'Museos',
    address: 'Londres 247, Del Carmen, Coyoacán, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Museo Nacional de Antropología',
    description: 'Explora la historia de México a través de las salas de este museo. Descubre la riqueza cultural y arqueológica de las civilizaciones prehispánicas.',
    image: museoAntropologia,
    category: 'Museos',
    address: 'Av. Paseo de la Reforma s/n, Polanco, Ciudad de México',
    rating: 5,
    phone: '+52 555 555 1234'
  },
  {
    name: 'Miguel Hidalgo',
    description: 'Miguel Hidalgo es una de las 16 alcaldías de la Ciudad de México, ubicada en el poniente de la capital. Conoce su historia, cultura y tradiciones.',
    image: miguelHidalgo,
    category: 'Historia',
    address: 'Miguel Hidalgo, Ciudad de México',
    rating: 4,
    phone: '+52 555 555 1234'
  }
];

export default Places;