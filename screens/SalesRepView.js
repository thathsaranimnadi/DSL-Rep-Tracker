import React, { useEffect, useState } from 'react';
import { View, Text, AppState, StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';

const SalesRepView = () => {
  const [locationGranted, setLocationGranted] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      setLocationGranted(true);

      await Location.startLocationUpdatesAsync('background-location-task', {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 10,
      });
    };

    requestLocationPermission();

    return () => {
      Location.stopLocationUpdatesAsync('background-location-task');
    };
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        console.log('App is in the background');
        ToastAndroid.show('Please return to the app!', ToastAndroid.LONG);

        // Optionally: use a timer to bring the app to the foreground
        // This approach is aggressive and may frustrate users
        setTimeout(() => {
          AppState.currentState === 'background' && AppState.addEventListener('focus', () => {});
        }, 1000);
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        console.log('Network is disconnected');
        // Notify the admin
      }
    });

    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    const backAction = () => {
      console.log("Back button pressed");
      return true; // Prevent the default back button behavior
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/welcome.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.title}>Welcome to Douglas & Sons</Text>
      <Text style={styles.subtitle}>Thank you for joining with us!</Text>
    </View>
  );
};

export default SalesRepView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffd8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  animation: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop: 10,
  },
});
