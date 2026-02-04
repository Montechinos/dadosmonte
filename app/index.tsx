import "@/global.css";
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Dices, ChefHat } from 'lucide-react-native';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-900 items-center justify-center p-6">
      <View className="items-center mb-12">
        <Text className="text-5xl font-bold text-white mb-2">
          Juegos 3D
        </Text>
        <Text className="text-gray-400 text-center text-base">
          Elige tu juego favorito
        </Text>
      </View>

      <View className="w-full gap-4 px-4">
        {/* Botón Dado */}
        <TouchableOpacity
          onPress={() => router.push('/games/dice')}
          className="bg-purple-600 py-6 px-6 rounded-2xl shadow-lg active:bg-purple-500 flex-row items-center justify-between"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center flex-1">
            <View className="bg-purple-500 p-3 rounded-xl mr-4">
              <Dices size={32} color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold mb-1">
                Magic Dice
              </Text>
              <Text className="text-purple-200 text-sm">
                Agita tu teléfono y deja que la suerte decida
              </Text>
            </View>
          </View>
          <Text className="text-white text-3xl">→</Text>
        </TouchableOpacity>

        {/* Botón Hamburguesa */}
        <TouchableOpacity
          onPress={() => router.push('/games/burger')}
          className="bg-amber-600 py-6 px-6 rounded-2xl shadow-lg active:bg-amber-500 flex-row items-center justify-between"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center flex-1">
            <View className="bg-amber-500 p-3 rounded-xl mr-4">
              <ChefHat size={32} color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold mb-1">
                Burger Builder
              </Text>
              <Text className="text-amber-200 text-sm">
                Crea la hamburguesa perfecta apilando ingredientes
              </Text>
            </View>
          </View>
          <Text className="text-white text-3xl">→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}