import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase logo mb-4">PISCES. <span className="logo-symbol">♓</span></h5>
            <p className="footer-text">
              Crafting exquisite chocolates that tell a story. Discover the perfect blend of tradition and innovation in every bite.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/blogs" className="footer-link">Blog</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item me-3">
                <a href="#" className="footer-social-link">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item me-3">
                <a href="#" className="footer-social-link">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item me-3">
                <a href="#" className="footer-social-link">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="footer-social-link">
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="row mt-4">
          <div className="col text-center">
            <p className="copyright-text mb-0">&copy; {new Date().getFullYear()} PISCES. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;