
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

-- -----------------------------------------------------
-- Table `AppTurismo`.`Categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Categoria`;
CREATE TABLE `Categoria` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(45) NOT NULL,
   PRIMARY KEY (`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -----------------------------------------------------
-- Table `appturismo`.`Subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`Subcategoria` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(45) NOT NULL,
   `idCategoria` INT NOT NULL,
   PRIMARY KEY (`id`, `idCategoria`),
   FOREIGN KEY (idCategoria) REFERENCES Categoria(id) ON DELETE CASCADE
)ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
   `idSubcategoria` INT NOT NULL,
   PRIMARY KEY (idLugar, idSubcategoria),
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE ON UPDATE NO ACTION,
   FOREIGN KEY (idSubcategoria) REFERENCES Subcategoria(id) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -----------------------------------------------------
-- Table `appturismo`.`subcategoria_has_lugar`
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