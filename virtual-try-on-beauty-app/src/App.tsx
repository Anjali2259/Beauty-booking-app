import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

// Context Providers
import { CameraProvider } from './contexts/CameraContext';
import { TryOnProvider } from './contexts/TryOnContext';
import { ProductProvider } from './contexts/ProductContext';

// Components
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorFallback from './components/UI/ErrorFallback';

// Pages - Lazy loaded for better performance
const HomePage = React.lazy(() => import('./pages/Home/HomePage'));
const TryOnPage = React.lazy(() => import('./pages/TryOn/TryOnPage'));
const ProductsPage = React.lazy(() => import('./pages/Products/ProductsPage'));
const GalleryPage = React.lazy(() => import('./pages/Gallery/GalleryPage'));

// Theme configuration
const theme = {
  colors: {
    primary: '#FF69B4',
    secondary: '#FFB6C1',
    accent: '#FF1493',
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    text: '#2C2C2C',
    textSecondary: '#666666',
    border: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    gradient: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%'
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.18)'
  },
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out'
  },
  zIndex: {
    base: 1,
    dropdown: 1000,
    modal: 2000,
    overlay: 3000,
    tooltip: 4000
  }
};

// Global styles
const GlobalStyle = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.textSecondary};
  }

  /* Loading and error states */
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  }

  .error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding: ${theme.spacing.xl};
    text-align: center;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .animate-slide-up {
    animation: slideUp 0.4s ease-out;
  }

  .animate-pulse {
    animation: pulse 1.5s infinite;
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .no-scroll {
    overflow: hidden;
  }
`;

// Inject global styles
const style = document.createElement('style');
style.textContent = GlobalStyle;
document.head.appendChild(style);

const App: React.FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Application Error:', error, errorInfo);
        // Here you could send error to logging service
      }}
    >
      <ThemeProvider theme={theme}>
        <CameraProvider>
          <TryOnProvider>
            <ProductProvider>
              <Router>
                <Layout>
                  <Suspense 
                    fallback={
                      <div className="loading-container">
                        <LoadingSpinner size="large" />
                      </div>
                    }
                  >
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/try-on" element={<TryOnPage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/gallery" element={<GalleryPage />} />
                      {/* Catch all route - redirect to home */}
                      <Route path="*" element={<HomePage />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </Router>
            </ProductProvider>
          </TryOnProvider>
        </CameraProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
