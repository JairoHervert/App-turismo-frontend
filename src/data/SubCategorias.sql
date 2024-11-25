USE appturismo;
DROP PROCEDURE IF EXISTS `CargarSubcategorias`;

DELIMITER //

CREATE PROCEDURE CargarSubcategorias()
BEGIN
    -- Salud y Bienestar
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('sauna', (SELECT idCategoria FROM categoria WHERE nombre = 'Salud y Bienestar')),
    ('spa', (SELECT idCategoria FROM categoria WHERE nombre = 'Salud y Bienestar')),
    ('tanning_studio', (SELECT idCategoria FROM categoria WHERE nombre = 'Salud y Bienestar')),
    ('yoga_studio', (SELECT idCategoria FROM categoria WHERE nombre = 'Salud y Bienestar')),
    ('nail_salon', (SELECT idCategoria FROM categoria WHERE nombre = 'Salud y Bienestar'));

    -- Deportes
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('arena', (SELECT idCategoria FROM categoria WHERE nombre = 'Deportes')),
    ('athletic_field', (SELECT idCategoria FROM categoria WHERE nombre = 'Deportes')),
    ('golf_course', (SELECT idCategoria FROM categoria WHERE nombre = 'Deportes')),
    ('ice_skating_rink', (SELECT idCategoria FROM categoria WHERE nombre = 'Deportes')),
    ('playground', (SELECT idCategoria FROM categoria WHERE nombre = 'Deportes')),
    ('sports_activity_location', (SELECT idCategoria FROM categoria WHERE nombre = 'Deportes')),
    ('sports_club', (SELECT idCategoria FROM categoria WHERE nombre = 'Deportes')),
    ('swimming_pool', (SELECT idCategoria FROM categoria WHERE nombre = 'Deportes'));

    -- Comida Rápida
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('bagel_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Comida Rápida')),
    ('acai_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Comida Rápida')),
    ('bakery', (SELECT idCategoria FROM categoria WHERE nombre = 'Comida Rápida')),
    ('fast_food_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Comida Rápida')),
    ('ice_cream_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Comida Rápida'));

    -- Cafetería
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('cafe', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('cafeteria', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('cat_cafe', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('chocolate_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('coffee_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('confectionery', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('dessert_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('dessert_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('diner', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('dog_cafe', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('donut_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('fine_dining_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('food_court', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('juice_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('meal_takeaway', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('sandwich_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('steak_house', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería')),
    ('tea_house', (SELECT idCategoria FROM categoria WHERE nombre = 'Cafetería'));

    -- Restaurantes
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('afghani_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('african_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('american_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('asian_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('barbecue_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('brazilian_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('breakfast_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('brunch_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('buffet_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('chinese_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('french_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('greek_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('hamburger_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('indian_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('indonesian_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('italian_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('japanese_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('korean_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('lebanese_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('mediterranean_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('mexican_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('middle_eastern_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('pizza_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('ramen_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('seafood_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('spanish_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('sushi_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('thai_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('turkish_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('vegan_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('vegetarian_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante')),
    ('vietnamese_restaurant', (SELECT idCategoria FROM categoria WHERE nombre = 'Restaurante'));

    -- Bar
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('wine_bar', (SELECT idCategoria FROM categoria WHERE nombre = 'Bar')),
    ('bar', (SELECT idCategoria FROM categoria WHERE nombre = 'Bar')),
    ('night_club', (SELECT idCategoria FROM categoria WHERE nombre = 'Bar')),
    ('karaoke', (SELECT idCategoria FROM categoria WHERE nombre = 'Bar')),
    ('dance_hall', (SELECT idCategoria FROM categoria WHERE nombre = 'Bar')),
    ('comedy_club', (SELECT idCategoria FROM categoria WHERE nombre = 'Bar')),
    ('bar_and_grill', (SELECT idCategoria FROM categoria WHERE nombre = 'Bar'));

    -- Arte
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('art_gallery', (SELECT idCategoria FROM categoria WHERE nombre = 'Arte')),
    ('art_studio', (SELECT idCategoria FROM categoria WHERE nombre = 'Arte')),
    ('auditorium', (SELECT idCategoria FROM categoria WHERE nombre = 'Arte')),
    ('cultural_landmark', (SELECT idCategoria FROM categoria WHERE nombre = 'Arte')),
    ('performing_arts_theater', (SELECT idCategoria FROM categoria WHERE nombre = 'Arte')),
    ('sculpture', (SELECT idCategoria FROM categoria WHERE nombre = 'Arte')),
    ('body_art_service', (SELECT idCategoria FROM categoria WHERE nombre = 'Arte'));

    -- Historia
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('historical_place', (SELECT idCategoria FROM categoria WHERE nombre = 'Historia')),
    ('monument', (SELECT idCategoria FROM categoria WHERE nombre = 'Historia')),
    ('historical_landmark', (SELECT idCategoria FROM categoria WHERE nombre = 'Historia'));

    -- Museos
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('museum', (SELECT idCategoria FROM categoria WHERE nombre = 'Museos'));

    -- Educativos
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('library', (SELECT idCategoria FROM categoria WHERE nombre = 'Educativos')),
    ('planetarium', (SELECT idCategoria FROM categoria WHERE nombre = 'Educativos')),
    ('aquarium', (SELECT idCategoria FROM categoria WHERE nombre = 'Educativos'));

    -- Compras
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('store', (SELECT idCategoria FROM categoria WHERE nombre = 'Compras')),
    ('shoe_store', (SELECT idCategoria FROM categoria WHERE nombre = 'Compras')),
    ('shopping_mall', (SELECT idCategoria FROM categoria WHERE nombre = 'Compras')),
    ('market', (SELECT idCategoria FROM categoria WHERE nombre = 'Compras')),
    ('book_store', (SELECT idCategoria FROM categoria WHERE nombre = 'Compras')),
    ('gift_shop', (SELECT idCategoria FROM categoria WHERE nombre = 'Compras'));

    -- Parques
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('park', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('state_park', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('national_park', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('botanical_garden', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('garden', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('wildlife_park', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('wildlife_refuge', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('dog_park', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('picnic_ground', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('barbecue_area', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('marina', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('children''s_camp', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques')),
    ('hiking_area', (SELECT idCategoria FROM categoria WHERE nombre = 'Parques'));

    -- Juegos Recreativos al Aire Libre
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('amusement_park', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
    ('amusement_center', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
    ('water_park', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
    ('roller_coaster', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
    ('ferris_wheel', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
    ('skateboard_park', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
    ('off_roading_area', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
    ('adventure_sports_center', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre')),
    ('cycling_park', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos al Aire Libre'));

    -- Juegos Recreativos Bajo Techo
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('video_arcade', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos Bajo Techo')),
    ('bowling_alley', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos Bajo Techo')),
    ('hiking_area', (SELECT idCategoria FROM categoria WHERE nombre = 'Juegos Recreativos Bajo Techo'));

    -- Zoológicos
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('zoo', (SELECT idCategoria FROM categoria WHERE nombre = 'Zoológicos'));

    -- Religión
    INSERT INTO `subcategoria` (`nombre`, `categoria_idCategoria`) VALUES
    ('place_of_worship', (SELECT idCategoria FROM categoria WHERE nombre = 'Religión')),
    ('church', (SELECT idCategoria FROM categoria WHERE nombre = 'Religión'));
    
END //

DELIMITER ;

-- Llamar al procedimiento para cargar las subcategorías
CALL CargarSubcategorias();
