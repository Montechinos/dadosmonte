import "@/global.css";
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-900 items-center justify-center p-6">
      <View className="items-center">
        <Text className="text-6xl mb-4">🎲</Text>
        <Text className="text-5xl font-bold text-purple-400 mb-4">
          Magic Dice
        </Text>
        <Text className="text-purple-300 text-center mb-8 px-8">
          Agita tu teléfono y deja que la suerte decida
        </Text>
        
        <TouchableOpacity
          onPress={() => router.push('/games/dice')}
          className="bg-purple-600 py-4 px-12 rounded-2xl shadow-lg active:bg-purple-500"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-bold">
            Comenzar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}