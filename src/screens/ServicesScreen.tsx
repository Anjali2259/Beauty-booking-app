import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BeautyService } from '../types';

const { width } = Dimensions.get('window');

export default function ServicesScreen({ navigation }: any) {
  const services: BeautyService[] = [
    {
      id: '1',
      name: 'Professional Makeup Application',
      description: 'Full face makeup for special occasions, events, or photoshoots',
      duration: 60,
      price: 150,
      category: 'makeup',
      image: '',
    },
    {
      id: '2',
      name: 'Bridal Makeup',
      description: 'Complete bridal look including trial session and wedding day application',
      duration: 120,
      price: 300,
      category: 'makeup',
      image: '',
    },
    {
      id: '3',
      name: 'Hair Cut & Style',
      description: 'Professional hair cutting and styling service',
      duration: 90,
      price: 80,
      category: 'hair',
      image: '',
    },
    {
      id: '4',
      name: 'Hair Color & Highlights',
      description: 'Full color treatment with highlights and professional styling',
      duration: 180,
      price: 200,
      category: 'hair',
      image: '',
    },
    {
      id: '5',
      name: 'Hair Extensions',
      description: 'Professional hair extension application for length and volume',
      duration: 120,
      price: 250,
      category: 'hair',
      image: '',
    },
    {
      id: '6',
      name: 'Facial Treatment',
      description: 'Deep cleansing facial with moisturizing and anti-aging treatment',
      duration: 75,
      price: 120,
      category: 'skincare',
      image: '',
    },
    {
      id: '7',
      name: 'Manicure & Pedicure',
      description: 'Complete nail care with polish application and hand/foot treatment',
      duration: 90,
      price: 65,
      category: 'nails',
      image: '',
    },
    {
      id: '8',
      name: 'Gel Nail Extensions',
      description: 'Professional gel nail extensions with custom design',
      duration: 120,
      price: 85,
      category: 'nails',
      image: '',
    },
  ];

  const categoryColors = {
    makeup: ['#FF69B4', '#FFB6C1'],
    hair: ['#9370DB', '#DDA0DD'],
    skincare: ['#20B2AA', '#87CEEB'],
    nails: ['#FF6347', '#FFA07A'],
  };

  const categoryIcons = {
    makeup: 'face-retouching-natural',
    hair: 'brush',
    skincare: 'spa',
    nails: 'colorize',
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? mins + 'm' : ''}`;
    }
    return `${mins}m`;
  };

  const renderService = (service: BeautyService) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceCard}
      onPress={() => navigation.navigate('Booking', { service })}
    >
      <LinearGradient
        colors={categoryColors[service.category]}
        style={styles.serviceHeader}
      >
        <Icon 
          name={categoryIcons[service.category]} 
          size={30} 
          color="#FFFFFF" 
        />
        <View style={styles.serviceHeaderText}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceCategory}>
            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
          </Text>
        </View>
      </LinearGradient>
      
      <View style={styles.serviceBody}>
        <Text style={styles.serviceDescription}>
          {service.description}
        </Text>
        
        <View style={styles.serviceDetails}>
          <View style={styles.serviceDetailItem}>
            <Icon name="schedule" size={16} color="#666" />
            <Text style={styles.serviceDetailText}>
              {formatDuration(service.duration)}
            </Text>
          </View>
          
          <View style={styles.serviceDetailItem}>
            <Icon name="attach-money" size={16} color="#666" />
            <Text style={styles.serviceDetailText}>
              ${service.price}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[
            styles.bookButton,
            { backgroundColor: categoryColors[service.category][0] }
          ]}
          onPress={() => navigation.navigate('Booking', { service })}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
          <Icon name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, BeautyService[]>);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FFB6C1', '#FF69B4']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Beauty Services</Text>
        <Text style={styles.headerSubtitle}>
          Professional beauty treatments & services
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <View key={category} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Icon 
                name={categoryIcons[category as keyof typeof categoryIcons]} 
                size={24} 
                color={categoryColors[category as keyof typeof categoryColors][0]} 
              />
              <Text style={styles.categoryTitle}>
                {category.charAt(0).toUpperCase() + category.slice(1)} Services
              </Text>
            </View>
            
            {categoryServices.map(renderService)}
          </View>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Try our virtual try-on feature before booking your appointment!
          </Text>
          <TouchableOpacity
            style={styles.tryOnFooterButton}
            onPress={() => navigation.navigate('Try-On')}
          >
            <Text style={styles.tryOnFooterButtonText}>Virtual Try-On</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  header: {
    padding: 30,
    paddingTop: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  serviceHeaderText: {
    flex: 1,
    marginLeft: 15,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  serviceCategory: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  serviceBody: {
    padding: 20,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  serviceDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceDetailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 25,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  tryOnFooterButton: {
    backgroundColor: '#FF69B4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  tryOnFooterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});