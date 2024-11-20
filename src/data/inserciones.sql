CALL UsuarioRegistro('Juan Luis', 'jlma-113@hotmail.com', '$2b$10$L6gRdyuAeFxFlwTT0NhZyOyrDSy4pm2F790MlEvalL0VBMtyMn8bm');
UPDATE Usuario SET confirmacion = 1 WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET ligaFotoPerfil = 'https://cdn2.steamgriddb.com/icon/5b915c0e379a039d9fe77cc124f6a4c4.ico' WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET nombre = 'Juan Luis' WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET apellido = 'Molina Acuña' WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET fechaNacimiento = STR_TO_DATE('06/03/2001', '%d/%m/%Y')  WHERE correo = 'jlma-113@hotmail.com';

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

CALL LugarRegistro(
'Escuela Superior de Cómputo',
'La Escuela Superior de Cómputo es una Unidad Académica líder en la formación de profesionales integrales en las áreas de Sistemas Computacionales, Inteligencia Artificial y Ciencia de Datos, con amplio sentido social, contribuyendo al desarrollo tecnológico, científico y económico del país, coadyuvando a la sustentabilidad y observando estándares internacionales de calidad educativa.',
'Av. Juan de Dios Bátiz s/n casi esquina Miguel Othón de Mendizábal, Unidad Profesional "Adolfo López Mateos". Col. Lindavista, C.P. 07738, del. Gustavo A. Madero',
'https://lh3.googleusercontent.com/proxy/wjELjXCrO5rb8W6TTm4yNytWK6w2_6MUr6OUeBmVj6aq4Mv837i_D0ApSNN6mI99eDrFO7qo2wBNoPlHBfOCDUa2uvuzwLVGSViqOWwRkHKtLjDdgwgcdjFavcxL3p5sJ0JhKwP_0L9qWECbfA',
'7 hrs',
'Gratis',
1);

CALL LugarRegistro(
'Escuela Superior de Física y Matemáticas',
'La Escuela Superior de Física y Matemáticas del Instituto Politécnico Nacional fue creada para formar integralmente profesionales de excelencia en el campo de las ciencias físico-matemáticas con alto grado de comprensión y responsabilidad social, capaces de contribuir al desarrollo económico, científico y tecnológico del país; mediante la docencia, la investigación, la innovación, la vinculación y la divulgación del conocimiento en estas áreas.',
'Unidad Profesional "Adolfo López Mateos", Zacatenco, Edificio 9, Col. San Pedro Zacatenco, C.P. 07730 del. Gustavo A. Madero',
'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/ESFM.jpg/800px-ESFM.jpg',
'7 hrs',
'Gratis',
1);


CALL UsuarioAñadirDeseado(1,1);
CALL UsuarioAñadirDeseado(1,2);
CALL UsuarioAñadirDeseado(1,3);
CALL UsuarioAñadirDeseado(1,4);

CALL UsuarioAñadirFavorito(1,4);
CALL UsuarioAñadirFavorito(1,5);
CALL UsuarioAñadirFavorito(1,6);

CALL UsuarioVerDeseados(1);

CALL UsuarioVerFavoritos(1);