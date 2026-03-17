import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { PostsProvider } from './context/PostsContext';

function App() {
  return (
    <PostsProvider>
      <FavoritesProvider>
        <Router>
          <AppRoutes />
        </Router>
      </FavoritesProvider>
    </PostsProvider>
  );
}

export default App;