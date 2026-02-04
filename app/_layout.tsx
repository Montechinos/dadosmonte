import "@/global.css";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="games/dice" 
          options={{ 
            title: "Magic Dice",
            headerStyle: { backgroundColor: '#7c3aed' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="games/burger" 
          options={{ 
            title: "Burger Builder",
            headerStyle: { backgroundColor: '#d97706' },
            headerTintColor: '#fff',
          }} 
        />
      </Stack>
    </GestureHandlerRootView>
  );
}