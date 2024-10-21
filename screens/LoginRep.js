import { View, Text, TextInput, TouchableOpacity, Pressable,StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import app from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginRep = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app); // Initialize Firebase Auth

  const loginWithEmailAndPassword = async () => {

    if (!email.trim() && !password.trim()) {
      alert('Please enter both email and password');
      return;
    }
    else if (!email.trim()){
      alert('Please enter the email');
      return;
    }
    else if (!password.trim()){
      alert('Please enter the password');5
      return;
    }
    
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (user.emailVerified) {
        alert('Logged In');
        // Navigate to the sale's rep screen after successful login
        navigation.navigate("SalesRepView");
      
      }
      else{
        alert('Please verify your email before logging in.');
        // Optionally sign the user out
        auth.signOut();
      }
    }

    catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Invalid Username or Password');
      }
      if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
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
            marginTop: 18,
            marginBottom: 4,
            backgroundColor:'#daa520',
            borderColor:'black',
           
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
                color: '#daa520',
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
