export interface BeautyProduct {
  id: string;
  name: string;
  brand: string;
  category: 'lipstick' | 'foundation' | 'eyeshadow' | 'blush' | 'eyeliner' | 'mascara' | 'hair_color';
  color: string;
  hexColor: string;
  price: number;
  image: string;
  description: string;
}

export interface HairStyle {
  id: string;
  name: string;
  category: 'color' | 'cut' | 'style';
  image: string;
  description: string;
  price: number;
}

export interface BeautyService {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: 'makeup' | 'hair' | 'skincare' | 'nails';
  image: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  favoriteProducts: string[];
  savedLooks: SavedLook[];
  appointments: string[];
}

export interface SavedLook {
  id: string;
  name: string;
  products: BeautyProduct[];
  image?: string;
  createdAt: string;
}

export interface FaceLandmarks {
  leftEye: { x: number; y: number }[];
  rightEye: { x: number; y: number }[];
  nose: { x: number; y: number }[];
  mouth: { x: number; y: number }[];
  face: { x: number; y: number }[];
}

export interface CameraFilter {
  id: string;
  name: string;
  type: 'makeup' | 'hair' | 'face';
  intensity: number;
  color?: string;
  enabled: boolean;
}