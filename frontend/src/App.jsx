import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { PostsProvider } from './context/PostsContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <PostsProvider>
      <FavoritesProvider>
        <ChatProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ChatProvider>
      </FavoritesProvider>
    </PostsProvider>
  );
}

export default App;