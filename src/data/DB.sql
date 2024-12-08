
/*!40101 SET NAMES utf8mb4 */;
/*!40101 SET SQL_MODE=''*/;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP DATABASE IF EXISTS AppTurismo;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`AppTurismo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `AppTurismo`;

-- ---------------------------------------------------------------------------------------------------
--                                            TABLAS BÁSICAS
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Table `AppTurismo`.`Usuario`
-- ----------------------------------------------------
DROP TABLE IF EXISTS `Usuario`;
CREATE TABLE `Usuario` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `username` VARCHAR(60) NULL DEFAULT NULL,
   `nombre` VARCHAR(60) NULL DEFAULT NULL,
   `apellido` VARCHAR(60) NULL DEFAULT NULL,
   `correo` VARCHAR(320) NOT NULL,
   `contraseña` VARCHAR(255) NOT NULL,
   `ligaFotoPerfil` VARCHAR(512) NULL DEFAULT NULL,
   `fechaNacimiento` DATETIME NULL DEFAULT NULL,
   `ultimaConexion` DATETIME NULL DEFAULT NULL,
   `tokenGoogle` VARCHAR(255) UNIQUE NULL DEFAULT NULL,
   `tokenFacebook` VARCHAR(255) UNIQUE NULL DEFAULT NULL,
   `confirmacion` BOOLEAN NOT NULL DEFAULT 0,
   `auditoria` DATETIME NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`Lugar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Lugar`;
CREATE TABLE `Lugar` (
   `id` VARCHAR(40) NOT NULL,
   `nombre` VARCHAR(128) NOT NULL,
   `direccion` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(1024) NULL,
   `imagen` TEXT NULL DEFAULT NULL,
   `attributions` VARCHAR(150) NULL,
   `latitud` DOUBLE NULL,
   `longitud` DOUBLE NULL,
   `fotos` TEXT NULL,
   `tipos` VARCHAR(1024) NULL,
   `teléfono` VARCHAR(20) NULL,
   `precioNivel` TINYINT NULL,
   `precioRango` VARCHAR(45) NULL,
   `rating` VARCHAR(10) NULL,
   `regularOpeningHours` TEXT NULL,
   `userRatingCount` VARCHAR(45) NULL,
   `website` VARCHAR(128) NULL,
   `goodForChildren` BOOLEAN NULL,
   `goodForGroups` BOOLEAN NULL,
   `paymentOptions` TEXT NULL,
   `reservable` BOOLEAN NULL,
   `servesVegetarianFood` VARCHAR(10) NULL,
   `allowsDogs` VARCHAR(10) NULL,
   `reviewsGoogle` TEXT NULL,
   `accesibilidadParking` BOOLEAN NULL DEFAULT '0',
   `accesibilidadEntrance` BOOLEAN NULL DEFAULT '0',
   `accesibilidadRestroom` BOOLEAN NULL DEFAULT '0',
   `accesibilidadSeating` BOOLEAN NULL DEFAULT '0',
   `auditoria` DATETIME NOT NULL,
   PRIMARY KEY (`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`Resena`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Resena`;
CREATE TABLE `Resena` (
   `idUsuario` INT NOT NULL,
   `idLugar` VARCHAR(40) NOT NULL,
   `calificacion` INT NOT NULL,
   `resena` VARCHAR(1000),
   `auditoria` DATETIME NOT NULL,
   PRIMARY KEY (idUsuario, idLugar),
   FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`Itinerario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Itinerario`;
CREATE TABLE `Itinerario` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `idUsuario` INT NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`Historial`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Historial`;
CREATE TABLE `Historial` (
   `idUsuario` INT NOT NULL,
   `idLugar` VARCHAR(40) NOT NULL,
   `auditoria` DATETIME NOT NULL,
   PRIMARY KEY (idUsuario, idLugar),
   FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------------------------------
--                                              CATEGORÍAS
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Table `AppTurismo`.`Categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Categoria`;
CREATE TABLE `Categoria` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(45) UNIQUE NOT NULL,
   `imagen` VARCHAR(512) NULL,
   PRIMARY KEY (`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categoria` (`nombre`, `imagen`) VALUES
('Arcades', 'https://c4.wallpaperflare.com/wallpaper/325/596/914/video-games-arcade-atari-retro-games-wallpaper-preview.jpg'), 
('Arenas de luchas', 'https://i.eurosport.com/2016/05/10/1851964-39036516-2560-1440.jpg'),
('Arte y cultura', 'https://images.unsplash.com/photo-1563293743-a9761195b52e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2FsZXIlQzMlQURhJTIwZGUlMjBhcnRlfGVufDB8fDB8fHww'), 
('Bares', 'https://images.unsplash.com/photo-1620219365994-f443a86ea626?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Bibliotecas', 'https://wallup.net/wp-content/uploads/2019/09/914550-interior-biblioteca-arcos-libros-estanterias.jpg'), 
('Boleras', 'https://www.bowlingalleyprices.com/wp-content/uploads/2022/08/Great-Bowling-Alleys-in-LA.jpg'), 
('Bufés', 'https://t4.ftcdn.net/jpg/06/18/90/95/360_F_618909593_KSnYsZG0kvNlDscduLxpXSCE55pU0zgZ.jpg'),
('Cafeterías', 'https://images.unsplash.com/photo-1691014453405-7e3489d0c433?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Clubes', 'https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg'),
('Comida rápida y botanas', 'https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Compras y souvenirs', 'https://www.visitlakecounty.org/images/galleria_photos/Shopping%20Malls/header-shopping-malls.jpg'), 
('Karaokes', 'https://media.istockphoto.com/id/1204145419/photo/night-bar-music-comedy-show-microphone-in-a-bar.jpg?s=612x612&w=0&k=20&c=AO8VbbKTCzfupYeVf1Njh58s781vAQfldSfZ5Nj2Fc4='),
('Lugares de Aventura', 'https://media.istockphoto.com/id/910215514/photo/two-little-brothers-hiking-in-forest.jpg?s=612x612&w=0&k=20&c=GoLp_tJXQaqOS6a3UnO4oDyZLqwMSfEwNMr2dgw9D4w='), 
('Lugares históricos', 'https://generaldeseguros.mx/wp-content/uploads/2024/06/Que-visitar-en-Mexico-1024x698.webp'),
('Lugares religiosos', 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Marisquerías', 'https://okdiario.com/img/2024/10/24/mariscos-635x358.jpg'), 
('Museos', 'https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg'), 
('Parques', 'https://covive.mx/wp-content/uploads/elementor/thumbs/parque-arboledas-GTechMX-1-qpgv5asojfsnn29sj5tjhet1o371bcjpe0p8ponm0w.webp'), 
('Parques de diversiones', 'https://img.rtve.es/imagenes/parques-tematicos-atracciones-historia-montana-rusa/1694509839771.jpg'), 
('Parques de skate', 'https://t3.ftcdn.net/jpg/08/62/64/74/360_F_862647440_kgeGJlxhwsA1HjEkjNSoAXgke2e9Vzlf.jpg'), 
('Patinaje sobre hielo', 'https://www.flightgift.com/media/wp/FG/2022/11/ice-skating-france.webp'), 
('Restaurantes', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('Restaurantes africanos', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/3d/3b/68/tusker-house.jpg?w=1200&h=-1&s=1'), 
('Restaurantes americanos', 'https://cdn.pixabay.com/photo/2016/01/29/20/24/american-diner-1168606_1280.jpg'), 
('Restaurantes asiáticos', 'https://media.timeout.com/images/103596145/750/562/image.jpg'), 
('Restaurantes brasileños', 'https://st3.depositphotos.com/1672917/13502/i/450/depositphotos_135020840-stock-photo-different-kinds-of-brazilian-food.jpg'), 
('Restaurantes de medio oriente', 'https://png.pngtree.com/thumb_back/fw800/background/20240204/pngtree-arabic-cuisine-events-ramadan-middle-eastern-image_15587511.png'), 
('Restaurantes europeos', 'https://s0.smartresize.com/wallpaper/14/237/HD-wallpaper-a-restaurant-dinning-france-food-restaurant.jpg'), 
('Restaurantes mexicanos', 'https://scontent.fmex1-4.fna.fbcdn.net/v/t39.30808-6/468705371_18363982408138434_886956544973042183_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEDiu7NVVp6WeIKR74YxRzl8umu8-CsMs_y6a7z4Kwyz2e3XcQluuKsALvHa1HZ4l_Xdydm50JoQ4gj8AZ2bKfU&_nc_ohc=KekrJjLdIbQQ7kNvgFojjkN&_nc_zt=23&_nc_ht=scontent.fmex1-4.fna&_nc_gid=AB-rZV5EYTyS7Bdr4pgRmfn&oh=00_AYAQcBT2XBgWCFuN55nt7wOdeW0r8sq16_Ijt2ULNSTn7A&oe=6753F0B5'), 
('Salones de té', 'https://w0.peakpx.com/wallpaper/206/618/HD-wallpaper-tea-time-drinks-herbs-drink-east-tea.jpg'), 
('Steak houses', 'https://images.deliveryhero.io/image/talabat/MenuItems/mmw_638482822318219747'), 
('Zoológicos', 'https://consejosdecancun.com/wp-content/uploads/2020/04/zoologico-de-chapultepec.jpg');

-- -----------------------------------------------------
-- Table `appturismo`.`Subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`Subcategoria` (
   `id` VARCHAR(40) NOT NULL,
   `nombre` VARCHAR(65) NOT NULL,
   `idCategoria` INT NOT NULL,
   PRIMARY KEY (`id`, `idCategoria`),
   FOREIGN KEY (idCategoria) REFERENCES Categoria(id) ON DELETE CASCADE
)ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Arcades
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('video_arcade', 'Arcade', (SELECT id FROM categoria WHERE nombre = 'Arcades'));

-- Arenas de luchas
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('arena', 'Arena de luchas', (SELECT id FROM categoria WHERE nombre = 'Arenas de luchas'));

-- Arte y cultura
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('art_gallery', 'Galería de arte', (SELECT id FROM categoria WHERE nombre = 'Arte y cultura')),
('art_studio', 'Estudio de arte', (SELECT id FROM categoria WHERE nombre = 'Arte y cultura')),
('auditorium', 'Auditorio', (SELECT id FROM categoria WHERE nombre = 'Arte y cultura')),
('cultural_landmark', 'Lugar de referencia cultural', (SELECT id FROM categoria WHERE nombre = 'Arte y cultura')),
('performing_arts_theater', 'Teatro de artes performativas', (SELECT id FROM categoria WHERE nombre = 'Arte y cultura')),
('sculpture', 'Escultura', (SELECT id FROM categoria WHERE nombre = 'Arte y cultura')),
('body_art_service', 'Servicio de arte corporal', (SELECT id FROM categoria WHERE nombre = 'Arte y cultura'));

-- Bares
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('wine_bar', 'Bar de vinos', (SELECT id FROM categoria WHERE nombre = 'Bares')),
('bar', 'Bar', (SELECT id FROM categoria WHERE nombre = 'Bares')),
('bar_and_grill', 'Bar y parrilla', (SELECT id FROM categoria WHERE nombre = 'Bares'));

-- Bibliotecas
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('library', 'Biblioteca', (SELECT id FROM categoria WHERE nombre = 'Bibliotecas'));

-- Boleras
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('bowling_alley', 'Bolera', (SELECT id FROM categoria WHERE nombre = 'Boleras'));

-- Bufés
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('buffet_restaurant', 'Buffet', (SELECT id FROM categoria WHERE nombre = 'Bufés'));

-- Cafeterías
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('cafe', 'Café', (SELECT id FROM categoria WHERE nombre = 'Cafeterías')),
('cafeteria', 'Cafetería/Comedor', (SELECT id FROM categoria WHERE nombre = 'Cafeterías')),
('cat_cafe', 'Cat café', (SELECT id FROM categoria WHERE nombre = 'Cafeterías')),
('dog_cafe', 'Dog café', (SELECT id FROM categoria WHERE nombre = 'Cafeterías')),
('coffee_shop', 'Cafetería', (SELECT id FROM categoria WHERE nombre = 'Cafeterías')),
('chocolate_shop', 'Chocolatería', (SELECT id FROM categoria WHERE nombre = 'Cafeterías'));

-- Clubes
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('night_club', 'Club nocturno', (SELECT id FROM categoria WHERE nombre = 'Clubes')),
('dance_hall', 'Salón de baile', (SELECT id FROM categoria WHERE nombre = 'Clubes')),
('comedy_club', 'Club de comedia', (SELECT id FROM categoria WHERE nombre = 'Clubes'));

-- Comida rápida y botanas
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('bakery', 'Panadería', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('bagel_shop', 'Tienda de bagels', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('acai_shop', 'Tienda de açai', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('fast_food_restaurant', 'Restaurante de comida rápida', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('ice_cream_shop', 'Heladería', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('donut_shop', 'Tienda de donas', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('confectionery', 'Confitería', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('dessert_shop', 'Postrería', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('food_court', 'Patio de comidas', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('juice_shop', 'Tienda de jugos', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('meal_takeaway', 'Comida para llevar', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('sandwich_shop', 'Sandwichería', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('dessert_restaurant', 'Restaurante de postres', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('pizza_restaurant', 'Pizzería', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('hamburger_restaurant', 'Restaurante de hamburguesas', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas')),
('diner', 'Comedor', (SELECT id FROM categoria WHERE nombre = 'Comida rápida y botanas'));

-- Compras y souvenirs
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('store', 'Tienda', (SELECT id FROM categoria WHERE nombre = 'Compras y souvenirs')),
('shoe_store', 'Zapatería', (SELECT id FROM categoria WHERE nombre = 'Compras y souvenirs')),
('shopping_mall', 'Plaza comercial', (SELECT id FROM categoria WHERE nombre = 'Compras y souvenirs')),
('market', 'Mercado', (SELECT id FROM categoria WHERE nombre = 'Compras y souvenirs')),
('book_store', 'Libería', (SELECT id FROM categoria WHERE nombre = 'Compras y souvenirs')),
('gift_shop', 'Tienda de regalos', (SELECT id FROM categoria WHERE nombre = 'Compras y souvenirs'));

-- Karaokes
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('karaoke', 'Karaoke', (SELECT id FROM categoria WHERE nombre = 'Karaokes'));

-- Lugares de Aventura
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('off_roading_area', 'Área de offroad', (SELECT id FROM categoria WHERE nombre = 'Lugares de Aventura')),
('adventure_sports_center', 'Centro de deportes de aventura', (SELECT id FROM categoria WHERE nombre = 'Lugares de Aventura')),
('cycling_park', 'Parque de cicilismo', (SELECT id FROM categoria WHERE nombre = 'Lugares de Aventura')),
('hiking_area', 'Campo de caminata', (SELECT id FROM categoria WHERE nombre = 'Lugares de Aventura'));

-- Lugares históricos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('historical_place', 'Lugar histórico', (SELECT id FROM categoria WHERE nombre = 'Lugares históricos')),
('monument', 'Monumento', (SELECT id FROM categoria WHERE nombre = 'Lugares históricos')),
('historical_landmark', 'Punto de referencia histórico', (SELECT id FROM categoria WHERE nombre = 'Lugares históricos'));

-- Lugares religiosos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('place_of_worship', 'Lugar de culto', (SELECT id FROM categoria WHERE nombre = 'Lugares religiosos')),
('mosque', 'Mezquita', (SELECT id FROM categoria WHERE nombre = 'Lugares religiosos')),
('hindu_temple', 'Templo hindú', (SELECT id FROM categoria WHERE nombre = 'Lugares religiosos')),
('synagogue', 'Sinagoga', (SELECT id FROM categoria WHERE nombre = 'Lugares religiosos')),
('church', 'Iglesia', (SELECT id FROM categoria WHERE nombre = 'Lugares religiosos'));

-- Marisquerías
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('seafood_restaurant', 'Marisquería', (SELECT id FROM categoria WHERE nombre = 'Marisquerías'));

-- Museos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('museum', 'Museo', (SELECT id FROM categoria WHERE nombre = 'Museos')),
('planetarium', 'Planetario', (SELECT id FROM categoria WHERE nombre = 'Museos'));

-- Parques
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('park', 'Parque', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('state_park', 'Parque estatal', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('national_park', 'Parque nacional', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('botanical_garden', 'Jardín botánico', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('garden', 'Jardín', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('wildlife_park', 'Parque de vida silvestre', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('wildlife_refuge', 'Refugio silvestre', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('dog_park', 'Parque canino', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('picnic_ground', 'Campo de picnic', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('barbecue_area', 'Área de barbacoa', (SELECT id FROM categoria WHERE nombre = 'Parques'));

-- Parques de diversiones
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('amusement_park', 'Parque de diversiones', (SELECT id FROM categoria WHERE nombre = 'Parques de diversiones')),
('amusement_center', 'Centro de diversiones', (SELECT id FROM categoria WHERE nombre = 'Parques de diversiones')),
('water_park', 'Parque acuático', (SELECT id FROM categoria WHERE nombre = 'Parques de diversiones')),
('roller_coaster', 'Montaña rusa', (SELECT id FROM categoria WHERE nombre = 'Parques de diversiones')),
('ferris_wheel', 'Rueda de la fortuna', (SELECT id FROM categoria WHERE nombre = 'Parques de diversiones'));

-- Parques de skate
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('skateboard_park', 'Parque de skateboard', (SELECT id FROM categoria WHERE nombre = 'Parques de skate'));

-- Patinaje sobre hielo
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('ice_skating_rink', 'Pista de patinaje sobre hielo', (SELECT id FROM categoria WHERE nombre = 'Patinaje sobre hielo'));

-- Restaurantes
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('breakfast_restaurant', 'Restaurante de desayunos', (SELECT id FROM categoria WHERE nombre = 'Restaurantes')),
('brunch_restaurant', 'Restaurante de brunch', (SELECT id FROM categoria WHERE nombre = 'Restaurantes')),
('restaurant', 'Restaurante', (SELECT id FROM categoria WHERE nombre = 'Restaurantes')),
('barbecue_restaurant', 'Restaurante de barbacoa', (SELECT id FROM categoria WHERE nombre = 'Restaurantes')),
('vegan_restaurant', 'Restaurante vegano', (SELECT id FROM categoria WHERE nombre = 'Restaurantes')),
('vegetarian_restaurant', 'Restaurante vegetariano', (SELECT id FROM categoria WHERE nombre = 'Restaurantes')),
('fine_dining_restaurant', 'Restaurante de lujo', (SELECT id FROM categoria WHERE nombre = 'Restaurantes'));

-- Restaurantes africanos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('african_restaurant', 'Restaurante africano', (SELECT id FROM categoria WHERE nombre = 'Restaurantes africanos'));

-- Restaurantes americanos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('american_restaurant', 'Restaurante americano', (SELECT id FROM categoria WHERE nombre = 'Restaurantes americanos'));

-- Restaurantes asiáticos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('asian_restaurant', 'Restaurante asiático', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos')),
('chinese_restaurant', 'Restaurante chino', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos')),
('indian_restaurant', 'Restaurante hindú', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos')),
('indonesian_restaurant', 'Restaurante indonesio', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos')),
('japanese_restaurant', 'Restaurante japonés', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos')),
('korean_restaurant', 'Restaurante coreano', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos')),
('ramen_restaurant', 'Restaurante de ramen', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos')),
('sushi_restaurant', 'Restaurante de sushi', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos')),
('thai_restaurant', 'Restaurante tailandés', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos')),
('vietnamese_restaurant', 'Restaurante vietnamita', (SELECT id FROM categoria WHERE nombre = 'Restaurantes asiáticos'));

-- Restaurantes brasileños
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('brazilian_restaurant', 'Restaurante brazileño', (SELECT id FROM categoria WHERE nombre = 'Restaurantes brasileños'));

-- Restaurantes de medio oriente
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('afghani_restaurant', 'Restaurante afgano', (SELECT id FROM categoria WHERE nombre = 'Restaurantes de medio oriente')),
('lebanese_restaurant', 'Restaurante libanés', (SELECT id FROM categoria WHERE nombre = 'Restaurantes de medio oriente')),
('middle_eastern_restaurant', 'Restaurante de oriente medio', (SELECT id FROM categoria WHERE nombre = 'Restaurantes de medio oriente'));

-- Restaurantes europeos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('french_restaurant', 'Restaurante francés', (SELECT id FROM categoria WHERE nombre = 'Restaurantes europeos')),
('greek_restaurant', 'Restaurante griego', (SELECT id FROM categoria WHERE nombre = 'Restaurantes europeos')),
('italian_restaurant', 'Restaurante italiano', (SELECT id FROM categoria WHERE nombre = 'Restaurantes europeos')),
('mediterranean_restaurant', 'Restaurante mediterráneo', (SELECT id FROM categoria WHERE nombre = 'Restaurantes europeos')),
('spanish_restaurant', 'Restaurante español', (SELECT id FROM categoria WHERE nombre = 'Restaurantes europeos')),
('turkish_restaurant', 'Restaurante turco', (SELECT id FROM categoria WHERE nombre = 'Restaurantes europeos'));

-- Restaurantes mexicanos 
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('mexican_restaurant', 'Restaurante mexicano', (SELECT id FROM categoria WHERE nombre = 'Restaurantes mexicanos '));

-- Salones de té
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('tea_house', 'Casa de té', (SELECT id FROM categoria WHERE nombre = 'Salones de té'));

-- Steak houses
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('steak_house', 'Steak house', (SELECT id FROM categoria WHERE nombre = 'Steak houses'));

-- Zoológicos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('zoo', 'Zoológico', (SELECT id FROM categoria WHERE nombre = 'Zoológicos')),
('aquarium', 'Acuario', (SELECT id FROM categoria WHERE nombre = 'Zoológicos'));

-- ---------------------------------------------------------------------------------------------------
--                                           TABLAS INTERMEDIAS
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Table `AppTurismo`.`LugarDeseado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LugarDeseado`;
CREATE TABLE `LugarDeseado` (
   `idUsuario` INT NOT NULL,
   `idLugar` VARCHAR(40) NOT NULL,
   `auditoria` DATETIME NOT NULL,
   PRIMARY KEY (idUsuario, idLugar),
   FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE
)ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`LugarFavorito`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LugarFavorito`;
CREATE TABLE `LugarFavorito` (
   `idUsuario` INT NOT NULL,
   `idLugar` VARCHAR(40) NOT NULL,
   `auditoria` DATETIME NOT NULL,
   PRIMARY KEY (idUsuario, idLugar),
   FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`CategoriaFavorita`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CategoriaFavorita`;
CREATE TABLE `CategoriaFavorita` (
   `idUsuario` INT NOT NULL,
   `idCategoria` INT NOT NULL,
   PRIMARY KEY (idUsuario, idCategoria),
   FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
   FOREIGN KEY (idCategoria) REFERENCES Categoria(id) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`CategoriaFavorita`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LugarSubcategoria`;
CREATE TABLE `LugarSubcategoria` (
   `idLugar` VARCHAR(40) NOT NULL,
   `idSubcategoria` VARCHAR(40) NOT NULL,
   PRIMARY KEY (idLugar, idSubcategoria),
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE ON UPDATE NO ACTION,
   FOREIGN KEY (idSubcategoria) REFERENCES Subcategoria(id) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`LugarFotos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LugarFotos`;
CREATE TABLE `LugarFotos` (
   `idLugar` VARCHAR(40) NOT NULL,
   `URL` VARCHAR(512) NOT NULL,
   `auditoria` DATETIME NOT NULL,
   PRIMARY KEY (`idLugar`, `URL`),
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`UsuarioItinerario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `UsuarioItinerario`;
CREATE TABLE `UsuarioItinerario` (
   `idUsuario` INT NOT NULL,
   `idItinerario` INT NOT NULL,
   PRIMARY KEY (idUsuario, idItinerario),
   FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
   FOREIGN KEY (idItinerario) REFERENCES Itinerario(id) ON DELETE CASCADE
)ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------
-- Table AppTurismo.LugarItinerario
-- ----------------------------------------------------
DROP TABLE IF EXISTS LugarItinerario;
CREATE TABLE LugarItinerario (
   idItinerario INT NOT NULL,
   idLugar VARCHAR(40) NOT NULL,
   orden INT NOT NULL, -- Orden en el itinerario
   horaLlegada TIME NULL, -- Hora calculada de llegada
   horaSalida TIME NULL, -- Hora calculada de salida
   auditoria DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (idItinerario, idLugar), 
   FOREIGN KEY (idItinerario) REFERENCES Itinerario(id) ON DELETE CASCADE,
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------------------------------
--                                              VISTAS
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- View `AppTurismo`.`verUsuarios`
-- -----------------------------------------------------
DROP VIEW IF EXISTS verUsuarios;
CREATE VIEW verUsuarios AS
SELECT
   id,
   correo,
   ligaFotoPerfil,
   fechaNacimiento,
   ultimaConexion,
   auditoria
FROM Usuario;

-- -----------------------------------------------------
-- View `AppTurismo`.`verSubcategorias`
-- -----------------------------------------------------
DROP VIEW IF EXISTS verSubcategorias;
CREATE VIEW verSubcategorias AS
SELECT
   s.id,
   s.nombre,
   c.nombre AS 'categoria'
FROM Subcategoria s
JOIN Categoria c WHERE s.idCategoria = c.id
ORDER BY c.nombre;

-- -----------------------------------------------------
-- View `AppTurismo`.`verLugaresCategoria`
-- -----------------------------------------------------
DROP VIEW IF EXISTS verLugaresCategoria;
CREATE VIEW verLugaresCategoria AS
SELECT
   l.id,
   l.nombre,
   l.direccion,
   l.descripcion,
   l.imagen,
   l.attributions,
   c.nombre AS categoria,
   s.nombre AS subcategoria
FROM Lugar l 
JOIN LugarSubcategoria ls ON l.id = ls.idLugar
JOIN Subcategoria s ON s.id = ls.idSubcategoria
JOIN Categoria c ON c.id = s.idCategoria
ORDER BY categoria;