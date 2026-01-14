import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { useAccelerometer } from '@/lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking } from '@/lib/core/logic/motion';
import { DiceButton } from '@/components/atoms/DiceButton';
import { DiceFace } from '@/components/atoms/DiceFace';
import { ParticleEffect } from '@/components/atoms/ParticleEffect';
import { DiceHeader } from '@/components/molecules/DiceHeader';
import { StatsCard } from '@/components/molecules/StatsCard';
import { InfoText } from '@/components/molecules/InfoText';

export default function DiceRoller() {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const rotateAnim = new Animated.Value(0);
  
  const { data, isAvailable } = useAccelerometer();

  // Detectar shake automáticamente
  useEffect(() => {
    if (isAvailable && isShaking(data) && !isRolling) {
      rollDice();
    }
  }, [data, isRolling, isAvailable]);

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

  if (!isAvailable) {
    return (
      <View className="flex-1 bg-slate-900 items-center justify-center p-6">
        <Text className="text-white text-xl text-center">
          ⚠️ Acelerómetro no disponible en este dispositivo
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-900 items-center justify-center p-6">
      <ParticleEffect />

      <View className="w-full max-w-md">
        <DiceHeader />

        <DiceFace 
          value={diceValue} 
          isRolling={isRolling}
          rotateAnim={rotateAnim}
        />

        <DiceButton 
          onPress={rollDice}
          disabled={isRolling}
          isRolling={isRolling}
        />

        <StatsCard 
          label="Total de lanzamientos"
          value={shakeCount}
        />

        <InfoText text="Agita tu dispositivo para lanzar el dado automáticamente" />
      </View>
    </View>
  );
}