// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        
        {/* The content-area grows to fill all space, pushing footer down */}
        <main className="content-area">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;