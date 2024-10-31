DROP PROCEDURE IF EXISTS CrearUsuario;
DROP PROCEDURE IF EXISTS CrearLugar;
DROP PROCEDURE IF EXISTS AñadirLugarDeseado;
DROP PROCEDURE IF EXISTS UsuarioDeseados;
-- ---------------------------------------------------------------------------------------------------
--                                              PROCESOS
-- ---------------------------------------------------------------------------------------------------

DELIMITER //

-- -----------------------------------------------------
-- Process `AppTurismo`.`CrearUsuario`
-- -----------------------------------------------------

CREATE PROCEDURE CrearUsuario (
   IN p_correo VARCHAR(255),
   IN p_contraseña VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE correo = p_correo;
    
   IF usuarioExistente = 0 THEN
      INSERT INTO Usuario (correo, contraseña, auditoria)
      VALUES (p_correo, p_contraseña, NOW());
   ELSE
      SIGNAL SQLSTATE '45000' 
         SET MESSAGE_TEXT = 'El correo ya está registrado.';
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`CrearLugar`
-- -----------------------------------------------------

CREATE PROCEDURE CrearLugar (
   IN p_nombre VARCHAR(255),
   IN p_descripcion VARCHAR(255),
   IN p_direccion VARCHAR(255)
)
BEGIN
   DECLARE lugarExistente INT;

   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE nombre = p_nombre;
    
   IF lugarExistente = 0 THEN
      INSERT INTO Lugar (nombre, descripcion, direccion, auditoria)
      VALUES (p_nombre, p_descripcion, p_direccion, NOW());
   ELSE
      SIGNAL SQLSTATE '45000' 
         SET MESSAGE_TEXT = 'El lugar ya está registrado.';
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`AñadirLugarDeseado`
-- -----------------------------------------------------

CREATE PROCEDURE AñadirLugarDeseado (
   IN p_idUsuario VARCHAR(255),
   IN p_idLugar VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;
   DECLARE lugarExistente INT;
   
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE correo = p_correo;
   
   IF usuarioExistente = 0 THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Error: El usuario no existe.';
   END IF;   
   
   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE nombre = p_nombre;
   
   IF lugarExistente = 0 THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Error: El lugar no existe.';
   END IF;
   
   IF usuarioExistente = 1 AND lugarExistente = 1 THEN
      INSERT INTO LugarDeseado (idUsuario, idLugar, auditoria)
      VALUES (p_idUsuario, p_idLugar, NOW());
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioDeseados`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioDeseados (
   IN p_id INT
)
BEGIN
   SELECT
      l.nombre AS nombre,
      l.descripcio AS descripcion,
      l.direccion AS direccion,
      l.costo AS costo
      #AVG()
   FROM LugarDeseado
   JOIN Lugar l ON LugarDeseado.idLugar = Lugar.id
   WHERE LugarDeseado.idUsuario = p_id;
END //

DELIMITER ;