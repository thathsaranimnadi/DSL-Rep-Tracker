import { View, Text, TextInput, TouchableOpacity, Pressable,StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import app from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import HomeScreen from './HomeScreen';



const LoginAdmin = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithEmailAndPassword = () => {

    const auth = getAuth(app); // Initialize Firebase Auth


    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res)
        alert('Logged In');
        // Navigate to the admin screen after successful login
        navigation.navigate("HomeScreen");
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          alert('Invalid Username or Password');
        }

        console.error(error);
      });
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
          <Text style={{ fontSize: 16, color: COLORS.black , marginTop: 6,}}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                fontSize: 16,
                color: '#daa520',
                fontWeight: 'bold',
                marginLeft: 6,
                marginTop: 6,
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
            marginVertical: 22,
            color:'black',
          }}
        >
         
          <Pressable onPress={() => navigation.navigate('ChangePassword')}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                marginLeft: 6,
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

export default LoginAdmin;
