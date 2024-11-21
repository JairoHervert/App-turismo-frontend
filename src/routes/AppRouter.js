import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PlacePage from '../pages/PlacePage';
import DeseadosPage from '../pages/DeseadosPage';
import ItinerariesSavedPage from '../pages/ItinerariesSavedPage';
import TerminosCondiciones from '../pages/TerminosCondiciones';
import PoliticasPrivacidad from '../pages/PoliticasPrivacidad';
import ConfirmacionRegistro from '../pages/SuccessPage';
import HistorialBusqueda from '../pages/HistoryPage';
import FavoritesPage from '../pages/FavoritesPage';
import GenerarItinerario from '../pages/GenerarItinerario';
import CategoriasPage from '../pages/Categorias';
import SearchPlace from '../pages/SearchPlace';


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/deseados' element={<DeseadosPage />} />
        <Route path='/itinerariesSaved' element={<ItinerariesSavedPage/>} />
        <Route path='/HistoryPage' element={<HistorialBusqueda/>} />
        <Route path='/Categorias-page' element={<CategoriasPage/>} />
        <Route path='/terminos-condiciones' element={<TerminosCondiciones />} />
        <Route path='/politica-privacidad' element={<PoliticasPrivacidad />} />
        <Route path="/confirm/:token" element={<ConfirmacionRegistro />} />
        <Route path='/placepage' element={<PlacePage />} />
        <Route path='/favoritos' element={<FavoritesPage />} />
        <Route path='/generar-itinerario' element={<GenerarItinerario />} />
        <Route path='/buscar-lugar' element={<SearchPlace />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;