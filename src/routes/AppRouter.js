import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PlacePage from '../pages/PlacePage';
import DeseadosPage from '../pages/DeseadosPage';
import FavoritesPage from '../pages/FavoritesPage';
import Itinerary from '../pages/ItineraryPage';
import Itinerary2 from '../pages/ItineraryPageFinal';
import ItinerariesSavedPage from '../pages/ItinerariesSavedPage';
import TerminosCondiciones from '../pages/TerminosCondiciones';
import PoliticasPrivacidad from '../pages/PoliticasPrivacidad';
import ConfirmacionRegistro from '../pages/SuccessPage';
import HistorialBusqueda from '../pages/HistoryPage';
import GenerarItinerario from '../pages/GenerarItinerario';
import CategoriasPage from '../pages/Categorias';
import ResumePage from '../pages/ResumenPage';
import RegisterPlacePage from '../pages/RegisterPlacePage'; 
import AdminPage from '../pages/Administrador'; 
import AdminPagePlaces from '../pages/AdministradorLugares'; 
import Perfil from '../pages/Perfil';
import SearchPlace from '../pages/SearchPlace';
import Alcaldias from '../pages/AlcaldiasTotales';
import RecuperarContrasena from '../pages/RecuperarConstrasena';
import IngresarNuevaContrasena from '../pages/IngresarNuevaContrasena';
import AdminDash from '../pages/AdminDashboard';
import AllPlacesPage from '../pages/AllPlacesPage';
import PreferenciasModal from '../components/preferencias/PreferenciasModal';
import AdminSavedPlaces from '../pages/AdminSavedPlaces';
import Carga from '../pages/Carga';
import Pdf from '../components/pdf';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/deseados' element={<DeseadosPage />} />
        <Route path='/favoritos' element={<FavoritesPage />} />
        <Route path='/itinerary' element={<Itinerary />} />
        <Route path='/itineraryFinal' element={<Itinerary2 />} />
        <Route path='/itinerariesSaved' element={<ItinerariesSavedPage/>} />
        <Route path='/HistoryPage' element={<HistorialBusqueda/>} />
        <Route path='/Categorias-page' element={<CategoriasPage/>} />
        <Route path='/terminos-condiciones' element={<TerminosCondiciones />} />
        <Route path='/politica-privacidad' element={<PoliticasPrivacidad />} />
        <Route path="/confirm/:token" element={<ConfirmacionRegistro />} />
        <Route path='/placepage/:id' element={<PlacePage />} />
        <Route path='/generar-itinerario' element={<GenerarItinerario />} />
        <Route path='/resume-page' element={<ResumePage />}/>
        <Route path='/register-place-page' element={<RegisterPlacePage />}/>
        <Route path='/Admin-Page' element={<AdminPage />}/>
        <Route path='/Admin-Page-Places' element={<AdminPagePlaces />}/>
        <Route path='/perfil-page' element={<Perfil />}/>
        <Route path='/buscar-lugar' element={<SearchPlace />} />
        <Route path='/alcaldias' element={<Alcaldias/>} />
        <Route path='/recuperar-contrasena' element={<RecuperarContrasena />} />
        <Route path='/ingresar-nueva-contrasena' element={<IngresarNuevaContrasena />} />
        <Route path='/Admin-dashboard' element={<AdminDash/>} />
        <Route path="/recuperacion/:token" element={<IngresarNuevaContrasena />} />
        <Route path='/lugares' element={<AllPlacesPage/>} />
        <Route path='/lugares/:alcaldia' element={<AllPlacesPage/>} />
        <Route path='/preferencias' element={<PreferenciasModal/>} />
        <Route path='/Admin-SavedPlaces' element={<AdminSavedPlaces/>}/>
        <Route path='/Carga' element={<Carga />} /> 
        <Route path='/pdf' element={<Pdf />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;