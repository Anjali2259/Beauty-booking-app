import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, ProductCategory, ProductType, Color } from '../types';

interface ProductContextType {
  products: Product[];
  categories: ProductCategory[];
  selectedCategory: ProductCategory | null;
  searchTerm: string;
  isLoading: boolean;
  filteredProducts: Product[];
  setSelectedCategory: (category: ProductCategory | null) => void;
  setSearchTerm: (term: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByType: (type: ProductType) => Product[];
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: 'lipstick-1',
    name: 'Velvet Matte Lipstick',
    brand: 'BeautyGlow',
    category: 'makeup',
    type: 'lipstick',
    colors: [
      { id: 'red-1', name: 'Classic Red', hex: '#DC143C', rgb: { r: 220, g: 20, b: 60 } },
      { id: 'pink-1', name: 'Rose Pink', hex: '#FF69B4', rgb: { r: 255, g: 105, b: 180 } },
      { id: 'berry-1', name: 'Berry Crush', hex: '#8B0000', rgb: { r: 139, g: 0, b: 0 } }
    ],
    price: 24.99,
    image: '/images/lipstick-1.jpg',
    description: 'Long-lasting velvet matte lipstick with rich color payoff',
    features: ['Long-lasting', 'Matte finish', 'Comfortable wear'],
    rating: 4.5,
    reviews: 128,
    isVirtual: true
  },
  {
    id: 'eyeshadow-1',
    name: 'Shimmer Eyeshadow Palette',
    brand: 'GlamourLux',
    category: 'makeup',
    type: 'eyeshadow',
    colors: [
      { id: 'gold-1', name: 'Golden Hour', hex: '#FFD700', rgb: { r: 255, g: 215, b: 0 } },
      { id: 'bronze-1', name: 'Bronze Goddess', hex: '#CD7F32', rgb: { r: 205, g: 127, b: 50 } },
      { id: 'copper-1', name: 'Copper Glow', hex: '#B87333', rgb: { r: 184, g: 115, b: 51 } }
    ],
    price: 39.99,
    image: '/images/eyeshadow-1.jpg',
    description: 'Highly pigmented shimmer eyeshadows for stunning eye looks',
    features: ['Shimmer finish', 'Blendable', 'Crease-resistant'],
    rating: 4.7,
    reviews: 89,
    isVirtual: true
  },
  {
    id: 'foundation-1',
    name: 'Flawless Coverage Foundation',
    brand: 'PerfectSkin',
    category: 'makeup',
    type: 'foundation',
    colors: [
      { id: 'light-1', name: 'Fair', hex: '#F5DEB3', rgb: { r: 245, g: 222, b: 179 } },
      { id: 'medium-1', name: 'Medium', hex: '#DEB887', rgb: { r: 222, g: 184, b: 135 } },
      { id: 'dark-1', name: 'Deep', hex: '#D2B48C', rgb: { r: 210, g: 180, b: 140 } }
    ],
    price: 42.00,
    image: '/images/foundation-1.jpg',
    description: 'Full coverage foundation for a flawless complexion',
    features: ['Full coverage', 'Long-wearing', 'Buildable'],
    rating: 4.3,
    reviews: 256,
    isVirtual: true
  }
];

const categories: ProductCategory[] = ['makeup', 'skincare', 'haircare', 'nails', 'accessories'];

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading] = useState<boolean>(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByType = (type: ProductType): Product[] => {
    return products.filter(product => product.type === type);
  };

  const contextValue: ProductContextType = {
    products,
    categories,
    selectedCategory,
    searchTerm,
    isLoading,
    filteredProducts,
    setSelectedCategory,
    setSearchTerm,
    getProductById,
    getProductsByType
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};