import './App.css';
import Footer from './components/Footer';
import NavBarHome from './components/NavBarHome';

function App() {
  return (
    <div className="App">
      <NavBarHome />
      
      <div className="container">
        <h1>Home</h1>
        <p>Welcome to my website</p>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
