// This file contains code snippets for educational display
// These are slightly simplified for readability

export const torusCode = `import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTorusStore, ShapeMode } from "../lib/stores/useTorusStore";
import { MeshTransmissionMaterial } from "@react-three/drei";

const Torus: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const {
    color,
    wireframe,
    tubeRadius,
    radius,
    radialSegments,
    tubularSegments,
    rotationSpeed,
    autoRotate,
    isAnimating,
    shapeMode,
  } = useTorusStore();

  // Animation to pulse the torus
  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Apply rotation based on the animation state and speed settings
    if (isAnimating || autoRotate) {
      mesh.current.rotation.x += rotationSpeed * delta * 0.3;
      mesh.current.rotation.y += rotationSpeed * delta * 0.5;
    }
    
    // Optional pulse animation
    if (isAnimating) {
      const time = state.clock.getElapsedTime();
      mesh.current.scale.x = 1 + Math.sin(time * 2) * 0.05;
      mesh.current.scale.y = 1 + Math.sin(time * 2) * 0.05;
      mesh.current.scale.z = 1 + Math.sin(time * 2) * 0.05;
    } else {
      // Reset scale when not animating
      mesh.current.scale.set(1, 1, 1);
    }
  });

  // Reset rotation when properties change
  useEffect(() => {
    if (mesh.current) {
      mesh.current.rotation.set(0, 0, 0);
    }
  }, [shapeMode, radius, tubeRadius, tubularSegments, radialSegments]);

  // Generate different geometry based on selected shape mode
  const renderGeometry = () => {
    switch (shapeMode) {
      case ShapeMode.KNOT:
        return (
          <torusKnotGeometry
            args={[radius, tubeRadius, Math.round(tubularSegments * 2), Math.round(radialSegments)]}
          />
        );
      case ShapeMode.WEIRD:
        return (
          <dodecahedronGeometry
            args={[radius, Math.round(radialSegments / 8)]}
          />
        );
      case ShapeMode.TORUS:
      default:
        return (
          <torusGeometry
            args={[radius, tubeRadius, Math.round(radialSegments), Math.round(tubularSegments)]}
          />
        );
    }
  };

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      {renderGeometry()}
      
      {wireframe ? (
        <meshStandardMaterial
          color={color}
          wireframe={true}
          roughness={0.3}
          metalness={0.7}
        />
      ) : (
        <MeshTransmissionMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          thickness={0.5}
          transmission={0.6}
          clearcoat={1}
          clearcoatRoughness={0.2}
          reflectivity={0.5}
          ior={1.5}
          chromaticAberration={0.04}
        />
      )}
    </mesh>
  );
};

export default Torus;`;

export const sceneCode = `import React, { useRef } from "react";
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

export default Scene;`;

export const controlsCode = `// Simplified version of the Controls component
import React from "react";
import { useTorusStore } from "../lib/stores/useTorusStore";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Toggle } from "./ui/toggle";
import { useAudio } from "../lib/stores/useAudio";

export const Controls: React.FC = () => {
  const {
    color,
    setColor,
    wireframe,
    setWireframe,
    radius,
    setRadius,
    tubeRadius,
    setTubeRadius,
    // ... other properties omitted for brevity
  } = useTorusStore();

  const { playHit } = useAudio();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    playHit();
  };

  return (
    <div className="controls-container">
      {/* Color control */}
      <div className="control-group">
        <Label htmlFor="color">Color</Label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={handleColorChange}
          className="color-picker"
        />
      </div>
      
      {/* Radius slider */}
      <div className="control-group">
        <Label htmlFor="radius">Radius: {radius.toFixed(1)}</Label>
        <Slider
          id="radius"
          min={0.5}
          max={3}
          step={0.1}
          value={[radius]}
          onValueChange={(value) => {
            setRadius(value[0]);
            playHit();
          }}
        />
      </div>
      
      {/* Tube radius slider */}
      <div className="control-group">
        <Label htmlFor="tubeRadius">Tube Radius: {tubeRadius.toFixed(2)}</Label>
        <Slider
          id="tubeRadius"
          min={0.1}
          max={1}
          step={0.05}
          value={[tubeRadius]}
          onValueChange={(value) => {
            setTubeRadius(value[0]);
            playHit();
          }}
        />
      </div>
      
      {/* Wireframe toggle */}
      <div className="control-group">
        <Switch
          id="wireframe"
          checked={wireframe}
          onCheckedChange={(checked) => {
            setWireframe(checked);
            playHit();
          }}
        />
        <Label htmlFor="wireframe">Wireframe Mode</Label>
      </div>
      
      {/* More controls would be here... */}
    </div>
  );
};

export default Controls;`;
