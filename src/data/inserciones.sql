CALL UsuarioRegistro('Juan Molina', 'jlma-113@hotmail.com', '$2b$10$L6gRdyuAeFxFlwTT0NhZyOyrDSy4pm2F790MlEvalL0VBMtyMn8bm');
UPDATE Usuario SET confirmacion = 1 WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET nombre = 'Juan' WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET apellido = 'Molina' WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET fechaNacimiento = STR_TO_DATE('01/01/2004', '%d/%m/%Y'); 
UPDATE Usuario SET ligaFotoPerfil = 'https://cdn2.steamgriddb.com/icon/5b915c0e379a039d9fe77cc124f6a4c4.ico' WHERE correo = 'jlma-113@hotmail.com';
CALL usuario_anadir_categoria(1, 1);
CALL usuario_anadir_categoria(1, 14);

INSERT INTO Itinerario (idUsuario, fechainicio, fechafin)
VALUES (1,'2024-12-02','2024-12-04');

INSERT INTO LugarItinerario (idItinerario, idLugar, orden, horaLlegada, horaSalida, fecha, auditoria) 
VALUES
(1, 'ChIJ0TgTPyv50YUR-iqvuuniMvI', 1, '10:00:00', '12:00:00', '2024-12-02', NOW()),
(1, 'ChIJ_Snp5Qr90YURsaIE_iQE8oU', 2, '12:00:00', '14:00:00', '2024-12-02', NOW()),
(1, 'ChIJ_xP1t6v40YURJmwqWm3owew', 3, '14:00:00', '16:00:00', '2024-12-02', NOW()),
(1, 'ChIJQWGH_U__0YURun-Y31zgPjI', 4, '16:00:00', '18:00:00', '2024-12-02', NOW()),
(1, 'ChIJY29w0Un_0YUR7pw57OVcNuo', 5, '13:30:00', '14:30:00', '2024-12-04', NOW()),
(1, 'ChIJs0hTSxsC0oURjhhkDYbOtZE', 6, '14:30:00', '16:30:00', '2024-12-04', NOW());

SELECT * FROM LugarItinerario WHERE idItinerario = 1 ORDER BY orden ASC;