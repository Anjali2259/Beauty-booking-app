# Beauty Try-Ons App

A comprehensive React Native beauty app that allows users to virtually try on makeup and hair colors before booking professional beauty services.

## Features

### 🎨 Virtual Try-On Technology
- **Real-time Face Detection**: Advanced face detection using Expo Face Detector
- **Makeup Filters**: Try on lipstick, foundation, eyeshadow, and blush
- **Hair Color Preview**: See how different hair colors look on you
- **Live Camera Feed**: Real-time application of beauty filters

### 💄 Product Catalog
- **Extensive Product Library**: Browse hundreds of beauty products
- **Category Filtering**: Filter by lips, face, eyes, and hair products
- **Favorite Products**: Save your favorite products for quick access
- **Product Details**: View prices, descriptions, and brand information

### 📅 Appointment Booking
- **Service Selection**: Choose from professional makeup, hair, skincare, and nail services
- **Calendar Integration**: Interactive calendar for appointment scheduling
- **Time Slot Selection**: Choose from available time slots
- **Customer Information**: Secure customer data collection
- **Booking Confirmation**: Instant booking confirmation and email notifications

### 👤 User Profile Management
- **Personal Profile**: Manage your personal information
- **Saved Looks**: Save and organize your favorite makeup looks
- **Appointment History**: Track your booking history
- **Favorites Management**: Organize your favorite products

### 🎨 Beautiful UI/UX
- **Modern Design**: Clean, intuitive interface with gradient backgrounds
- **Responsive Layout**: Optimized for all screen sizes
- **Smooth Animations**: Fluid transitions and interactions
- **Pink Theme**: Beautiful pink and gradient color scheme

## Technology Stack

- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **Expo Camera** for camera functionality
- **Expo Face Detector** for face detection and landmark tracking
- **React Navigation** for navigation
- **React Native Vector Icons** for beautiful icons
- **Linear Gradient** for stunning visual effects
- **AsyncStorage** for local data persistence
- **React Native Calendars** for appointment scheduling

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beauty-tryons-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI (if not already installed)**
   ```bash
   npm install -g expo-cli
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   - **iOS**: `npm run ios`
   - **Android**: `npm run android`
   - **Web**: `npm run web`

## Project Structure

```
beauty-tryons-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── ProductsScreen.tsx
│   │   ├── ServicesScreen.tsx
│   │   ├── BookingScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   └── utils/              # Utility functions
│       ├── faceDetection.ts
│       └── storage.ts
├── assets/                 # App assets (icons, images)
├── App.tsx                 # Main app component
├── package.json
├── tsconfig.json
├── babel.config.js
└── app.json
```

## Key Features Implementation

### Face Detection & AR Filters
The app uses Expo's Face Detector to identify facial features and apply makeup filters in real-time:

```typescript
// Real-time face detection
onFacesDetected={handleFacesDetected}
faceDetectorSettings={{
  mode: FaceDetector.FaceDetectorMode.fast,
  detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
  runClassifications: FaceDetector.FaceDetectorClassifications.none,
  minDetectionInterval: 100,
  tracking: true,
}}
```

### Virtual Makeup Application
- **Lipstick**: Applied to the mouth area using facial landmarks
- **Eyeshadow**: Applied to both eyes with color blending
- **Foundation**: Full face coverage with skin tone matching
- **Blush**: Applied to cheek areas for natural contouring

### Appointment Booking System
Complete booking flow with:
- Service selection with pricing and duration
- Interactive calendar for date selection
- Time slot availability
- Customer information collection
- Booking confirmation and notifications

## Permissions Required

### iOS
- **Camera**: For virtual try-on functionality
- **Photo Library**: For saving and sharing looks

### Android
- **CAMERA**: For virtual try-on functionality
- **READ_EXTERNAL_STORAGE**: For accessing saved images
- **WRITE_EXTERNAL_STORAGE**: For saving looks

## Future Enhancements

### Advanced AR Features
- **3D Face Mapping**: More accurate face detection and tracking
- **Hair Try-On**: Full hair style and color changes
- **Skin Analysis**: AI-powered skin analysis and recommendations
- **Virtual Nail Art**: Try on different nail designs

### Social Features
- **Look Sharing**: Share your virtual looks on social media
- **Community**: Connect with other beauty enthusiasts
- **Reviews**: Rate and review products and services
- **Tutorials**: In-app beauty tutorials and tips

### AI Integration
- **Personalized Recommendations**: AI-powered product suggestions
- **Skin Tone Analysis**: Automatic skin tone detection for better matches
- **Style Matching**: Outfit and makeup coordination suggestions
- **Trend Prediction**: Stay updated with latest beauty trends

### Business Features
- **Salon Dashboard**: Professional dashboard for beauty salons
- **Inventory Management**: Track product availability
- **Staff Scheduling**: Manage beautician schedules
- **Payment Integration**: In-app payment processing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions, suggestions, or support, please contact the development team.

---

**Built with ❤️ for beauty enthusiasts and professionals** 
