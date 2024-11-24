
/*!40101 SET NAMES utf8mb4 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP DATABASE IF EXISTS AppTurismo;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`AppTurismo` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;

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
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`Lugar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Lugar`;
CREATE TABLE `Lugar` (
   `id` VARCHAR(40) NOT NULL,
   `nombre` VARCHAR(128) NOT NULL,
   `direccion` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(1024) NULL,
   `imagen` VARCHAR(512) NULL DEFAULT NULL,
   `attributions` VARCHAR(150) NULL,
   `latitud` VARCHAR(45) NULL,
   `longitud` VARCHAR(45) NULL,
   `fotos` VARCHAR(1024) NULL,
   `tipos` VARCHAR(1024) NULL,
   `teléfono` VARCHAR(20) NULL,
   `precioNivel` TINYINT NULL,
   `precioRango` VARCHAR(45) NULL,
   `rating` VARCHAR(10) NULL,
   `regularOpeningHours` TEXT NULL,
   `userRatingCount` VARCHAR(45) NULL,
   `website` VARCHAR(80) NULL,
   `goodForChildren` BOOLEAN NULL,
   `goodForGroups` BOOLEAN NULL,
   `paymentOptions` VARCHAR(10) NULL,
   `reservable` BOOLEAN NULL,
   `servesVegetarianFood` VARCHAR(10) NULL,
   `allowsDogs` VARCHAR(10) NULL,
   `reviewsGoogle` VARCHAR(4096) NULL,
   `accesibilidadParking` BOOLEAN NULL DEFAULT '0',
   `accesibilidadEntrance` BOOLEAN NULL DEFAULT '0',
   `accesibilidadRestroom` BOOLEAN NULL DEFAULT '0',
   `accesibilidadSeating` BOOLEAN NULL DEFAULT '0',
   `auditoria` DATETIME NOT NULL,
   PRIMARY KEY (`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
   PRIMARY KEY (`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    
INSERT INTO `categoria` (`nombre`) VALUES 
('Salud y Bienestar'), 
('Deportes'),
('Restaurante'),
('Comida Rápida'),
('Cafetería'),
('Bar'),
('Arte'),
('Historia'),
('Museos'),
('Educativos'),
('Compras'),
('Parques'),
('Juegos Recreativos al Aire Libre'),
('Juegos Recreativos Bajo Techo'),
('Zoológicos'),
('Religión');
    
-- -----------------------------------------------------
-- Table `appturismo`.`Subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`Subcategoria` (
   `id` VARCHAR(40) NOT NULL,
   `nombre` VARCHAR(65) NOT NULL,
   `idCategoria` INT NOT NULL,
   PRIMARY KEY (`id`, `idCategoria`),
   FOREIGN KEY (idCategoria) REFERENCES Categoria(id) ON DELETE CASCADE
)ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Salud y Bienestar
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('sauna', 'Sauna', (SELECT id FROM categoria WHERE nombre = 'Salud y Bienestar')),
('spa', 'Spa', (SELECT id FROM categoria WHERE nombre = 'Salud y Bienestar')),
('tanning_studio', 'Estudio de bronceado', (SELECT id FROM categoria WHERE nombre = 'Salud y Bienestar')),
('yoga_studio', 'Estudio de yoga', (SELECT id FROM categoria WHERE nombre = 'Salud y Bienestar')),
('nail_salon', 'Salón de uñas', (SELECT id FROM categoria WHERE nombre = 'Salud y Bienestar'));

-- Deportes
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('arena', 'Arena de luchas', (SELECT id FROM categoria WHERE nombre = 'Deportes')),
('athletic_field', 'Campo de atletismo', (SELECT id FROM categoria WHERE nombre = 'Deportes')),
('golf_course', 'Campo de golf', (SELECT id FROM categoria WHERE nombre = 'Deportes')),
('ice_skating_rink', 'Pista de patinaje sobre hielo', (SELECT id FROM categoria WHERE nombre = 'Deportes')),
('playground', 'Campo de juegos', (SELECT id FROM categoria WHERE nombre = 'Deportes')),
('sports_activity_location', 'Lugar de actividad deportiva', (SELECT id FROM categoria WHERE nombre = 'Deportes')),
('sports_club', 'Club de deportes', (SELECT id FROM categoria WHERE nombre = 'Deportes')),
('swimming_pool', 'Piscina', (SELECT id FROM categoria WHERE nombre = 'Deportes'));

-- Comida Rápida
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('bagel_shop', 'Tienda de bagels', (SELECT id FROM categoria WHERE nombre = 'Comida Rápida')),
('acai_shop', 'Tienda de açai', (SELECT id FROM categoria WHERE nombre = 'Comida Rápida')),
('bakery', 'Panadería', (SELECT id FROM categoria WHERE nombre = 'Comida Rápida')),
('fast_food_restaurant', 'Restaurante de comida rápida', (SELECT id FROM categoria WHERE nombre = 'Comida Rápida')),
('ice_cream_shop', 'Heladería', (SELECT id FROM categoria WHERE nombre = 'Comida Rápida'));

-- Cafetería
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('cafe', 'Café', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('cafeteria', 'Cafetería/Comedor', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('cat_cafe', 'Cat café', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('chocolate_shop', 'Chocolatería', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('coffee_shop', 'Cafetería', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('confectionery', 'Confitería', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('dessert_restaurant', 'Restaurante de postres', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('dessert_shop', 'Postrería', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('diner', 'Comedor', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('dog_cafe', 'Dog café', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('donut_shop', 'Tienda de donas', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('fine_dining_restaurant', 'Restaurante de lujo', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('food_court', 'Patio de comidas', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('juice_shop', 'Tienda de jugos', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('meal_takeaway', 'Comida para llevar', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('sandwich_shop', 'Sandwichería', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('steak_house', 'Steak house', (SELECT id FROM categoria WHERE nombre = 'Cafetería')),
('tea_house', 'Casa de té', (SELECT id FROM categoria WHERE nombre = 'Cafetería'));

-- Restaurantes
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('afghani_restaurant', 'Restaurante afgano', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('african_restaurant', 'Restaurante africano', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('american_restaurant', 'Restaurante americano', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('asian_restaurant', 'Restaurante asian', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('barbecue_restaurant', 'Restaurante de barbacoa', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('brazilian_restaurant', 'Restaurante brazileño', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('breakfast_restaurant', 'Restaurante de desayunos', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('brunch_restaurant', 'Restaurante de brunch', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('buffet_restaurant', 'Buffet', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('chinese_restaurant', 'Restaurante chino', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('french_restaurant', 'Restaurante francés', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('greek_restaurant', 'Restaurante griego', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('hamburger_restaurant', 'Restaurante de hamburguesas', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('indian_restaurant', 'Restaurante hindú', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('indonesian_restaurant', 'Restaurante indonesio', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('italian_restaurant', 'Restaurante italiano', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('japanese_restaurant', 'Restaurante japonés', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('korean_restaurant', 'Restaurante coreano', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('lebanese_restaurant', 'Restaurante libanés', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('mediterranean_restaurant', 'Restaurante mediterráneo', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('mexican_restaurant', 'Restaurante mexicano', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('middle_eastern_restaurant', 'Restaurante de oriente medio', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('pizza_restaurant', 'Pizzería', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('ramen_restaurant', 'Restaurante de ramen', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('restaurant', 'Restaurante', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('seafood_restaurant', 'Marisquería', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('spanish_restaurant', 'Restaurante español', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('sushi_restaurant', 'Restaurante de sushi', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('thai_restaurant', 'Restaurante tailandés', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('turkish_restaurant', 'Restaurante turco', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('vegan_restaurant', 'Restaurante vegano', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('vegetarian_restaurant', 'Restaurante vegetariano', (SELECT id FROM categoria WHERE nombre = 'Restaurante')),
('vietnamese_restaurant', 'Restaurante vietnamita', (SELECT id FROM categoria WHERE nombre = 'Restaurante'));

-- Bar
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('wine_bar', 'Bar de vinos', (SELECT id FROM categoria WHERE nombre = 'Bar')),
('bar', 'Bar', (SELECT id FROM categoria WHERE nombre = 'Bar')),
('night_club', 'Club nocturno', (SELECT id FROM categoria WHERE nombre = 'Bar')),
('karaoke', 'Karaoke', (SELECT id FROM categoria WHERE nombre = 'Bar')),
('dance_hall', 'Salón de baile', (SELECT id FROM categoria WHERE nombre = 'Bar')),
('comedy_club', 'Club de comedia', (SELECT id FROM categoria WHERE nombre = 'Bar')),
('bar_and_grill', 'Bar y parrilla', (SELECT id FROM categoria WHERE nombre = 'Bar'));

-- Arte
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('art_gallery', 'Galería de arte', (SELECT id FROM categoria WHERE nombre = 'Arte')),
('art_studio', 'Estudio de arte', (SELECT id FROM categoria WHERE nombre = 'Arte')),
('auditorium', 'Auditorio', (SELECT id FROM categoria WHERE nombre = 'Arte')),
('cultural_landmark', 'Lugar de referencia cultural', (SELECT id FROM categoria WHERE nombre = 'Arte')),
('performing_arts_theater', 'Teatro de artes performativas', (SELECT id FROM categoria WHERE nombre = 'Arte')),
('sculpture', 'Escultura', (SELECT id FROM categoria WHERE nombre = 'Arte')),
('body_art_service', 'Servicio de arte corporal', (SELECT id FROM categoria WHERE nombre = 'Arte'));

-- Historia
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('historical_place', 'Lugar histórico', (SELECT id FROM categoria WHERE nombre = 'Historia')),
('monument', 'Monumento', (SELECT id FROM categoria WHERE nombre = 'Historia')),
('historical_landmark', 'Punto de referencia histórico', (SELECT id FROM categoria WHERE nombre = 'Historia'));

-- Museos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('museum', 'Museo', (SELECT id FROM categoria WHERE nombre = 'Museos'));

-- Educativos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('library', 'Biblioteca', (SELECT id FROM categoria WHERE nombre = 'Educativos')),
('planetarium', 'Planetario', (SELECT id FROM categoria WHERE nombre = 'Educativos'));

-- Compras
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('store', 'Tienda', (SELECT id FROM categoria WHERE nombre = 'Compras')),
('shoe_store', 'Zapatería', (SELECT id FROM categoria WHERE nombre = 'Compras')),
('shopping_mall', 'Plaza comercial', (SELECT id FROM categoria WHERE nombre = 'Compras')),
('market', 'Mercado', (SELECT id FROM categoria WHERE nombre = 'Compras')),
('book_store', 'Libería', (SELECT id FROM categoria WHERE nombre = 'Compras')),
('gift_shop', 'Tienda de regalos', (SELECT id FROM categoria WHERE nombre = 'Compras'));

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
('barbecue_area', 'Área de barbacoa', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('marina', 'Puerto pequeño', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('children''s_camp', 'Campo para niños', (SELECT id FROM categoria WHERE nombre = 'Parques')),
('hiking_area', 'Campo de caminata', (SELECT id FROM categoria WHERE nombre = 'Parques'));

-- Juegos Recreativos al Aire Libre
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('amusement_park', 'Parque de diversiones', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
('amusement_center', 'Centro de diversiones', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
('water_park', 'Parque acuático', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
('roller_coaster', 'Montaña rusa', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
('ferris_wheel', 'Rueda de la fortuna', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
('skateboard_park', 'Parque de skateboard', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
('off_roading_area', 'Área de offroad', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
('adventure_sports_center', 'Centro de deportes de aventura', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
('cycling_park', 'Parque de cicilismo', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre'));

-- Juegos Recreativos Bajo Techo
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('video_arcade', 'Arcade', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos Bajo Techo')),
('bowling_alley', 'Sala de boliche', (SELECT id FROM categoria WHERE nombre = 'Juegos Recreativos Bajo Techo'));

-- Zoológicos
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('zoo', 'Zoológico', (SELECT id FROM categoria WHERE nombre = 'Zoológicos')),
('aquarium', 'Acuario', (SELECT id FROM categoria WHERE nombre = 'Zoológicos'));

-- Religión
INSERT INTO `subcategoria` (`id`, `nombre`, `idCategoria`) VALUES
('place_of_worship', 'Lugar de culto', (SELECT id FROM categoria WHERE nombre = 'Religión')),
('mosque', 'Mezquita', (SELECT id FROM categoria WHERE nombre = 'Religión')),
('hindu_temple', 'Templo hindú', (SELECT id FROM categoria WHERE nombre = 'Religión')),
('synagogue', 'Sinagoga', (SELECT id FROM categoria WHERE nombre = 'Religión')),
('church', 'Iglesia', (SELECT id FROM categoria WHERE nombre = 'Religión'));

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
)ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`LugarFotos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LugarFotos`;
CREATE TABLE `LugarFotos` (
   idLugar VARCHAR(40) NOT NULL,
   URL VARCHAR(512) NOT NULL,
   PRIMARY KEY (`idLugar`, `URL`),
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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