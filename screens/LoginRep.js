import { View, Text, TextInput, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import app from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');


const LoginRep = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app); // Initialize Firebase Auth
  const db = getFirestore(app); 
  
  //Add function to store session data
  const saveUserSession = async (userData) => {
    try {
      await AsyncStorage.setItem('userSession', JSON.stringify(userData));

      // To confirm data is stored in sessions
      console.log("User session saved successfully!");
      const savedData = await AsyncStorage.getItem('userSession');
      console.log("Saved session data: ", JSON.parse(savedData));

    } catch (error) {
      console.error('Error saving session:', error);
    }
  };
  

  const loginWithEmailAndPassword = async () => {

    if (!email.trim() && !password.trim()) {
      alert('Please enter both email and password !');
      return;
    }
    else if (!email.trim()){
      alert('Please enter the email !');
      return;
    }
    else if (!password.trim()){
      alert('Please enter the password !');5
      return;
    }
    
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (user.emailVerified) {
        alert('Logged In');

        // Get logged user data from firestore
        const userRef = doc(db, 'Sales Rep', user.uid); // Reference to the user document
        const userDoc = await getDoc(userRef); // Retrieve the document

        if (userDoc.exists) {
          const userData = userDoc.data();  // Get user data from Firestore
  
          // Save user data to AsyncStorage after successful login
          await saveUserSession(userData);
  
          // Navigate after successful login
          navigation.navigate('SalesRepView'); // Sales Rep view
          
        }
      
      }
      else{
        alert('Please verify your email before logging in !');
        // Optionally sign the user out
        auth.signOut();
      }
    }

    catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Invalid Username or Password !');
      }
      if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid !');
      }
      console.error("Error during login: ", error);
    }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#ADD8E6' }}>
      <View style={{ flex: 1, marginHorizontal: 22 , marginTop: height* 0.01}}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: '#070738',
            }}
          >
            Hey, Welcome Back
          </Text>

          <Text style={{ fontSize: 16, color: '#2F4F4F',  marginBottom: height* 0.01 }}>
            Login as a Sales Representative
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
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
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
              marginTop: height* 0.01
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
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
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
            marginBottom: 4,
            backgroundColor:'#070738',
            borderColor:'black',
            marginTop: height* 0.04,
            width: width > 600 ? width * 0.8 : width * 0.9,
            alignSelf: 'center',
            borderRadius: 50
           
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black,marginTop: 15, }}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('Signup0')}>
            <Text
              style={{
                fontSize: 16,
                color: '#070738',
                fontWeight: 'bold',
                marginLeft: 6,
                marginTop: 15,

              }}
            >
              Sign up
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
            color:'black',
          }}
        >
         
          <Pressable onPress={() => navigation.navigate('ChangePassword')}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                marginLeft: 6,
                textDecorationLine: 'underline',
              }}
            >
              Forgot Your Password ?
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginRep;
