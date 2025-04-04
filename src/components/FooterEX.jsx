import React from 'react';
import { Link } from 'react-router-dom';
import '../cssBase/Footer.css';

const Footer = () => {
  return (
    <footer className="mobile-footer">
      <Link to="/" className="footer-link selected">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </Link>
      <Link to="/explore" className="footer-link">
        <i className="fas fa-search"></i>
        <span>Explore</span>
      </Link>
      <Link to="/categories" className="footer-link">
        <i className="fas fa-th"></i>
        <span>Categories</span>
      </Link>
      <Link to="/account" className="footer-link">
        <i className="fas fa-user"></i>
        <span>Account</span>
      </Link>
      <Link to="/cart" className="footer-link">
        <i className="fas fa-shopping-cart"></i>
        <span>Cart</span>
      </Link>
    </footer>
  );
};

export default Footer;
