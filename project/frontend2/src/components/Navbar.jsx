import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbarcss.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Brijwasi Group of Hotels
      </div>
      
      <ul className="navbar-nav">
        <li><a href="/">Home</a></li>
        <li><a href="/rooms">Rooms</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
      
      <div className="navbar-auth">
        {isLoggedIn ? (
          <>
            <div className="welcome-message">
              Welcome, <span>{localStorage.getItem('name')}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link login-link">Login</Link>
            <Link to="/signup" className="auth-link signup-link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;