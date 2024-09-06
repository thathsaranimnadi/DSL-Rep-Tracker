import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ChangePassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    // Handle send password reset email logic here
    console.log('Password reset link sent to:', email);
  };

  return (
    <View style={styles.container}>
      

      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button title="Send" onPress={handleSend} />

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
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
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
  },
  backToLogin: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ChangePassword;
