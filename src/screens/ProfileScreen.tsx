import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserProfile, SavedLook, Appointment } from '../types';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }: any) {
  const [user] = useState<UserProfile>({
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    favoriteProducts: ['1', '3', '7'],
    savedLooks: [
      {
        id: '1',
        name: 'Everyday Natural',
        products: [],
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Evening Glam',
        products: [],
        createdAt: '2024-01-12',
      },
      {
        id: '3',
        name: 'Bridal Look',
        products: [],
        createdAt: '2024-01-10',
      },
    ],
    appointments: ['1', '2'],
  });

  const [upcomingAppointments] = useState<Appointment[]>([
    {
      id: '1',
      serviceId: '2',
      date: '2024-02-15',
      time: '14:00',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@email.com',
      customerPhone: '+1 (555) 123-4567',
      status: 'confirmed',
    },
    {
      id: '2',
      serviceId: '4',
      date: '2024-02-20',
      time: '10:00',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@email.com',
      customerPhone: '+1 (555) 123-4567',
      status: 'pending',
    },
  ]);

  const profileOptions = [
    {
      id: 'appointments',
      title: 'My Appointments',
      subtitle: `${upcomingAppointments.length} upcoming`,
      icon: 'event',
      color: '#FF69B4',
      onPress: () => Alert.alert('Appointments', 'View your upcoming appointments'),
    },
    {
      id: 'favorites',
      title: 'Favorite Products',
      subtitle: `${user.favoriteProducts.length} items`,
      icon: 'favorite',
      color: '#FF6347',
      onPress: () => navigation.navigate('Products'),
    },
    {
      id: 'history',
      title: 'Booking History',
      subtitle: 'View past appointments',
      icon: 'history',
      color: '#9370DB',
      onPress: () => Alert.alert('History', 'View your booking history'),
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Account & preferences',
      icon: 'settings',
      color: '#20B2AA',
      onPress: () => Alert.alert('Settings', 'Configure your account settings'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get assistance',
      icon: 'help',
      color: '#FFB6C1',
      onPress: () => Alert.alert('Help', 'Contact our support team'),
    },
  ];

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality would be implemented here');
  };

  const handleSavedLookPress = (look: SavedLook) => {
    Alert.alert(
      look.name,
      `Created on ${new Date(look.createdAt).toLocaleDateString()}`,
      [
        {
          text: 'Try Again',
          onPress: () => navigation.navigate('Try-On'),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Alert.alert('Deleted', `${look.name} has been deleted`),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FFB6C1', '#FF69B4']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Icon name="person" size={60} color="#FFFFFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userPhone}>{user.phone}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Icon name="edit" size={20} color="#FF69B4" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Looks</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {user.savedLooks.map((look) => (
              <TouchableOpacity
                key={look.id}
                style={styles.lookCard}
                onPress={() => handleSavedLookPress(look)}
              >
                <View style={styles.lookImage}>
                  <Icon name="face" size={40} color="#FFB6C1" />
                </View>
                <Text style={styles.lookName}>{look.name}</Text>
                <Text style={styles.lookDate}>
                  {new Date(look.createdAt).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.lookCard, styles.addLookCard]}
              onPress={() => navigation.navigate('Try-On')}
            >
              <View style={styles.lookImage}>
                <Icon name="add" size={40} color="#666" />
              </View>
              <Text style={styles.lookName}>Create New</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          {upcomingAppointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentDate}>
                  {new Date(appointment.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
                <Text style={styles.appointmentTime}>{appointment.time}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: appointment.status === 'confirmed' ? '#4CAF50' : '#FF9800' }
                ]}>
                  <Text style={styles.statusText}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.appointmentAction}>
                <Icon name="arrow-forward-ios" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {profileOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={option.onPress}
            >
              <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                <Icon name={option.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Icon name="arrow-forward-ios" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Icon name="logout" size={20} color="#FF6B6B" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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
    paddingTop: 0,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  lookCard: {
    width: 100,
    marginRight: 15,
    alignItems: 'center',
  },
  addLookCard: {
    opacity: 0.7,
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
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  lookDate: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  appointmentAction: {
    padding: 5,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  signOutText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});