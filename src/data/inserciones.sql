CALL UsuarioRegistro('Juan Molina', 'jlma-113@hotmail.com', '$2b$10$L6gRdyuAeFxFlwTT0NhZyOyrDSy4pm2F790MlEvalL0VBMtyMn8bm');
UPDATE Usuario SET confirmacion = 1 WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET nombre = 'Juan' WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET apellido = 'Molina' WHERE correo = 'jlma-113@hotmail.com';
UPDATE Usuario SET fechaNacimiento = STR_TO_DATE('01/01/2004', '%d/%m/%Y'); 
UPDATE Usuario SET ligaFotoPerfil = 'https://cdn2.steamgriddb.com/icon/5b915c0e379a039d9fe77cc124f6a4c4.ico' WHERE correo = 'jlma-113@hotmail.com';
CALL usuario_anadir_categoria(1, 1);
CALL usuario_anadir_categoria(1, 14);