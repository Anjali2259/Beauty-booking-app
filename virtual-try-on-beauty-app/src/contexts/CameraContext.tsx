import React, { createContext, useContext, useReducer, useRef, useEffect, ReactNode } from 'react';
import { CameraSettings, CameraState, VideoStream, FaceDetection, Point } from '../types';

interface CameraContextType extends CameraState {
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  switchCamera: () => Promise<void>;
  takePicture: () => string | null;
  updateSettings: (settings: Partial<CameraSettings>) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

type CameraAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_STREAM'; payload: VideoStream }
  | { type: 'SET_FACE_DETECTION'; payload: FaceDetection | null }
  | { type: 'SET_SETTINGS'; payload: CameraSettings }
  | { type: 'SET_PERMISSION'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_CAMERA' };

const initialSettings: CameraSettings = {
  facingMode: 'user',
  width: 1280,
  height: 720,
  frameRate: 30,
  aspectRatio: 16 / 9
};

const initialState: CameraState = {
  isActive: false,
  stream: null,
  faceDetection: null,
  settings: initialSettings,
  permissionGranted: false,
  error: null
};

const cameraReducer = (state: CameraState, action: CameraAction): CameraState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isActive: action.payload };
    case 'SET_STREAM':
      return { ...state, stream: action.payload, isActive: action.payload.isActive, error: null };
    case 'SET_FACE_DETECTION':
      return { ...state, faceDetection: action.payload };
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    case 'SET_PERMISSION':
      return { ...state, permissionGranted: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isActive: false };
    case 'RESET_CAMERA':
      return { ...initialState, settings: state.settings };
    default:
      return state;
  }
};

const CameraContext = createContext<CameraContextType | null>(null);

export const CameraProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cameraReducer, initialState);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceDetectionWorkerRef = useRef<Worker | null>(null);
  const animationFrameRef = useRef<number>();

  // Initialize face detection worker
  useEffect(() => {
    const initFaceDetection = async () => {
      try {
        // In a real implementation, you would load face detection models here
        // For now, we'll simulate face detection
        console.log('Face detection initialized');
      } catch (error) {
        console.error('Failed to initialize face detection:', error);
      }
    };

    initFaceDetection();

    return () => {
      if (faceDetectionWorkerRef.current) {
        faceDetectionWorkerRef.current.terminate();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const checkCameraPermissions = async (): Promise<boolean> => {
    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      const granted = result.state === 'granted';
      dispatch({ type: 'SET_PERMISSION', payload: granted });
      return granted;
    } catch (error) {
      console.warn('Permission API not supported');
      return false;
    }
  };

  const startCamera = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Check permissions first
      await checkCameraPermissions();

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: state.settings.facingMode,
          width: { ideal: state.settings.width },
          height: { ideal: state.settings.height },
          frameRate: { ideal: state.settings.frameRate }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const videoStream: VideoStream = {
        stream,
        isActive: true,
        constraints
      };

      dispatch({ type: 'SET_STREAM', payload: videoStream });
      dispatch({ type: 'SET_PERMISSION', payload: true });

      // Start face detection loop
      startFaceDetection();

    } catch (error: any) {
      let errorMessage = 'Failed to access camera';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Camera access denied. Please allow camera permissions.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No camera found on this device.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Camera is already in use by another application.';
      }

      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Camera error:', error);
    }
  };

  const stopCamera = (): void => {
    if (state.stream?.stream) {
      state.stream.stream.getTracks().forEach(track => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    dispatch({ type: 'RESET_CAMERA' });
  };

  const switchCamera = async (): Promise<void> => {
    const newFacingMode = state.settings.facingMode === 'user' ? 'environment' : 'user';
    
    // Stop current camera
    stopCamera();
    
    // Update settings
    dispatch({ 
      type: 'SET_SETTINGS', 
      payload: { ...state.settings, facingMode: newFacingMode } 
    });
    
    // Start camera with new facing mode
    setTimeout(() => startCamera(), 100);
  };

  const takePicture = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return null;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Return base64 encoded image
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const updateSettings = (newSettings: Partial<CameraSettings>): void => {
    dispatch({ 
      type: 'SET_SETTINGS', 
      payload: { ...state.settings, ...newSettings } 
    });
  };

  const startFaceDetection = (): void => {
    const detectFaces = () => {
      if (!videoRef.current || !state.isActive) return;

      // Simulate face detection - in a real app, you'd use face-api.js or MediaPipe
      const mockFaceDetection: FaceDetection = {
        boundingBox: {
          x: 200,
          y: 150,
          width: 300,
          height: 400
        },
        landmarks: {
          contour: [],
          leftEye: [{ x: 250, y: 200 }],
          rightEye: [{ x: 350, y: 200 }],
          leftEyebrow: [],
          rightEyebrow: [],
          nose: [{ x: 300, y: 250 }],
          noseTip: [{ x: 300, y: 270 }],
          mouth: [{ x: 300, y: 320 }],
          jawLine: [],
          forehead: []
        },
        confidence: 0.95,
        rotation: {
          pitch: 0,
          yaw: 0,
          roll: 0
        },
        expressions: {
          neutral: 0.8,
          happy: 0.1,
          sad: 0.05,
          angry: 0.02,
          fearful: 0.01,
          disgusted: 0.01,
          surprised: 0.01
        }
      };

      dispatch({ type: 'SET_FACE_DETECTION', payload: mockFaceDetection });

      // Continue detection loop
      animationFrameRef.current = requestAnimationFrame(detectFaces);
    };

    detectFaces();
  };

  const contextValue: CameraContextType = {
    ...state,
    startCamera,
    stopCamera,
    switchCamera,
    takePicture,
    updateSettings,
    videoRef,
    canvasRef
  };

  return (
    <CameraContext.Provider value={contextValue}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = (): CameraContextType => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCamera must be used within a CameraProvider');
  }
  return context;
};