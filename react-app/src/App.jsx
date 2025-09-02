import React, { useState } from 'react';
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
import { CartProvider } from './CartContext';

function App() {
  // Check localStorage for the initial login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Persist login state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Clear login state from localStorage
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <Router>
      <CartProvider>
        {/* Pass the logout handler to the Navbar */}
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={isLoggedIn ? <AdminPage /> : <Navigate to="/admin/login" />}
          />
          
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
          
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;