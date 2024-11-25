CALL UsuarioRegistro('Juan Luis', 'jlma-113@hotmail.com', '$2b$10$L6gRdyuAeFxFlwTT0NhZyOyrDSy4pm2F790MlEvalL0VBMtyMn8bm');
UPDATE Usuario SET confirmacion = 1 WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET ligaFotoPerfil = 'https://cdn2.steamgriddb.com/icon/5b915c0e379a039d9fe77cc124f6a4c4.ico' WHERE correo = 'jlma-113@hotmail.com';

CALL LugarRegistro(
'1', 'Álvaro Obregón', 'Álvaro Obregón, CDMX, México',
'Descubre el encanto de Álvaro Obregón, donde la vida cultural y los sabores locales se fusionan. Pasea por plazas y callejones llenos de historia.',
'home-places-alvaro-obregon.jpg', 'Desconocido', '19.37340774814244', '-99.21884861930312',
'home-places-alvaro-obregon.jpg',
'natural', '5555555555', 0, '150.00-700.00', 3.5, '-',
13, '', 1, 1, '1,1,0,0', 1, 0, 1, 'Está muy buena',
1, 1, 0, 0
);

CALL LugarRegistro(
'2', 'Xochimilco', 'Xochimilco, CDMX, México',
'Sumérgete en la experiencia única de los canales de Xochimilco. Navega en trajineras y disfruta de la tradición y el folclore en un ambiente colorido.',
'home-places-xochimilco.jpg', 'Desconocido', '19.2504640464291', '-99.09038945203655',
'home-places-xochimilco.jpg',
'natural', '5555555555', 0, '20.00-200.00', 3.0, '-',
4, '', 1, 1, '1,1,0,0', 1, 0, 1, 'Interesante',
1, 1, 0, 0
);

CALL LugarRegistro(
'3', 'Pirámides de Teotihuacan', '55825 San Martín de las Pirámides, Méx.',
'Vive la majestuosidad de las antiguas pirámides. Sube a la cima del Sol y la Luna para una vista impresionante de este sitio arqueológico.',
'home-places-piramides-teotihuacan.webp', 'Desconocido', '19.690907647455766', '-98.84585465471893',
'home-places-piramides-teotihuacan.webp',
'natural', '+525535291214', 1, '95.00-150.00', 4.5, '-',
4, '', 1, 1, '1,1,0,0', 1, 0, 1, 'Cansado el viaje, pero bueno',
1, 0, 0, 1
);

CALL LugarRegistro(
'4', 'Coyoacán', 'Coyoacán, Méx.',
'El arbolado parque Jardín Centenario se encuentra en el centro del bohemio Coyoacán, conocido por sus calles adoquinadas y su arquitectura colonial. Intelectuales, artistas y hippies acuden en masa al Museo de Frida Kahlo y al Museo Casa de León Trotsky, así como a los estudios de chakras, las galerías de arte y los coloridos mercados artesanales. Los elegantes cafés al aire libre se encuentran uno al lado del otro con tranquilas heladerías junto a las calles arboladas.',
'home-places-coyoacan.jpg', 'Desconocido', '19.329262445888656', '-99.15088321933074',
'home-places-coyoacan.jpg',
'natural', '+525555555555', 0, '50.00-650.00', 4.2, '-',
4, '', 1, 1, '0,1,0,1', 1, 0, 1, 'Muy bonito',
0, 0, 1, 0
);

CALL LugarRegistro(
'5', 'ESCOM - Escuela Superior de Cómputo - IPN', 'ESCOM IPN, Unidad Profesional Adolfo López Mateos, Av. Juan de Dios Bátiz, Nueva Industrial Vallejo, Gustavo A. Madero, 07320 Ciudad de México, CDMX',
'La Escuela Superior de Cómputo es una Unidad Académica líder en la formación de profesionales integrales en las áreas de Sistemas Computacionales, Inteligencia Artificial y Ciencia de Datos, con amplio sentido social, contribuyendo al desarrollo tecnológico, científico y económico del país, coadyuvando a la sustentabilidad y observando estándares internacionales de calidad educativa.',
'https://lh3.googleusercontent.com/proxy/wjELjXCrO5rb8W6TTm4yNytWK6w2_6MUr6OUeBmVj6aq4Mv837i_D0ApSNN6mI99eDrFO7qo2wBNoPlHBfOCDUa2uvuzwLVGSViqOWwRkHKtLjDdgwgcdjFavcxL3p5sJ0JhKwP_0L9qWECbfA',
'Instituto Politécnico Nacional', '19.5050535344484', '-99.14632305476846',
'https://lh3.googleusercontent.com/proxy/wjELjXCrO5rb8W6TTm4yNytWK6w2_6MUr6OUeBmVj6aq4Mv837i_D0ApSNN6mI99eDrFO7qo2wBNoPlHBfOCDUa2uvuzwLVGSViqOWwRkHKtLjDdgwgcdjFavcxL3p5sJ0JhKwP_0L9qWECbfA',
'escuela', '+525557296000', 0, '00.00-100.00', 4.0, '7:00-22:00',
63, 'https://www.escom.ipn.mx/', 0, 0, '1,1,0,1', 0, 0, 0, 'Calidad',
1, 1, 1, 0
);

CALL LugarRegistro(
'6', 'ESFM - Escuela Superior de Física y Matemáticas - IPN', 'Avenida Instituto Politécnico Nacional s/n Edificio 9 Unidad Profesional “Adolfo López Mateos” Col. San Pedro Zacatenco Del, Nueva Industrial Vallejo, Gustavo A. Madero, 07700 Ciudad de México',
'La Escuela Superior de Física y Matemáticas del Instituto Politécnico Nacional fue creada para formar integralmente profesionales de excelencia en el campo de las ciencias físico-matemáticas con alto grado de comprensión y responsabilidad social, capaces de contribuir al desarrollo económico, científico y tecnológico del país; mediante la docencia, la investigación, la innovación, la vinculación y la divulgación del conocimiento en estas áreas.',
'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/ESFM.jpg/800px-ESFM.jpg',
'Instituto Politécnico Nacional', '19.50332835107614', '-99.13481641613505',
'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/ESFM.jpg/800px-ESFM.jpg',
'escuela', '+525557296000', 0, '00.00-250.00', 3.9, '8:00-21:00',
33, 'https://www.esfm.ipn.mx/', 0, 0, '1,1,0,1', 0, 0, 0, 'Difícil',
1, 0, 0, 0
);

CALL UsuarioAñadirDeseado(1,1);
CALL UsuarioAñadirDeseado(1,2);
CALL UsuarioAñadirDeseado(1,3);

CALL UsuarioAñadirFavorito(1,4);
CALL UsuarioAñadirFavorito(1,5);
CALL UsuarioAñadirFavorito(1,6);

CALL UsuarioVerDeseados(1);

CALL UsuarioVerFavoritos(1);