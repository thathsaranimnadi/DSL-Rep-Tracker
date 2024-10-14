import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper'; 
import COLORS from '../constants/colors';
import Button from '../components/Button';
import app from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false); // State for password visibility
  const auth = getAuth(app); // Initialize Firebase Auth
  const firestore = getFirestore(app); // Initialize Firestore
  const route = useRoute(); // Use the useRoute hook to access route params
  const { params } = route; // Access params here
  const { name, employeeId, department, phone } = route.params || {};

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  // Add details of salesrep to the database
  const addRepData = async (uid) => {
    try {
      await setDoc(doc(firestore, "Sales Rep", uid), {
        Role: role,     
        Email: email,
        Password: password,
        Name: name,     
        Phone_No: phone,
        Employee_ID: employeeId,
        Department: department
      });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Add details of admin to the database
  const addAdminData = async (uid) => {
    try {
      await setDoc(doc(firestore, "Admin", uid), {       
        Email: email,
        Password: password,
        Name: name,     
        Employee_ID: employeeId,
        Department: department
      });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Handle email/password sign-up
  const handleSignup = () => {
    if (!email || !password || !role) {
      alert('Please fill in all fields and agree to the terms and conditions.');
      return;
    }

     // Check if password length is at least 6 characters
     if (password.length !== 6) {
      alert('Password must be exactly 6 characters long.');
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { uid } = userCredential.user;
        
        //Email verification
        sendEmailVerification(userCredential.user)
        .then(() => {
          alert('A verification email has been sent to your email address. Please verify before logging in.');

          // Save user data to Firestore based on the role
          if (role === 'sales_rep') {
            addRepData(uid);
            // Optionally navigate to the login page
            navigation.navigate("LoginRep");
          } else {
            addAdminData(uid);
            navigation.navigate("LoginAdmin");
          }
        })
        .catch((error) => {
          console.error('Error sending email verification: ', error);
        });
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
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8, marginTop: 40 }}>
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
              placeholderTextColor='rgba(0, 0, 0, 0.5)'
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
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Enter your password"
              placeholderTextColor='rgba(0, 0, 0, 0.5)'
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
