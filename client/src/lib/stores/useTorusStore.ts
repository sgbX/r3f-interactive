import { create } from "zustand";

interface TorusState {
  // Appearance properties
  color: string;
  wireframe: boolean;
  
  // Geometry properties
  radius: number;
  tubeRadius: number;
  radialSegments: number;
  tubularSegments: number;
  
  // Animation properties
  rotationSpeed: number;
  autoRotate: boolean;
  isAnimating: boolean;
  
  // Mode toggle
  isKnotMode: boolean;
  
  // Actions
  setColor: (color: string) => void;
  setWireframe: (wireframe: boolean) => void;
  setRadius: (radius: number) => void;
  setTubeRadius: (tubeRadius: number) => void;
  setRadialSegments: (radialSegments: number) => void;
  setTubularSegments: (tubularSegments: number) => void;
  setRotationSpeed: (rotationSpeed: number) => void;
  setAutoRotate: (autoRotate: boolean) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setIsKnotMode: (isKnotMode: boolean) => void;
  resetToDefaults: () => void;
}

// Default values
const DEFAULT_VALUES = {
  color: "#1e88e5",  // Material blue color
  wireframe: false,
  radius: 1.5,
  tubeRadius: 0.4,
  radialSegments: 32,
  tubularSegments: 100,
  rotationSpeed: 1.0,
  autoRotate: true,
  isAnimating: true,
  isKnotMode: false,
};

export const useTorusStore = create<TorusState>((set) => ({
  // Initial state with default values
  ...DEFAULT_VALUES,
  
  // Setters
  setColor: (color: string) => set({ color }),
  setWireframe: (wireframe: boolean) => set({ wireframe }),
  setRadius: (radius: number) => set({ radius }),
  setTubeRadius: (tubeRadius: number) => set({ tubeRadius }),
  setRadialSegments: (radialSegments: number) => set({ radialSegments }),
  setTubularSegments: (tubularSegments: number) => set({ tubularSegments }),
  setRotationSpeed: (rotationSpeed: number) => set({ rotationSpeed }),
  setAutoRotate: (autoRotate: boolean) => set({ autoRotate }),
  setIsAnimating: (isAnimating: boolean) => set({ isAnimating }),
  setIsKnotMode: (isKnotMode: boolean) => set({ isKnotMode }),
  
  // Reset to defaults
  resetToDefaults: () => set(DEFAULT_VALUES),
}));
