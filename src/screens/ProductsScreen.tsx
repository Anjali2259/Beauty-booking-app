import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BeautyProduct } from '../types';

const { width } = Dimensions.get('window');

export default function ProductsScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All', icon: 'apps' },
    { id: 'lipstick', name: 'Lips', icon: 'favorite' },
    { id: 'foundation', name: 'Face', icon: 'face' },
    { id: 'eyeshadow', name: 'Eyes', icon: 'remove-red-eye' },
    { id: 'hair_color', name: 'Hair', icon: 'brush' },
  ];

  const products: BeautyProduct[] = [
    {
      id: '1',
      name: 'Matte Red Lipstick',
      brand: 'Beauty Co.',
      category: 'lipstick',
      color: 'Red',
      hexColor: '#DC143C',
      price: 25.99,
      image: '',
      description: 'Long-lasting matte finish in classic red',
    },
    {
      id: '2',
      name: 'Pink Gloss',
      brand: 'Glam Beauty',
      category: 'lipstick',
      color: 'Pink',
      hexColor: '#FF69B4',
      price: 18.99,
      image: '',
      description: 'Shiny pink gloss for everyday wear',
    },
    {
      id: '3',
      name: 'Coral Crush',
      brand: 'Ocean Beauty',
      category: 'lipstick',
      color: 'Coral',
      hexColor: '#FF7F50',
      price: 22.99,
      image: '',
      description: 'Vibrant coral shade perfect for summer',
    },
    {
      id: '4',
      name: 'Light Coverage Foundation',
      brand: 'Perfect Skin',
      category: 'foundation',
      color: 'Light',
      hexColor: '#F5DEB3',
      price: 35.99,
      image: '',
      description: 'Natural light coverage for everyday wear',
    },
    {
      id: '5',
      name: 'Medium Foundation',
      brand: 'Perfect Skin',
      category: 'foundation',
      color: 'Medium',
      hexColor: '#DEB887',
      price: 35.99,
      image: '',
      description: 'Perfect medium tone with full coverage',
    },
    {
      id: '6',
      name: 'Dark Foundation',
      brand: 'Perfect Skin',
      category: 'foundation',
      color: 'Dark',
      hexColor: '#D2691E',
      price: 35.99,
      image: '',
      description: 'Rich dark tone with buildable coverage',
    },
    {
      id: '7',
      name: 'Purple Dreams Eyeshadow',
      brand: 'Color Pop',
      category: 'eyeshadow',
      color: 'Purple',
      hexColor: '#9370DB',
      price: 15.99,
      image: '',
      description: 'Shimmer purple eyeshadow for dramatic looks',
    },
    {
      id: '8',
      name: 'Ocean Blue Eyeshadow',
      brand: 'Color Pop',
      category: 'eyeshadow',
      color: 'Blue',
      hexColor: '#4169E1',
      price: 15.99,
      image: '',
      description: 'Bold blue eyeshadow for statement looks',
    },
    {
      id: '9',
      name: 'Golden Hour Eyeshadow',
      brand: 'Color Pop',
      category: 'eyeshadow',
      color: 'Gold',
      hexColor: '#FFD700',
      price: 15.99,
      image: '',
      description: 'Metallic gold eyeshadow for glamorous looks',
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderProduct = ({ item }: { item: BeautyProduct }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <View style={[styles.productColorPreview, { backgroundColor: item.hexColor }]} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Icon
            name={favorites.includes(item.id) ? 'favorite' : 'favorite-border'}
            size={20}
            color={favorites.includes(item.id) ? '#FF69B4' : '#666'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <TouchableOpacity
            style={styles.tryOnButton}
            onPress={() => navigation.navigate('Try-On')}
          >
            <Text style={styles.tryOnButtonText}>Try On</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beauty Products</Text>
        <Text style={styles.headerSubtitle}>Discover and try on products</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && styles.activeCategoryItem,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon
              name={category.icon}
              size={24}
              color={selectedCategory === category.id ? '#FFFFFF' : '#666'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  header: {
    backgroundColor: '#FFB6C1',
    padding: 20,
    paddingTop: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  },
  categoriesContainer: {
    maxHeight: 80,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeCategoryItem: {
    backgroundColor: '#FF69B4',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  productsContainer: {
    padding: 15,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    margin: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImageContainer: {
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  productColorPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 5,
  },
  productInfo: {
    padding: 15,
  },
  productBrand: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    lineHeight: 16,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  tryOnButton: {
    backgroundColor: '#FF69B4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tryOnButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});