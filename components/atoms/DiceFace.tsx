import React from 'react';
import { View, Text, Animated } from 'react-native';

interface DiceFaceProps {
  value: number;
  isRolling?: boolean;
  rotateAnim?: Animated.Value;
}

const diceEmojis: { [key: number]: string } = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅'
};

export const DiceFace: React.FC<DiceFaceProps> = ({ 
  value, 
  isRolling = false,
  rotateAnim 
}) => {
  const getAnimationStyle = () => {
    if (!rotateAnim) return {};
    
    const spin = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return {
      transform: [{ rotate: isRolling ? spin : '0deg' }]
    };
  };

  return (
    <View className="mb-8 items-center">
      <View className="absolute w-72 h-72 bg-purple-500 rounded-3xl opacity-30" />
      <Animated.View 
        className="w-72 h-72 bg-slate-800/80 rounded-3xl border border-purple-500/30 items-center justify-center shadow-2xl"
        style={getAnimationStyle()}
      >
        <Text className="text-9xl mb-4">
          {diceEmojis[value]}
        </Text>
        <Text className="text-6xl font-bold text-purple-400">
          {value}
        </Text>
      </Animated.View>
    </View>
  );
};