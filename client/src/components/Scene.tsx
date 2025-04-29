import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import Torus from "./Torus";
import { useTorusStore } from "../lib/stores/useTorusStore";

const Scene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { autoRotate } = useTorusStore();
  
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        {/* Camera setup with sensible defaults */}
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        
        {/* Orbit controls for camera manipulation */}
        <OrbitControls 
          autoRotate={autoRotate}
          autoRotateSpeed={1.5} 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={1024} 
        />
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.5} 
        />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* The 3D Torus */}
        <Torus />
      </Canvas>
    </div>
  );
};

export default Scene;
