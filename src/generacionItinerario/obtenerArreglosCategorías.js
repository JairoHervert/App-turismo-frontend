const dayjs = require('dayjs');
const dayjs_es = require('dayjs/locale/es');

const {obtenerCategoriasFavoritas, obtenerLugaresCategoriaRestricciones, obtenerLugaresDeseados, obtenerLugaresRestricciones, obtenerTodosLugares} = require('../models/MySQL/itinerario-model');
const es = require('dayjs/locale/es');

const obtenerCategoriasFavoritass = async (idUsuario) => {
    try {
        const categoriasFavoritas = await obtenerCategoriasFavoritas(idUsuario);
        // Obtener un arreglo con solo el id de las categorías favoritas
        const nombreCategoriasFavoritas = categoriasFavoritas.map(categoria => categoria.idCategoria);
        return nombreCategoriasFavoritas;
    } catch (error) {
        console.error('Error obtenerCategoriasFavoritas:', error);
        return null;
    }
}

// Hacer una llamada a la base para obtener cada categoria favorita con el filtro de restricciones del usuario

const obtenerLugaresCategoria = async (idCategoria, esActividad, impedimentoFisico, familiar, vegetarianFriendly, petFriendly) => {
    try {
        const lugares = await obtenerLugaresCategoriaRestricciones(idCategoria, esActividad, impedimentoFisico, familiar, vegetarianFriendly, petFriendly);
        return lugares;
    } catch (error) {
        console.error('Error obtenerLugaresCategoria:', error);
        return null;
    }
}

// Devuelve un arreglo de objetos con la categoria y sus lugares filtrados

const obtenerArregloCategorias = async (idUsuario, esActividad, restricciones) => {
    // Obtener las categorías favoritas del usuario
    const categoriasFavoritas = await obtenerCategoriasFavoritass(idUsuario);
    // Crear un arreglo de objetos con las categorías favoritas y sus lugares filtrados
    const arregloCategorias = [];
    for (const categoria of categoriasFavoritas) {
        const lugares = await obtenerLugaresCategoria(categoria, esActividad, restricciones.impedimentoFisico, restricciones.familiar, restricciones.vegetarianFriendly, restricciones.petFriendly);
        if(lugares.length > 0)
            arregloCategorias.push({categoria, lugares});
    }
    return arregloCategorias;
}

const obtenerLugaresDeseadoss = async (idUsuario) => {
    try {
        const lugaresDeseados = await obtenerLugaresDeseados(idUsuario);
        return lugaresDeseados;
    } catch (error) {
        console.error('Error obtenerLugaresDeseados:', error);
        return null;
    }
}

const obtenerLugaresRestriccioness = async (esActividad, restricciones) => {
    try {
        const lugaresRestricciones = await obtenerLugaresRestricciones(esActividad, restricciones.impedimentoFisico, restricciones.familiar, restricciones.vegetarianFriendly, restricciones.petFriendly);
        return lugaresRestricciones;
    } catch (error) {
        console.error('Error obtenerLugaresRestricciones:', error);
        return null;
    }
}

const obtenerTodosLugaress = async (esActividad) => {
    try {
        const todosLugares = await obtenerTodosLugares(esActividad);
        return todosLugares;
    } catch (error) {
        console.error('Error obtenerTodosLugares:', error);
        return null;
    }
}


// Aplicar el algoritmo para la selección de lugares aleatorios e ir agregando los lugares

const distanciaLugares = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
}

const seleccionarLugaresPorDistancia = async (idUsuario, restricciones, gradoAleatoriedad, presupuesto, horaInicio, horaFin, fechaInicio, fechaFin) => {
    const probabilidadAleatoria = gradoAleatoriedad / 100;
    // Calcular el número de días del viaje y el que dia de la semana es la fecha de inicio (0-6)
    const dias = dayjs(fechaFin).diff(dayjs(fechaInicio), 'day') + 1;
    const diaSemanaInicio = dayjs(fechaInicio).day();
    const arregloCategorias = await obtenerArregloCategorias(idUsuario, false, restricciones); // Recibir como parámetro en el futuro
    const lugaresDeseados = await obtenerLugaresDeseadoss(idUsuario);
    const lugaresRestricciones = await obtenerLugaresRestriccioness(false, restricciones);
    const todosLugares = await obtenerTodosLugaress(false);
    const numActividades = Math.floor(dias * 5);
    const numCategorias = arregloCategorias.length;
    let numTotalLugaresCategorias = 0;

    const distRef = 0.18179334784903947;
    
    for (const categoria of arregloCategorias) {
        numTotalLugaresCategorias += categoria.lugares.length;
    }

    // Set para guardar el id de los lugares seleccionados y evitar repetir lugares
    const lugaresSeleccionados = new Set();

    // Ser para guardar el id de los lugares deseados
    const lugaresDeseadosSet = new Set();
    for (const lugar of lugaresDeseados) {
        lugaresDeseadosSet.add(lugar.idLugar);
    }

    let hayCategorias = false;
    if(numTotalLugaresCategorias > 0)
        hayCategorias = true;


    // Arreglo para guardar los lugares seleccionados, tiene un objeto con la fecha del dia y sus lugares, por ejemplo: [{fecha: '2024-12-16', lugares: [lugar1, lugar2, lugar3]}]
    const lugaresItinerario = [];
    let indexCategoria = 0;
    let longitudActual = 0;
    let latitudActual = 0;

    if(hayCategorias){
        // Elegir un numero aleatorio inicial, dentro de las categorías favoritas y un lugar aleatorio inicial
        indexCategoria = Math.floor(Math.random() * arregloCategorias.length);
        let indexLugarInicial = Math.floor(Math.random() * arregloCategorias[indexCategoria].lugares.length);
        let lugarInicial = arregloCategorias[indexCategoria].lugares[indexLugarInicial];
        longitudActual = lugarInicial.longitud;
        latitudActual = lugarInicial.latitud;
        lugaresSeleccionados.add(lugarInicial.id);
        // Crear un objeto con la fecha de inicio y el lugar inicial
        lugaresItinerario.push({fecha: fechaInicio, lugares: [lugarInicial]});
    }
    else{
        // Elegir un lugar aleatorio inicial de lugaresRestricciones
        let indexLugarInicial = Math.floor(Math.random() * lugaresRestricciones.length);
        let lugarInicial = lugaresRestricciones[indexLugarInicial];
        longitudActual = lugarInicial.longitud;
        latitudActual = lugarInicial.latitud;
        lugaresSeleccionados.add(lugarInicial.id);
        // Crear un objeto con la fecha de inicio y el lugar inicial
        lugaresItinerario.push({fecha: fechaInicio, lugares: [lugarInicial]});
    }

    // Cada dia cuenta con el siguiente orden: 3 actividades, 1 comida, 2 actividades, 1 cena
    // Se va a iterar por cada día del viaje

    for (let i = 0; i < dias; i++) {
        if(i !== 0){
            lugaresItinerario.push({fecha: dayjs(fechaInicio).add(i, 'day').format('YYYY-MM-DD'), lugares: []});
        }
        let indiceDia = i === 0 ? 1 : 0;
        for(; indiceDia < 3; indiceDia++) {

            // Se define un score basado en la distancia y si está en la lista de deseados
            // score = a*esDeseado + b*(distRef^2-dist^2) + c*esCategoria + d*esRestriccion
            // donde a = 1, b = abs(2/(distRef^2-distMin^2)), c = 1.5, d = 1.5
            // distMin se define como la distancia mínima entre el lugar actual y (los lugares de la categoría y los lugares deseados)

            let categoria = null;
            let distanciaMinima = Infinity;

            if(hayCategorias){
                // Seleccionar una categoría aleatoria basada en la probabilidad aleatoria y el indice actual
                const probabilidad = Math.random();
                if (probabilidad > probabilidadAleatoria) {
                    indexCategoria = Math.floor(indexCategoria + Math.random()*numCategorias) % numCategorias;
                }
                categoria = arregloCategorias[indexCategoria];
    
                // Obtener la distancia mínima entre el lugar actual y los lugares de la categoría
                distanciaMinima = Infinity;
    
                for (const lugar of categoria.lugares) {
                    if (lugaresSeleccionados.has(lugar.id)) {
                        continue;
                    }
                    const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                    if (distancia < distanciaMinima) {
                        distanciaMinima = distancia;
                    }
                }
            }
            
            // Obtener la distancia mínima entre el lugar actual y los lugares de las restricciones

            for (const lugar of lugaresRestricciones) {
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }
                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                if (distancia < distanciaMinima) {
                    distanciaMinima = distancia;
                }
            }

            if(distanciaMinima === Infinity){
                // Obtener la distancia mínima entre el lugar actual y todos los lugares

                for (const lugar of todosLugares) {
                    if (lugaresSeleccionados.has(lugar.id)) {
                        continue;
                    }
                    const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                    if (distancia < distanciaMinima) {
                        distanciaMinima = distancia;
                    }
                }
            }

            let a = 1;
            let b = Math.abs(2 / (Math.pow(distRef, 2) - Math.pow(distanciaMinima, 2)));
            let c = 0.5;
            let d = 1;

            // Seleccionar el lugar con el score más alto
            let scoreMaximo = -Infinity;
            let idLugarSeleccionado = "";
            let longitudSiguiente = 0;
            let latitudSiguiente = 0;

            if(hayCategorias){
                for (const lugar of categoria.lugares) {
                    if (lugaresSeleccionados.has(lugar.id)) {
                        continue;
                    }
                    const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                    const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + c + d;
                    if (score > scoreMaximo) {
                        scoreMaximo = score;
                        idLugarSeleccionado = lugar.id;
                        longitudSiguiente = lugar.longitud;
                        latitudSiguiente = lugar.latitud;
                    }
                }
            }

            for (const lugar of lugaresRestricciones) {
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }
                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + d;
                if (score > scoreMaximo) {
                    scoreMaximo = score;
                    idLugarSeleccionado = lugar.id;
                    longitudSiguiente = lugar.longitud;
                    latitudSiguiente = lugar.latitud;
                }
            }
                
            for (const lugar of todosLugares) {
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }
                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2));
                if (score > scoreMaximo) {
                    scoreMaximo = score;
                    idLugarSeleccionado = lugar.id;
                    longitudSiguiente = lugar.longitud;
                    latitudSiguiente = lugar.latitud;
                }
            }
            
            if(idLugarSeleccionado === "") {
                // No se pudo crear el itinerario
                console.log("No se pudo crear el itinerario");
                return;
            }
            
            // Agregar el lugar seleccionado al itinerario
            lugaresSeleccionados.add(idLugarSeleccionado);
            lugaresItinerario[i].lugares.push(todosLugares.find(lugar => lugar.id === idLugarSeleccionado));

            // Actualizar la ubicación actual
            longitudActual = longitudSiguiente;
            latitudActual = latitudSiguiente;
        }

        // Seleccionar una comida



    }

    console.log(lugaresItinerario);
    for (const dia of lugaresItinerario) {
        console.log(dia.fecha);
        for (const lugar of dia.lugares) {
            console.log(lugar.nombre);
        }
    }

}



// obtenerArregloCategorias(1, false, {impedimentoFisico: true, familiar: true, vegetarianFriendly: true, petFriendly: true});

// FALTA AGREGAR FECHA DE INICIO Y FIN
// seleccionarLugaresPorDistancia(1, {impedimentoFisico: false, familiar: false, vegetarianFriendly: false, petFriendly: false}, 50, 100, 1, "09:00", "18:00");
seleccionarLugaresPorDistancia(1, {impedimentoFisico: false, familiar: false, vegetarianFriendly: false, petFriendly: false}, 50, 100, "09:00", "18:00", "2024-12-16", "2024-12-19");