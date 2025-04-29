import React, { useRef, useEffect } from "react";
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

export default Torus;
