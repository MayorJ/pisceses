import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './style.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import BlogsPage from './pages/BlogsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './components/AdminLogin';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage'; // New import
import LoginPage from './pages/LoginPage'; // New import
import { CartProvider } from './CartContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for a user token on initial load
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem('userToken', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userToken');
  };

  return (
    <Router>
      <CartProvider>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* New User Auth Routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          
          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={isLoggedIn ? <AdminPage /> : <Navigate to="/admin/login" />}
          />
          
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin onLogin={() => setIsLoggedIn(true)} />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;