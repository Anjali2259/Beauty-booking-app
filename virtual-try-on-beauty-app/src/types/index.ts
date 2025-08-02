// Product and Beauty Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  type: ProductType;
  colors: Color[];
  price: number;
  image: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  isVirtual: boolean;
  modelPath?: string; // 3D model path for AR
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  rgb: RGB;
  texture?: string; // Texture file path
  opacity?: number;
  metallic?: number;
  roughness?: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type ProductCategory = 
  | 'makeup' 
  | 'skincare' 
  | 'haircare' 
  | 'nails' 
  | 'accessories';

export type ProductType = 
  | 'lipstick' 
  | 'eyeshadow' 
  | 'foundation' 
  | 'blush' 
  | 'mascara' 
  | 'eyeliner' 
  | 'eyebrows' 
  | 'concealer' 
  | 'bronzer' 
  | 'highlighter' 
  | 'nail-polish' 
  | 'hair-color' 
  | 'glasses' 
  | 'earrings' 
  | 'hat';

// Face Detection and Landmarks
export interface FaceLandmarks {
  contour: Point[];
  leftEye: Point[];
  rightEye: Point[];
  leftEyebrow: Point[];
  rightEyebrow: Point[];
  nose: Point[];
  noseTip: Point[];
  mouth: Point[];
  jawLine: Point[];
  forehead: Point[];
}

export interface Point {
  x: number;
  y: number;
  z?: number;
}

export interface FaceDetection {
  boundingBox: BoundingBox;
  landmarks: FaceLandmarks;
  confidence: number;
  rotation: {
    pitch: number;
    yaw: number;
    roll: number;
  };
  expressions: FaceExpressions;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceExpressions {
  neutral: number;
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
}

// Camera and Video Types
export interface CameraSettings {
  facingMode: 'user' | 'environment';
  width: number;
  height: number;
  frameRate: number;
  aspectRatio: number;
}

export interface VideoStream {
  stream: MediaStream | null;
  isActive: boolean;
  deviceId?: string;
  constraints: MediaStreamConstraints;
}

// Virtual Try-On Session
export interface TryOnSession {
  id: string;
  userId?: string;
  products: AppliedProduct[];
  timestamp: Date;
  settings: TryOnSettings;
  screenshots: Screenshot[];
}

export interface AppliedProduct {
  product: Product;
  color: Color;
  intensity: number;
  position: Point;
  scale: number;
  rotation: number;
  blendMode: BlendMode;
  isVisible: boolean;
}

export interface TryOnSettings {
  autoDetection: boolean;
  realTimeUpdates: boolean;
  quality: 'low' | 'medium' | 'high';
  enableAR: boolean;
  enableFilters: boolean;
  skinToneDetection: boolean;
  lightingAdjustment: boolean;
}

export interface Screenshot {
  id: string;
  imageData: string; // base64 encoded image
  timestamp: Date;
  products: AppliedProduct[];
  filters?: FilterSettings;
}

// UI and Interaction Types
export interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  exposure: number;
  highlights: number;
  shadows: number;
  clarity: number;
  vibrance: number;
}

export type BlendMode = 
  | 'normal' 
  | 'multiply' 
  | 'screen' 
  | 'overlay' 
  | 'soft-light' 
  | 'hard-light' 
  | 'color-dodge' 
  | 'color-burn';

export interface GestureInput {
  type: 'tap' | 'pinch' | 'swipe' | 'drag';
  position: Point;
  delta?: Point;
  scale?: number;
  rotation?: number;
  velocity?: Point;
}

// App State Types
export interface AppState {
  currentSession: TryOnSession | null;
  selectedProducts: Product[];
  cameraState: CameraState;
  uiState: UIState;
  userPreferences: UserPreferences;
}

export interface CameraState {
  isActive: boolean;
  stream: VideoStream | null;
  faceDetection: FaceDetection | null;
  settings: CameraSettings;
  permissionGranted: boolean;
  error: string | null;
}

export interface UIState {
  isLoading: boolean;
  showProductPanel: boolean;
  showColorPicker: boolean;
  showSettings: boolean;
  activeTab: 'makeup' | 'filters' | 'products' | 'gallery';
  selectedCategory: ProductCategory | null;
  zoomLevel: number;
}

export interface UserPreferences {
  defaultCameraFacing: 'user' | 'environment';
  autoSave: boolean;
  sharePhotos: boolean;
  skinTone: SkinTone;
  favoriteProducts: string[];
  recentColors: Color[];
}

export interface SkinTone {
  category: 'very-light' | 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark' | 'very-dark';
  undertone: 'cool' | 'neutral' | 'warm';
  hex: string;
  rgb: RGB;
}

// AR and 3D Types
export interface ARModel {
  id: string;
  meshUrl: string;
  textureUrl?: string;
  normalMapUrl?: string;
  roughnessMapUrl?: string;
  metallicMapUrl?: string;
  scale: number;
  position: Point;
  rotation: Point;
}

export interface LightingSetup {
  ambientLight: {
    intensity: number;
    color: string;
  };
  directionalLight: {
    intensity: number;
    color: string;
    position: Point;
  };
  spotLight?: {
    intensity: number;
    color: string;
    position: Point;
    target: Point;
    angle: number;
  };
}

// API and Service Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ProductSearchParams {
  category?: ProductCategory;
  type?: ProductType;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  rating?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export type ErrorType = 
  | 'CAMERA_ACCESS_DENIED'
  | 'CAMERA_NOT_FOUND'
  | 'FACE_DETECTION_FAILED'
  | 'PRODUCT_LOAD_FAILED'
  | 'SAVE_FAILED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

// Event Types
export interface AppEvent {
  type: string;
  payload?: any;
  timestamp: Date;
}

export interface ProductSelectedEvent extends AppEvent {
  type: 'PRODUCT_SELECTED';
  payload: {
    product: Product;
    color?: Color;
  };
}

export interface ColorChangedEvent extends AppEvent {
  type: 'COLOR_CHANGED';
  payload: {
    productId: string;
    color: Color;
  };
}

export interface ScreenshotTakenEvent extends AppEvent {
  type: 'SCREENSHOT_TAKEN';
  payload: {
    screenshot: Screenshot;
  };
}