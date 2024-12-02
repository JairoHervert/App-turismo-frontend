import img1 from "../../img/pref_user/categoryDeporte.webp";
import img2 from "../../img/pref_user/categoryComidaRapida.webp";
import img3 from "../../img/pref_user/categoryCafeteria.webp";
import img4 from "../../img/pref_user/categoryRestaurante.webp";
import img5 from "../../img/pref_user/categoryBar.webp";
import img6 from "../../img/pref_user/categoryArte.webp";
import img7 from "../../img/pref_user/categoryHistoria.webp";
import img8 from "../../img/pref_user/categoryMuseo.webp";
import img9 from "../../img/pref_user/categoryEducativo.webp";
import img10 from "../../img/pref_user/categoryCompras.webp";
import img11 from "../../img/pref_user/categoryParque.webp";
import img12 from "../../img/pref_user/categoryJuegosRecreativosAlAireLibre.webp";
import img13 from "../../img/pref_user/categoryJuegosRecreativosBajoTecho.webp";
import img14 from "../../img/pref_user/categoryZoologico.webp";
import img15 from "../../img/pref_user/categoryReligion.webp";

const categorias = [
  {
    id: 1,
    nombre: 'Deportes',
    imagen: img1,
    subcategorias: [
      { id: 11, nombre: 'Arena' },
      { id: 12, nombre: 'Campo atlético' },
      { id: 13, nombre: 'Campo de golf' },
      { id: 14, nombre: 'Pista de patinaje sobre hielo' },
      { id: 15, nombre: 'Parque infantil' },
      { id: 16, nombre: 'Ubicación de actividad deportiva' },
      { id: 17, nombre: 'Club deportivo' },
      { id: 18, nombre: 'Piscina' },
    ],
  },
  {
    id: 2,
    nombre: 'Comida Rápida',
    imagen: img2,
    subcategorias: [
      { id: 21, nombre: 'Tienda de bagels' },
      { id: 22, nombre: 'Tienda de açaí' },
      { id: 23, nombre: 'Panadería' },
      { id: 24, nombre: 'Restaurante de comida rápida' },
      { id: 25, nombre: 'Heladería' },
    ],
  },
  {
    id: 3,
    nombre: 'Cafetería',
    imagen: img3,
    subcategorias: [
      { id: 31, nombre: 'Café' },
      { id: 32, nombre: 'Cafetería' },
      { id: 33, nombre: 'Café de gatos' },
      { id: 34, nombre: 'Tienda de chocolates' },
      { id: 35, nombre: 'Cafetería' },
      { id: 36, nombre: 'Confitería' },
      { id: 37, nombre: 'Restaurante de postres' },
      { id: 38, nombre: 'Tienda de postres' },
      { id: 39, nombre: 'Comedor' },
      { id: 40, nombre: 'Café de perros' },
      { id: 41, nombre: 'Tienda de donas' },
      { id: 42, nombre: 'Restaurante de alta cocina' },
      { id: 43, nombre: 'Patio de comidas' },
      { id: 44, nombre: 'Tienda de jugos' },
      { id: 45, nombre: 'Comida para llevar' },
      { id: 46, nombre: 'Tienda de sándwiches' },
      { id: 47, nombre: 'Parrilla' },
      { id: 48, nombre: 'Casa de té' },
    ],
  },
  {
    id: 4,
    nombre: 'Restaurante',
    imagen: img4,
    subcategorias: [
      { id: 51, nombre: 'Restaurante afgano' },
      { id: 52, nombre: 'Restaurante africano' },
      { id: 53, nombre: 'Restaurante americano' },
      { id: 54, nombre: 'Restaurante asiático' },
      { id: 55, nombre: 'Restaurante de barbacoa' },
      { id: 56, nombre: 'Restaurante brasileño' },
      { id: 57, nombre: 'Restaurante de desayuno' },
      { id: 58, nombre: 'Restaurante de brunch' },
      { id: 59, nombre: 'Restaurante buffet' },
      { id: 60, nombre: 'Restaurante chino' },
      { id: 61, nombre: 'Restaurante francés' },
      { id: 62, nombre: 'Restaurante griego' },
      { id: 63, nombre: 'Restaurante de hamburguesas' },
      { id: 64, nombre: 'Restaurante indio' },
      { id: 65, nombre: 'Restaurante indonesio' },
      { id: 66, nombre: 'Restaurante italiano' },
      { id: 67, nombre: 'Restaurante japonés' },
      { id: 68, nombre: 'Restaurante coreano' },
      { id: 69, nombre: 'Restaurante libanés' },
      { id: 70, nombre: 'Restaurante mediterráneo' },
      { id: 71, nombre: 'Restaurante mexicano' },
      { id: 72, nombre: 'Restaurante de Oriente Medio' },
      { id: 73, nombre: 'Pizzería' },
      { id: 74, nombre: 'Restaurante de ramen' },
      { id: 75, nombre: 'Restaurante' },
      { id: 76, nombre: 'Restaurante de mariscos' },
      { id: 77, nombre: 'Restaurante español' },
      { id: 78, nombre: 'Restaurante de sushi' },
      { id: 79, nombre: 'Restaurante tailandés' },
      { id: 80, nombre: 'Restaurante turco' },
      { id: 81, nombre: 'Restaurante vegano' },
      { id: 82, nombre: 'Restaurante vegetariano' },
      { id: 83, nombre: 'Restaurante vietnamita' },
    ],
  },
  {
    id: 5,
    nombre: 'Bar',
    imagen: img5,
    subcategorias: [
      { id: 91, nombre: 'Bar de vinos' },
      { id: 92, nombre: 'Bar' },
      { id: 93, nombre: 'Club nocturno' },
      { id: 94, nombre: 'Karaoke' },
      { id: 95, nombre: 'Salón de baile' },
      { id: 96, nombre: 'Club de comedia' },
      { id: 97, nombre: 'Bar y parrilla' },
    ],
  },
  {
    id: 6,
    nombre: 'Arte',
    imagen: img6,
    subcategorias: [
      { id: 101, nombre: 'Galería de arte' },
      { id: 102, nombre: 'Estudio de arte' },
      { id: 103, nombre: 'Auditorio' },
      { id: 104, nombre: 'Hito cultural' },
      { id: 105, nombre: 'Teatro de artes escénicas' },
      { id: 106, nombre: 'Escultura' },
      { id: 107, nombre: 'Servicio de arte corporal' },
    ],
  },
  {
    id: 7,
    nombre: 'Historia',
    imagen: img7,
    subcategorias: [
      { id: 108, nombre: 'Lugar histórico' },
      { id: 109, nombre: 'Monumento' },
      { id: 110, nombre: 'Hito cultural' },
    ],
  },
  {
    id: 8,
    nombre: 'Museos',
    imagen: img8,
    subcategorias: [
      { id: 111, nombre: 'Museo' },
    ],
  },
  {
    id: 9,
    nombre: 'Educativos',
    imagen: img9,
    subcategorias: [
      { id: 112, nombre: 'Biblioteca' },
      { id: 113, nombre: 'Planetario' },
      { id: 114, nombre: 'Acuario' },
    ],
  },
  {
    id: 10,
    nombre: 'Compras',
    imagen: img10,
    subcategorias: [
      { id: 115, nombre: 'Tienda' },
      { id: 116, nombre: 'Tienda de zapatos' },
      { id: 117, nombre: 'Centro comercial' },
      { id: 118, nombre: 'Mercado' },
      { id: 119, nombre: 'Librería' },
      { id: 120, nombre: 'Tienda de regalos' },
    ],
  },
  {
    id: 11,
    nombre: 'Parques',
    imagen: img11,
    subcategorias: [
      { id: 121, nombre: 'Parque' },
      { id: 122, nombre: 'Parque estatal' },
      { id: 123, nombre: 'Parque nacional' },
      { id: 124, nombre: 'Jardín botánico' },
      { id: 125, nombre: 'Jardín' },
      { id: 126, nombre: 'Parque de vida silvestre' },
      { id: 127, nombre: 'Refugio de vida silvestre' },
      { id: 128, nombre: 'Parque para perros' },
      { id: 129, nombre: 'Área de picnic' },
      { id: 130, nombre: 'Área de barbacoa' },
      { id: 131, nombre: 'Marina' },
      { id: 132, nombre: 'Campamento infantil' },
      { id: 133, nombre: 'Área de senderismo' },
    ],
  },
  {
    id: 12,
    nombre: 'Juegos recreativos al aire libre',
    imagen: img12,
    subcategorias: [
      { id: 134, nombre: 'Parque de atracciones' },
      { id: 135, nombre: 'Centro de atracciones' },
      { id: 136, nombre: 'Parque acuático' },
      { id: 137, nombre: 'Montaña rusa' },
      { id: 138, nombre: 'Rueda de la fortuna' },
      { id: 139, nombre: 'Parque de patinetas' },
      { id: 140, nombre: 'Área de todoterreno' },
      { id: 141, nombre: 'Centro de deportes de aventura' },
      { id: 142, nombre: 'Parque de ciclismo' },
    ],
  },
  {
    id: 13,
    nombre: 'Juegos recreativos bajo techo',
    imagen: img13,
    subcategorias: [
      { id: 143, nombre: 'Arcade de videojuegos' },
      { id: 144, nombre: 'Bolera' },
      { id: 145, nombre: 'Área de senderismo' },
    ],
  },
  {
    id: 14,
    nombre: 'Zoológicos',
    imagen: img14,
    subcategorias: [
      { id: 146, nombre: 'Zoológico' },
    ],
  },
  {
    id: 15,
    nombre: 'Religión',
    imagen: img15,
    subcategorias: [
      { id: 147, nombre: 'Lugar de culto' },
      { id: 148, nombre: 'Iglesia' },
    ],
  },
];

export default categorias;