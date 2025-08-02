import React, { useState, useRef, useEffect } from 'react';
import './VirtualTryOn.css';

const VirtualTryOn = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  const makeupCategories = [
    { id: 'lipstick', name: 'Lipstick', icon: '💄' },
    { id: 'eyeshadow', name: 'Eyeshadow', icon: '👁️' },
    { id: 'foundation', name: 'Foundation', icon: '🎭' },
    { id: 'blush', name: 'Blush', icon: '🌸' },
    { id: 'eyeliner', name: 'Eyeliner', icon: '✏️' },
    { id: 'mascara', name: 'Mascara', icon: '👀' }
  ];

  const sampleProducts = {
    lipstick: [
      { id: 1, name: 'Ruby Red', color: '#DC143C', brand: 'GlamCo' },
      { id: 2, name: 'Rose Pink', color: '#FF69B4', brand: 'BeautyBrand' },
      { id: 3, name: 'Coral Sunset', color: '#FF6347', brand: 'LuxeLips' }
    ],
    eyeshadow: [
      { id: 4, name: 'Golden Glow', color: '#FFD700', brand: 'Sparkle' },
      { id: 5, name: 'Midnight Blue', color: '#191970', brand: 'ColorPop' },
      { id: 6, name: 'Rose Gold', color: '#E8B4CB', brand: 'Shimmer' }
    ]
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const takeSnapshot = () => {
    // Placeholder for snapshot functionality
    console.log('Taking snapshot...');
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="virtual-tryson">
      <div className="tryson-container">
        <div className="camera-section">
          <div className="camera-view">
            {!cameraActive ? (
              <div className="camera-placeholder">
                <div className="placeholder-content">
                  <div className="camera-icon">📷</div>
                  <h3>Start Your Virtual Try-On</h3>
                  <p>Click "Start Camera" to begin trying on makeup virtually</p>
                  <button className="start-camera-btn" onClick={startCamera}>
                    Start Camera
                  </button>
                </div>
              </div>
            ) : (
              <div className="camera-active">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="video-feed"
                />
                <div className="camera-overlay">
                  <div className="face-guide"></div>
                </div>
              </div>
            )}
          </div>
          
          {cameraActive && (
            <div className="camera-controls">
              <button onClick={takeSnapshot} className="snapshot-btn">
                📸 Take Photo
              </button>
              <button onClick={stopCamera} className="stop-camera-btn">
                ⏹️ Stop Camera
              </button>
            </div>
          )}
        </div>

        <div className="makeup-controls">
          <h2>Choose Makeup</h2>
          
          <div className="categories">
            {makeupCategories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedProduct?.category === category.id ? 'active' : ''}`}
                onClick={() => setSelectedProduct({ category: category.id })}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>

          {selectedProduct && sampleProducts[selectedProduct.category] && (
            <div className="product-selection">
              <h3>Select {makeupCategories.find(c => c.id === selectedProduct.category)?.name}</h3>
              <div className="products-grid">
                {sampleProducts[selectedProduct.category].map(product => (
                  <div key={product.id} className="product-card">
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: product.color }}
                    ></div>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>{product.brand}</p>
                      <button className="apply-btn">Apply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="intensity-controls">
            <h3>Intensity</h3>
            <input 
              type="range" 
              min="0" 
              max="100" 
              defaultValue="50" 
              className="intensity-slider"
            />
            <div className="intensity-labels">
              <span>Light</span>
              <span>Natural</span>
              <span>Bold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;