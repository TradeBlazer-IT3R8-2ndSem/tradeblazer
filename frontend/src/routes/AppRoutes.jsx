import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "../pages/dashboard/Home";
import Favorites from "../pages/favorites/Favorites";
import Search from "../pages/search/Search";
import Category from "../pages/categories/Category";
import Categories from "../pages/categories/Categories";
import Chat from "../pages/chat/Chat";
import Login from "../pages/auth/Login";
import Support from "../pages/support/Support";
import Register from "../pages/auth/Register";
import Profile from "../pages/profile/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Header from "../components/layout/header";
import Footer from "../components/layout/Footer";
import ChatButton from "../components/ui/ChatButton";
import Notifications from "../pages/notifications/Notifications";

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

      {/* Admin Dashboard - separate layout */}
      <Route path="/admin/*" element={<AdminDashboard />} />

      {/* Dashboard & other pages wrapped by layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/add" element={<Placeholder name="Add Post" />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
