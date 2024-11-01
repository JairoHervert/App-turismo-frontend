CALL UsuarioRegistro('CesarHavit@gmail.com', 12345);
CALL UsuarioRegistro('JairoHervert@gmail.com', 12345);
CALL UsuarioRegistro('BrandonSegura@gmail.com', 12345);

CALL CrearLugar('Palacio de Bellas Artes', '', 'Alameda central');
CALL CrearLugar('Zócalo', '', 'Zócalo');
CALL CrearLugar('Frikiplaza', '', 'Alcantarilla');
CALL CrearLugar('Moshi Moshi', '', 'La esquina');

CALL AñadirLugarDeseado(1,1);
CALL AñadirLugarDeseado(1,2);

CALL UsuarioDeseados(1);