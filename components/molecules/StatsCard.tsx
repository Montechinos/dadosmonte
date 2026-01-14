import React from 'react';
import { View, Text } from 'react-native';

interface StatsCardProps {
  label: string;
  value: number | string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => {
  return (
    <View className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-purple-500/20">
      <View className="items-center">
        <Text className="text-purple-300 text-sm mb-1">
          {label}
        </Text>
        <Text className="text-3xl font-bold text-purple-400">
          {value}
        </Text>
      </View>
    </View>
  );
};