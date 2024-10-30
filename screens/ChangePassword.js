import React, { useState } from 'react';
import app from '../firebaseConfig';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ChangePassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const auth = getAuth(app); // Initialize Firebase Auth

  // Button text transformation
  const buttonText = "Send the email";
  const formattedText = buttonText.charAt(0) + buttonText.slice(1).toLowerCase();

  const handleSend = async () => {
    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent.");
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert("Error", "No account found with this email.");
      } else {
        Alert.alert("Error", "An error occurred. Please try again later.");
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../images/forgot.png')} />

      <View style={styles.question}>
        <Text style={styles.questionText}>Forgot your password?</Text>
      </View>

      <View style={styles.sentence}>
        <Text style={styles.sentenceText}>To reset your password, enter your registered email address.</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Send email button */}
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>{formattedText}</Text>
      </TouchableOpacity>

      {/* Back to login button */}
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#ADD8E6',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  backToLogin: {
    marginTop: 30,
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  sentence: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  sentenceText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#070738',
    textAlign: 'center',
  },
  question: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#070738',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ChangePassword;
