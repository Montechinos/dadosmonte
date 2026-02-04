import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Burger3D } from '@/components/atoms/Burger3D';
import { 
  Beef, 
  Slice, 
  Salad, 
  Cookie,
  Pizza,
  Apple,
  ChefHat,
  Trash2,
  RotateCcw
} from 'lucide-react-native';

type IngredientType = 
  | 'top-bun'
  | 'cheese'
  | 'pickle'
  | 'tomato'
  | 'lettuce'
  | 'patty'
  | 'bottom-bun';

export default function BurgerScreen() {
  const [ingredients, setIngredients] = useState<IngredientType[]>([
    'bottom-bun',
    'top-bun',
  ]);

  const MAX_INGREDIENTS = 10; // Límite máximo de ingredientes totales

  const addIngredient = (ingredient: IngredientType) => {
    // Verificar límite máximo
    if (ingredients.length >= MAX_INGREDIENTS) {
      return;
    }

    // Evitar agregar pan superior o inferior adicionales
    if (ingredient === 'top-bun' || ingredient === 'bottom-bun') {
      return;
    }
    
    // Insertar antes del pan superior
    const topBunIndex = ingredients.findIndex(i => i === 'top-bun');
    const newIngredients = [...ingredients];
    newIngredients.splice(topBunIndex, 0, ingredient);
    setIngredients(newIngredients);
  };

  const removeLastIngredient = () => {
    // No permitir remover si solo quedan los panes
    if (ingredients.length <= 2) {
      return;
    }
    
    // Encontrar el último ingrediente que no sea pan superior
    const topBunIndex = ingredients.findIndex(i => i === 'top-bun');
    const newIngredients = [...ingredients];
    newIngredients.splice(topBunIndex - 1, 1);
    setIngredients(newIngredients);
  };

  const resetBurger = () => {
    setIngredients(['bottom-bun', 'top-bun']);
  };

  const ingredientButtons: { 
    type: IngredientType; 
    label: string; 
    icon: React.ComponentType<any>;
    color: string;
  }[] = [
    { type: 'patty', label: 'Carne', icon: Beef, color: 'bg-red-600' },
    { type: 'cheese', label: 'Queso', icon: Slice, color: 'bg-yellow-600' },
    { type: 'lettuce', label: 'Lechuga', icon: Salad, color: 'bg-green-600' },
    { type: 'tomato', label: 'Tomate', icon: Apple, color: 'bg-red-500' },
    { type: 'pickle', label: 'Pepinillo', icon: Pizza, color: 'bg-green-700' },
  ];

  const getIngredientName = (type: IngredientType): string => {
    const names: Record<IngredientType, string> = {
      'bottom-bun': 'Pan Inferior',
      'patty': 'Carne',
      'cheese': 'Queso',
      'lettuce': 'Lechuga',
      'tomato': 'Tomate',
      'pickle': 'Pepinillo',
      'top-bun': 'Pan Superior',
    };
    return names[type];
  };

  return (
    <ScrollView 
      className="flex-1 bg-slate-900"
      showsVerticalScrollIndicator={true}
    >
      <View className="p-4">
        {/* Título */}
        <View className="flex-row items-center justify-center mb-4 mt-2">
          <ChefHat size={28} color="#fff" />
          <Text className="text-white text-2xl font-bold ml-2">
            Crea tu Hamburguesa
          </Text>
        </View>

        {/* Instrucciones de controles */}
        <View className="bg-blue-900/30 rounded-xl p-3 mb-3 border border-blue-700">
          <Text className="text-blue-200 text-xs text-center">
            ✨ Rotación automática • Máximo {MAX_INGREDIENTS} ingredientes
          </Text>
        </View>

        {/* Visualización 3D */}
        <Burger3D ingredients={ingredients} />

        {/* Lista de ingredientes actuales */}
        <View className="bg-slate-800 rounded-xl p-3 mb-3">
          <Text className="text-white text-base font-semibold mb-1">
            Ingredientes ({ingredients.length}):
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <View key={index} className="bg-slate-700 px-2 py-1 rounded-lg">
                <Text className="text-gray-300 text-xs">
                  {getIngredientName(ingredient)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Botones para agregar ingredientes */}
        <View className="mb-3">
          <Text className="text-white text-base font-semibold mb-2">
            Agregar ingrediente:
          </Text>
          <View className="gap-2">
            {ingredientButtons.map((button) => {
              const Icon = button.icon;
              const isDisabled = ingredients.length >= MAX_INGREDIENTS;
              
              return (
                <TouchableOpacity
                  key={button.type}
                  onPress={() => addIngredient(button.type)}
                  className={`${isDisabled ? 'bg-gray-600' : button.color} px-3 py-3 rounded-xl flex-row items-center justify-between`}
                  activeOpacity={0.7}
                  disabled={isDisabled}
                >
                  <View className="flex-row items-center">
                    <Icon size={20} color="#fff" />
                    <Text className="text-white font-semibold text-base ml-2">
                      {button.label}
                    </Text>
                  </View>
                  <Text className="text-white text-xl font-bold">+</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Controles */}
        <View className="flex-row gap-2 mb-6">
          <TouchableOpacity
            onPress={removeLastIngredient}
            className="flex-1 bg-red-600 px-3 py-3 rounded-xl flex-row items-center justify-center"
            activeOpacity={0.7}
            disabled={ingredients.length <= 2}
          >
            <Trash2 size={16} color="#fff" />
            <Text className="text-white font-semibold text-sm ml-1">
              Quitar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={resetBurger}
            className="flex-1 bg-gray-600 px-3 py-3 rounded-xl flex-row items-center justify-center"
            activeOpacity={0.7}
          >
            <RotateCcw size={16} color="#fff" />
            <Text className="text-white font-semibold text-sm ml-1">
              Reiniciar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}