import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import ChatButton from './components/ui/ChatButton';
import './styles/global.css';
import { FavoritesProvider } from './context/FavoritesContext'; 
import './styles/pages/support/Support.css';

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <Header />
        <AppRoutes />
        <ChatButton />
        <Footer />
      </FavoritesProvider>
    </Router>
  )
}

export default App
