import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BeautyProduct, CameraFilter } from '../types';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.front);
  const [faces, setFaces] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<CameraFilter[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'makeup' | 'hair'>('makeup');
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleFacesDetected = ({ faces }: { faces: any[] }) => {
    setFaces(faces);
  };

  const makeupProducts = [
    { id: '1', name: 'Red Lipstick', color: '#DC143C', type: 'lipstick' },
    { id: '2', name: 'Pink Lipstick', color: '#FF69B4', type: 'lipstick' },
    { id: '3', name: 'Coral Lipstick', color: '#FF7F50', type: 'lipstick' },
    { id: '4', name: 'Light Foundation', color: '#F5DEB3', type: 'foundation' },
    { id: '5', name: 'Medium Foundation', color: '#DEB887', type: 'foundation' },
    { id: '6', name: 'Dark Foundation', color: '#D2691E', type: 'foundation' },
    { id: '7', name: 'Purple Eyeshadow', color: '#9370DB', type: 'eyeshadow' },
    { id: '8', name: 'Blue Eyeshadow', color: '#4169E1', type: 'eyeshadow' },
    { id: '9', name: 'Gold Eyeshadow', color: '#FFD700', type: 'eyeshadow' },
  ];

  const hairColors = [
    { id: '1', name: 'Blonde', color: '#F0E68C', type: 'hair' },
    { id: '2', name: 'Brunette', color: '#8B4513', type: 'hair' },
    { id: '3', name: 'Red', color: '#DC143C', type: 'hair' },
    { id: '4', name: 'Black', color: '#000000', type: 'hair' },
    { id: '5', name: 'Purple', color: '#9370DB', type: 'hair' },
    { id: '6', name: 'Pink', color: '#FF69B4', type: 'hair' },
  ];

  const toggleFilter = (product: any) => {
    const filterId = `${product.type}_${product.id}`;
    const existingFilter = activeFilters.find(f => f.id === filterId);
    
    if (existingFilter) {
      setActiveFilters(activeFilters.filter(f => f.id !== filterId));
    } else {
      // Remove existing filters of the same type
      const newFilters = activeFilters.filter(f => f.type !== product.type);
      newFilters.push({
        id: filterId,
        name: product.name,
        type: product.type,
        intensity: 0.7,
        color: product.color,
        enabled: true,
      });
      setActiveFilters(newFilters);
    }
  };

  const renderFaceOverlay = () => {
    if (!faces.length) return null;

    return faces.map((face, index) => {
      const faceBox = face.bounds;
      
      return (
        <View key={index} style={[styles.faceOverlay, {
          left: faceBox.origin.x,
          top: faceBox.origin.y,
          width: faceBox.size.width,
          height: faceBox.size.height,
        }]}>
          {/* Render makeup filters based on face landmarks */}
          {activeFilters.map((filter) => {
            if (filter.type === 'lipstick') {
              return (
                <View
                  key={filter.id}
                  style={[styles.lipstickOverlay, {
                    backgroundColor: filter.color,
                    opacity: filter.intensity,
                    bottom: faceBox.size.height * 0.15,
                    left: faceBox.size.width * 0.35,
                    width: faceBox.size.width * 0.3,
                    height: faceBox.size.height * 0.08,
                  }]}
                />
              );
            }
            if (filter.type === 'eyeshadow') {
              return (
                <View key={filter.id}>
                  <View
                    style={[styles.eyeshadowOverlay, {
                      backgroundColor: filter.color,
                      opacity: filter.intensity * 0.6,
                      top: faceBox.size.height * 0.35,
                      left: faceBox.size.width * 0.2,
                      width: faceBox.size.width * 0.25,
                      height: faceBox.size.height * 0.08,
                    }]}
                  />
                  <View
                    style={[styles.eyeshadowOverlay, {
                      backgroundColor: filter.color,
                      opacity: filter.intensity * 0.6,
                      top: faceBox.size.height * 0.35,
                      right: faceBox.size.width * 0.2,
                      width: faceBox.size.width * 0.25,
                      height: faceBox.size.height * 0.08,
                    }]}
                  />
                </View>
              );
            }
            return null;
          })}
        </View>
      );
    });
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        {renderFaceOverlay()}
        
        <View style={styles.topControls}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <Icon name="flip-camera-ios" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomControls}>
          <View style={styles.categoryTabs}>
            <TouchableOpacity
              style={[
                styles.categoryTab,
                selectedCategory === 'makeup' && styles.activeCategoryTab,
              ]}
              onPress={() => setSelectedCategory('makeup')}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === 'makeup' && styles.activeCategoryTabText,
                ]}
              >
                Makeup
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.categoryTab,
                selectedCategory === 'hair' && styles.activeCategoryTab,
              ]}
              onPress={() => setSelectedCategory('hair')}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === 'hair' && styles.activeCategoryTabText,
                ]}
              >
                Hair
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            {(selectedCategory === 'makeup' ? makeupProducts : hairColors).map((product) => {
              const isActive = activeFilters.some(f => f.id === `${product.type}_${product.id}`);
              return (
                <TouchableOpacity
                  key={product.id}
                  style={[
                    styles.productButton,
                    { backgroundColor: product.color },
                    isActive && styles.activeProductButton,
                  ]}
                  onPress={() => toggleFilter(product)}
                >
                  {isActive && (
                    <Icon name="check" size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  topControls: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
    padding: 10,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryTabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryTab: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  activeCategoryTab: {
    backgroundColor: '#FF69B4',
  },
  categoryTabText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  activeCategoryTabText: {
    color: '#FFFFFF',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeProductButton: {
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  faceOverlay: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255, 105, 180, 0.5)',
    borderRadius: 5,
  },
  lipstickOverlay: {
    position: 'absolute',
    borderRadius: 10,
  },
  eyeshadowOverlay: {
    position: 'absolute',
    borderRadius: 8,
  },
});