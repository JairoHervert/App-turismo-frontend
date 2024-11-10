import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PlacePage from '../pages/PlacePage';
import DeseadosPage from '../pages/DeseadosPage';
import ItinerariesSavedPage from '../pages/ItinerariesSavedPage';
import TerminosCondiciones from '../pages/TerminosCondiciones';
import PoliticasPrivacidad from '../pages/PoliticasPrivacidad';
import ConfirmacionRegistro from '../pages/ConfirmacionRegistro';
import HistorialBusqueda from '../pages/HistoryPage';
import FavoritesPage from '../pages/FavoritesPage';

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
        <Route path='/terminos-condiciones' element={<TerminosCondiciones />} />
        <Route path='/politica-privacidad' element={<PoliticasPrivacidad />} />
        <Route path='/confirmacion-registro' element={<ConfirmacionRegistro />} />
        <Route path='/placepage' element={<PlacePage />} />
        <Route path='/favoritos' element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;