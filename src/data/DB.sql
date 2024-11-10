
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
  `nombre` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `ligaFotoPerfil` VARCHAR(200),
  `fechaNacimiento` DATETIME,
  `ultimaConexion` DATETIME,
  `token` VARCHAR(255),
  `confirmacion` BOOLEAN NOT NULL DEFAULT 0,
  `auditoria` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`Lugar`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `Lugar`;
CREATE TABLE `Lugar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  #`calificacion` FLOAT NOT NULL,
  `direccion` VARCHAR(255) NOT NULL,
  `costo` FLOAT,
  #`accesibilidad` INT NOT NULL,
  `auditoria` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -----------------------------------------------------
-- Table `AppTurismo`.`Resena`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `Resena`;
CREATE TABLE `Resena` (
   `idUsuario` INT NOT NULL,
   `idLugar` INT NOT NULL,
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
   `idLugar` INT NOT NULL,
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
   `idLugar` INT NOT NULL,
   `auditoria` DATETIME NOT NULL,
   PRIMARY KEY (idUsuario, idLugar),
   FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE,
   FOREIGN KEY (idLugar) REFERENCES Lugar(id) ON DELETE CASCADE
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

