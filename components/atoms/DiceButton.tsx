import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface DiceButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isRolling?: boolean;
}

export const DiceButton: React.FC<DiceButtonProps> = ({ 
  onPress, 
  disabled = false,
  isRolling = false 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full py-4 px-8 rounded-2xl shadow-lg ${
        disabled 
          ? 'bg-gray-600' 
          : 'bg-purple-600 active:bg-purple-500'
      }`}
      activeOpacity={0.8}
    >
      <Text className="text-white text-lg font-bold text-center">
        {isRolling ? 'Lanzando...' : '🎲 Lanzar Dado'}
      </Text>
    </TouchableOpacity>
  );
};