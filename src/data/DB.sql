
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
--                                              TABLAS
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Table `AppTurismo`.`Usuario`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `Usuario`;
CREATE TABLE `Usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(60),
  `nombre` VARCHAR(60),
  `apellido` VARCHAR(60),
  `correo` VARCHAR(320) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `ligaFotoPerfil` VARCHAR(512),
  `fechaNacimiento` DATETIME,
  `ultimaConexion` DATETIME,
  `tokenGoogle` VARCHAR(255) UNIQUE,
  `tokenFacebook` VARCHAR(255) UNIQUE,
  `confirmacion` BOOLEAN NOT NULL DEFAULT 0,
  `auditoria` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`Lugar`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `Lugar`;
CREATE TABLE `Lugar` (
  `id` VARCHAR(40) NOT NULL,
  `nombre` VARCHAR(128) NOT NULL,
  `descripcion` VARCHAR(1024) NOT NULL,
  `direccion` VARCHAR(255) NOT NULL,
  `imagen` VARCHAR(512),
  `tiempo` VARCHAR(15),
  `costo` VARCHAR(15),
  `accesibilidad` BOOLEAN DEFAULT 0,
  `auditoria` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
-- Table `appturismo`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`categorias` (
  `idCategorias` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategorias`)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -----------------------------------------------------
-- Tabla `clasificaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `clasificaciones`;
CREATE TABLE IF NOT EXISTS `clasificaciones` (
  `Categorias_idCategorias` INT NOT NULL,
  `lugar_id` VARCHAR(40) NOT NULL,  
  PRIMARY KEY (`Categorias_idCategorias`, `lugar_id`),
  FOREIGN KEY (`Categorias_idCategorias`)
    REFERENCES `categorias` (`idCategorias`)
    ON DELETE CASCADE,
  FOREIGN KEY (`lugar_id`)
    REFERENCES `Lugar` (`id`)
    ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -----------------------------------------------------
-- Tabla `categoriasfavoritas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `categoriasfavoritas`;
CREATE TABLE IF NOT EXISTS `categoriasfavoritas` (
  `Categorias_idCategorias` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`Categorias_idCategorias`, `usuario_id`),
  FOREIGN KEY (`Categorias_idCategorias`)
    REFERENCES `categorias` (`idCategorias`)
    ON DELETE CASCADE,
  FOREIGN KEY (`usuario_id`)
    REFERENCES `Usuario` (`id`)
    ON DELETE CASCADE
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