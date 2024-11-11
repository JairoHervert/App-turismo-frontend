# Usuario Registro
DROP PROCEDURE IF EXISTS UsuarioRegistro;
DROP PROCEDURE IF EXISTS UsuarioValidarCuenta;
DROP PROCEDURE IF EXISTS UsuarioRegistroGoogle;
DROP PROCEDURE IF EXISTS UsuarioRegistroFacebook;
DROP PROCEDURE IF EXISTS UsuarioConfirmarCuenta;
DROP PROCEDURE IF EXISTS UsuarioConfirmarCuentaId;
# Usuario Inicio de Sesión
DROP PROCEDURE IF EXISTS UsuarioIniciarSesion;
DROP PROCEDURE IF EXISTS UsuarioIniciarSesionGoogle;
DROP PROCEDURE IF EXISTS UsuarioIniciarSesionFacebook;
# Usuario Preferencias
DROP PROCEDURE IF EXISTS UsuarioAñadirDeseado;
DROP PROCEDURE IF EXISTS UsuarioVerDeseados;
DROP PROCEDURE IF EXISTS UsuarioVerFavoritos;
# Lugar
DROP PROCEDURE IF EXISTS LugarRegistro;

DELIMITER //

-- ---------------------------------------------------------------------------------------------------
--                                         USUARIO REGISTRO
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioRegistro`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioRegistro (
   IN p_nombre VARCHAR(255),
   IN p_correo VARCHAR(320),
   IN p_contraseña VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE correo = UPPER(p_correo);
    
   IF usuarioExistente = 0 THEN
      IF p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$' THEN
         INSERT INTO Usuario (nombre, correo, contraseña, auditoria, confirmacion)
         VALUES (p_nombre, UPPER(p_correo), p_contraseña, NOW(), 0);
      ELSE
         SELECT 'correo_invalido' AS 'error';
      END IF;
   ELSE
      SIGNAL SQLSTATE '45000' 
         SET MESSAGE_TEXT = 'El correo ya está registrado.';
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioCrearTokenValidacion`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioValidarCuenta (
   IN p_correo VARCHAR(320)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE correo = UPPER(p_correo);
    
   IF usuarioExistente = 0 THEN
      SELECT 'correo_no_registrado' AS 'error';
   ELSE
      UPDATE Usuario SET confirmacion = 1
      WHERE correo = UPPER(p_correo);
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioRegistroGoogle`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioRegistroGoogle (
   IN p_nombre VARCHAR(255),
   IN p_correo VARCHAR(320),
   IN p_imagen VARCHAR(512),
   IN p_token VARCHAR(255)
)
BEGIN
   DECLARE correoExistente INT;
   DECLARE googleExistente INT;

   SELECT COUNT(*) INTO correoExistente
   FROM Usuario
   WHERE correo = UPPER(p_correo);
   
   SELECT COUNT(*) INTO googleExistente
   FROM Usuario
   WHERE tokenGoogle = p_token;
    
   IF correoExistente = 0 THEN
      IF googleExistente = 0 THEN
         IF p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$' THEN
            INSERT INTO Usuario (nombre, correo, ligaFotoPerfil, tokenGoogle, confirmacion, auditoria, contraseña)
            VALUES (p_nombre, UPPER(p_correo), p_imagen, p_token, 1, NOW(), 'google');

            SELECT id FROM Usuario
            WHERE nombre = p_nombre AND correo = UPPER(p_correo);
         ELSE
            SELECT 'correo_invalido' AS 'error';
         END IF;
      ELSE
         SELECT 'usuario_ya_registrado' AS 'error';
      END IF;
   ELSE
      SELECT 'correo_ya_registrado' AS 'error';
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioRegistroFacebook`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioRegistroFacebook (
   IN p_nombre VARCHAR(255),
   IN p_imagen VARCHAR(512),
   IN p_token VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE tokenFacebook = p_token;
   
   IF p_token IS NULL OR p_token = '' THEN
      SELECT 'error_conexion' AS 'error';
   ELSE
      IF usuarioExistente = 0 THEN
         INSERT INTO Usuario (nombre, ligaFotoPerfil, tokenFacebook, confirmacion, auditoria, contraseña, correo)
         VALUES (p_nombre, p_imagen, p_token, 1, NOW(), 'facebook', CONCAT('facebook_', p_token));

         SELECT id FROM Usuario
         WHERE tokenFacebook = p_token;
      
      ELSE
         SELECT 'usuario_ya_registrado' AS 'error';
      END IF;
   END IF;
END //

-- Proceso para actualizar el campo de confirmación de la cuenta a 1 con el correo
-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioConfirmarCuenta`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioConfirmarCuenta (
   IN p_correo VARCHAR(320)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE correo = UPPER(p_correo);
    
   IF usuarioExistente = 0 THEN
      SELECT 'correo_no_registrado' AS 'error';
   ELSE
      UPDATE Usuario SET confirmacion = 1
      WHERE correo = UPPER(p_correo);
   END IF;
END //

-- Proceso para actualizar el campo de confirmación de la cuenta a 1 con el id
-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioConfirmarCuentaId`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioConfirmarCuentaId (
   IN p_id INT
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_id;
    
   IF usuarioExistente = 0 THEN
      SELECT 'usuario_no_registrado' AS 'error';
   ELSE
      UPDATE Usuario SET confirmacion = 1
      WHERE id = p_id;
   END IF;
END //

-- ---------------------------------------------------------------------------------------------------
--                                        USUARIO INICIAR SESIÓN
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Process `AppTurismo`.`IniciarSesion`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioIniciarSesion (
   IN p_correo VARCHAR(320),
   IN p_contraseña VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;
   DECLARE contraseñaCorrecta INT;
   DECLARE confirmacion_ INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE correo = UPPER(p_correo);
   
   IF p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$' THEN
      IF usuarioExistente = 0 THEN
         SELECT 'correo_no_registrado' AS 'error';
      ELSE
         SELECT id FROM Usuario
         WHERE nombre = p_nombre AND correo = UPPER(p_correo);
      END IF;
   ELSE
      SELECT 'correo_invalido' AS 'error';
   END IF;
   
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioIniciarSesionGoogle`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioIniciarSesionGoogle (
   IN p_correo VARCHAR(320),
   IN p_token VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE tokenGoogle = p_token;
   
   IF usuarioExistente = 0 THEN
      SELECT 'correo_no_registrado' AS 'error';
   ELSE
	SELECT id FROM Usuario
        WHERE tokenGoogle = p_token;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioIniciarSesionFacebook`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioIniciarSesionFacebook (
   IN p_token VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE tokenFacebook = p_token;

   IF p_token IS NULL OR p_token = '' THEN
      SELECT 'error_conexion' AS 'error';
   ELSE
      IF usuarioExistente = 0 THEN
         SELECT 'cuenta_no_registrada' AS 'error';
      ELSE
	 SELECT id FROM Usuario
         WHERE tokenFacebook = p_token;
      END IF;
   END IF;
END //

-- ---------------------------------------------------------------------------------------------------
--                                         USUARIO PREFERENCIAS
-- ---------------------------------------------------------------------------------------------------

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
      SELECT 'usuario_no_existente' AS 'error';
   END IF;   
   
   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE id = p_idLugar;
   
   IF lugarExistente = 0 THEN
      SELECT 'lugar_no_existente' AS 'error';
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
   DECLARE usuarioExistente INT;
   
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_id;
   
   IF usuarioExistente = 0 THEN
      SELECT 'usuario_no_existente' AS 'error';
   ELSE
      SELECT
      l.nombre AS nombre,
      l.descripcion AS descripcion,
      l.direccion AS direccion,
      l.costo AS costo
      #AVG()
      FROM LugarDeseado
      JOIN Lugar l ON LugarDeseado.idLugar = l.id
      WHERE LugarDeseado.idUsuario = p_id;
   END IF;  
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioVerFavoritos`
-- -----------------------------------------------------

CREATE PROCEDURE UsuarioVerFavoritos (
   IN p_id INT
)
BEGIN
   DECLARE usuarioExistente INT;
   
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_id;
   
   IF usuarioExistente = 0 THEN
      SELECT 'usuario_no_existente' AS 'error';
   ELSE
      SELECT
         l.nombre AS nombre,
         l.descripcion AS descripcion,
         l.direccion AS direccion,
         l.costo AS costo
         #AVG()
      FROM LugarFavorito
      JOIN Lugar l ON LugarFavorito.idLugar = l.id
      WHERE LugarFavorito.idUsuario = p_id;
   END IF;
END //

-- ---------------------------------------------------------------------------------------------------
--                                               LUGARES
-- ---------------------------------------------------------------------------------------------------

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
      SELECT 'lugar_ya_registrado' AS 'error';
   END IF;
END //

DELIMITER ;