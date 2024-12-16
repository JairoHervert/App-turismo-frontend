import axios from 'axios';


//AQUI COLOCAR EL MODO DE TRANSPORTE EN EL QUE EL USUARIO VIAJARA.
export async function calcularDistanciasYTiempo(lugares, modo = 'driving') {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Reemplaza con tu clave de API
  const resultados = [];

  // Agregar este console.log para verificar los datos recibidos
  //console.log("Lugares recibidos para cálculo:", lugares);

  for (let i = 0; i < lugares.length - 1; i++) {
    const origen = `${lugares[i].lat},${lugares[i].lon}`;
    const destino = `${lugares[i + 1].lat},${lugares[i + 1].lon}`;
    const url = `http://localhost:3001/api/distancematrix?origins=${origen}&destinations=${destino}&mode=${modo}&key=${apiKey}`; // Cambiado para usar tu servidor intermedio

    try {
      const respuesta = await axios.get(url);
      const elemento = respuesta.data.rows[0].elements[0];

      if (elemento.status === 'OK') {
        resultados.push({
          desde: lugares[i].nombre,
          hacia: lugares[i + 1].nombre,
          distancia: elemento.distance.text,
          tiempo: elemento.duration.text,
        });
      } else {
        resultados.push({
          desde: lugares[i].nombre,
          hacia: lugares[i + 1].nombre,
          error: elemento.status,
        });
      }
    } catch (error) {
      console.error(
        `Error al calcular distancia entre ${lugares[i].nombre} y ${lugares[i + 1].nombre}:`,
        error
      );
    }
  }

  //console.log("Resultados obtenidos desde la API:", resultados); // Agrega este console.log para verificar los datos
  return resultados;
}
