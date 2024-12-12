//Hacer el arreglo de recomendados con:
/*
nombre
imagen
descripcion
rating
*/
import img01Arcades from "../../img/pref_user/categoryArcade.webp";
import img17Museos from "../../img/pref_user/categoryMuseo.webp";
import img18Parques from "../../img/pref_user/categoryParque.webp";

const Recomendados = [
    {
        name: 'Parque Hundido qwwnewifn dmoefewfwnf',
        image: img18Parques,
        description: 'El Parque Hundido es un parque público ubicado en la Ciudad de México, en la alcaldía Benito Juárez. Es uno de los parques más grandes de la ciudad y es muy popular entre los habitantes de la zona.',
        rating: 4.5,
    },
    {
        name: 'Viveros de Coyoacán',
        image: img01Arcades,
        description: 'Los Viveros de Coyoacán son un parque público ubicado en la Ciudad de México, en la alcaldía Coyoacán. Es un lugar muy popular entre los habitantes de la zona y es ideal para pasar un día al aire libre.',
        rating: 4.7,
    },
    {
        name: 'Museo Soumaya',
        image: img17Museos,
        description: 'El Museo Soumaya es un museo de arte ubicado en la Ciudad de México, en la alcaldía Miguel Hidalgo. Es uno de los museos más importantes de la ciudad y alberga una impresionante colección de arte.',
        rating: 4.8,
    },
    {
        name: 'Six Flags México',
        image: 'tlalpan',
        description: 'Six Flags México es un parque de diversiones ubicado en la Ciudad de México, en la alcaldía Tlalpan. Es uno de los parques de diversiones más grandes de la ciudad y es ideal para pasar un día en familia.',
        rating: 4.9,
    },
    {
        name: 'Palacio de Bellas Artes',
        image: 'cuauhtemoc',
        description: 'El Palacio de Bellas Artes es un edificio histórico ubicado en la Ciudad de México, en la alcaldía Cuauhtémoc. Es uno de los edificios más emblemáticos de la ciudad y alberga una impresionante colección de arte.',
        rating: 5.0,
    },
];

export default Recomendados;