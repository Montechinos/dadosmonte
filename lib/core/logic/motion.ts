import { SHAKE_THRESHOLD } from '../constants';

// Definición del tipo de dato (X, Y, Z)
export type Vector3 = { x: number; y: number; z: number };

/**
 * Calcula la magnitud euclidiana del vector de aceleración
 * @param data Vector con coordenadas x, y, z del acelerómetro
 * @returns Magnitud total de la aceleración
 */
export const calculateMagnitude = (data: Vector3): number => {
  return Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
};

/**
 * Determina si el dispositivo está siendo sacudido
 * @param data Vector con coordenadas x, y, z del acelerómetro
 * @returns true si la magnitud supera el umbral definido
 */
export const isShaking = (data: Vector3): boolean => {
  const magnitude = calculateMagnitude(data);
  return magnitude > SHAKE_THRESHOLD;
};