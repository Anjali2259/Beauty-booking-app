#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎨 Beauty Try-Ons App - Quick Test\n');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'App.tsx',
  'src/screens/HomeScreen.tsx',
  'src/screens/CameraScreen.tsx',
  'src/screens/ProductsScreen.tsx',
  'src/screens/ServicesScreen.tsx',
  'src/screens/BookingScreen.tsx',
  'src/screens/ProfileScreen.tsx',
  'src/types/index.ts',
  'src/utils/faceDetection.ts',
  'src/utils/storage.ts'
];

let allFilesExist = true;

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json dependencies
console.log('\n📦 Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
  'expo',
  'expo-camera',
  'expo-face-detector',
  'react',
  'react-native',
  '@react-navigation/native',
  '@react-navigation/bottom-tabs',
  'react-native-vector-icons'
];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`✅ ${dep} - ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} - MISSING`);
    allFilesExist = false;
  }
});

// Check if node_modules exists
console.log('\n🔧 Checking installation...');
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules directory exists');
} else {
  console.log('❌ node_modules directory missing - run npm install');
  allFilesExist = false;
}

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('🎉 All checks passed! Your Beauty Try-Ons app is ready!');
  console.log('\nNext steps:');
  console.log('1. Run: npm start');
  console.log('2. Test on device with Expo Go app');
  console.log('3. Check camera permissions');
  console.log('4. Test face detection');
  console.log('\nSee NEXT_STEPS.md for detailed guidance.');
} else {
  console.log('❌ Some issues found. Please check the missing files/dependencies.');
}

console.log('='.repeat(50));