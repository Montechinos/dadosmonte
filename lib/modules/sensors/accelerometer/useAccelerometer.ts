import { useState, useEffect } from 'react';
import { AccelerometerService } from './accelerometer.service';
import { Vector3 } from '@/lib/core/logic/motion';

export const useAccelerometer = () => {
  const [data, setData] = useState<Vector3>({ x: 0, y: 0, z: 0 });
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    let subscription: any;

    const initSensor = async () => {
      try {
        subscription = AccelerometerService.subscribe((sensorData) => {
          setData({
            x: sensorData.x,
            y: sensorData.y,
            z: sensorData.z,
          });
        });
      } catch (error) {
        console.error('Error al inicializar acelerómetro:', error);
        setIsAvailable(false);
      }
    };

    initSensor();

    return () => {
      AccelerometerService.unsubscribe(subscription);
    };
  }, []);

  return { data, isAvailable };
};