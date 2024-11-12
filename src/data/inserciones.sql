CALL UsuarioRegistro('César Havit', 'CesarHavit@gmail.com', 12345);
CALL UsuarioRegistro('Jairo Hervert', 'JairoHervert@gmail.com', 12345);
CALL UsuarioRegistro('Brandon Segura', 'BrandonSegura@gmail.com', 12345);
CALL UsuarioRegistro('Paola Reyes', 'PaolaReyes@gmail.com', 12345);
CALL UsuarioRegistro('Juan Luis', 'jlma-113@hotmail.com', '$2b$10$L6gRdyuAeFxFlwTT0NhZyOyrDSy4pm2F790MlEvalL0VBMtyMn8bm');
UPDATE Usuario SET confirmacion = 1 WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET ligaFotoPerfil = 'https://cdn2.steamgriddb.com/icon/5b915c0e379a039d9fe77cc124f6a4c4.ico' WHERE correo = 'jlma-113@hotmail.com';

CALL LugarRegistro('Palacio de Bellas Artes', 'desc', 'Alameda central');
CALL LugarRegistro('Zócalo', 'desc', 'Zócalo');
CALL LugarRegistro('Frikiplaza', 'desc', 'Alcantarilla');
CALL LugarRegistro('Moshi Moshi', 'desc', 'La esquina');

CALL UsuarioAñadirDeseado(1,1);
CALL UsuarioAñadirDeseado(1,2);

CALL UsuarioVerDeseados(1);

CALL UsuarioVerFavoritos(1);