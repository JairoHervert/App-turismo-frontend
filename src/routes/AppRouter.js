import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PlacePage from '../pages/PlacePage';
import UsuarioDeseados from '../pages/UsuarioDeseados';
import ItinerariesSavedPage from '../pages/ItinerariesSavedPage';
import TerminosCondiciones from '../pages/TerminosCondiciones';
import PoliticasPrivacidad from '../pages/PoliticasPrivacidad';
import ConfirmacionRegistro from '../pages/SuccessPage'; // Importar la página de confirmación
import HistorialBusqueda from '../pages/HistoryPage';
import FavoritesPage from '../pages/FavoritesPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/usuario-deseados' element={<UsuarioDeseados />} />
        <Route path='/itinerariesSaved' element={<ItinerariesSavedPage/>} />
        <Route path='/HistoryPage' element={<HistorialBusqueda/>} />
        <Route path='/terminos-condiciones' element={<TerminosCondiciones />} />
        <Route path='/politica-privacidad' element={<PoliticasPrivacidad />} />
        <Route path="/confirm/:token" element={<ConfirmacionRegistro />} /> {/* Nueva ruta para la confirmación */}
        <Route path='/placepage' element={<PlacePage />} />
        <Route path='/favorites-page' element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;