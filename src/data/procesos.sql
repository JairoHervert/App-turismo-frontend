# Usuario
DROP PROCEDURE IF EXISTS UsuarioRegistro;
DROP PROCEDURE IF EXISTS UsuarioIniciarSesion;
DROP PROCEDURE IF EXISTS UsuarioAñadirDeseado;
DROP PROCEDURE IF EXISTS UsuarioVerDeseados;
DROP PROCEDURE IF EXISTS UsuarioVerFavoritos;
# Lugar
DROP PROCEDURE IF EXISTS LugarRegistro;

-- ---------------------------------------------------------------------------------------------------
--                                              PROCESOS
-- ---------------------------------------------------------------------------------------------------

DELIMITER //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioRegistro`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioRegistro (
   IN p_nombre VARCHAR(255),
   IN p_correo VARCHAR(255),
   IN p_contraseña VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE correo = p_correo;
    
   IF usuarioExistente = 0 THEN
      INSERT INTO Usuario (nombre, correo, contraseña, auditoria)
      VALUES (p_nombre, p_correo, p_contraseña, NOW());
   ELSE
      SIGNAL SQLSTATE '45000' 
         SET MESSAGE_TEXT = 'El correo ya está registrado.';
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`IniciarSesion`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioIniciarSesion (
   IN p_correo VARCHAR(255),
   IN p_contraseña VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;
   DECLARE contraseñaCorrecta INT;
   DECLARE confirmacion_ INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE correo = p_correo;
   
   IF usuarioExistente = 0 THEN
      SELECT 'correo_no_registrado' AS 'error';
   ELSE

      SELECT COUNT(*) INTO contraseñaCorrecta
      FROM Usuario
      WHERE correo = p_correo AND contraseña = p_contraseña;

      IF contraseñaCorrecta = 0 THEN
         SELECT 'contraseña_incorrecta' AS 'error';
      ELSE
      
         SELECT confirmacion INTO confirmacion_
         FROM Usuario
         WHERE correo = p_correo AND contraseña = p_contraseña;

         IF confirmacion_ = 0 THEN
            SELECT 'cuenta_no_confirmada' AS 'error';
         ELSE
            SELECT id FROM Usuario
            WHERE correo = p_correo AND contraseña = p_contraseña;
         END IF;
      END IF;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioAñadirDeseado`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioAñadirDeseado (
   IN p_idUsuario VARCHAR(255),
   IN p_idLugar VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;
   DECLARE lugarExistente INT;
   
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_idUsuario;
   
   IF usuarioExistente = 0 THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Error: El usuario no existe.';
   END IF;   
   
   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE id = p_idLugar;
   
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
-- Process `AppTurismo`.`UsuarioVerDeseados`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioVerDeseados (
   IN p_id INT
)
BEGIN
   SELECT
      l.nombre AS nombre,
      l.descripcion AS descripcion,
      l.direccion AS direccion,
      l.costo AS costo
      #AVG()
   FROM LugarDeseado
   JOIN Lugar l ON LugarDeseado.idLugar = l.id
   WHERE LugarDeseado.idUsuario = p_id;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioVerFavoritos`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioVerFavoritos (
   IN p_id INT
)
BEGIN
   SELECT
      l.nombre AS nombre,
      l.descripcion AS descripcion,
      l.direccion AS direccion,
      l.costo AS costo
      #AVG()
   FROM LugarFavorito
   JOIN Lugar l ON LugarFavorito.idLugar = l.id
   WHERE LugarFavorito.idUsuario = p_id;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`LugarRegistro`
-- -----------------------------------------------------

CREATE PROCEDURE LugarRegistro (
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

DELIMITER ;