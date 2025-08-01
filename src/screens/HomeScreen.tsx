import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const featuredServices = [
    {
      id: '1',
      name: 'Virtual Makeup Try-On',
      description: 'Try different makeup looks instantly',
      icon: 'face-retouching-natural',
      color: ['#FF69B4', '#FFB6C1'],
      action: () => navigation.navigate('Try-On'),
    },
    {
      id: '2',
      name: 'Hair Color Preview',
      description: 'See how different hair colors look on you',
      icon: 'palette',
      color: ['#9370DB', '#DDA0DD'],
      action: () => navigation.navigate('Try-On'),
    },
    {
      id: '3',
      name: 'Book Services',
      description: 'Schedule your beauty appointments',
      icon: 'event',
      color: ['#20B2AA', '#87CEEB'],
      action: () => navigation.navigate('Services'),
    },
  ];

  const quickActions = [
    { name: 'Lipstick', icon: 'favorite', color: '#FF1493' },
    { name: 'Foundation', icon: 'face', color: '#DEB887' },
    { name: 'Eyeshadow', icon: 'remove-red-eye', color: '#9370DB' },
    { name: 'Hair Color', icon: 'brush', color: '#FF6347' },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FFB6C1', '#FF69B4']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Beauty Try-Ons</Text>
        <Text style={styles.headerSubtitle}>
          Discover your perfect look before your appointment
        </Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Services</Text>
        {featuredServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={service.action}
          >
            <LinearGradient
              colors={service.color}
              style={styles.serviceGradient}
            >
              <Icon name={service.icon} size={40} color="#FFFFFF" />
              <View style={styles.serviceContent}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </View>
              <Icon name="arrow-forward-ios" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Try-On</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickActionCard, { borderColor: action.color }]}
              onPress={() => navigation.navigate('Try-On')}
            >
              <Icon name={action.icon} size={30} color={action.color} />
              <Text style={styles.quickActionText}>{action.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Looks</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.lookCard}>
              <View style={styles.lookImage}>
                <Icon name="face" size={40} color="#FFB6C1" />
              </View>
              <Text style={styles.lookName}>Look {item}</Text>
            </View>
          ))}
        </ScrollView>
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
    paddingTop: 50,
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  serviceCard: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
  },
  serviceContent: {
    flex: 1,
    marginLeft: 15,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  lookCard: {
    width: 100,
    marginRight: 15,
    alignItems: 'center',
  },
  lookImage: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lookName: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});