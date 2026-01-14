import React from 'react';
import { View, Text } from 'react-native';

interface DiceHeaderProps {
  title?: string;
  subtitle?: string;
}

export const DiceHeader: React.FC<DiceHeaderProps> = ({ 
  title = 'Dice Roller',
  subtitle = 'Agita tu teléfono para lanzar'
}) => {
  return (
    <View className="items-center mb-8">
      <Text className="text-5xl font-bold text-purple-400 mb-2">
        {title}
      </Text>
      <Text className="text-purple-300 text-sm">
        {subtitle}
      </Text>
    </View>
  );
};