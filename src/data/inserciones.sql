CALL UsuarioRegistro('César Havit', 'CesarHavit@gmail.com', 12345);
CALL UsuarioRegistro('Jairo Hervert', 'JairoHervert@gmail.com', 12345);
CALL UsuarioRegistro('Brandon Segura', 'BrandonSegura@gmail.com', 12345);
CALL UsuarioRegistro('Paola Reyes', 'PaolaReyes@gmail.com', 12345);

CALL UsuarioRegistro('Juan Luis', 'jlma-113@hotmail.com', '$2b$10$L6gRdyuAeFxFlwTT0NhZyOyrDSy4pm2F790MlEvalL0VBMtyMn8bm');
UPDATE Usuario SET confirmacion = 1 WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET ligaFotoPerfil = 'https://cdn2.steamgriddb.com/icon/5b915c0e379a039d9fe77cc124f6a4c4.ico' WHERE correo = 'jlma-113@hotmail.com';

CALL LugarRegistro(
'Álvaro Obregón',
'Descubre el encanto de Álvaro Obregón, donde la vida cultural y los sabores locales se fusionan. Pasea por plazas y callejones llenos de historia.',
'Álvaro Obregón',
'home-places-alvaro-obregon.jpg',
'2 hrs',
'Gratis',
0);

CALL LugarRegistro(
'Xochimilco',
'Sumérgete en la experiencia única de los canales de Xochimilco. Navega en trajineras y disfruta de la tradición y el folclore en un ambiente colorido.',
'Xochimilco',
'home-places-xochimilco.jpg',
'3 hrs',
'Gratis',
0);

CALL LugarRegistro(
'Pirámides de Teotihuacan',
'Vive la majestuosidad de las antiguas pirámides. Sube a la cima del Sol y la Luna para una vista impresionante de este sitio arqueológico.',
'Teotihuacan',
'home-places-piramides-teotihuacan.webp',
'4 hrs',
'200 MXN',
0);

CALL LugarRegistro(
'Coyoacán',
'Explora las calles empedradas y plazas vibrantes de Coyoacán, un rincón bohemio lleno de cafés, arte y el ambiente acogedor de la Ciudad de México.',
'Coyoacán',
'home-places-coyoacan.jpg',
'2:30 hrs',
'100 MXN',
0);

CALL UsuarioAñadirDeseado(1,1);
CALL UsuarioAñadirDeseado(1,2);
CALL UsuarioAñadirDeseado(1,3);

CALL UsuarioVerDeseados(1);

CALL UsuarioVerFavoritos(1);