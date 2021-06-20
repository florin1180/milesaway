  
import { useState, useEffect } from 'react';
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  watchPositionAsync
} from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        // const { granted } = await requestBackgroundPermissionsAsync();
        const { granted } = await requestForegroundPermissionsAsync()
        // if (!granted) {
        //   throw new Error('Location permission not granted');
        // }
        // if (granted) {
        //   await requestBackgroundPermissionsAsync();
        // }else {
        //   throw new Error('Location permission not granted');
        // }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        );
      } catch (e) {
        setErr(e);
      }
    };

    

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};