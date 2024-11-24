
import Imagen1 from '../../../img/PlacePage/place-img-fuentetlaloc.jpg';
import Imagen2 from '../../../img/PlacePage/place-img-casadeleon.jpg';
import Imagen3 from '../../../img/PlacePage/place-img-palaciopostal.jpg';
import Imagen4 from '../../../img/PlacePage/place-img-cafeterias.jpg';
import Imagen5 from '../../../img/piramides-teotihuacan.webp';

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
    },
    {
      placeTime: '12:00 pm',
      placeName: 'Palacio Postal',
      placeDescription: 'Edificio de estilo ecléctico que alberga Correos de México.',
      placeLongDescription: 'El Palacio Postal es un edificio de estilo ecléctico en la Ciudad de México que alberga la sede de Correos de México. El edificio fue construido entre 1902 y 1907 por el arquitecto italiano Adamo Boari. El Palacio Postal es uno de los edificios más emblemáticos de la Ciudad de México y es famoso por su arquitectura y decoración. En su interior se pueden ver murales, vitrales y esculturas que representan la historia de la comunicación y el correo en México.',
      placeThings: ['Arquitectura colonial', 'Historia postal'],
      placeOpenHour: '9:00 am',
      placeCloseHour: '5:00 pm',
      placeAddress: 'Tacuba 1, Centro Histórico, Ciudad de México.',
      placePhone: '55 2468 1357',
      placeImages: [Imagen3, Imagen1, Imagen5],
      placeRating: 5,
      finalItem: false
    },
    {
      placeTime: '2:00 pm',
      placeName: 'Pirámides de Teotihuacán',
      placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
      placeLongDescription: 'Las Pirámides de Teotihuacán son un sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides. Teotihuacán fue una de las ciudades más grandes de Mesoamérica y su nombre significa "lugar donde los dioses nacen". En el sitio se pueden ver las pirámides del Sol y de la Luna, así como la Calzada de los Muertos y los templos de Quetzalcóatl y de los Jaguares. Teotihuacán es un lugar sagrado para los mexicas y un importante centro ceremonial y político en la época prehispánica.',
      placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
      placeOpenHour: '8:00 am',
      placeCloseHour: '5:00 pm',
      placeAddress: 'San Juan Teotihuacán, Estado de México.',
      placePhone: '55 9876 5432',
      placeImages: [Imagen5, Imagen2, Imagen1],
      placeRating: 5,
      finalItem: true
    }
  ],
  '31-10-2024': [
    {
      placeTime: '11:00 am',
      placeName: 'Pirámides de Teotihuacán',
      placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
      placeLongDescription: 'Las Pirámides de Teotihuacán son un sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides. Teotihuacán fue una de las ciudades más grandes de Mesoamérica y su nombre significa "lugar donde los dioses nacen". En el sitio se pueden ver las pirámides del Sol y de la Luna, así como la Calzada de los Muertos y los templos de Quetzalcóatl y de los Jaguares. Teotihuacán es un lugar sagrado para los mexicas y un importante centro ceremonial y político en la época prehispánica.',
      placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
      placeOpenHour: '8:00 am',
      placeCloseHour: '5:00 pm',
      placeAddress: 'San Juan Teotihuacán, Estado de México.',
      placePhone: '55 9876 5432',
      placeImages: [Imagen5, Imagen2, Imagen1],
      placeRating: 5,
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
      placeImages: [Imagen4, Imagen2, Imagen3],
      placeRating: 3,
      finalItem: false
    },
    {
      placeTime: '12:00 pm',
      placeName: 'Palacio Postal',
      placeDescription: 'Edificio de estilo ecléctico que alberga Correos de México.',
      placeLongDescription: 'El Palacio Postal es un edificio de estilo ecléctico en la Ciudad de México que alberga la sede de Correos de México. El edificio fue construido entre 1902 y 1907 por el arquitecto italiano Adamo Boari. El Palacio Postal es uno de los edificios más emblemáticos de la Ciudad de México y es famoso por su arquitectura y decoración. En su interior se pueden ver murales, vitrales y esculturas que representan la historia de la comunicación y el correo en México.',
      placeThings: ['Arquitectura colonial', 'Historia postal'],
      placeOpenHour: '9:00 am',
      placeCloseHour: '5:00 pm',
      placeAddress: 'Tacuba 1, Centro Histórico, Ciudad de México.',
      placePhone: '55 2468 1357',
      placeImages: [Imagen1, Imagen1, Imagen5],
      placeRating: 5,
      finalItem: true
    }
  ],
  '01-11-2024': [
    {
      placeTime: '11:00 am',
      placeName: 'Pirámides de Teotihuacán',
      placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
      placeLongDescription: 'Las Pirámides de Teotihuacán son un sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides. Teotihuacán fue una de las ciudades más grandes de Mesoamérica y su nombre significa "lugar donde los dioses nacen". En el sitio se pueden ver las pirámides del Sol y de la Luna, así como la Calzada de los Muertos y los templos de Quetzalcóatl y de los Jaguares. Teotihuacán es un lugar sagrado para los mexicas y un importante centro ceremonial y político en la época prehispánica.',
      placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
      placeOpenHour: '8:00 am',
      placeCloseHour: '5:00 pm',
      placeAddress: 'San Juan Teotihuacán, Estado de México.',
      placePhone: '55 9876 5432',
      placeImages: [Imagen5, Imagen2, Imagen1],
      placeRating: 5,
      finalItem: false
    },
    {
      placeTime: '1:00 pm',
      placeName: 'Fuente de Tláloc',
      placeDescription: 'Monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia.',
      placeLongDescription: 'La Fuente de Tláloc es un monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia. Se encuentra en la cima del cerro del Chiquihuite, en la alcaldía de Gustavo A. Madero. La fuente fue construida en 1951 por el arquitecto Luis Leduc y el escultor Jesús Fructuoso Contreras. La escultura de Tláloc mide 22 metros de altura y está hecha de concreto recubierto de piedra volcánica. La fuente es un símbolo de la cultura prehispánica y de la importancia del agua en la vida de los mexicanos.',
      placeThings: ['Arte moderno', 'Historia prehispánica', 'Jardines hermosos'],
      placeOpenHour: '8:00 am',
      placeCloseHour: '6:00 pm',
      placeAddress: 'Cerro del Chiquihuite, Gustavo A. Madero, Ciudad de México.',
      placePhone: '55 1234 5678',
      placeImages: [Imagen1, Imagen2, Imagen3],
      placeRating: 4,
      finalItem: true
    }
  ],
  '02-11-2024': [
    {
      placeTime: '11:00 am',
      placeName: 'Pirámides de Teotihuacán',
      placeDescription: 'Sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides.',
      placeLongDescription: 'Las Pirámides de Teotihuacán son un sitio arqueológico cerca de la Ciudad de México con majestuosas pirámides. Teotihuacán fue una de las ciudades más grandes de Mesoamérica y su nombre significa "lugar donde los dioses nacen". En el sitio se pueden ver las pirámides del Sol y de la Luna, así como la Calzada de los Muertos y los templos de Quetzalcóatl y de los Jaguares. Teotihuacán es un lugar sagrado para los mexicas y un importante centro ceremonial y político en la época prehispánica.',
      placeThings: ['Construcciones antiguas', 'Cultura prehispánica'],
      placeOpenHour: '8:00 am',
      placeCloseHour: '5:00 pm',
      placeAddress: 'San Juan Teotihuacán, Estado de México.',
      placePhone: '55 9876 5432',
      placeImages: [Imagen5, Imagen2, Imagen1],
      placeRating: 5,
      finalItem: false
    },
    {
      placeTime: '1:00 pm',
      placeName: 'Fuente de Tláloc',
      placeDescription: 'Monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia.',
      placeLongDescription: 'La Fuente de Tláloc es un monumento en la Ciudad de México que representa a Tláloc, dios de la lluvia. Se encuentra en la cima del cerro del Chiquihuite, en la alcaldía de Gustavo A. Madero. La fuente fue construida en 1951 por el arquitecto Luis Leduc y el escultor Jesús Fructuoso Contreras. La escultura de Tláloc mide 22 metros de altura y está hecha de concreto recubierto de piedra volcánica. La fuente es un símbolo de la cultura prehispánica y de la importancia del agua en la vida de los mexicanos.',
      placeThings: ['Arte moderno', 'Historia prehispánica', 'Jardines hermosos'],
      placeOpenHour: '8:00 am',
      placeCloseHour: '6:00 pm',
      placeAddress: 'Cerro del Chiquihuite, Gustavo A. Madero, Ciudad de México.',
      placePhone: '55 1234 5678',
      placeImages: [Imagen1, Imagen2, Imagen3],
      placeRating: 4,
      finalItem: true
    }
  ],
};

export default itinerario1;