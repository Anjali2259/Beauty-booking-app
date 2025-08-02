import React, { useState } from 'react';
import './App.css';
import Header from './components/UI/Header';
import HomePage from './pages/HomePage';
import VirtualTryOn from './components/TryOn/VirtualTryOn';
import ProductCatalog from './components/ProductCatalog/ProductCatalog';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'try-on':
        return <VirtualTryOn />;
      case 'products':
        return <ProductCatalog />;
      default:
        return <HomePage />;
    }
  };

  // Update the header links to work with our state-based routing
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setCurrentPage(hash);
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial page based on hash
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {renderPage()}
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BeautyTryOn</h3>
            <p>Transform your beauty experience with virtual try-on technology.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#try-on">Virtual Try-On</a></li>
              <li><a href="#products">Products</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: hello@beautytryson.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <span>📘</span>
              <span>📷</span>
              <span>🐦</span>
              <span>📌</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BeautyTryOn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;