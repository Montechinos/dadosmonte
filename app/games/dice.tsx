import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAccelerometer } from '@/lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking } from '@/lib/core/logic/motion';
import { DiceButton } from '@/components/atoms/DiceButton';
import { Dice3D } from '@/components/atoms/Dice3D'; // ← Cambio aquí
import { ParticleEffect } from '@/components/atoms/ParticleEffect';
import { DiceHeader } from '@/components/molecules/DiceHeader';
import { StatsCard } from '@/components/molecules/StatsCard';
import { InfoText } from '@/components/molecules/InfoText';

export default function DiceRoller() {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  
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

    let iterations = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      iterations++;

      if (iterations >= 10) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setIsRolling(false);
      }
    }, 100);
  };

  if (!isAvailable) {
    return (
      <View className="flex-1 bg-slate-900 items-center justify-center p-6">
        <Text className="text-white text-xl text-center">
           Acelerómetro no disponible en este dispositivo
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-900 items-center justify-center p-6">
      <ParticleEffect />

      <View className="w-full max-w-md">
        <DiceHeader />

        <Dice3D 
          value={diceValue} 
          isRolling={isRolling}
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