// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './pages/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import BlogsPage from './pages/BlogsPage';
import BlogDetail from './pages/BlogDetail';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './components/AdminLogin';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
    if (adminToken) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (token, admin = false) => {
    if (admin) {
      localStorage.setItem('adminToken', token);
      setIsAdmin(true);
    } else {
      localStorage.setItem('userToken', token);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <CartProvider>
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          <Route
            path="/admin"
            element={isAdmin ? <AdminPage /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={handleLogin} />}
          />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;