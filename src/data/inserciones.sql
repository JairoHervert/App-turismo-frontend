CALL UsuarioRegistro('César Havit', 'CesarHavit@gmail.com', 12345);
CALL UsuarioRegistro('Jairo Hervert', 'JairoHervert@gmail.com', 12345);
CALL UsuarioRegistro('Brandon Segura', 'BrandonSegura@gmail.com', 12345);

CALL LugarRegistro('Palacio de Bellas Artes', '', 'Alameda central');
CALL LugarRegistro('Zócalo', '', 'Zócalo');
CALL LugarRegistro('Frikiplaza', '', 'Alcantarilla');
CALL LugarRegistro('Moshi Moshi', '', 'La esquina');

CALL UsuarioAñadirDeseado(1,1);
CALL UsuarioAñadirDeseado(1,2);

CALL UsuarioVerDeseados(1);

CALL UsuarioVerFavoritos(1);