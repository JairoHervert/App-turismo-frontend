import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link
} from "@react-pdf/renderer";
import logo from "../img/logo-provicional.png"; // Asegúrate de tener un logo en esta ruta
import background from "../img/logo-provicional.png"; // Asegúrate de tener una imagen de fondo en esta ruta

// Estilos del PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative"
  },
  page2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  backgroundImage: {
    position: "absolute",
    top: "25%",
    left: "25%",
    width: "50%",
    height: "50%",
    opacity: 0.1
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E91E63"
  },
  siteName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E91E63",
    textAlign: "center",
    marginBottom: 15
  },
  motivationalMessage: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#333",
    textAlign: "center",
    marginBottom: 15
  },
  introText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 14
  },
  planText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#E91E63",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333"
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#E91E63"
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#444"
  },
  footer: {
    fontSize: 10,
    marginTop: 20,
    textAlign: "center",
    color: "#aaa"
  },
  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: "#E91E63",
    paddingLeft: 10,
    marginBottom: 20,
    position: "relative"
  },
  timelineItem: {
    marginBottom: 10,
    position: "relative",
    paddingLeft: 20
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E91E63",
    position: "absolute",
    left: -16,
    top: "50%",
    transform: "translateY(-50%)"
  },
  link: {
    color: "#1E90FF",
    textDecoration: "underline"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5 // Asegúrate de que haya un margen inferior
  },
  star: {
    color: "#FFD700",
    marginRight: 2
  }
});

// Componente para el documento dinámico
export const MyDocument = ({ data }) => {
  const itemsPerPage = 3;
  const pages = [];

  Object.keys(data).forEach((date) => {
    const items = data[date];
    for (let i = 0; i < items.length; i += itemsPerPage) {
      const pageItems = items.slice(i, i + itemsPerPage);
      pages.push({ date, items: pageItems });
    }
  });

  return (
    <Document>
      {/* Página de presentación */}
      <Page size="A4" style={styles.page}>
        <Image style={styles.backgroundImage} src={background} />
        <View style={styles.headerContainer}>
          <Image style={styles.logo} src={logo} />
          <Text style={styles.headerText}>Aztlán Turismo</Text>
        </View>
        <View style={styles.page2}>
          <Text style={styles.siteName}>Aztlán Turismo</Text>
          <Text style={styles.motivationalMessage}>
            "Descubre el mundo, un lugar a la vez"
          </Text>
          <Text style={styles.introText}>
            Bienvenido al itinerario de tu viaje. Aquí encontrarás todos los detalles de los lugares que visitarás.
          </Text>
          <Text style={styles.introText}>
            ¡Esperamos que disfrutes tu viaje y tengas una experiencia inolvidable!
          </Text>
        </View>
        <Text style={styles.footer}>Generado por Aztlán Turismo</Text>
      </Page>

      {/* Páginas del itinerario */}
      {pages.map((page, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <View>
            <View style={styles.headerContainer}>
              <Image style={styles.logo} src={logo} />
              <Text style={styles.headerText}>Itinerario del Día: {page.date}</Text>
            </View>
            <View style={styles.timeline}>
              {page.items.map((item, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.section}>
                    <Text style={styles.subtitle}>
                      {item.placeTime} - {item.placeName}
                    </Text>
                    <Text style={styles.text}>
                      Horario: {item.placeOpenHour} - {item.placeCloseHour}
                    </Text>
                    <Text style={styles.text}>Dirección: {item.placeAddress}</Text>
                    <Text style={styles.text}>Teléfono: {item.placePhone}</Text>
                    <Text style={styles.text}>Calificación: {item.placeRating}</Text>
                    <Text style={styles.text}>
                      Categorías: {item.placeThings.join(", ")}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.footer}>Generado por Aztlán Turismo</Text>
            <Text style={styles.footer}>
              Página {pageIndex + 1} de {pages.length}
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};


export default MyDocument;