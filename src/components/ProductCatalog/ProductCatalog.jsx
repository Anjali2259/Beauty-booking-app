import React, { useState } from 'react';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Products', icon: '🎨' },
    { id: 'lipstick', name: 'Lipstick', icon: '💄' },
    { id: 'foundation', name: 'Foundation', icon: '🎭' },
    { id: 'eyeshadow', name: 'Eyeshadow', icon: '👁️' },
    { id: 'blush', name: 'Blush', icon: '🌸' },
    { id: 'mascara', name: 'Mascara', icon: '👀' },
    { id: 'eyeliner', name: 'Eyeliner', icon: '✏️' }
  ];

  const products = [
    {
      id: 1,
      name: 'Velvet Matte Lipstick',
      brand: 'Luxury Beauty',
      category: 'lipstick',
      price: 24.99,
      rating: 4.8,
      color: '#DC143C',
      image: '/api/placeholder/200/200',
      description: 'Long-lasting velvet matte finish'
    },
    {
      id: 2,
      name: 'Flawless Foundation',
      brand: 'Perfect Skin',
      category: 'foundation',
      price: 39.99,
      rating: 4.6,
      color: '#F5DEB3',
      image: '/api/placeholder/200/200',
      description: 'Full coverage, 24-hour wear'
    },
    {
      id: 3,
      name: 'Golden Hour Eyeshadow',
      brand: 'Sparkle Co',
      category: 'eyeshadow',
      price: 32.50,
      rating: 4.9,
      color: '#FFD700',
      image: '/api/placeholder/200/200',
      description: 'Shimmery golden eyeshadow palette'
    },
    {
      id: 4,
      name: 'Rose Petal Blush',
      brand: 'Natural Glow',
      category: 'blush',
      price: 22.00,
      rating: 4.7,
      color: '#FFB6C1',
      image: '/api/placeholder/200/200',
      description: 'Natural rosy glow for cheeks'
    },
    {
      id: 5,
      name: 'Volume Max Mascara',
      brand: 'Lash Perfect',
      category: 'mascara',
      price: 18.99,
      rating: 4.5,
      color: '#000000',
      image: '/api/placeholder/200/200',
      description: 'Dramatic volume and length'
    },
    {
      id: 6,
      name: 'Precision Eyeliner',
      brand: 'Sharp Lines',
      category: 'eyeliner',
      price: 15.50,
      rating: 4.4,
      color: '#000000',
      image: '/api/placeholder/200/200',
      description: 'Waterproof precision liner'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star full">⭐</span>
        ))}
        {hasHalfStar && <span className="star half">⭐</span>}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  return (
    <div className="product-catalog">
      <div className="catalog-container">
        <div className="catalog-header">
          <h1>Beauty Products</h1>
          <p>Discover our premium collection of beauty products</p>
        </div>

        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products or brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="sort-dropdown">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="categories-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="color-preview" style={{ backgroundColor: product.color }}></div>
                <button className="try-on-btn">Try On</button>
              </div>
              
              <div className="product-details">
                <div className="product-brand">{product.brand}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                {renderStars(product.rating)}
                
                <div className="product-footer">
                  <div className="price">${product.price}</div>
                  <div className="product-actions">
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button className="favorite-btn">♡</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;