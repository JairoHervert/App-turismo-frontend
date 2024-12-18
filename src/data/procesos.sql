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
# Usuario Información
DROP PROCEDURE IF EXISTS UsuarioCompletarPerfil;
DROP PROCEDURE IF EXISTS ActualizarCategoriasFavoritas;
DROP PROCEDURE IF EXISTS UsuarioGetDatos;
DROP PROCEDURE IF EXISTS UsuarioGuardarDatos;
DROP PROCEDURE IF EXISTS UsuarioSetImagen;
# Usuario Preferencias
DROP PROCEDURE IF EXISTS UsuarioAnadirDeseado;
DROP PROCEDURE IF EXISTS UsuarioAnadirFavorito;
DROP PROCEDURE IF EXISTS usuario_anadir_categoria;
DROP PROCEDURE IF EXISTS UsuarioVerDeseados;
DROP PROCEDURE IF EXISTS UsuarioVerFavoritos;
DROP PROCEDURE IF EXISTS UsuarioVerCategorias;
DROP PROCEDURE IF EXISTS usuario_categorias_all;
# Lugar
DROP PROCEDURE IF EXISTS getCategorias;
DROP PROCEDURE IF EXISTS LugarRegistro;
DROP PROCEDURE IF EXISTS getLugaresTodos;
DROP PROCEDURE IF EXISTS getLugaresCategoria4;
DROP PROCEDURE IF EXISTS getLugaresCategoriaHomeUsuario;
DROP PROCEDURE IF EXISTS LugarGetDatos;
DROP PROCEDURE IF EXISTS RegistrarSubcategoria;
DROP PROCEDURE IF EXISTS LugarGetCategorias;
DROP PROCEDURE IF EXISTS LugarGetSubcategorias;
DROP PROCEDURE IF EXISTS RegistrarFoto;
DROP PROCEDURE IF EXISTS LugarGetFotos;

#Itinerario
DROP PROCEDURE IF EXISTS UsuarioVerItinerariosConLugares;

DELIMITER //

-- ---------------------------------------------------------------------------------------------------
--                                         USUARIO REGISTRO
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioRegistro`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioRegistro (
   IN p_username VARCHAR(60),
   IN p_correo VARCHAR(320),
   IN p_contraseña VARCHAR(255)
)
BEGIN
   DECLARE usuarioExistente INT;
   DECLARE confirmacionStatus INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE UPPER(correo) = UPPER(p_correo);
    
   IF usuarioExistente = 0 THEN
      -- Validar formato del correo
      IF p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$' THEN
         INSERT INTO Usuario (username, correo, contraseña, auditoria, confirmacion)
         VALUES (p_username, p_correo, p_contraseña, NOW(), 0);
         
         SELECT id FROM Usuario WHERE correo = p_correo;
      ELSE
         SELECT 'correo_invalido' AS 'error';
      END IF;
   ELSE
      -- Obtener el valor de confirmacion
      SELECT confirmacion INTO confirmacionStatus
      FROM Usuario
      WHERE UPPER(correo) = UPPER(p_correo);

      -- Verificar el estado de confirmacion
      IF confirmacionStatus = 0 THEN
         SELECT 'sin_confirmacion' AS 'warning';
      ELSE
         SELECT 'correo_ya_registrado' AS 'error';
      END IF;
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
   IN p_nombre VARCHAR(60),
   IN p_apellido VARCHAR(60),
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
    
   IF googleExistente = 0 THEN
      IF correoExistente = 0 THEN
         IF p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$' THEN
            INSERT INTO Usuario (nombre, apellido, correo, ligaFotoPerfil, tokenGoogle, confirmacion, auditoria, contraseña)
            VALUES (p_nombre, p_apellido, p_correo, p_imagen, p_token, 1, NOW(), 'google');

            SELECT id FROM Usuario
            WHERE nombre = p_nombre AND correo = UPPER(p_correo);
         ELSE
            SELECT 'correo_invalido' AS 'error';
         END IF;
      ELSE
         SELECT 'correo_ya_registrado' AS 'error';
      END IF;
   ELSE 
      SELECT 'cuenta_ya_registrada' AS 'error';
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioRegistroFacebook`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioRegistroFacebook (
   IN p_username VARCHAR(60),
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
         INSERT INTO Usuario (username, ligaFotoPerfil, tokenFacebook, confirmacion, auditoria, contraseña, correo)
         VALUES (p_username, p_imagen, p_token, 1, NOW(), 'facebook', CONCAT('facebook_', p_token));

         SELECT id FROM Usuario
         WHERE tokenFacebook = p_token;
      ELSE
         SELECT 'cuenta_ya_registrada' AS 'error';
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
   IN p_correo VARCHAR(320)
)
BEGIN
   DECLARE correoInvalido BOOLEAN;
   DECLARE v_id INT;
   DECLARE v_username VARCHAR(60);
   DECLARE v_nombre VARCHAR(60);
   DECLARE v_apellido VARCHAR(60);
   DECLARE v_contraseña VARCHAR(255);
   DECLARE v_imagen VARCHAR(512);
   DECLARE v_sexo VARCHAR(20);
   DECLARE v_alimentacion VARCHAR(20);
   DECLARE v_discapacidad VARCHAR(20);
   DECLARE v_confirmacion BOOLEAN;
   DECLARE v_fechaNacimiento DATETIME;
   DECLARE v_ultimaConexion DATETIME;
   
   SELECT id, username, nombre, apellido, contraseña, ligaFotoPerfil, fechaNacimiento, sexo, preferenciaAlimenticia, requiereAccesibilidad, ultimaConexion, confirmacion
   INTO v_id, v_username, v_nombre, v_apellido, v_contraseña, v_imagen, v_fechaNacimiento, v_sexo, v_alimentacion, v_discapacidad, v_ultimaConexion, v_confirmacion
   FROM Usuario
   WHERE correo = p_correo;
   
   SET correoInvalido = NOT (p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$');

   IF correoInvalido THEN
      SELECT 'correo_invalido' AS 'error';
   ELSE
      IF v_id IS NULL THEN
         SELECT 'correo_no_registrado' AS 'error';
      ELSEIF v_confirmacion = 0 THEN
         SELECT 'correo_no_confirmado' AS 'error';
      ELSE
         SELECT
            v_id AS id,
            v_username AS username,
            v_nombre AS nombre,
            v_apellido AS apellido,
            v_contraseña AS contraseña,
            v_imagen AS imagen,
            DATE(v_fechaNacimiento) AS fechaNacimiento,
            v_sexo AS sexo,
            v_alimentacion AS preferenciaAlimenticia,
            v_discapacidad AS requiereAccesibilidad,
            v_ultimaConexion AS ultimaConexion,
            v_confirmacion AS confirmacion;
      END IF;
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
   DECLARE v_id INT;
   DECLARE v_username VARCHAR(30);
   DECLARE v_nombre VARCHAR(60);
   DECLARE v_apellido VARCHAR(60);
   DECLARE v_imagen VARCHAR(512);
   DECLARE v_sexo VARCHAR(20);
   DECLARE v_alimentacion VARCHAR(20);
   DECLARE v_discapacidad VARCHAR(20);
   DECLARE v_confirmacion BOOLEAN;
   DECLARE v_fechaNacimiento DATETIME;
   DECLARE v_ultimaConexion DATETIME;
   DECLARE v_google VARCHAR(255);

   SELECT id, username, nombre, apellido, tokenGoogle, ligaFotoPerfil, fechaNacimiento, sexo, preferenciaAlimenticia, requiereAccesibilidad, ultimaConexion, confirmacion
   INTO v_id, v_username, v_nombre, v_apellido, v_google, v_imagen, v_fechaNacimiento, v_sexo, v_alimentacion, v_discapacidad, v_ultimaConexion, v_confirmacion
   FROM Usuario
   WHERE tokenGoogle = p_token;
   
   IF v_id IS NULL THEN
      SELECT 'cuenta_no_registrada' AS 'error';
   ELSE
      SELECT
         v_id AS id,
         v_username AS username,
         v_nombre AS nombre,
         v_apellido AS apellido,
         v_google AS tokenGoogle,
         v_imagen AS imagen,
         DATE(v_fechaNacimiento) AS fechaNacimiento,
         v_sexo AS sexo,
         v_alimentacion AS preferenciaAlimenticia,
         v_discapacidad AS requiereAccesibilidad,
         v_ultimaConexion AS ultimaConexion,
         v_confirmacion AS confirmacion;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioIniciarSesionFacebook`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioIniciarSesionFacebook (
   IN p_token VARCHAR(255),
   IN p_imagen VARCHAR(512)
)
BEGIN
   DECLARE v_id INT;
   DECLARE v_username VARCHAR(30);
   DECLARE v_nombre VARCHAR(60);
   DECLARE v_apellido VARCHAR(60);
   DECLARE v_imagen VARCHAR(512);
   DECLARE v_sexo VARCHAR(20);
   DECLARE v_alimentacion VARCHAR(20);
   DECLARE v_discapacidad VARCHAR(20);
   DECLARE v_confirmacion BOOLEAN;
   DECLARE v_fechaNacimiento DATETIME;
   DECLARE v_ultimaConexion DATETIME;
   DECLARE v_facebook VARCHAR(255);

   SELECT id, username, nombre, apellido, tokenFacebook, ligaFotoPerfil, fechaNacimiento, sexo, preferenciaAlimenticia, requiereAccesibilidad, ultimaConexion, confirmacion
   INTO v_id, v_username, v_nombre, v_apellido, v_facebook, v_imagen, v_fechaNacimiento, v_sexo, v_alimentacion, v_discapacidad, v_ultimaConexion, v_confirmacion
   FROM Usuario
   WHERE tokenFacebook = p_token;

   IF v_id IS NULL THEN
      SELECT 'cuenta_no_registrada' AS 'error';
   ELSE
      UPDATE Usuario SET ligaFotoPerfil = p_imagen
      WHERE tokenFacebook = p_token;

      SELECT
         v_id AS id,
         v_username AS username,
         v_nombre AS nombre,
         v_apellido AS apellido,
         v_facebook AS tokenFacebook,
         v_imagen AS imagen,
         DATE(v_fechaNacimiento) AS fechaNacimiento,
         v_sexo AS sexo,
         v_alimentacion AS preferenciaAlimenticia,
         v_discapacidad AS requiereAccesibilidad,
         v_ultimaConexion AS ultimaConexion,
         v_confirmacion AS confirmacion;
   END IF;
END //

-- ---------------------------------------------------------------------------------------------------
--                                          USUARIO INFORMACIÓN
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioCompletarPerfil`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioCompletarPerfil (
   IN p_id INT,
   IN p_username VARCHAR(60),
   IN p_nombre VARCHAR(60),
   IN p_apellido VARCHAR(60),
   IN p_fechaNacimiento VARCHAR(10),
   IN p_sexo VARCHAR(20),
   IN p_alimentacion VARCHAR(20),
   IN p_discapacidad VARCHAR(20)
)
BEGIN
   DECLARE usuarioExistente INT;
   
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_id;
   
   IF usuarioExistente = 0 THEN
      SELECT 'usuario_no_existente' AS 'error';
   ELSE
      UPDATE Usuario
      SET
         username = p_username,
         nombre = p_nombre, 
         apellido = p_apellido, 
         fechaNacimiento = STR_TO_DATE(p_fechaNacimiento, '%d-%m-%Y'),
         sexo = p_sexo,
         preferenciaAlimenticia = p_alimentacion,
         requiereAccesibilidad = p_discapacidad
      WHERE id = p_id;
      
      SELECT
         username, nombre, apellido, fechaNacimiento, sexo, preferenciaAlimenticia, requiereAccesibilidad
      FROM Usuario
      WHERE id = p_id;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`ActualizarCategoriasFavoritas`
-- -----------------------------------------------------
CREATE PROCEDURE ActualizarCategoriasFavoritas(
    IN p_idUsuario INT,
    IN p_categorias VARCHAR(255)
)
BEGIN
    CREATE TEMPORARY TABLE TempCategorias (
        idCategoria INT NOT NULL
    );

    INSERT INTO TempCategorias (idCategoria)
    SELECT id
    FROM Categoria
    WHERE FIND_IN_SET(nombre, p_categorias) > 0;

    DELETE FROM CategoriaFavorita
    WHERE idUsuario = p_idUsuario
      AND idCategoria NOT IN (SELECT idCategoria FROM TempCategorias);

    INSERT IGNORE INTO CategoriaFavorita (idUsuario, idCategoria, auditoria)
    SELECT p_idUsuario, idCategoria, NOW()
    FROM TempCategorias;

    DROP TEMPORARY TABLE TempCategorias;

    UPDATE Usuario
    SET ultimaConexion = NOW()
    WHERE id = p_idUsuario;
    
    CALL UsuarioVerCategorias(p_idUsuario);
END//

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioGetDatos`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioGetDatos (
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
         u.username AS 'username',
         u.nombre AS 'nombre',
         u.apellido AS 'apellido',
         u.correo AS 'correo',
         u.ligaFotoPerfil AS 'imagen',
         DATE(u.fechaNacimiento) AS 'fechaNacimiento',
         u.sexo AS 'sexo',
         u.preferenciaAlimenticia AS 'preferenciaAlimenticia',
         u.requiereAccesibilidad AS 'requiereAccesibilidad',
         u.ultimaConexion AS 'ultimaConexion',
         (SELECT COUNT(*) FROM LugarDeseado WHERE idUsuario = p_id) AS 'nDeseados',
         (SELECT COUNT(*) FROM LugarFavorito WHERE idUsuario = p_id) AS 'nFavoritos',
         (SELECT COUNT(*) FROM UsuarioItinerario WHERE idUsuario = p_id) AS 'nItinerarios'
         FROM Usuario u
      WHERE u.id = p_id;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioGuardarDatos`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioGuardarDatos (
   IN p_id INT,
   IN p_nombre VARCHAR(60),
   IN p_apellido VARCHAR(60),
   IN p_fechaNacimiento VARCHAR(10),
   IN p_sexo VARCHAR(20),
   IN p_alim VARCHAR(20),
   IN p_accesi VARCHAR(20)
)
BEGIN
   DECLARE usuarioExistente INT;
   
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_id;
   
   IF usuarioExistente = 0 THEN
      SELECT 'usuario_no_existente' AS 'error';
   ELSE
      UPDATE Usuario
      SET 
         nombre = p_nombre, 
         apellido = p_apellido, 
         fechaNacimiento = STR_TO_DATE(p_fechaNacimiento, '%d-%m-%Y'),
         sexo = p_sexo,
         preferenciaAlimenticia = p_alim,
         requiereAccesibilidad = p_accesi
      WHERE id = p_id;
      
      SELECT
         u.username AS 'username',
         u.nombre AS 'nombre',
         u.apellido AS 'apellido',
         u.correo AS 'correo',
         u.ligaFotoPerfil AS 'imagen',
         DATE(u.fechaNacimiento) AS 'fechaNacimiento',
         u.ultimaConexion AS 'ultimaConexion',
         (SELECT COUNT(*) FROM LugarDeseado WHERE idUsuario = p_id) AS 'nDeseados',
         (SELECT COUNT(*) FROM LugarFavorito WHERE idUsuario = p_id) AS 'nFavoritos'
         FROM Usuario u
      WHERE u.id = p_id;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioSetImagen`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioSetImagen (
   IN p_id INT,
   IN p_imagen VARCHAR(512)
)
BEGIN
   DECLARE usuarioExistente INT;
   
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_id;
   
   IF usuarioExistente = 0 THEN
      SELECT 'usuario_no_existente' AS 'error';
   ELSE
      UPDATE Usuario
      SET
         ligaFotoPerfil = p_imagen
      WHERE id = p_id;
      
      SELECT id, ligaFotoPerfil FROM Usuario
      WHERE id = p_id;
   END IF;
END //

-- ---------------------------------------------------------------------------------------------------
--                                         USUARIO PREFERENCIAS
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioAnadirDeseado`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioAnadirDeseado (
   IN p_idUsuario INT,
   IN p_idLugar VARCHAR(40)
)
BEGIN
   DECLARE usuarioExistente INT;
   DECLARE lugarExistente INT;
   
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_idUsuario;
   
   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE id = p_idLugar;
   
   IF usuarioExistente = 0 THEN
      SELECT 'usuario_no_existente' AS 'error';
   ELSE
      IF lugarExistente = 0 THEN
         SELECT 'lugar_no_existente' AS 'error';
      ELSE
         INSERT INTO LugarDeseado (idUsuario, idLugar, auditoria)
         VALUES (p_idUsuario, p_idLugar, NOW());
      
         SELECT 1 AS 'success';
      END IF;
   END IF;   
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`UsuarioAnadirFavorito`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioAnadirFavorito (
   IN p_idUsuario INT,
   IN p_idLugar VARCHAR(40)
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
      INSERT INTO LugarFavorito (idUsuario, idLugar, auditoria)
      VALUES (p_idUsuario, p_idLugar, NOW());
      
      SELECT 1 AS 'success';
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`usuario_anadir_categoria`
-- -----------------------------------------------------
CREATE PROCEDURE usuario_anadir_categoria (
   IN p_idUsuario INT,
   IN p_idCategoria VARCHAR(40)
)
BEGIN
   DECLARE usuarioExistente INT;
   DECLARE categoriaExistente INT;
   
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_idUsuario;
   
   SELECT COUNT(*) INTO categoriaExistente
   FROM Categoria
   WHERE id = p_idCategoria;
   
   IF usuarioExistente = 0 THEN
      SELECT 'usuario_no_existente' AS 'error';
   ELSE
      IF categoriaExistente = 0 THEN
         SELECT 'categoria_no_existente' AS 'error';
      ELSE
         INSERT INTO CategoriaFavorita (idUsuario, idCategoria, auditoria)
         VALUES (p_idUsuario, p_idCategoria, NOW());
      
         SELECT 1 AS 'success';
      END IF;
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
   
   -- Verifica si el usuario existe
   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE id = p_id;
   
   -- Si no existe, retorna un mensaje de error
   IF usuarioExistente = 0 THEN
      SELECT 'usuario_no_existente' AS 'error';
   ELSE
      -- Si existe, selecciona los lugares deseados junto con las categorías
      SELECT
         l.id AS id,
         l.nombre AS nombre,
         l.direccion AS direccion,
         l.descripcion AS descripcion,
         l.imagen AS imagen,
         l.attributions AS attributions,
         l.latitud AS latitud,
         l.longitud AS longitud,
         l.fotos AS fotos,
         l.tipos AS tipos,
         l.teléfono AS teléfono,
         l.precioNivel AS precioNivel,
         l.precioRango AS precioRango,
         l.rating AS rating,
         l.regularOpeningHours AS regularOpeningHours,
         l.userRatingCount AS userRatingCount,
         l.website AS website,
         l.goodForChildren AS goodForChildren,
         l.goodForGroups AS goodForGroups,
         l.paymentOptions AS paymentOptions,
         l.reservable AS reservable,
         l.servesVegetarianFood AS servesVegetarianFood,
         l.allowsDogs AS allowsDogs,
         l.reviewsGoogle AS reviewsGoogle,
         l.accesibilidadParking AS accesibilidadParking,
         l.accesibilidadEntrance AS accesibilidadEntrance,
         l.accesibilidadRestroom AS accesibilidadRestroom,
         l.accesibilidadSeating AS accesibilidadSeating,
         GROUP_CONCAT(DISTINCT c.nombre ORDER BY c.nombre ASC) AS categorias -- Agregar categorías concatenadas
      FROM LugarDeseado
      JOIN Lugar l ON LugarDeseado.idLugar = l.id
      JOIN LugarSubcategoria ls ON l.id = ls.idLugar
      JOIN Subcategoria s ON s.id = ls.idSubcategoria
      JOIN Categoria c ON c.id = s.idCategoria
      WHERE LugarDeseado.idUsuario = p_id
      GROUP BY 
         l.id, l.nombre, l.direccion, l.descripcion, l.imagen, 
         l.attributions, l.latitud, l.longitud, l.fotos, l.tipos, 
         l.teléfono, l.precioNivel, l.precioRango, l.rating, 
         l.regularOpeningHours, l.userRatingCount, l.website, 
         l.goodForChildren, l.goodForGroups, l.paymentOptions, 
         l.reservable, l.servesVegetarianFood, l.allowsDogs, 
         l.reviewsGoogle, l.accesibilidadParking, l.accesibilidadEntrance, 
         l.accesibilidadRestroom, l.accesibilidadSeating;
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
         l.id AS id,
         l.nombre AS nombre,
         l.direccion AS direccion,
         l.descripcion AS descripcion,
         l.imagen AS imagen,
         l.attributions AS attributions,
         l.latitud AS latitud,
         l.longitud AS longitud,
         l.fotos AS fotos,
         l.tipos AS tipos,
         l.teléfono AS teléfono,
         l.precioNivel AS precioNivel,
         l.precioRango AS precioRango,
         l.rating AS rating,
         l.regularOpeningHours AS regularOpeningHours,
         l.userRatingCount AS userRatingCount,
         l.website AS website,
         l.goodForChildren AS goodForChildren,
         l.goodForGroups AS goodForGroups,
         l.paymentOptions AS paymentOptions,
         l.reservable AS reservable,
         l.servesVegetarianFood AS servesVegetarianFood,
         l.allowsDogs AS allowsDogs,
         l.reviewsGoogle AS reviewsGoogle,
         l.accesibilidadParking AS accesibilidadParking,
         l.accesibilidadEntrance AS accesibilidadEntrance,
         l.accesibilidadRestroom AS accesibilidadRestroom,
         l.accesibilidadSeating AS accesibilidadSeating,
         GROUP_CONCAT(DISTINCT c.nombre ORDER BY c.nombre ASC) AS categorias -- Concatena las categorías asociadas
      FROM LugarFavorito
      JOIN Lugar l ON LugarFavorito.idLugar = l.id
      JOIN LugarSubcategoria ls ON l.id = ls.idLugar
      JOIN Subcategoria s ON s.id = ls.idSubcategoria
      JOIN Categoria c ON c.id = s.idCategoria
      WHERE LugarFavorito.idUsuario = p_id
      GROUP BY 
         l.id, l.nombre, l.direccion, l.descripcion, l.imagen, 
         l.attributions, l.latitud, l.longitud, l.fotos, l.tipos, 
         l.teléfono, l.precioNivel, l.precioRango, l.rating, 
         l.regularOpeningHours, l.userRatingCount, l.website, 
         l.goodForChildren, l.goodForGroups, l.paymentOptions, 
         l.reservable, l.servesVegetarianFood, l.allowsDogs, 
         l.reviewsGoogle, l.accesibilidadParking, l.accesibilidadEntrance, 
         l.accesibilidadRestroom, l.accesibilidadSeating;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`usuario_ver_vategorias`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioVerCategorias (
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
         c.id,
         c.nombre,
         c.imagen,
         GROUP_CONCAT(DISTINCT s.nombre ORDER BY s.nombre ASC) AS subcategorias
      FROM Categoria c
      JOIN Subcategoria s ON c.id = s.idCategoria
      JOIN CategoriaFavorita cf ON c.id = cf.idCategoria
      WHERE cf.idUsuario = p_id
      GROUP BY c.id, c.nombre, c.imagen;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`usuario_ver_vategorias`
-- -----------------------------------------------------
CREATE PROCEDURE usuario_categorias_all (
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
         c.id,
         c.nombre,
         c.imagen,
         GROUP_CONCAT(DISTINCT s.nombre ORDER BY s.nombre ASC) AS subcategorias,
         EXISTS (
            SELECT 1 
            FROM CategoriaFavorita cf
            WHERE cf.idUsuario = p_id AND cf.idCategoria = c.id
         ) AS esFavorita
      FROM Categoria c
      JOIN Subcategoria s ON c.id = s.idCategoria
      GROUP BY c.id, c.nombre, c.imagen;
   END IF;
END //

-- ---------------------------------------------------------------------------------------------------
--                                               LUGARES
-- ---------------------------------------------------------------------------------------------------

CREATE PROCEDURE getCategorias (
)
BEGIN
   SELECT 
      c.id,
      c.nombre,
      c.imagen,
      GROUP_CONCAT(DISTINCT s.nombre ORDER BY s.nombre ASC) AS subcategorias
   FROM Categoria c
   JOIN Subcategoria s ON c.id = s.idCategoria
   GROUP BY c.id, c.nombre, c.imagen;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`LugarRegistro`
-- -----------------------------------------------------
CREATE PROCEDURE LugarRegistro (
   IN p_id VARCHAR(40),
   IN p_nombre VARCHAR(128),
   IN p_direccion VARCHAR(255),
   IN p_descripcion VARCHAR(1024),
   IN p_imagen TEXT,
   IN p_attributions VARCHAR(150),
   IN p_latitud DOUBLE,
   IN p_longitud DOUBLE,
   IN p_fotos TEXT,
   IN p_tipos VARCHAR(1024),
   IN p_telefono VARCHAR(20),
   IN p_precioNivel TINYINT,
   IN p_precioRango VARCHAR(45),
   IN p_rating VARCHAR(10),
   IN p_regularOpeningHours TEXT,
   IN p_userRatingCount VARCHAR(45),
   IN p_website VARCHAR(128),
   IN p_goodForChildren BOOLEAN,
   IN p_goodForGroups BOOLEAN,
   IN p_paymentOptions TEXT, -- Cambiado de VARCHAR(10) a TEXT
   IN p_reservable BOOLEAN,
   IN p_servesVegetarianFood VARCHAR(10),
   IN p_allowsDogs VARCHAR(10),
   IN p_reviewsGoogle TEXT,
   IN p_accesibilidadParking BOOLEAN,
   IN p_accesibilidadEntrance BOOLEAN,
   IN p_accesibilidadRestroom BOOLEAN,
   IN p_accesibilidadSeating BOOLEAN
)
BEGIN
   DECLARE lugarExistente INT;

   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE nombre = p_nombre;
    
   IF lugarExistente = 0 THEN
      INSERT INTO Lugar (id, nombre, direccion, descripcion, imagen, attributions, latitud, longitud, fotos,
      tipos, teléfono, precioNivel, precioRango, rating, regularOpeningHours, userRatingCount, website,
      goodForChildren, goodForGroups, paymentOptions, reservable, servesVegetarianFood, allowsDogs, reviewsGoogle,
      accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, auditoria)
      VALUES (p_id, p_nombre, p_direccion, p_descripcion, p_imagen, p_attributions, p_latitud, p_longitud, p_fotos,
      p_tipos, p_telefono, p_precioNivel, p_precioRango, p_rating, p_regularOpeningHours, p_userRatingCount, p_website,
      p_goodForChildren, p_goodForGroups, p_paymentOptions, p_reservable, p_servesVegetarianFood, p_allowsDogs, p_reviewsGoogle,
      p_accesibilidadParking, p_accesibilidadEntrance, p_accesibilidadRestroom, p_accesibilidadSeating, NOW());
   ELSE
      SELECT 'lugar_ya_registrado' AS 'error';
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`getLugaresTodos`
-- -----------------------------------------------------
CREATE PROCEDURE getLugaresTodos (
)
BEGIN
   SELECT 
      l.id,
      l.nombre,
      l.direccion,
      l.descripcion,
      l.imagen,
      l.attributions,
      ROUND(l.rating) AS 'rating',
      l.teléfono AS 'teléfono',
      GROUP_CONCAT(DISTINCT c.nombre ORDER BY c.nombre ASC) AS categorias
   FROM Lugar l
   JOIN LugarSubcategoria ls ON l.id = ls.idLugar
   JOIN Subcategoria s ON s.id = ls.idSubcategoria
   JOIN Categoria c ON c.id = s.idCategoria
   GROUP BY l.id, l.nombre, l.direccion, l.descripcion, l.imagen, l.attributions;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`getLugaresCategoria4`
-- -----------------------------------------------------
CREATE PROCEDURE getLugaresCategoria4 (
   IN p_cat1 VARCHAR(40),
   IN p_cat2 VARCHAR(40),
   IN p_cat3 VARCHAR(40),
   IN p_cat4 VARCHAR(40)
)
BEGIN
   SELECT 
      l.id,
      l.nombre,
      l.direccion,
      l.descripcion,
      l.imagen,
      l.attributions,
      c.nombre AS categoria,
      GROUP_CONCAT(DISTINCT s.nombre ORDER BY s.nombre ASC) AS subcategorias
   FROM Lugar l
   JOIN LugarSubcategoria ls ON l.id = ls.idLugar
   JOIN Subcategoria s ON s.id = ls.idSubcategoria
   JOIN Categoria c ON c.id = s.idCategoria
   WHERE c.nombre = p_cat1 OR c.nombre = p_cat2 OR c.nombre = p_cat3 OR c.nombre = p_cat4
   GROUP BY l.id, l.nombre, l.direccion, l.descripcion, l.imagen, l.attributions, c.nombre;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`getLugaresCategoriaHomeUsuario`
-- -----------------------------------------------------
CREATE PROCEDURE getLugaresCategoriaHomeUsuario (
   IN p_id INT,
   IN p_cat1 VARCHAR(40),
   IN p_cat2 VARCHAR(40),
   IN p_cat3 VARCHAR(40),
   IN p_cat4 VARCHAR(40)
)
BEGIN
   SELECT 
      l.id,
      l.nombre,
      l.direccion,
      l.descripcion,
      l.imagen,
      l.attributions,
      c.nombre AS categoria,
      GROUP_CONCAT(DISTINCT s.nombre ORDER BY s.nombre ASC) AS subcategorias,
      EXISTS (
         SELECT 1 
         FROM LugarDeseado ld 
         WHERE ld.idUsuario = p_id AND ld.idLugar = l.id
      ) AS esDeseado,
      EXISTS (
         SELECT 1 
         FROM LugarFavorito lf 
         WHERE lf.idUsuario = p_id AND lf.idLugar = l.id
      ) AS esFavorito
   FROM Lugar l
   JOIN LugarSubcategoria ls ON l.id = ls.idLugar
   JOIN Subcategoria s ON s.id = ls.idSubcategoria
   JOIN Categoria c ON c.id = s.idCategoria
   WHERE c.nombre = p_cat1 OR c.nombre = p_cat2 OR c.nombre = p_cat3 OR c.nombre = p_cat4
   GROUP BY l.id, l.nombre, l.direccion, l.descripcion, l.imagen, l.attributions, c.nombre;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`LugarGetDatos`
-- -----------------------------------------------------
CREATE PROCEDURE LugarGetDatos (
   IN p_id VARCHAR(40)
)
BEGIN
   DECLARE lugarExistente INT;

   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE id = p_id;
    
   IF lugarExistente = 0 THEN
      SELECT 'lugar_no_registrado' AS 'ERROR';
   ELSE
      SELECT
         id,
         nombre,
         direccion,
         descripcion,
         imagen,
         attributions,
         latitud,
         longitud,
         fotos,
         tipos,
         teléfono,
         precioNivel,
         precioRango,
         rating,
         regularOpeningHours,
         userRatingCount,
         website,
         goodForChildren,
         goodForGroups,
         paymentOptions,
         reservable,
         servesVegetarianFood,
         allowsDogs,
         reviewsGoogle,
         accesibilidadParking,
         accesibilidadEntrance,
         accesibilidadRestroom,
         accesibilidadSeating
      FROM Lugar WHERE id = p_id;
   END IF;
END //


-- -----------------------------------------------------
-- Process `AppTurismo`.`RegistrarSubcategoria`
-- -----------------------------------------------------
CREATE PROCEDURE RegistrarSubcategoria (
   IN p_idLugar VARCHAR(40),
   IN p_idSubcategoria VARCHAR(40)
)
BEGIN
   DECLARE lugarExistente INT;
   DECLARE subcategoriaExistente INT;

   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE id = p_idLugar;
    
   IF lugarExistente = 0 THEN
      SELECT 'lugar_no_registrado' AS 'ERROR';
   END IF;
   
   SELECT COUNT(*) INTO subcategoriaExistente
   FROM Subcategoria
   WHERE id = p_idSubcategoria;
   
   -- Mensaje de error si la subcategoría no existe
   IF lugarExistente = 0 THEN
      SELECT 'lugar_no_registrado' AS 'ERROR';
   END IF;
   
   IF lugarExistente = 1 AND subcategoriaExistente = 1 THEN
      INSERT INTO LugarSubcategoria (idLugar, idSubcategoria)
      VALUES (p_idLugar, p_idSubcategoria);
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`LugarGetCategorias`
-- -----------------------------------------------------
CREATE PROCEDURE LugarGetCategorias (
   IN p_id VARCHAR(40)
)
BEGIN
   DECLARE lugarExistente INT;

   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE id = p_id;
    
   IF lugarExistente = 0 THEN
      SELECT 'lugar_no_registrado' AS 'error';
   ELSE
      SELECT
         c.nombre AS categoria,
         GROUP_CONCAT(DISTINCT s.nombre ORDER BY s.nombre ASC) AS subcategorias
      FROM Lugar l
      JOIN LugarSubcategoria ls ON l.id = ls.idLugar
      JOIN Subcategoria s ON s.id = ls.idSubcategoria
      JOIN Categoria c ON c.id = s.idCategoria
      WHERE ls.idLugar = p_id
      GROUP BY c.nombre;
   END IF;
END //
   
-- -----------------------------------------------------
-- Process `AppTurismo`.`LugarGetSubcategorias`
-- -----------------------------------------------------
CREATE PROCEDURE LugarGetSubcategorias (
   IN p_id VARCHAR(40)
)
BEGIN
   DECLARE lugarExistente INT;

   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE id = p_id;
    
   IF lugarExistente = 0 THEN
      SELECT 'lugar_no_registrado' AS 'error';
   ELSE
      SELECT s.nombre AS subcategoria, c.nombre AS categoria
      FROM LugarSubcategoria ls
      JOIN Subcategoria s ON s.id = ls.idSubcategoria
      JOIN Categoria c ON c.id = s.idCategoria
      WHERE ls.idLugar = p_id;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`RegistrarFoto`
-- -----------------------------------------------------
CREATE PROCEDURE RegistrarFoto (
   IN p_id VARCHAR(40),
   IN p_url VARCHAR(512)
)
BEGIN
   DECLARE lugarExistente INT;

   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE id = p_id;
    
   IF lugarExistente = 0 THEN
      SELECT 'lugar_no_registrado' AS 'error';
   ELSE
      INSERT INTO LugarFotos (idLugar, URL, auditoria)
      VALUES (p_id, p_url, NOW());
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`LugarGetFotos`
-- -----------------------------------------------------
CREATE PROCEDURE LugarGetFotos (
   IN p_id VARCHAR(40)
)
BEGIN
   DECLARE lugarExistente INT;

   SELECT COUNT(*) INTO lugarExistente
   FROM Lugar
   WHERE id = p_id;
    
   IF lugarExistente = 0 THEN
      SELECT 'lugar_no_registrado' AS 'error';
   ELSE
      SELECT URL FROM LugarFotos
      WHERE idLugar = p_id;
   END IF;
END //

-- -----------------------------------------------------
-- Process `AppTurismo`.`GetItinerarioGuardado`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioVerItinerariosConLugares (
    IN p_idUsuario INT
)
BEGIN
    DECLARE usuarioExistente INT;

    -- Verifica si el usuario existe
    SELECT COUNT(*) INTO usuarioExistente
    FROM Usuario
    WHERE id = p_idUsuario;

    -- Si el usuario no existe, devuelve un mensaje
    IF usuarioExistente = 0 THEN
        SELECT 'El usuario no existe' AS Mensaje;
    ELSE
        -- Si el usuario existe, devuelve los itinerarios y sus lugares
        SELECT 
            i.id AS idItinerario,
            i.fechaInicio,
            i.fechaFin,
            l.orden,
            l.horaLlegada,
            l.horaSalida,
            l.fecha,
            lu.nombre AS NombreLugar,
            lu.imagen AS Imagen,
            lu.direccion AS Direccion,
            lu.rating AS Calificacion,
            lu.teléfono AS Telefono,
            lu.tipos AS Tipos,
            lu.regularOpeningHours AS Horario
        FROM 
            itinerario i
        INNER JOIN 
            lugaritinerario l ON i.id = l.idItinerario
        INNER JOIN 
            lugar lu ON l.idLugar = lu.id 
        WHERE 
            i.idUsuario = p_idUsuario
        ORDER BY 
            i.id, l.orden;
    END IF;
END //


DELIMITER ;