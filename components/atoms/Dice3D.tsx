import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { View } from 'react-native';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

interface DiceModelProps {
  value: number;
  isRolling: boolean;
}

function DiceModel({ value, isRolling }: DiceModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Cargar el modelo GLB - tipar correctamente el resultado
  const gltf = useGLTF(require('../../assets/Dice.glb')) as GLTF & { 
    scene: THREE.Group 
  };

  // Animación en cada frame
  useFrame(() => {
    if (!meshRef.current) return;

    if (isRolling) {
      // Girar mientras está rodando
      meshRef.current.rotation.x += 0.1;
      meshRef.current.rotation.y += 0.1;
      meshRef.current.rotation.z += 0.05;
    } else {
      // Mostrar el valor correcto
      const rotations: { [key: number]: [number, number, number] } = {
        1: [0, 0, 0],
        2: [0, Math.PI / 2, 0],
        3: [0, Math.PI, 0],
        4: [0, -Math.PI / 2, 0],
        5: [Math.PI / 2, 0, 0],
        6: [-Math.PI / 2, 0, 0],
      };

      const [x, y, z] = rotations[value];
      meshRef.current.rotation.x = x;
      meshRef.current.rotation.y = y;
      meshRef.current.rotation.z = z;
    }
  });

  return (
    <group ref={meshRef} scale={1}>
      <primitive object={gltf.scene} />
    </group>
  );
}

interface Dice3DProps {
  value: number;
  isRolling?: boolean;
}

export const Dice3D: React.FC<Dice3DProps> = ({ value, isRolling = false }) => {
  return (
    <View className="w-72 h-72 mb-8 rounded-3xl overflow-hidden bg-slate-800">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />
        
        <DiceModel value={value} isRolling={isRolling} />
      </Canvas>
    </View>
  );
};

// Precargar el modelo
useGLTF.preload(require('@/assets/Dice.glb'));