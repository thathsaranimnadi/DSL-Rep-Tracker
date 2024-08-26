import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import BackgroundJob from 'react-native-background-actions';
import NetInfo from '@react-native-community/netinfo';
import { BackHandler } from 'react-native';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig'; // Firebase configuration
import { doc, updateDoc } from 'firebase/firestore';
import * as TaskManager from 'expo-task-manager';

export default function SalesRepView() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const uid = auth.currentUser.uid; // Get the current user's UID

  // Get location permission
  useEffect(() => {
    const getPermissionsAndLocation = async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }
      await Location.startLocationUpdatesAsync('background-location-task', {
        accuracy: Location.Accuracy.High,
        timeInterval: 900000, // 15 minutes in milliseconds
        distanceInterval: 0, // Receive updates as the user moves
      });

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:", currentLocation);

      if (currentLocation) {
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude
        });

        const formattedAddress = reverseGeocode[0]?.formattedAddress || " ";
        setAddress(formattedAddress);
        console.log("Address:", formattedAddress);

        // Store in Firestore
        try {
          await updateDoc(doc(db, 'Sales Rep', uid), {
            Latitude: currentLocation.coords.latitude,
            Longitude: currentLocation.coords.longitude,
            Address: formattedAddress, // Use formattedAddress here
            Timestamp: new Date() // Store the current timestamp
          });
          console.log("Location and address stored in Firestore.");
        } catch (error) {
          console.error("Error storing data in Firestore:", error);
        }
      }
    };

    getPermissionsAndLocation();
  }, []);

  TaskManager.defineTask('background-location-task', async ({ data, error }) => {
    if (error) {
        console.error(error);
        return;
    }
    if (data) {
        const { locations } = data;
        console.log('Received new locations', locations);
        // Handle the new locations here, e.g., send them to your server
    }
  });

  // Network disconnected
  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        console.log('Network is disconnected');
        // Notify the admin
      }
    });

    return () => unsubscribeNetInfo();
  }, []);

  // Disable back
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
