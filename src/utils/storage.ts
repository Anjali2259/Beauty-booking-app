import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, SavedLook, BeautyProduct } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  SAVED_LOOKS: 'saved_looks',
  FAVORITE_PRODUCTS: 'favorite_products',
  RECENT_FILTERS: 'recent_filters',
};

export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const profileData = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profileData ? JSON.parse(profileData) : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const saveLook = async (look: SavedLook): Promise<void> => {
  try {
    const existingLooks = await getSavedLooks();
    const updatedLooks = [...existingLooks, look];
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_LOOKS, JSON.stringify(updatedLooks));
  } catch (error) {
    console.error('Error saving look:', error);
    throw error;
  }
};

export const getSavedLooks = async (): Promise<SavedLook[]> => {
  try {
    const looksData = await AsyncStorage.getItem(STORAGE_KEYS.SAVED_LOOKS);
    return looksData ? JSON.parse(looksData) : [];
  } catch (error) {
    console.error('Error getting saved looks:', error);
    return [];
  }
};

export const deleteLook = async (lookId: string): Promise<void> => {
  try {
    const existingLooks = await getSavedLooks();
    const updatedLooks = existingLooks.filter(look => look.id !== lookId);
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_LOOKS, JSON.stringify(updatedLooks));
  } catch (error) {
    console.error('Error deleting look:', error);
    throw error;
  }
};

export const addFavoriteProduct = async (productId: string): Promise<void> => {
  try {
    const favorites = await getFavoriteProducts();
    if (!favorites.includes(productId)) {
      const updatedFavorites = [...favorites, productId];
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_PRODUCTS, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error adding favorite product:', error);
    throw error;
  }
};

export const removeFavoriteProduct = async (productId: string): Promise<void> => {
  try {
    const favorites = await getFavoriteProducts();
    const updatedFavorites = favorites.filter(id => id !== productId);
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_PRODUCTS, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite product:', error);
    throw error;
  }
};

export const getFavoriteProducts = async (): Promise<string[]> => {
  try {
    const favoritesData = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_PRODUCTS);
    return favoritesData ? JSON.parse(favoritesData) : [];
  } catch (error) {
    console.error('Error getting favorite products:', error);
    return [];
  }
};

export const saveRecentFilters = async (filters: any[]): Promise<void> => {
  try {
    // Keep only the last 10 recent filters
    const recentFilters = filters.slice(-10);
    await AsyncStorage.setItem(STORAGE_KEYS.RECENT_FILTERS, JSON.stringify(recentFilters));
  } catch (error) {
    console.error('Error saving recent filters:', error);
    throw error;
  }
};

export const getRecentFilters = async (): Promise<any[]> => {
  try {
    const filtersData = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_FILTERS);
    return filtersData ? JSON.parse(filtersData) : [];
  } catch (error) {
    console.error('Error getting recent filters:', error);
    return [];
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};