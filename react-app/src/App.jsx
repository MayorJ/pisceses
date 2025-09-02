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
import RegisterPage from './pages/RegisterPage'; 
import LoginPage from './pages/LoginPage'; 
// import { CartProvider } from './contexts/CartContext';
import { CartProvider } from './CartContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    if (userToken || adminToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token, isAdmin = false) => {
    setIsLoggedIn(true);
    if (isAdmin) {
      localStorage.setItem('adminToken', token);
    } else {
      localStorage.setItem('userToken', token);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
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
          
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          
          <Route
            path="/admin"
            element={localStorage.getItem('adminToken') ? <AdminPage /> : <Navigate to="/admin/login" />}
          />
          
          <Route path="/admin/login" element={<AdminLogin onLogin={() => handleLogin('dummy-token', true)} />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;