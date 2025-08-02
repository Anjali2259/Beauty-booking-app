import React from 'react';
import './HomePage.css';

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Glamour Red Lipstick',
      brand: 'Beauty Pro',
      image: '/api/placeholder/300/300',
      price: '$24.99',
      color: '#DC143C'
    },
    {
      id: 2,
      name: 'Golden Eyeshadow Palette',
      brand: 'Sparkle Beauty',
      image: '/api/placeholder/300/300',
      price: '$45.00',
      color: '#FFD700'
    },
    {
      id: 3,
      name: 'Rose Blush',
      brand: 'Natural Glow',
      image: '/api/placeholder/300/300',
      price: '$19.99',
      color: '#FFB6C1'
    }
  ];

  const features = [
    {
      icon: '📱',
      title: 'Virtual Try-On',
      description: 'Experience makeup virtually with our advanced AR technology'
    },
    {
      icon: '🎨',
      title: 'Premium Products',
      description: 'Curated collection from top beauty brands worldwide'
    },
    {
      icon: '💄',
      title: 'Perfect Match',
      description: 'Find your perfect shade with our AI-powered color matching'
    },
    {
      icon: '🛍️',
      title: 'Easy Shopping',
      description: 'Seamless shopping experience from try-on to purchase'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Transform Your Beauty Experience</h1>
            <p>Try on makeup virtually with our cutting-edge AR technology. Discover your perfect look before you buy.</p>
            <div className="hero-buttons">
              <button className="btn-primary">Start Virtual Try-On</button>
              <button className="btn-secondary">Explore Products</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-makeup-demo">
              <div className="demo-face">
                <div className="demo-eyes">👁️</div>
                <div className="demo-lips">💋</div>
              </div>
              <div className="floating-products">
                <div className="floating-product" style={{backgroundColor: '#DC143C'}}>💄</div>
                <div className="floating-product" style={{backgroundColor: '#FFD700'}}>✨</div>
                <div className="floating-product" style={{backgroundColor: '#FFB6C1'}}>🌸</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2>Why Choose BeautyTryOn?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="featured-container">
          <h2>Featured Products</h2>
          <p>Discover our most popular beauty products</p>
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="featured-product-card">
                <div className="featured-product-image">
                  <div className="product-color-display" style={{backgroundColor: product.color}}></div>
                  <button className="quick-try-btn">Quick Try-On</button>
                </div>
                <div className="featured-product-info">
                  <div className="product-brand">{product.brand}</div>
                  <h4>{product.name}</h4>
                  <div className="product-price">{product.price}</div>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-products">
            <button className="btn-outline">View All Products</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Look?</h2>
          <p>Join thousands of beauty enthusiasts who trust BeautyTryOn for their makeup journey</p>
          <button className="btn-primary large">Get Started Now</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;