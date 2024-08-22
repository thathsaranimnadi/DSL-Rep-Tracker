import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import BackgroundJob from 'react-native-background-actions';

export default function SalesRepView() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getPermissionsAndLocation = async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);

      if (currentLocation) {
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude
        });
        setAddress(reverseGeocode[0]);
        console.log("Address:", reverseGeocode[0]);
      }
    };

    getPermissionsAndLocation();
  }, []);
  /*
  useEffect(() => {
    const startBackgroundTask = async () => {
      await BackgroundJob.start(backgroundTask, options);
      console.log('Background task started');
    };

    startBackgroundTask();

    return () => {
      BackgroundJob.stop();
      console.log('Background task stopped');
    };
  }, []);
  */
 /*
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
*/
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
}

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


/*
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

  
*/
 
/*
const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const backgroundTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
        for (let i = 0; BackgroundJob.isRunning(); i++) {
            let location = await Location.getCurrentPositionAsync({});
            console.log('Location in background:', location);

            // Save location to Firebase or another database here

            await sleep(delay); // Wait for the given delay before repeating
        }
    });
};

const options = {
  taskName: 'Location Tracking',
  taskTitle: 'Tracking Your Location',
  taskDesc: 'We are tracking your location in the background.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourapp://tracking', // Deep link for your app
  parameters: {
    delay: 15000, // 15 seconds
  },
};
*/