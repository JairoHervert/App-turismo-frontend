const fs = require('fs');
const path = require('path');

const { registrarFoto, registrarFotoPrincipal } = require('../models/MySQL/lugares-model');

const cargarFotos = async () => {
    const filePath = path.join(__dirname, 'fotosRegistradas.json');
    let data = [];
    if (fs.existsSync(filePath)){
        data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(data.length);
    }
    else {
        console.error('Error: El archivo de fotos no existe');
        return;
    }

    for(const foto of data) {
        try {
            // Si el filename de la foto termina con 0, se registra como foto principal y se agrega a la base de datos
            const esPrincipal = foto.fileName.endsWith('0.jpg');
            if (esPrincipal) {
                await registrarFotoPrincipal(foto.idLugar, foto.fileName);
                console.log(`Foto principal registrada exitosamente desde el JSON con ID: ${foto.idLugar}`);
            }

            // Registrar la foto en la base de datos
            await registrarFoto(foto.idLugar, foto.fileName);
            console.log(`Foto registrada exitosamente desde el JSON con ID: ${foto.idLugar}`);
        } catch (error) {
            console.error(`Error al registrar desde el JSON la foto ${foto.fileName} para el lugar ${foto.idLugar}:`, error.message);
        }
    }
}

cargarFotos();