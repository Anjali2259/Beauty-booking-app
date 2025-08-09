import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TryOnSession, AppliedProduct, Product, Color, TryOnSettings, Screenshot } from '../types';

interface TryOnContextType {
  currentSession: TryOnSession | null;
  appliedProducts: AppliedProduct[];
  settings: TryOnSettings;
  screenshots: Screenshot[];
  startSession: () => void;
  endSession: () => void;
  applyProduct: (product: Product, color: Color) => void;
  removeProduct: (productId: string) => void;
  updateProductSettings: (productId: string, updates: Partial<AppliedProduct>) => void;
  updateSettings: (newSettings: Partial<TryOnSettings>) => void;
  takeScreenshot: () => Promise<Screenshot | null>;
  clearAllProducts: () => void;
}

type TryOnAction =
  | { type: 'START_SESSION'; payload: TryOnSession }
  | { type: 'END_SESSION' }
  | { type: 'APPLY_PRODUCT'; payload: AppliedProduct }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'UPDATE_PRODUCT'; payload: { id: string; updates: Partial<AppliedProduct> } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<TryOnSettings> }
  | { type: 'ADD_SCREENSHOT'; payload: Screenshot }
  | { type: 'CLEAR_PRODUCTS' };

const defaultSettings: TryOnSettings = {
  autoDetection: true,
  realTimeUpdates: true,
  quality: 'medium',
  enableAR: false,
  enableFilters: true,
  skinToneDetection: true,
  lightingAdjustment: true
};

interface TryOnState {
  currentSession: TryOnSession | null;
  appliedProducts: AppliedProduct[];
  settings: TryOnSettings;
  screenshots: Screenshot[];
}

const initialState: TryOnState = {
  currentSession: null,
  appliedProducts: [],
  settings: defaultSettings,
  screenshots: []
};

const tryOnReducer = (state: TryOnState, action: TryOnAction): TryOnState => {
  switch (action.type) {
    case 'START_SESSION':
      return {
        ...state,
        currentSession: action.payload,
        appliedProducts: action.payload.products,
        screenshots: action.payload.screenshots
      };
    case 'END_SESSION':
      return {
        ...state,
        currentSession: null,
        appliedProducts: [],
        screenshots: []
      };
    case 'APPLY_PRODUCT':
      return {
        ...state,
        appliedProducts: [...state.appliedProducts, action.payload]
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        appliedProducts: state.appliedProducts.filter(p => p.product.id !== action.payload)
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        appliedProducts: state.appliedProducts.map(p =>
          p.product.id === action.payload.id
            ? { ...p, ...action.payload.updates }
            : p
        )
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    case 'ADD_SCREENSHOT':
      return {
        ...state,
        screenshots: [...state.screenshots, action.payload]
      };
    case 'CLEAR_PRODUCTS':
      return {
        ...state,
        appliedProducts: []
      };
    default:
      return state;
  }
};

const TryOnContext = createContext<TryOnContextType | null>(null);

export const TryOnProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(tryOnReducer, initialState);

  const startSession = (): void => {
    const session: TryOnSession = {
      id: `session_${Date.now()}`,
      products: [],
      timestamp: new Date(),
      settings: state.settings,
      screenshots: []
    };
    dispatch({ type: 'START_SESSION', payload: session });
  };

  const endSession = (): void => {
    dispatch({ type: 'END_SESSION' });
  };

  const applyProduct = (product: Product, color: Color): void => {
    const appliedProduct: AppliedProduct = {
      product,
      color,
      intensity: 0.8,
      position: { x: 0, y: 0 },
      scale: 1.0,
      rotation: 0,
      blendMode: 'normal',
      isVisible: true
    };
    dispatch({ type: 'APPLY_PRODUCT', payload: appliedProduct });
  };

  const removeProduct = (productId: string): void => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: productId });
  };

  const updateProductSettings = (productId: string, updates: Partial<AppliedProduct>): void => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: { id: productId, updates } });
  };

  const updateSettings = (newSettings: Partial<TryOnSettings>): void => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
  };

  const takeScreenshot = async (): Promise<Screenshot | null> => {
    // This would integrate with the camera context to capture the current frame
    // For now, we'll create a mock screenshot
    const screenshot: Screenshot = {
      id: `screenshot_${Date.now()}`,
      imageData: '', // Would be base64 image data
      timestamp: new Date(),
      products: state.appliedProducts
    };
    
    dispatch({ type: 'ADD_SCREENSHOT', payload: screenshot });
    return screenshot;
  };

  const clearAllProducts = (): void => {
    dispatch({ type: 'CLEAR_PRODUCTS' });
  };

  const contextValue: TryOnContextType = {
    currentSession: state.currentSession,
    appliedProducts: state.appliedProducts,
    settings: state.settings,
    screenshots: state.screenshots,
    startSession,
    endSession,
    applyProduct,
    removeProduct,
    updateProductSettings,
    updateSettings,
    takeScreenshot,
    clearAllProducts
  };

  return (
    <TryOnContext.Provider value={contextValue}>
      {children}
    </TryOnContext.Provider>
  );
};

export const useTryOn = (): TryOnContextType => {
  const context = useContext(TryOnContext);
  if (!context) {
    throw new Error('useTryOn must be used within a TryOnProvider');
  }
  return context;
};