import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UsuarioDeseados from '../pages/UsuarioDeseados';
import ItinerariesSavedPage from '../pages/ItinerariesSavedPage';
import TerminosCondiciones from '../pages/TerminosCondiciones';
import PoliticasPrivacidad from '../pages/PoliticasPrivacidad';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/usuario-deseados" element={<UsuarioDeseados />} />
        <Route path="/itinerariesSaved" element={<ItinerariesSavedPage/>} />
        <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        <Route path="/politica-privacidad" element={<PoliticasPrivacidad />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;