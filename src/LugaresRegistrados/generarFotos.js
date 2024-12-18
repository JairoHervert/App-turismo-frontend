const fs = require('fs');
const path = require('path');
const axios = require('axios');

const generarFotos = async () => {

    const API_KEY = "AIzaSyAhmFmJZs2h4lfmCt_CwW6UURoPvAB01ic";
    const filePath = path.join(__dirname, 'lugaresRegistrados.json');
    let data = [];
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`Lugares cargados: ${data.length}`);
    } else {
        console.error('Error: El archivo de lugares no existe');
        return;
    }

    const fotosFilePath = path.join(__dirname, 'fotosRegistradas.json');
    let fotosRegistradas = [];
    if (fs.existsSync(fotosFilePath)) {
        fotosRegistradas = JSON.parse(fs.readFileSync(fotosFilePath, 'utf-8'));
        console.log(`Fotos previamente registradas: ${fotosRegistradas.length}`);
    }

    const fotosDir = path.join(__dirname, 'fotos');
    if (!fs.existsSync(fotosDir)) {
        fs.mkdirSync(fotosDir);
    }

    const numFotosPorLugar = 1;

    for (const lugar of data) {
        let fotosGuardadas = 0;
        if(!lugar.photos) continue;
        for (const foto of lugar.photos) {
            if (fotosGuardadas >= numFotosPorLugar) break;
            
            const existeFoto = fotosRegistradas.some((item) => item.idLugar === lugar.id && item.name === foto.name);
            if (!existeFoto) {
                const url = `https://places.googleapis.com/v1/${foto.name}/media?key=${API_KEY}&maxWidthPx=600`;
                console.log(`Descargando foto: ${url}`);
                try {
                    const response = await axios.get(url, { responseType: 'stream' });

                    const fileName = `${lugar.id}-${fotosGuardadas}.jpg`;
                    const filePath = path.join(fotosDir, fileName);

                    await new Promise((resolve, reject) => {
                        const writeStream = response.data.pipe(fs.createWriteStream(filePath));
                        writeStream.on('finish', resolve);
                        writeStream.on('error', reject);
                    });

                    fotosRegistradas.push({ name: foto.name, idLugar: lugar.id , fileName });
                    console.log(`Foto guardada: ${fileName} para el lugar con ID: ${lugar.id}`);
                } catch (error) {
                    console.error(`Error al guardar la foto para el lugar con ID ${lugar.id}:`, error.message);
                }
            }
            fotosGuardadas++;
        }
    }

    try {
        fs.writeFileSync(fotosFilePath, JSON.stringify(fotosRegistradas, null, 2), 'utf8');
        console.log('Fotos registradas actualizadas en fotosRegistradas.json');
    } catch (error) {
        console.error('Error al actualizar fotosRegistradas.json:', error.message);
    }
};

generarFotos();
