import React, { useEffect } from 'react';
import { View, Text, AppState } from 'react-native';
import * as Location from 'expo-location';

const SalesRepView = () => {
  useEffect(() => {
    const startTracking = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Setup background location tracking
      await Location.startLocationUpdatesAsync('background-location-task', {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 10, // distance in meters
      });
    };

    startTracking();

    return () => {
      // Clean up location tracking
      Location.stopLocationUpdatesAsync('background-location-task');
    };
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
        console.log('App is in the background');
        // Optionally, notify the user or take action
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <View>
      <Text>Wecome to DSL</Text>
    </View>
  );
};

export default SalesRepView;
