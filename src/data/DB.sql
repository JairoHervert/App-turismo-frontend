-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema appturismo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema appturismo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `appturismo` DEFAULT CHARACTER SET utf8mb3 ;
USE `appturismo` ;

-- -----------------------------------------------------
-- Table `appturismo`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `appturismo`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(60) NULL DEFAULT NULL,
  `nombre` VARCHAR(60) NULL DEFAULT NULL,
  `apellido` VARCHAR(60) NULL DEFAULT NULL,
  `correo` VARCHAR(320) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `ligaFotoPerfil` VARCHAR(512) NULL DEFAULT NULL,
  `fechaNacimiento` DATETIME NULL DEFAULT NULL,
  `ultimaConexion` DATETIME NULL DEFAULT NULL,
  `tokenGoogle` VARCHAR(255) NULL DEFAULT NULL,
  `tokenFacebook` VARCHAR(255) NULL DEFAULT NULL,
  `confirmacion` TINYINT(1) NOT NULL DEFAULT '0',
  `auditoria` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `tokenGoogle` (`tokenGoogle` ASC) VISIBLE,
  UNIQUE INDEX `tokenFacebook` (`tokenFacebook` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `appturismo`.`categoriafavorita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`categoriafavorita` (
  `Categorias_idCategorias` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`Categorias_idCategorias`, `usuario_id`),
  INDEX `usuario_id` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `categoriafavorita_ibfk_1` -- Cambié el nombre aquí
    FOREIGN KEY (`Categorias_idCategorias`)
    REFERENCES `appturismo`.`categoria` (`idCategoria`)
    ON DELETE CASCADE,
  CONSTRAINT `categoriafavorita_ibfk_2` -- Cambié el nombre aquí
    FOREIGN KEY (`usuario_id`)
    REFERENCES `appturismo`.`usuario` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `appturismo`.`lugar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`lugar` (
  `id` VARCHAR(40) NOT NULL,
  `nombre` VARCHAR(128) NOT NULL,
  `direccion` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(1024) NULL,
  `imagen` VARCHAR(512) NULL DEFAULT NULL,
  `accesibilidad` TINYINT(1) NULL DEFAULT '0',
  `auditoria` DATETIME NOT NULL,
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
  `goodForChildren` TINYINT(1) NULL,
  `goodForGroups` TINYINT(1) NULL,
  `paymentOptions` VARCHAR(10) NULL,
  `reservable` VARCHAR(10) NULL,
  `servesVegetarianFood` VARCHAR(10) NULL,
  `allowsDogs` VARCHAR(10) NULL,
  `reviewsGoogle` VARCHAR(4096) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `appturismo`.`lugardeseado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`lugardeseado` (
  `idUsuario` INT NOT NULL,
  `idLugar` VARCHAR(40) NOT NULL,
  `auditoria` DATETIME NOT NULL,
  PRIMARY KEY (`idUsuario`, `idLugar`),
  INDEX `idLugar` (`idLugar` ASC) VISIBLE,
  CONSTRAINT `lugardeseado_ibfk_1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `appturismo`.`usuario` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `lugardeseado_ibfk_2`
    FOREIGN KEY (`idLugar`)
    REFERENCES `appturismo`.`lugar` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `appturismo`.`lugarfavorito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`lugarfavorito` (
  `idUsuario` INT NOT NULL,
  `idLugar` VARCHAR(40) NOT NULL,
  `auditoria` DATETIME NOT NULL,
  PRIMARY KEY (`idUsuario`, `idLugar`),
  INDEX `idLugar` (`idLugar` ASC) VISIBLE,
  CONSTRAINT `lugarfavorito_ibfk_1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `appturismo`.`usuario` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `lugarfavorito_ibfk_2`
    FOREIGN KEY (`idLugar`)
    REFERENCES `appturismo`.`lugar` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `appturismo`.`resena`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`resena` (
  `idUsuario` INT NOT NULL,
  `idLugar` VARCHAR(40) NOT NULL,
  `calificacion` INT NOT NULL,
  `resena` VARCHAR(1000) NULL DEFAULT NULL,
  `auditoria` DATETIME NOT NULL,
  PRIMARY KEY (`idUsuario`, `idLugar`),
  INDEX `idLugar` (`idLugar` ASC) VISIBLE,
  CONSTRAINT `resena_ibfk_1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `appturismo`.`usuario` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `resena_ibfk_2`
    FOREIGN KEY (`idLugar`)
    REFERENCES `appturismo`.`lugar` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `appturismo`.`subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`subcategoria` (
  `idSubcategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `categoria_idCategoria` INT NOT NULL,
  PRIMARY KEY (`idSubcategoria`, `categoria_idCategoria`),
  INDEX `fk_subcategoria_categoria1_idx` (`categoria_idCategoria` ASC) VISIBLE,
  CONSTRAINT `fk_subcategoria_categoria1`
    FOREIGN KEY (`categoria_idCategoria`)
    REFERENCES `appturismo`.`categoria` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `appturismo`.`subcategoria_has_lugar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`subcategoria_has_lugar` (
  `subcategoria_idSubcategoria` INT NOT NULL,
  `lugar_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`subcategoria_idSubcategoria`, `lugar_id`),
  INDEX `fk_subcategoria_has_lugar_lugar1_idx` (`lugar_id` ASC) VISIBLE,
  INDEX `fk_subcategoria_has_lugar_subcategoria1_idx` (`subcategoria_idSubcategoria` ASC) VISIBLE,
  CONSTRAINT `fk_subcategoria_has_lugar_subcategoria1`
    FOREIGN KEY (`subcategoria_idSubcategoria`)
    REFERENCES `appturismo`.`subcategoria` (`idSubcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subcategoria_has_lugar_lugar1`
    FOREIGN KEY (`lugar_id`)
    REFERENCES `appturismo`.`lugar` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `appturismo`.`fotosLugar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`fotosLugar` (
  `url` VARCHAR(512) NOT NULL,
  `lugar_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`url`, `lugar_id`),
  INDEX `fk_fotosLugar_lugar1_idx` (`lugar_id` ASC) VISIBLE,
  CONSTRAINT `fk_fotosLugar_lugar1`
    FOREIGN KEY (`lugar_id`)
    REFERENCES `appturismo`.`lugar` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `appturismo` ;

-- -----------------------------------------------------
-- Placeholder table for view `appturismo`.`verusuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appturismo`.`verusuarios` (`id` INT, `correo` INT, `ligaFotoPerfil` INT, `fechaNacimiento` INT, `ultimaConexion` INT, `auditoria` INT);

-- -----------------------------------------------------
-- View `appturismo`.`verusuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `appturismo`.`verusuarios`;
USE `appturismo`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `appturismo`.`verusuarios` AS select `appturismo`.`usuario`.`id` AS `id`,`appturismo`.`usuario`.`correo` AS `correo`,`appturismo`.`usuario`.`ligaFotoPerfil` AS `ligaFotoPerfil`,`appturismo`.`usuario`.`fechaNacimiento` AS `fechaNacimiento`,`appturismo`.`usuario`.`ultimaConexion` AS `ultimaConexion`,`appturismo`.`usuario`.`auditoria` AS `auditoria` from `appturismo`.`usuario`;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
