    // src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/dashboard/Home';

// Placeholder components for other pages so it doesn't crash
const Placeholder = ({ name }) => <div style={{ padding: '20px' }}>{name} Page Coming Soon!</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/notifications" element={<Placeholder name="Notifications" />} />
      <Route path="/favorites" element={<Placeholder name="Favorites" />} />
      <Route path="/chat" element={<Placeholder name="Chat" />} />
      <Route path="/support" element={<Placeholder name="Support" />} />
      <Route path="/profile" element={<Placeholder name="Profile" />} />
      <Route path="/post/add" element={<Placeholder name="Add Post" />} />
      
      {/* Redirect any unknown routes to Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;