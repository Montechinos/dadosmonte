import { Accelerometer } from 'expo-sensors';
import { SENSOR_UPDATE_INTERVAL } from '@/lib/core/constants';

export const AccelerometerService = {
  /**
   * Configura el intervalo de actualización del sensor
   * @param interval Intervalo en milisegundos (default: 100ms)
   */
  setUpdateInterval: (interval: number = SENSOR_UPDATE_INTERVAL) => {
    Accelerometer.setUpdateInterval(interval);
  },

  /**
   * Inicia la escucha del acelerómetro
   * @param callback Función que recibe los datos del sensor
   * @returns Subscription object para limpieza posterior
   */
  subscribe: (callback: (data: any) => void) => {
    AccelerometerService.setUpdateInterval();
    return Accelerometer.addListener(callback);
  },

  /**
   * Detiene la escucha del acelerómetro
   * @param subscription Objeto de suscripción a remover
   */
  unsubscribe: (subscription: any) => {
    if (subscription) {
      subscription.remove();
    }
  },
};