// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import ChatButton from './components/ui/ChatButton';
import './styles/global.css';
import { FavoritesProvider } from './context/FavoritesContext'; 

function App() {
  return (
    <FavoritesProvider> 
      <Router>
        <div className="app-wrapper">
          <Header />
                    <main className="content-area">
            <AppRoutes />
          </main>

          <Footer />
          <ChatButton />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;