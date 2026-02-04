import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { View } from 'react-native';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib'; 

// Tipo para cada ingrediente
export type IngredientType = 
  | 'top-bun'
  | 'cheese'
  | 'pickle'
  | 'tomato'
  | 'lettuce'
  | 'patty'
  | 'bottom-bun';

interface IngredientProps {
  type: IngredientType;
  position: [number, number, number];
}

// Componente para cada ingrediente individual
function BurgerIngredient({ type, position }: IngredientProps) {
  // Mapeo de tipos a archivos GLB
  const modelPaths: Record<IngredientType, any> = {
    'top-bun': require('@/assets/burger/TopBun.glb'),
    'cheese': require('@/assets/burger/Cheese.glb'),
    'pickle': require('@/assets/burger/Pickle.glb'),
    'tomato': require('@/assets/burger/Tomato.glb'),
    'lettuce': require('@/assets/burger/Lettuce.glb'),
    'patty': require('@/assets/burger/Patty.glb'),
    'bottom-bun': require('@/assets/burger/BottomBun.glb'),
  };

  const gltf = useGLTF(modelPaths[type]) as GLTF & {
    scene: THREE.Group;
  };

  return (
    <group position={position}>
      <primitive object={gltf.scene.clone()} />
    </group>
  );
}

function RotatingGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

interface Burger3DProps {
  ingredients: IngredientType[];
}

export const Burger3D: React.FC<Burger3DProps> = ({ 
  ingredients
}) => {
  // Altura de cada ingrediente (ajusta según tus modelos GLB reales)
  const ingredientHeights: Record<IngredientType, number> = {
    'bottom-bun': 0.15,
    'patty': 0.12,
    'lettuce': 0.08,
    'tomato': 0.1,
    'pickle': 0.08,
    'cheese': 0.08,
    'top-bun': 0.15,
  };

  // Calcular posiciones apiladas desde el pan inferior (posición 0)
  let currentHeight = 0;
  const ingredientPositions = ingredients.map((ingredient, index) => {
    // La posición Y es donde EMPIEZA este ingrediente
    const position: [number, number, number] = [0, currentHeight + ingredientHeights[ingredient] / 2, 0];
    // Sumamos la altura completa del ingrediente para el siguiente
    currentHeight += ingredientHeights[ingredient];
    return { ingredient, position };
  });

  // Calcular altura total de la hamburguesa
  const totalHeight = currentHeight;
  
  // Offset para centrar: mover todo hacia abajo para que esté centrado en la cámara
  const offsetY = -totalHeight / 2;

  return (
    <View className="w-full h-96 rounded-3xl overflow-hidden bg-slate-800">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-3, 3, -3]} intensity={0.4} />

        <RotatingGroup>
          <group position={[0, offsetY, 0]}>
            {ingredientPositions.map((item, index) => (
              <BurgerIngredient
                key={`${item.ingredient}-${index}`}
                type={item.ingredient}
                position={item.position}
              />
            ))}
          </group>
        </RotatingGroup>
      </Canvas>
    </View>
  );
};

// Precargar todos los modelos GLB
useGLTF.preload(require('@/assets/burger/TopBun.glb'));
useGLTF.preload(require('@/assets/burger/Cheese.glb'));
useGLTF.preload(require('@/assets/burger/Pickle.glb'));
useGLTF.preload(require('@/assets/burger/Tomato.glb'));
useGLTF.preload(require('@/assets/burger/Lettuce.glb'));
useGLTF.preload(require('@/assets/burger/Patty.glb'));
useGLTF.preload(require('@/assets/burger/BottomBun.glb'));