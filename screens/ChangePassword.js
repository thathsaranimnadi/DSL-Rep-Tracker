import React, { useState } from 'react';
import app from '../firebaseConfig';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";

const ChangePassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const auth = getAuth(app); // Initialize Firebase Auth

  // Transform the button text
  const buttonText = "Send the email";
  const formattedText = buttonText.charAt(0) + buttonText.slice(1).toLowerCase();
  

  const handleSend = async () => {
    await sendPasswordResetEmail( auth, email)
    .then(() => alert( "Password reset email send"))
    .catch(error => {
        console.log( error.message )
    });
  };

  return (
    <View style={styles.container}>
        <Image style = {styles.image } source={require('../images/forgot.png')}/>

        <View style={styles.question}>
            <Text style={styles.questionText} >Forgot your password?</Text>
        </View>

        <View style={styles.sentence}>
            <Text style={styles.sentenceText} >To reset your password, enter your registered email address.</Text>
        </View>

        <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        {/* send email button */}
        {/* Customized button */}
        <TouchableOpacity style={styles.button} onPress={handleSend}>
            <Text style={styles.buttonText}>{formattedText}</Text>
        </TouchableOpacity>
        
        {/* back to login button */}
        <TouchableOpacity onPress={() => navigation.navigate('LoginAdmin')}>
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
    padding: 20,
    backgroundColor: '#fffbf2',
    
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
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
    justifyContent: 'flex-end',
    paddingBottom: 20,
    
  },
  sentence: {
    justifyContent: 'center',
    marginBottom: 20,
  },

  sentenceText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#a9a9a9',
    textAlign: 'center'
  },
  question: {
    marginBottom: 20,
    alignContent: 'center',
    
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#daa520',  // You can change the color as per your design
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',  // Centers the text horizontally
    justifyContent: 'center', // Centers the text vertically
    width: '100%',
    marginBottom: 10,  // To provide space below the button
    borderColor:'black',
    borderWidth: 2,
    
  },
  buttonText: {
    color: '#fff',  // White text
    fontSize: 16,
    textAlign: 'center',  // Ensures the text is centered
  },
 
});

export default ChangePassword;
