const fs = require('fs');
const path = require('path');

const { registrarLugar } = require('../models/MySQL/lugares-model');

const cargarLugares = async () => {
    const filePath = path.join(__dirname, 'lugaresRegistrados.json');
    let data = [];
    if (fs.existsSync(filePath)){
        data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(data.length);
    }
    else {
        console.error('Error: El archivo de lugares no existe');
        return;
    }
    
    for(const lugar of data) {
        try {
            await registrarLugar(lugar);
            console.log(`Lugar registrado exitosamente desde el JSON con ID: ${lugar.id}`);
        } catch (error) {
            console.error(`Error al registrar desde el JSON el lugar ${lugar.id}:`, error.message);
        }
    }
}

cargarLugares();