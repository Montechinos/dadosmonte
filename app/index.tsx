import "@/global.css";
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function DiceRoller() {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const rotateAnim = new Animated.Value(0);

  const diceEmojis: { [key: number]: string } = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅'
  };

  useEffect(() => {
    let subscription;
    
    Accelerometer.setUpdateInterval(100);
    
    subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      
      if (acceleration > 2.5 && !isRolling) {
        rollDice();
      }
    });

    return () => subscription && subscription.remove();
  }, [isRolling]);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setShakeCount(prev => prev + 1);

    // Animación de rotación
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ).start();

    let iterations = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      iterations++;

      if (iterations >= 10) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        rotateAnim.setValue(0);
        setIsRolling(false);
      }
    }, 100);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View className="flex-1 bg-slate-900 items-center justify-center p-6">
      {/* Particles decorativos */}
      <View className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full opacity-60" />
      <View className="absolute top-40 right-20 w-3 h-3 bg-pink-400 rounded-full opacity-60" />
      <View className="absolute bottom-48 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60" />
      <View className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-300 rounded-full opacity-60" />

      <View className="w-full max-w-md">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-5xl font-bold text-purple-400 mb-2">
            Dice Roller
          </Text>
          <Text className="text-purple-300 text-sm">
            Agita tu teléfono para lanzar
          </Text>
        </View>

        {/* Dado */}
        <View className="mb-8 items-center">
          <View className="absolute w-72 h-72 bg-purple-500 rounded-3xl opacity-30 blur-xl" />
          <Animated.View 
            className="w-72 h-72 bg-slate-800/80 rounded-3xl border border-purple-500/30 items-center justify-center shadow-2xl"
            style={{ transform: [{ rotate: isRolling ? spin : '0deg' }] }}
          >
            <Text className="text-9xl mb-4">
              {diceEmojis[diceValue]}
            </Text>
            <Text className="text-6xl font-bold text-purple-400">
              {diceValue}
            </Text>
          </Animated.View>
        </View>

        {/* Botón manual */}
        <TouchableOpacity
          onPress={rollDice}
          disabled={isRolling}
          className={`w-full py-4 px-8 rounded-2xl shadow-lg ${
            isRolling 
              ? 'bg-gray-600' 
              : 'bg-purple-600 active:bg-purple-500'
          }`}
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-bold text-center">
            {isRolling ? 'Lanzando...' : '🎲 Lanzar Dado'}
          </Text>
        </TouchableOpacity>

        {/* Stats */}
        <View className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-purple-500/20">
          <View className="items-center">
            <Text className="text-purple-300 text-sm mb-1">
              Total de lanzamientos
            </Text>
            <Text className="text-3xl font-bold text-purple-400">
              {shakeCount}
            </Text>
          </View>
        </View>

        {/* Info */}
        <Text className="mt-6 text-purple-300/60 text-xs text-center">
          💡 Agita tu dispositivo para lanzar el dado automáticamente
        </Text>
      </View>
    </View>
  );
}