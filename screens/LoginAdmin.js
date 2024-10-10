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
  const auth = getAuth(app);

  useEffect(() => {
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        const adminQuery = query(collection(db, "Admin"), where("Email", "==", email));
        const adminSnapshot = await getDocs(adminQuery);

        if (!adminSnapshot.empty) {
          alert('Logged In');
          await AsyncStorage.setItem('savedEmail', email);
          navigation.navigate("HomeScreen");
        } else {
          alert('You cannot login as an admin');
        }
      } else {
        alert('Please verify your email before logging in.');
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
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        {/* Welcome Text */}
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#daa520' }}>
            Hey, Welcome Back
          </Text>
          <Text style={{ fontSize: 16, color: COLORS.black, marginTop: 6 }}>
            Login as an admin
          </Text>
        </View>

        {/* Email Input */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>
            Email Address
          </Text>
          <View style={styles.inputContainer}>
            <TextInput 
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter Your Email Address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={styles.input}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8 }}>
            Password
          </Text>
          <View style={styles.inputContainer}>
            <TextInput 
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={styles.eyeIcon}
            >
              <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <Button 
          onPress={loginWithEmailAndPassword}
          title="Login"
          filled
          style={styles.loginButton}
        />

        {/* Sign Up Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Don't have an account? 
          </Text>
          <Pressable onPress={() => navigation.navigate('Signup0')}>
            <Text style={styles.signupText}> Sign up</Text>
          </Pressable>
        </View>

        {/* Forgot Password Link */}
        <View style={styles.forgotPasswordContainer}>
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  inputContainer: {
    width: '100%',
    height: 50,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  eyeIcon: {
    paddingRight: 16,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#daa520',
    borderColor: 'black',
  },
  signupText: {
    fontSize: 16,
    color: '#daa520',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 6,
  },
};

export default LoginAdmin;
