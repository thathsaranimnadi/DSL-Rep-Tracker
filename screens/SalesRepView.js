import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import * as TaskManager from 'expo-task-manager';
import NetInfo from '@react-native-community/netinfo';
import { BackHandler } from 'react-native';
import { Timestamp } from 'firebase/firestore';

// Define the background task at the top-level scope
TaskManager.defineTask('background-location-task', async ({ data, error }) => {
  if (error) {
    console.error("Error in background task:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    if (locations && locations.length > 0) {
      const currentLocation = locations[0];
      console.log("Background Task - New Location:", currentLocation);

      // Reverse geocode to get the address
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const formattedAddress = reverseGeocode[0]?.formattedAddress || " ";
      const uid = auth.currentUser.uid;

      // Store the updated location in Firestore and add to Location History subcollection
      try {
        // Update main document
        await updateDoc(doc(db, 'Sales Rep', uid), {
          Latitude: currentLocation.coords.latitude,
          Longitude: currentLocation.coords.longitude,
          Address: formattedAddress,
          Timestamp: Timestamp.now(), // Store the current timestamp
        });

        // Add to Location History subcollection
        const locationHistoryRef = collection(db, 'Sales Rep', uid, 'Location History');
        await addDoc(locationHistoryRef, {
          Latitude: currentLocation.coords.latitude,
          Longitude: currentLocation.coords.longitude,
          Address: formattedAddress,
          Timestamp: Timestamp.now(),
        });

        console.log("Location updated in Firestore and Location History subcollection.");
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
  }
});

export default function SalesRepView() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const uid = auth.currentUser.uid; // Get the current user's UID

  // Get location permission and start background tracking
  useEffect(() => {
    const getPermissionsAndLocation = async () => {
      let { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== 'granted') {
        console.log("Foreground location permission not granted");
        return;
      }

      let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        console.log("Background location permission not granted");
        return;
      }

      // Start tracking the location in the background every 15 minutes
      await Location.startLocationUpdatesAsync('background-location-task', {
        accuracy: Location.Accuracy.High,
        timeInterval: 900000, // 15 minutes in milliseconds
        distanceInterval: 0, // Receive updates as the user moves
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: 'Douglas & Sons (pvt) Ltd'
        },
        pausesUpdatesAutomatically: false,
      });

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Initial Location:", currentLocation);

      if (currentLocation) {
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        const formattedAddress = reverseGeocode[0]?.formattedAddress || " ";
        setAddress(formattedAddress);
        console.log("Address:", formattedAddress);

        // Store initial location in Firestore
        try {
          await updateDoc(doc(db, 'Sales Rep', uid), {
            Latitude: currentLocation.coords.latitude,
            Longitude: currentLocation.coords.longitude,
            Address: formattedAddress,
            Timestamp: Timestamp.now(),
          });

          // Add initial location to Location History subcollection
          const locationHistoryRef = collection(db, 'Sales Rep', uid, 'Location History');
          await addDoc(locationHistoryRef, {
            Latitude: currentLocation.coords.latitude,
            Longitude: currentLocation.coords.longitude,
            Address: formattedAddress,
            Timestamp: Timestamp.now(),
          });

          console.log("Initial location stored in Firestore and Location History subcollection.");
        } catch (error) {
          console.error("Error storing initial data in Firestore:", error);
        }
      }
    };

    getPermissionsAndLocation();
  }, []);

  // Network disconnected monitoring
  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        console.log('Network is disconnected');
        // Optionally notify the admin
      }
    });

    return () => unsubscribeNetInfo();
  }, []);

  // Handle back button press
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
    backgroundColor: '#ADD8E6',
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
    width: 400,
    height: 300,
    marginBottom: 20,
    marginTop: 10,
  },
});
