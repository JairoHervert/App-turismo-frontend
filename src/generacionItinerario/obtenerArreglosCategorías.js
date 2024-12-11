// En este archivo se definen las funciones para obtener arreglos de categorías favoritas, basados en las restricciones del usuario.
// Devuelve la respuesta como un json con las categorías favoritas y sus respectivos lugares filtrados con las restricciones del usuario.
// Operación: alpha

const {obtenerCategoriasFavoritas, obtenerLugaresCategoriaRestricciones} = require('../models/MySQL/itinerario-model');
// Parámetros:
    // - idUsuario: El id del usuario que se está consultando
    // - restricciones: Las restricciones del usuario para filtrar los lugares
    // - grado de aleatoriedad: El grado de aleatoriedad para seleccionar los lugares
    // - presupuesto: El presupuesto del usuario para filtrar los lugares dependiendo del nivel de Google
    // - dias: El número de días que el usuario planea viajar
    // - horaInicio: La hora de inicio del itinerario
    // - horaFin: La hora de fin del itinerario

// Resultado: Un arreglo de objetos con las categorías favoritas y sus respectivos lugares filtrados

// Hago una llamada a la base de datos para obtener el nombre de las categorías favoritas del usuario como un arreglo
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

// Aplicar el algoritmo para la selección de lugares aleatorios e ir agregando los lugares

const distanciaLugares = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
}

const seleccionarLugaresPorDistancia = async (idUsuario, restricciones, gradoAleatoriedad, presupuesto, dias, horaInicio, horaFin) => {
    const probabilidadAleatoria = gradoAleatoriedad / 100;
    const arregloCategorias = await obtenerArregloCategorias(idUsuario, true, restricciones); // Recibir como parámetro en el futuro
    const numActividades = Math.floor(dias * 5);
    const numCategorias = arregloCategorias.length;
    let numTotalLugares = 0;
    console.log(arregloCategorias);
    for (const categoria of arregloCategorias) {
        console.log(categoria.lugares.length);
        numTotalLugares += categoria.lugares.length;
    }

    // Set para guardar el id de los lugares seleccionados y evitar repetir lugares
    const lugaresSeleccionados = new Set();

    // Arreglo para guardar los lugares seleccionados
    const lugaresItinerario = [];

    // Elegir un numero aleatorio inicial, dentro de las categorías favoritas y un lugar aleatorio inicial
    let indexCategoria = Math.floor(Math.random() * arregloCategorias.length);
    let indexLugarInicial = Math.floor(Math.random() * arregloCategorias[indexCategoria].lugares.length);
    let lugarInicial = arregloCategorias[indexCategoria].lugares[indexLugarInicial];
    lugaresSeleccionados.add(lugarInicial.id);
    lugaresItinerario.push(lugarInicial);
    let longitudActual = lugarInicial.longitud;
    let latitudActual = lugarInicial.latitud;
    
    for (let i = 1; i < numActividades; i++) {
        // Verificar si ya se seleccionaron todos los lugares
        if (lugaresSeleccionados.size === numTotalLugares) {
            console.log("Se seleccionaron todos los lugares");
            break;
        }

        // Seleccionar una categoría aleatoria basada en la probabilidad aleatoria y el indice actual
        const probabilidad = Math.random();
        if (probabilidad > probabilidadAleatoria) {
            indexCategoria = Math.floor(indexCategoria + Math.random()*numCategorias) % numCategorias;
        }
        const categoria = arregloCategorias[indexCategoria];
        // Seleccionar el lugar más cercano a la ubicación actual y que no haya sido seleccionado
        let distanciaMinima = Infinity;
        let idLugarSeleccionado = "";
        let longitudSiguiente = 0;
        let latitudSiguiente = 0;
        for (const lugar of categoria.lugares) {
            if (lugaresSeleccionados.has(lugar.id)) {
                continue;
            }
            const distancia = distanciaLugares(latitudActual, longitudActual, lugar.latitud, lugar.longitud);
            if (distancia < distanciaMinima) {
                distanciaMinima = distancia;
                idLugarSeleccionado = lugar.id;
                longitudSiguiente = lugar.longitud;
                latitudSiguiente = lugar.latitud;
            }
        }

        if(idLugarSeleccionado === "") {
            i--;
            continue;
        }

        // Agregar el lugar seleccionado al itinerario
        lugaresSeleccionados.add(idLugarSeleccionado);
        lugaresItinerario.push(categoria.lugares.find(lugar => lugar.id === idLugarSeleccionado));

        // Actualizar la ubicación actual
        longitudActual = longitudSiguiente;
        latitudActual = latitudSiguiente;
    }

    console.log(lugaresItinerario.length);

    const lugaresNoItinerario = [];
    for (const categoria of arregloCategorias) {
        for (const lugar of categoria.lugares) {
            if (!lugaresSeleccionados.has(lugar.id)) {
                lugaresNoItinerario.push(lugar);
            }
        }
    }
    console.log(lugaresNoItinerario.length);

}



// obtenerArregloCategorias(1, false, {impedimentoFisico: true, familiar: true, vegetarianFriendly: true, petFriendly: true});

// FALTA AGREGAR FECHA DE INICIO Y FIN
seleccionarLugaresPorDistancia(1, {impedimentoFisico: true, familiar: true, vegetarianFriendly: true, petFriendly: true}, 50, 100, 1, "09:00", "18:00");