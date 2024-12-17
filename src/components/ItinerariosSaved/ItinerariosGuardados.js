import Imagen1 from '../../img/PlacePage/place-img-fuentetlaloc.jpg';
import Imagen2 from '../../img/PlacePage/place-img-casadeleon.jpg';
import Imagen3 from '../../img/PlacePage/place-img-palaciopostal.jpg';
import Imagen4 from '../../img/PlacePage/place-img-cafeterias.jpg';
import Imagen5 from '../../img/piramides-teotihuacan.webp';

// itinerario 1: 30 de octubre al 2 de noviembre de 2024
const itinerario1 = {
  '30-10-2024': [
    {
      placeTime: '10:00 am',
      placeName: 'Fuente de chalco',
      placeDescription: 'Monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia.',
      placeLongDescription: 'La Fuente de Tláloc es un monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia. Se encuentra en la cima del cerro del Chiquihuite, en la alcaldía de Gustavo A. Madero. La fuente fue construida en 1951 por el arquitecto Luis Leduc y el escultor Jesús Fructuoso Contreras. La escultura de Tláloc mide 22 metros de altura y está hecha de concreto recubierto de piedra volcánica. La fuente es un símbolo de la cultura prehispánica y de la importancia del agua en la vida de los mexicanos.',
      placeThings: ['Arte moderno', 'Historia prehispánica', 'Jardines hermosos'],
      placeOpenHour: '8:00 am',
      placeCloseHour: '6:00 pm',
      placeAddress: 'Cerro del Chiquihuite, Gustavo A. Madero, Ciudad de México.',
      placePhone: '55 1234 5678',
      placeImages: [Imagen1, Imagen2, Imagen3],
      placeRating: 4,
      finalItem: false
    },
    {
      placeTime: '11:00 am',
      placeName: 'Casa de León',
      placeDescription: 'Museo en la Ciudad de México que fue hogar de León Trotsky.',
      placeLongDescription: 'La Casa de León es un museo en la Ciudad de México que fue hogar de León Trotsky. El museo se encuentra en la colonia Del Carmen, en la alcaldía de Coyoacán. La casa fue adquirida por el gobierno mexicano en 1982 y convertida en museo en 1990. En el museo se pueden ver objetos personales de Trotsky, así como exposiciones sobre la historia de la Revolución Rusa y la lucha obrera en México. El museo también cuenta con jardines hermosos que invitan a la reflexión y al descanso.',
      placeThings: ['Arte moderno', 'Historia revolucionaria', 'Jardines hermosos'],
      placeOpenHour: '7:00 am',
      placeCloseHour: '6:00 pm',
      placeAddress: 'Río Churubusco 410, Del Carmen, Coyoacán, Ciudad de México.',
      placePhone: '55 8765 4321',
      placeImages: [Imagen2, Imagen4, Imagen3],
      placeRating: 3,
      finalItem: false
    }
  ],
  '31-10-2024': [
    {
      placeTime: '9:00 am',
      placeName: 'Palacio Postal',
      placeDescription: 'Edificio histórico en la Ciudad de México.',
      placeLongDescription: 'El Palacio Postal es un edificio histórico en la Ciudad de México. Se encuentra en el centro histórico de la ciudad, en la esquina de las calles Tacuba y Eje Central. El edificio fue inaugurado en 1907 y es un ejemplo de la arquitectura porfiriana. El Palacio Postal es conocido por su fachada de cantera rosa y su interior de mármol y bronce. El edificio alberga la oficina central de correos de la Ciudad de México y es un símbolo de la historia postal de México.',
      placeThings: ['Arquitectura histórica', 'Historia postal', 'Centro histórico'],
      placeOpenHour: '8:00 am',
      placeCloseHour: '6:00 pm',
      placeAddress: 'Tacuba 1, Centro Histórico, Ciudad de México.',
      placePhone: '55 2345 6789',
      placeImages: [Imagen3, Imagen4, Imagen5],
      placeRating: 5,
      finalItem: false
    }
  ]
};

// itinerario 2: 1 de noviembre al 3 de noviembre de 2024
const itinerario2 = {
  '01-11-2024': [
    {
      placeTime: '10:00 am',
      placeName: 'Pirámides de Teotihuacán',
      placeDescription: 'Zona arqueológica en el Estado de México.',
      placeLongDescription: 'Las Pirámides de Teotihuacán son una zona arqueológica en el Estado de México. Se encuentran a unos 40 kilómetros al noreste de la Ciudad de México. La zona arqueológica incluye varias pirámides, templos y palacios construidos por la civilización teotihuacana entre los siglos I y VII d.C. Las pirámides más conocidas son la Pirámide del Sol y la Pirámide de la Luna. Teotihuacán es un sitio del Patrimonio Mundial de la UNESCO y uno de los destinos turísticos más importantes de México.',
      placeThings: ['Arqueología', 'Historia prehispánica', 'Patrimonio Mundial'],
      placeOpenHour: '8:00 am',
      placeCloseHour: '5:00 pm',
      placeAddress: 'Teotihuacán, Estado de México.',
      placePhone: '55 3456 7890',
      placeImages: [Imagen5, Imagen1, Imagen3],
      placeRating: 5,
      finalItem: false
    }
  ]
};

// Exporta el arreglo de itinerarios
const itinerarios = [itinerario1, itinerario2];

export default itinerarios;