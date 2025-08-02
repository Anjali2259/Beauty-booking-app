import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>BeautyTryOn</h1>
        </div>
        <nav className="navigation">
          <ul className="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#try-on">Try On</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#profile">Profile</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="btn-primary">Sign In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;