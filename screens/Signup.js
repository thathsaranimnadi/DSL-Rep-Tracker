import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper'; 
import COLORS from '../constants/colors';
import Button from '../components/Button';
import app from '../firebaseConfig';



import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [role, setRole] = useState('');

   // Handle email/password sign-up
  const handleSignup = () => {
  
    if (!email || !password || !name || !employeeId || !role) {
      alert('Please fill in all fields and agree to the terms and conditions.');
      return;
    }
  
    const auth = getAuth(app); // Initialize Firebase Auth

    
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User account created & signed in!');
        // Navigate to the Login screen after successful signup
        // this should be change into if the signup person is an admin; then navigate to loginAdmin.js and if the signup person is a salesrep; then navigate to loginRep.js
        if (role === 'sales_rep'){
            navigation.navigate("LoginRep");
        }else{
            navigation.navigate("LoginAdmin");
        } 
        //navigation.navigate("Login");
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
      <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Role
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="sales_rep"
              status={role === 'sales_rep' ? 'checked' : 'unchecked'}
              onPress={() => setRole('sales_rep')}
            />
            <Text>Sales Rep</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="admin"
              status={role === 'admin' ? 'checked' : 'unchecked'}
              onPress={() => setRole('admin')}
            />
            <Text>Admin</Text>
          </View>
        </View>

        

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
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
              placeholder="Enter Your Email Address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: '100%',
              }}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Password
          </Text>

          <View
            style={{
              width: '100%',
              height: 50,
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
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry
              style={{
                width: '100%',
              }}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        
        
        <Button onPress={handleSignup}
          title="Sign up"
          filled
          style={{ marginTop: 18, marginBottom: 4 ,backgroundColor:'#daa520',borderColor:'#000000'}}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#daa520',
              marginHorizontal: 10,
            }}
          />
          <Text style={{ fontSize: 14 }}>Or sign up with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 22 }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
