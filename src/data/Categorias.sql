USE appturismo;

DROP PROCEDURE IF EXISTS `CargarCategorias`;
DELIMITER //

CREATE PROCEDURE CargarCategorias()
BEGIN
    -- Insertar Categorías
    INSERT INTO `categoria` (`nombre`) VALUES 
    ('Salud y Bienestar'), 
    ('Deportes'),
    ('Comida Rápida'),
    ('Restaurante'),
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
    
END //

DELIMITER ;

call CargarCategorias();
