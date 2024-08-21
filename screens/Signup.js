import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper'; 
import COLORS from '../constants/colors';
import Button from '../components/Button';
import app from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

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
        if (role === 'sales_rep'){
            navigation.navigate("LoginRep");
        } else {
            navigation.navigate("LoginAdmin");
        }
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
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 ,marginTop:40}}>
            Role
          </Text>

          <View style={styles.roleContainer}>
            <RadioButton
              value="sales_rep"
              status={role === 'sales_rep' ? 'checked' : 'unchecked'}
              onPress={() => setRole('sales_rep')}
            />
            <Text style={styles.roleText}>Sales Rep</Text>
          </View>
          <View style={styles.roleContainer}>
            <RadioButton
              value="admin"
              status={role === 'admin' ? 'checked' : 'unchecked'}
              onPress={() => setRole('admin')}
            />
            <Text style={styles.roleText}>Admin</Text>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Email Address
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Your Email Address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Password
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        
        <Button 
          onPress={handleSignup}
          title="Sign up"
          filled
          style={styles.signupButton}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View style={styles.divider} />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already Have an Account?</Text>
        </View>
        
        <View style={styles.loginButtonContainer}>
          <Pressable onPress={() => navigation.navigate("LoginAdmin")}>
            <Text style={styles.loginButton}>Login as an Admin</Text>
          </Pressable>
        </View>

        <View style={styles.loginButtonContainer}>
          <Pressable onPress={() => navigation.navigate("LoginRep")}>
            <Text style={styles.loginButton}>Login as a Sales Representative</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  roleText: {
    fontSize: 16, 
    color: COLORS.black,
  },
  inputContainer: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  input: {
    width: '100%',
  },
  signupButton: {
    marginTop: 18,
    marginBottom: 4,
    backgroundColor: '#daa520',
    borderColor: '#000000',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#daa520',
    marginHorizontal: 10,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.black, 
  },
  loginButtonContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    marginVertical: 4,
  },
  loginButton: {
    fontSize: 16,
    color: '#daa520', 
    fontWeight: "bold",
  },
});
