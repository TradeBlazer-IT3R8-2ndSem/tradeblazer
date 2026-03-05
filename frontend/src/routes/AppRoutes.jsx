import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "../pages/dashboard/Home";
import Favorites from "../pages/favorites/Favorites";
import Search from "../pages/search/Search";
import Category from "../pages/categories/Category";
import Chat from "../pages/chat/Chat";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/profile/Profile";
import Header from "../components/layout/header";
import Footer from "../components/layout/Footer";
import ChatButton from "../components/ui/ChatButton";

const Placeholder = ({ name }) => <div style={{ padding: "20px" }}>{name} Page Coming Soon!</div>;


const Layout = () => (
  <div className="app-wrapper">
    <Header />
    <main className="content-area">
      <Outlet />
    </main>
    <Footer />
    <ChatButton />
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard & other pages wrapped by layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/notifications" element={<Placeholder name="Notifications" />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/support" element={<Placeholder name="Support" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/add" element={<Placeholder name="Add Post" />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;


