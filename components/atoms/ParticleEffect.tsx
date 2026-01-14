import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Particle {
  top?: number;
  bottom?: number;
  left?: number | string;
  right?: number | string;
  size: 'small' | 'medium';
  color: 'purple' | 'pink' | 'blue';
}

interface ParticleEffectProps {
  particles?: Particle[];
}

const defaultParticles: Particle[] = [
  { top: 80, left: 40, size: 'small', color: 'purple' },
  { top: 160, right: 80, size: 'medium', color: 'pink' },
  { bottom: 192, left: '25%', size: 'small', color: 'blue' },
  { top: 120, right: 120, size: 'small', color: 'purple' },
];

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ 
  particles = defaultParticles 
}) => {
  const getSizeClass = (size: 'small' | 'medium') => {
    return size === 'small' ? 'w-2 h-2' : 'w-3 h-3';
  };

  const getColorClass = (color: 'purple' | 'pink' | 'blue') => {
    const colors = {
      purple: 'bg-purple-400',
      pink: 'bg-pink-400',
      blue: 'bg-blue-400',
    };
    return colors[color];
  };

  return (
    <>
      {particles.map((particle, index) => {
        const positionStyle: any = {};
        
        if (particle.top !== undefined) positionStyle.top = particle.top;
        if (particle.bottom !== undefined) positionStyle.bottom = particle.bottom;
        if (particle.left !== undefined) positionStyle.left = particle.left;
        if (particle.right !== undefined) positionStyle.right = particle.right;

        return (
          <View
            key={index}
            className={`absolute ${getSizeClass(particle.size)} ${getColorClass(particle.color)} rounded-full opacity-60`}
            style={positionStyle}
          />
        );
      })}
    </>
  );
};