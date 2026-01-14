import React from 'react';
import { Text } from 'react-native';

interface InfoTextProps {
  text: string;
  icon?: string;
}

export const InfoText: React.FC<InfoTextProps> = ({ 
  text,
  icon = '💡'
}) => {
  return (
    <Text className="mt-6 text-purple-300/60 text-xs text-center">
      {icon} {text}
    </Text>
  );
};