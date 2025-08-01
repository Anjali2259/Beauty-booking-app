import { FaceLandmarks } from '../types';

export const calculateFacePosition = (face: any) => {
  if (!face || !face.bounds) return null;
  
  return {
    x: face.bounds.origin.x,
    y: face.bounds.origin.y,
    width: face.bounds.size.width,
    height: face.bounds.size.height,
  };
};

export const calculateLipPosition = (face: any) => {
  const facePosition = calculateFacePosition(face);
  if (!facePosition) return null;
  
  // Approximate lip position based on face bounds
  return {
    x: facePosition.x + facePosition.width * 0.35,
    y: facePosition.y + facePosition.height * 0.75,
    width: facePosition.width * 0.3,
    height: facePosition.height * 0.08,
  };
};

export const calculateEyePositions = (face: any) => {
  const facePosition = calculateFacePosition(face);
  if (!facePosition) return null;
  
  return {
    leftEye: {
      x: facePosition.x + facePosition.width * 0.2,
      y: facePosition.y + facePosition.height * 0.35,
      width: facePosition.width * 0.25,
      height: facePosition.height * 0.08,
    },
    rightEye: {
      x: facePosition.x + facePosition.width * 0.55,
      y: facePosition.y + facePosition.height * 0.35,
      width: facePosition.width * 0.25,
      height: facePosition.height * 0.08,
    },
  };
};

export const calculateCheekPositions = (face: any) => {
  const facePosition = calculateFacePosition(face);
  if (!facePosition) return null;
  
  return {
    leftCheek: {
      x: facePosition.x + facePosition.width * 0.15,
      y: facePosition.y + facePosition.height * 0.5,
      width: facePosition.width * 0.2,
      height: facePosition.height * 0.15,
    },
    rightCheek: {
      x: facePosition.x + facePosition.width * 0.65,
      y: facePosition.y + facePosition.height * 0.5,
      width: facePosition.width * 0.2,
      height: facePosition.height * 0.15,
    },
  };
};

export const hexToRgba = (hex: string, alpha: number = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(255, 255, 255, ${alpha})`;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const blendColors = (baseColor: string, overlayColor: string, intensity: number) => {
  // Simple color blending for makeup application
  const base = hexToRgba(baseColor, 1);
  const overlay = hexToRgba(overlayColor, intensity);
  
  return overlay; // Simplified - in a real app, you'd do proper color blending
};

export const adjustIntensity = (color: string, intensity: number) => {
  return hexToRgba(color, intensity);
};