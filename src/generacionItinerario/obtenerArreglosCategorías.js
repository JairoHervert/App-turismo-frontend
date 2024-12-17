const dayjs = require('dayjs');
const dayjs_es = require('dayjs/locale/es');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

dayjs.locale(dayjs_es);

const {obtenerCategoriasFavoritas, obtenerLugaresCategoriaRestricciones, obtenerLugaresDeseados, obtenerLugaresRestricciones, obtenerTodosLugares} = require('../models/MySQL/itinerario-model');
// const es = require('dayjs/locale/es');

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

const obtenerLugaresCategoria = async (idCategoria, esActividad, nivelPresupuesto, impedimentoFisico, familiar, vegetarianFriendly, petFriendly, goodForGroups) => {
    try {
        const lugares = await obtenerLugaresCategoriaRestricciones(idCategoria, esActividad, nivelPresupuesto, impedimentoFisico, familiar, vegetarianFriendly, petFriendly, goodForGroups);
        return lugares;
    } catch (error) {
        console.error('Error obtenerLugaresCategoria:', error);
        return null;
    }
}

// Devuelve un arreglo de objetos con la categoria y sus lugares filtrados

const obtenerArregloCategorias = async (idUsuario, esActividad, nivelPresupuesto, restricciones) => {
    // Obtener las categorías favoritas del usuario
    const categoriasFavoritas = await obtenerCategoriasFavoritass(idUsuario);
    // Crear un arreglo de objetos con las categorías favoritas y sus lugares filtrados
    const arregloCategorias = [];
    for (const categoria of categoriasFavoritas) {
        const lugares = await obtenerLugaresCategoria(categoria, esActividad, nivelPresupuesto, restricciones.impedimentoFisico, restricciones.familiar, restricciones.vegetarianFriendly, restricciones.petFriendly, restricciones.goodForGroups);
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

const obtenerLugaresRestriccioness = async (esActividad, nivelPresupuesto, restricciones) => {
    try {
        const lugaresRestricciones = await obtenerLugaresRestricciones(esActividad, nivelPresupuesto, restricciones.impedimentoFisico, restricciones.familiar, restricciones.vegetarianFriendly, restricciones.petFriendly, restricciones.goodForGroups);
        return lugaresRestricciones;
    } catch (error) {
        console.error('Error obtenerLugaresRestricciones:', error);
        return null;
    }
}

const obtenerTodosLugaress = async (esActividad, nivelPresupuesto) => {
    try {
        const todosLugares = await obtenerTodosLugares(esActividad, nivelPresupuesto);
        return todosLugares;
    } catch (error) {
        console.error('Error obtenerTodosLugares:', error);
        return null;
    }
}

const distanciaLugares = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
}

const lugarAbierto = (horaInicio, horaFin, horarioInicio, horarioFin) =>{
    // Convertir el horario de apertura y cierre a un objeto dayjs para poder comparar
    const horarioInicioObj = dayjs(horarioInicio, 'HH:mm', true);
    const horarioFinObj = dayjs(horarioFin, 'HH:mm', true);
    const horaInicioObj = dayjs(horaInicio, 'HH:mm', true);
    const horaFinObj = dayjs(horaFin, 'HH:mm', true);

    // Verificar si el lugar cierra a la madrugada
    if(horarioInicioObj.isAfter(horarioFinObj)){
        const caso1 = (horaInicioObj.isAfter(horarioInicioObj) || horaInicioObj.isSame(horarioInicioObj)) && (horaFinObj.isBefore(horarioFinObj) || horaFinObj.isSame(horarioFinObj));
        const caso2 = (horaInicioObj.isAfter(horarioInicioObj) || horaInicioObj.isSame(horarioInicioObj)) && (horaFinObj.isAfter(horarioInicioObj) || horaFinObj.isSame(horarioInicioObj));
        const caso3 = (horaFinObj.isBefore(horarioFinObj) || horaFinObj.isSame(horarioFinObj)) && (horaInicioObj.isBefore(horarioFinObj) || horaInicioObj.isSame(horarioFinObj));
        if(caso1 || caso2 || caso3){
            return true;
        }
    }
    else{
        if((horaInicioObj.isAfter(horarioInicioObj) || horaInicioObj.isSame(horarioInicioObj)) && (horaFinObj.isBefore(horarioFinObj) || horaFinObj.isSame(horarioFinObj))){
            return true;
        }
    }
}

const formatoDiaHorario = (dia, horario) => {
    let horarioDia = null;
    try {
        horarioDia = horario[dia];
    }
    catch (error) {
        if(horario === undefined)
            console.log('Error formatoDiaHorario: horario es undefined');
        console.error('Error formatoDiaHorario:', error);
        return null;
    }

    if(horarioDia === undefined){
        return null;
    }
    // Si el horario termina con el sufijo Cerrado, el lugar no abre ese día
    if(horarioDia.includes('Cerrado')){
        return null;
    }
    // Si el horario tiene la palabra abierto, el lugar abre todo el día
    if(horarioDia.includes('Abierto')){
        return {horarioInicio: '00:00', horarioFin: '23:59'};
    }

    // Dar el formato HH:mm a los horarios (La cadena tiene el formato 'lunes: 7:00–23:00') Recordar quitar la el dia de la semana
    let horarioInicio = horarioDia.split('–')[0].trim();
    let horarioFin = horarioDia.split('–')[1].trim();
    // Quita el dia de la semana
    horarioInicio = horarioInicio.split(' ')[1].trim();
    // Agregar el 0 a la izquierda si el horario es menor a 10
    if(horarioInicio.length === 4){
        horarioInicio = '0' + horarioInicio;
    }

    return {horarioInicio, horarioFin};
}

const seleccionarLugaresPorDistancia = async (idUsuario, numeroPersonas, restricciones, gradoAleatoriedad, nivelPresupuesto, esAltoPresupuesto, horaInicio, horaFin, fechaInicio, fechaFin, latitudInicial, longitudInicial) => {
    const probabilidadAleatoria = gradoAleatoriedad / 100;
    // Calcular el número de días del viaje y el que dia de la semana es la fecha de inicio (0-6)
    const dias = dayjs(fechaFin).diff(dayjs(fechaInicio), 'day') + 1;
    const diaSemanaInicio = dayjs(fechaInicio).day();
    const arregloCategorias = await obtenerArregloCategorias(idUsuario, true, nivelPresupuesto, restricciones); // Recibir como parámetro en el futuro
    const lugaresDeseados = await obtenerLugaresDeseadoss(idUsuario);
    const lugaresRestricciones = await obtenerLugaresRestriccioness(true, nivelPresupuesto, restricciones);
    const todosLugares = await obtenerTodosLugaress(true, nivelPresupuesto);
    const restauranteArregloCategorias = await obtenerArregloCategorias(idUsuario, false, nivelPresupuesto, restricciones);
    const duracionActividad = 2.5; // Duración de una actividad en horas
    const duracionComida = 2.5; // Duración de una comida en horas
    let costoAproximado = 0;

    // Llenar un arreglo con los restaurantes de restauranteArregloCategorias
    const restauranteLugaresCategorias = [];
    for (const categoria of restauranteArregloCategorias) {
        for(const lugar of categoria.lugares){
            // Si no está en el arreglo de restaurantes, agregarlo
            if(!restauranteLugaresCategorias.includes(lugar)){
                restauranteLugaresCategorias.push(lugar);
            }
        }
    }
    const restauranteLugaresRestricciones = await obtenerLugaresRestriccioness(false, nivelPresupuesto, restricciones);
    const restauranteTodosLugares = await obtenerTodosLugaress(false, nivelPresupuesto);
    const numCategorias = arregloCategorias.length;
    let numTotalLugaresCategorias = 0;
    
    // Parámetros para el cálculo del score
    const distRef = 0.18179334784903947;                        // Distancia de referencia
    let a = 0.5;                                                // Si el lugar es deseado
    let b = 2;                                                  // Si el lugar está cerca
    let c = 0.5;                                                // Si el lugar está en las categorías favoritas
    let d = 0.5;                                                // Si el lugar cumple con las restricciones
    let e_weight = 2;                                           // Peso del precio
    let b_weight = 3.25;                                        // Peso de la distancia
    let e = esAltoPresupuesto ? e_weight/4 : -e_weight/4;       // Precio del lugar
    
    // Contar los lugares en arregloCategorias
    for (const categoria of arregloCategorias) {
        numTotalLugaresCategorias += categoria.lugares.length;
    }

    let hayCategorias = false;
    if(numTotalLugaresCategorias > 0)
        hayCategorias = true;

    // Contar las lugares en restauranteLugaresCategorias
    const numTotalRestauranteLugaresCategorias = restauranteLugaresCategorias.length;

    let hayRestauranteCategorias = false;
    if(numTotalRestauranteLugaresCategorias > 0)
        hayRestauranteCategorias = true;
    

    // Set para guardar el id de los lugares seleccionados y evitar repetir lugares
    const lugaresSeleccionados = new Set();

    // Ser para guardar el id de los lugares deseados
    const lugaresDeseadosSet = new Set();
    for (const lugar of lugaresDeseados) {
        lugaresDeseadosSet.add(lugar.idLugar);
    }

    // Arreglo para guardar los lugares seleccionados, tiene un objeto con la fecha del dia y sus lugares, por ejemplo: [{fecha: '2024-12-16', lugares: [lugar1, lugar2, lugar3]}]
    const lugaresItinerario = [];
    let indexCategoria = 0;
    let longitudActual = longitudInicial;
    let latitudActual = latitudInicial;
    let regularOpeningHours = null;
    let horaActual = dayjs(horaInicio, 'HH:mm', true);

    // Cada dia cuenta con el siguiente orden: 3 actividades, 1 comida, 2 actividades, 1 cena
    // Se va a iterar por cada día del viaje

    let lugarObjeto = null;

    for (let i = 0; i < dias; i++) {
        // Hora actual es la hora de inicio del día
        horaActual = dayjs(horaInicio, 'HH:mm', true);

        // Obtener el dia de la semana actual (domingo = 0, lunes = 1, ..., sábado = 6)
        const diaSemanaActual = (diaSemanaInicio + i) % 7;

        lugaresItinerario.push({fecha: dayjs(fechaInicio).add(i, 'day').format('YYYY-MM-DD'), lugares: []});
        let indiceDia = 0;

        // Para llenar las primeras 3 actividades
        for(; indiceDia < 2; indiceDia++) {

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

            // Seleccionar el lugar con el score más alto
            let scoreMaximo = -Infinity;
            let idLugarSeleccionado = "";
            let longitudSiguiente = 0;
            let latitudSiguiente = 0;

            if(hayCategorias){
                for (const lugar of categoria.lugares) {
                    // Obtener el horario de apertura y cierre del lugar
                    regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                    if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                        const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                        if(formatoDiaHorarioObj === null){
                            continue;
                        }
    
                        let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                        let horarioFin = formatoDiaHorarioObj.horarioFin;
                        
                        if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                            continue;
                        }

                    }
                    
                    if (lugaresSeleccionados.has(lugar.id)) {
                        continue;
                    }

                    const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                    const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + c + d + lugar.precioNivel * e;
                    if (score > scoreMaximo) {
                        scoreMaximo = score;
                        idLugarSeleccionado = lugar.id;
                        longitudSiguiente = lugar.longitud;
                        latitudSiguiente = lugar.latitud;
                    }
                }
            }

            if(lugaresRestricciones.length > 0){
                for (const lugar of lugaresRestricciones) {
                    // Obtener el horario de apertura y cierre del lugar
                    regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                    if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                        const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                        if(formatoDiaHorarioObj === null){
                            continue;
                        }
    
                        let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                        let horarioFin = formatoDiaHorarioObj.horarioFin;
                        
                        if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                            continue;
                        }

                    }
                    
                    if (lugaresSeleccionados.has(lugar.id)) {
                        continue;
                    }
                    const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                    const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + d + lugar.precioNivel * e;
                    if (score > scoreMaximo) {
                        scoreMaximo = score;
                        idLugarSeleccionado = lugar.id;
                        longitudSiguiente = lugar.longitud;
                        latitudSiguiente = lugar.latitud;
                    }
                }
            }
                
            for (const lugar of todosLugares) {
                // Obtener el horario de apertura y cierre del lugar
                regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                    const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                    if(formatoDiaHorarioObj === null){
                        continue;
                    }

                    let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                    let horarioFin = formatoDiaHorarioObj.horarioFin;
                    
                    if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                        continue;
                    }

                }
                
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }

                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + lugar.precioNivel * e;
                if (score > scoreMaximo) {
                    scoreMaximo = score;
                    idLugarSeleccionado = lugar.id;
                    longitudSiguiente = lugar.longitud;
                    latitudSiguiente = lugar.latitud;
                }
            }
            
            if(idLugarSeleccionado === "") {
                // No se pudo crear el itinerario
                return {resultadoItinerario: false};
            }
            
            // Agregar el lugar seleccionado al itinerario, junto con su hora de inicio
            lugaresSeleccionados.add(idLugarSeleccionado);
            lugarObjeto = todosLugares.find(lugar => lugar.id === idLugarSeleccionado);
            lugaresItinerario[i].lugares.push({data: lugarObjeto, horaInicio: horaActual.format('HH:mm')});

            // Actualizar la ubicación actual
            longitudActual = longitudSiguiente;
            latitudActual = latitudSiguiente;

            // Actualizar la hora actual sumandole la duración de la actividad
            horaActual = horaActual.add(duracionActividad, 'hour');
            // console.log(horaActual.format('HH:mm'));

            // Actualizar el costo aproximado
            costoAproximado += lugarObjeto.precioAproximado * numeroPersonas;
            
        }

        // Seleccionar una comida, para ello solo seleccionar un restaurante cuya distancia utilizando el score sea la menor

        let distanciaMinimaRestaurante = Infinity;
        let idRestauranteSeleccionado = "";
        let longitudSiguienteRestaurante = 0;
        let latitudSiguienteRestaurante = 0;

        // Obtener la distancia mínima entre el lugar actual y los lugares de las restricciones
        if(hayRestauranteCategorias){
            for (const lugar of restauranteLugaresCategorias) {
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }
                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                if (distancia < distanciaMinimaRestaurante) {
                    distanciaMinimaRestaurante = distancia;
                }
            }
        }

        for (const lugar of restauranteLugaresRestricciones) {
            if (lugaresSeleccionados.has(lugar.id)) {
                continue;
            }
            const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
            if (distancia < distanciaMinimaRestaurante) {
                distanciaMinimaRestaurante = distancia;
            }
        }

        if(distanciaMinimaRestaurante === Infinity){
            // Obtener la distancia mínima entre el lugar actual y todos los lugares
            for (const lugar of restauranteTodosLugares) {
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }
                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                if (distancia < distanciaMinimaRestaurante) {
                    distanciaMinimaRestaurante = distancia;
                }
            }
        }

        let scoreMaximo = -Infinity;

        b = Math.abs(b_weight / (Math.pow(distRef, 2) - Math.pow(distanciaMinimaRestaurante, 2)));

        if(hayRestauranteCategorias){
            for (const lugar of restauranteLugaresCategorias) {
                // Obtener el horario de apertura y cierre del lugar
                regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                    const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                    if(formatoDiaHorarioObj === null){
                        continue;
                    }

                    let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                    let horarioFin = formatoDiaHorarioObj.horarioFin;
                    
                    if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                        continue;
                    }

                }
                
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }
                
                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + c + d + lugar.precioNivel * e;
                if (score > scoreMaximo) {
                    scoreMaximo = score;
                    idRestauranteSeleccionado = lugar.id;
                    longitudSiguienteRestaurante = lugar.longitud;
                    latitudSiguienteRestaurante = lugar.latitud;
                }
            }
        }

        if(restauranteLugaresRestricciones.length > 0){
            
            for (const lugar of restauranteLugaresRestricciones) {
                // Obtener el horario de apertura y cierre del lugar
                regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                    const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                    if(formatoDiaHorarioObj === null){
                        continue;
                    }

                    let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                    let horarioFin = formatoDiaHorarioObj.horarioFin;
                    
                    if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                        continue;
                    }

                }
                
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }

                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + d + lugar.precioNivel * e;
                if (score > scoreMaximo) {
                    scoreMaximo = score;
                    idRestauranteSeleccionado = lugar.id;
                    longitudSiguienteRestaurante = lugar.longitud;
                    latitudSiguienteRestaurante = lugar.latitud;
                }
            }
        }

        for (const lugar of restauranteTodosLugares) {
            // Obtener el horario de apertura y cierre del lugar
            regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
            if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                if(formatoDiaHorarioObj === null){
                    continue;
                }

                let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                let horarioFin = formatoDiaHorarioObj.horarioFin;
                
                if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                    continue;
                }

            }
            
            if (lugaresSeleccionados.has(lugar.id)) {
                continue;
            }

            const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
            const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + lugar.precioNivel * e;
            if (score > scoreMaximo) {
                scoreMaximo = score;
                idRestauranteSeleccionado = lugar.id;
                longitudSiguienteRestaurante = lugar.longitud;
                latitudSiguienteRestaurante = lugar.latitud;
            }
        }

        if(idRestauranteSeleccionado === "") {
            // No se pudo crear el itinerario
            return {resultadoItinerario: false};
        }

        // Agregar el lugar seleccionado al itinerario, junto con su hora de inicio
        lugaresSeleccionados.add(idRestauranteSeleccionado);
        lugarObjeto = restauranteTodosLugares.find(lugar => lugar.id === idRestauranteSeleccionado);
        lugaresItinerario[i].lugares.push({data: lugarObjeto, horaInicio: horaActual.format('HH:mm')});

        // Actualizar la ubicación actual
        longitudActual = longitudSiguienteRestaurante;
        latitudActual = latitudSiguienteRestaurante;

        // Actualizar la hora actual sumandole la duración de la comida
        horaActual = horaActual.add(duracionComida, 'hour');
        // console.log(horaActual.format('HH:mm'));

        // Actualizar el costo aproximado
        costoAproximado += lugarObjeto.precioAproximado * numeroPersonas;

        // Para llenar las últimas 2 actividades
        indiceDia = 0;
        for(; indiceDia < 2; indiceDia++) {
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

            b = Math.abs(b_weight / (Math.pow(distRef, 2) - Math.pow(distanciaMinima, 2)));

            // Seleccionar el lugar con el score más alto
            let scoreMaximo = -Infinity;
            let idLugarSeleccionado = "";
            let longitudSiguiente = 0;
            let latitudSiguiente = 0;

            if(hayCategorias){
                for (const lugar of categoria.lugares) {
                    // Obtener el horario de apertura y cierre del lugar
                    regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                    if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                        const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                        if(formatoDiaHorarioObj === null){
                            continue;
                        }
    
                        let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                        let horarioFin = formatoDiaHorarioObj.horarioFin;
                        
                        if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                            continue;
                        }

                    }
                    
                    if (lugaresSeleccionados.has(lugar.id)) {
                        continue;
                    }

                    const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                    const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + c + d + lugar.precioNivel * e;
                    if (score > scoreMaximo) {
                        scoreMaximo = score;
                        idLugarSeleccionado = lugar.id;
                        longitudSiguiente = lugar.longitud;
                        latitudSiguiente = lugar.latitud;
                    }
                }
            }

            if(lugaresRestricciones.length > 0){
                for (const lugar of lugaresRestricciones) {
                    // Obtener el horario de apertura y cierre del lugar
                    regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                    if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                        const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                        if(formatoDiaHorarioObj === null){
                            continue;
                        }
    
                        let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                        let horarioFin = formatoDiaHorarioObj.horarioFin;
                        
                        if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                            continue;
                        }

                    }
                    
                    if (lugaresSeleccionados.has(lugar.id)) {
                        continue;
                    }

                    const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                    const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + d + lugar.precioNivel * e;
                    if (score > scoreMaximo) {
                        scoreMaximo = score;
                        idLugarSeleccionado = lugar.id;
                        longitudSiguiente = lugar.longitud;
                        latitudSiguiente = lugar.latitud;
                    }
                }
            }

            for (const lugar of todosLugares) {
                // Obtener el horario de apertura y cierre del lugar
                regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                    const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                    if(formatoDiaHorarioObj === null){
                        continue;
                    }

                    let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                    let horarioFin = formatoDiaHorarioObj.horarioFin;
                    
                    if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                        continue;
                    }

                }
                
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }

                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + lugar.precioNivel * e;
                if (score > scoreMaximo) {
                    scoreMaximo = score;
                    idLugarSeleccionado = lugar.id;
                    longitudSiguiente = lugar.longitud;
                    latitudSiguiente = lugar.latitud;
                }
            }

            if(idLugarSeleccionado === "") {
                // No se pudo crear el itinerario
                return {resultadoItinerario: false};
            }

            // Agregar el lugar seleccionado al itinerario, junto con su hora de inicio
            lugaresSeleccionados.add(idLugarSeleccionado);
            lugarObjeto = todosLugares.find(lugar => lugar.id === idLugarSeleccionado);
            lugaresItinerario[i].lugares.push({data: lugarObjeto, horaInicio: horaActual.format('HH:mm')});

            // Actualizar la ubicación actual
            longitudActual = longitudSiguiente;
            latitudActual = latitudSiguiente;

            // Actualizar la hora actual sumandole la duración de la actividad
            horaActual = horaActual.add(duracionActividad, 'hour');
            // console.log(horaActual.format('HH:mm'));

            // Actualizar el costo aproximado
            costoAproximado += lugarObjeto.precioAproximado * numeroPersonas;

        }

        // Seleccionar una cena, para ello solo seleccionar un restaurante cuya distancia utilizando el score sea la menor

        distanciaMinimaRestaurante = Infinity;
        idRestauranteSeleccionado = "";
        longitudSiguienteRestaurante = 0;
        latitudSiguienteRestaurante = 0;

        // Obtener la distancia mínima entre el lugar actual y los lugares de las restricciones
        if(hayRestauranteCategorias){
            for (const lugar of restauranteLugaresCategorias) {
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }
                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                if (distancia < distanciaMinimaRestaurante) {
                    distanciaMinimaRestaurante = distancia;
                }
            }
        }

        for (const lugar of restauranteLugaresRestricciones) {
            if (lugaresSeleccionados.has(lugar.id)) {
                continue;
            }
            const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
            if (distancia < distanciaMinimaRestaurante) {
                distanciaMinimaRestaurante = distancia;
            }
        }

        if(distanciaMinimaRestaurante === Infinity){
            // Obtener la distancia mínima entre el lugar actual y todos los lugares
            for (const lugar of restauranteTodosLugares) {
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }
                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                if (distancia < distanciaMinimaRestaurante) {
                    distanciaMinimaRestaurante = distancia;
                }
            }
        }

        scoreMaximo = -Infinity;

        b = Math.abs(b_weight / (Math.pow(distRef, 2) - Math.pow(distanciaMinimaRestaurante, 2)));

        if(hayRestauranteCategorias){
            for (const lugar of restauranteLugaresCategorias) {
                // Obtener el horario de apertura y cierre del lugar
                regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                    const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                    if(formatoDiaHorarioObj === null){
                        continue;
                    }

                    let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                    let horarioFin = formatoDiaHorarioObj.horarioFin;
                    
                    if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                        continue;
                    }

                }
                
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }

                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + c + d + lugar.precioNivel * e;
                if (score > scoreMaximo) {
                    scoreMaximo = score;
                    idRestauranteSeleccionado = lugar.id;
                    longitudSiguienteRestaurante = lugar.longitud;
                    latitudSiguienteRestaurante = lugar.latitud;
                }
            }
        }

        if(restauranteLugaresRestricciones.length > 0){
            for (const lugar of restauranteLugaresRestricciones) {
                // Obtener el horario de apertura y cierre del lugar
                regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
                if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                    const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                    if(formatoDiaHorarioObj === null){
                        continue;
                    }

                    let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                    let horarioFin = formatoDiaHorarioObj.horarioFin;
                    
                    if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                        continue;
                    }

                }
                
                if (lugaresSeleccionados.has(lugar.id)) {
                    continue;
                }

                const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
                const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + d + lugar.precioNivel * e;
                if (score > scoreMaximo) {
                    scoreMaximo = score;
                    idRestauranteSeleccionado = lugar.id;
                    longitudSiguienteRestaurante = lugar.longitud;
                    latitudSiguienteRestaurante = lugar.latitud;
                }
            }
        }

        for (const lugar of restauranteTodosLugares) {
            // Obtener el horario de apertura y cierre del lugar
            regularOpeningHours = JSON.parse(lugar.regularOpeningHours);
            if(typeof regularOpeningHours.weekdayDescriptions !== "undefined"){
                const formatoDiaHorarioObj = formatoDiaHorario(diaSemanaActual, regularOpeningHours.weekdayDescriptions);
                if(formatoDiaHorarioObj === null){
                    continue;
                }

                let horarioInicio = formatoDiaHorarioObj.horarioInicio;
                let horarioFin = formatoDiaHorarioObj.horarioFin;
                
                if (!lugarAbierto(horaActual.format('HH:mm'), horaActual.add(duracionActividad, 'hour').format('HH:mm'), horarioInicio, horarioFin)) {
                    continue;
                }

            }
            
            if (lugaresSeleccionados.has(lugar.id)) {
                continue;
            }

            const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
            const score = a * lugaresDeseadosSet.has(lugar.id) + b * (Math.pow(distRef, 2) - Math.pow(distancia, 2)) + lugar.precioNivel * e;
            if (score > scoreMaximo) {
                scoreMaximo = score;
                idRestauranteSeleccionado = lugar.id;
                longitudSiguienteRestaurante = lugar.longitud;
                latitudSiguienteRestaurante = lugar.latitud;
            }
        }

        if(idRestauranteSeleccionado === "") {
            // No se pudo crear el itinerario
            return {resultadoItinerario: false};
        }

        // Agregar el lugar seleccionado al itinerario, junto con su hora de inicio
        lugaresSeleccionados.add(idRestauranteSeleccionado);
        lugarObjeto = restauranteTodosLugares.find(lugar => lugar.id === idRestauranteSeleccionado);
        lugaresItinerario[i].lugares.push({data: lugarObjeto, horaInicio: horaActual.format('HH:mm')});

        // Actualizar la ubicación actual
        longitudActual = longitudSiguienteRestaurante;
        latitudActual = latitudSiguienteRestaurante;

        // Estas últimas instrucciones se aplican solo si vamos a agregar actividades después de la cena
        // Actualizar la hora actual sumandole la duración de la comida
        horaActual = horaActual.add(duracionComida, 'hour');
        // console.log(horaActual.format('HH:mm'));

        // Actualizar el costo aproximado
        costoAproximado += lugarObjeto.precioAproximado * numeroPersonas;

    }

    return {lugaresItinerario: lugaresItinerario, costoAproximado: costoAproximado, resultadoItinerario: true};

}

const generarItinerario = async (idUsuario, numeroPersonas, fechaInicio, fechaFin, horaInicio, horaFin, gradoAleatoriedad, duracionActividad, duracionComida, presupuesto, restricciones, latitudInicial, longitudInicial) => {
    // Probar desde el nivelPrecio más alto hasta el más bajo
    let lugaresItinerario = [];
    let costoAproximado = -1;
    let resultadoItinerario = false;

    for(let i = 4; i >= 0; i--){
        for(let j = 0; j < 2; j++){
            const itinerario = await seleccionarLugaresPorDistancia(idUsuario, numeroPersonas, restricciones, gradoAleatoriedad, i, j, horaInicio, horaFin, fechaInicio, fechaFin, latitudInicial, longitudInicial);
            if(itinerario.resultadoItinerario){
                console.log("Costo aproximado: " + itinerario.costoAproximado);
                // // Imprimir el itinerario
                // for (const dia of itinerario.lugaresItinerario) {
                //     console.log(dia.fecha);
                //     for (const lugar of dia.lugares) {
                //         console.log(lugar.horaInicio);
                //         console.log(lugar.data.nombre);
                //     }
                // }
                if(itinerario.costoAproximado > costoAproximado && itinerario.costoAproximado <= presupuesto){
                    lugaresItinerario = itinerario.lugaresItinerario;
                    costoAproximado = itinerario.costoAproximado;
                    resultadoItinerario = true;
                }
            }
        }
    }

    if(resultadoItinerario){
        console.log(lugaresItinerario);
        for (const dia of lugaresItinerario) {
            console.log(dia.fecha);
            for (const lugar of dia.lugares) {
                console.log(lugar.horaInicio);
                console.log(lugar.data.nombre);
            }
        }
        console.log("Costo aproximado: " + costoAproximado);
        return {lugaresItinerario: lugaresItinerario, costoAproximado: costoAproximado, resultadoItinerario: true};
    }
    else {
        console.log("No se pudo crear el itinerario con el presupuesto indicado");
        return {resultadoItinerario: false};
    }
}

generarItinerario(1, 1, "2024-12-16", "2024-12-16", "09:00", "18:00", 50, 2, 2, 900, {impedimentoFisico: false, familiar: false, vegetarianFriendly: false, petFriendly: false, goodForGroups: false}, 19.436511157306374, -99.13954113405046 );

// PASOS
// 4. GUARDAR EN LA BASE DE DATOS
