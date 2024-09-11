import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import app from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginAdmin = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const db = getFirestore(app);
  const auth = getAuth(app); // Initialize Firebase Auth

  useEffect(() => {
    // Load the saved email from AsyncStorage when the component is mounted
    const loadEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('savedEmail');
      if (savedEmail) {
        setEmail(savedEmail);
      }
    };
    loadEmail();
  }, []);

  const loginWithEmailAndPassword = async () => {
    try {
      // Log in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the email is verified
      if (user.emailVerified) {
        // Check if the user is an admin
        const adminQuery = query(collection(db, "Admin"), where("Email", "==", email));
        const adminSnapshot = await getDocs(adminQuery);

        if (!adminSnapshot.empty) {
          console.log("User belongs to 'admins' collection");

          alert('Logged In');
          // Save the email in AsyncStorage after successful login
          await AsyncStorage.setItem('savedEmail', email);

          // Navigate to the admin screen
          navigation.navigate("HomeScreen");
        } else {
          alert('You cannot login as an admin');
        }
      } else {
        alert('Please verify your email before logging in.');
        // Optionally sign the user out
        auth.signOut();
      }
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Invalid Username or Password');
      }
      console.error("Error during login: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: '#daa520',
            }}
          >
            Hey, Welcome Back
          </Text>

          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Login as an admin
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              marginVertical: 8,
            }}
          >
            Email Address
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput 
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter Your Email Address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              marginVertical: 8,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 22,
            }}
          >
            <TextInput 
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{
                width: '100%',
              }}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}
            >
              {isPasswordShown ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Button onPress={loginWithEmailAndPassword}
          title="Login"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            backgroundColor: '#daa520',
            borderColor: 'black',
          }}
        />
        
        {/* Additional UI elements */}
      </View>
    </SafeAreaView>
  );
};

export default LoginAdmin;
