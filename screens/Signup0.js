import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import app from '../firebaseConfig';
import { getFirestore } from "firebase/firestore";

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');
  const firestore = getFirestore(app); // Initialize Firestore

  // Employee ID validation function
  const isValidEmployeeId = (id) => {
    const regex = /^(DSL|EKW|RNT)\d{4}$/i;
    return regex.test(id);
  };
  


  const handleNext = () => {
    if (!name || !employeeId || !department || !phone) {
      alert('Please fill in all fields.');
      return;
    }
    if (!isValidEmployeeId(employeeId)) {
      Alert.alert('Invalid Employee ID');
      return;
    }
    if (phone.length !== 9) { // Check if phone has exactly 9 digits
      Alert.alert('Phone number must be exactly 9 digits.');
      return;
    }

    
    // If validation passes, navigate to the next page
    navigation.navigate('Signup', { 
      name: name,
      employeeId: employeeId,
      department: department,
      phone: `+94${phone}`, 
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
            Create Account
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Name
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor='rgba(0, 0, 0, 0.5)'
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Employee ID
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Eg: DSL1234, EKW1234, RNT1234"
              placeholderTextColor='rgba(0, 0, 0, 0.5)'
              style={styles.input}
              value={employeeId}
              onChangeText={setEmployeeId}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Department
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={department}
              onValueChange={(itemValue) => setDepartment(itemValue)}
              style={{ width: '100%' }}
            >
              <Picker.Item label="Select your department" value="" color='rgba(0, 0, 0, 0.5)' enabled={false} />
              <Picker.Item label="Tyre" value="Tyre" />
              <Picker.Item label="Energy" value="Energy" />
              <Picker.Item label="Auto-Parts" value="Auto-Parts" />
              <Picker.Item label="Ronet" value="Ronet" />
              <Picker.Item label="Ekway" value="Ekway" />
              <Picker.Item label="GCR" value="GCR" />
              <Picker.Item label="Industrial" value="Industrial" />
            </Picker>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Mobile Number
          </Text>
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneCode}>+94</Text>
            <TextInput
              placeholder="Enter your Mobile number"
              placeholderTextColor='rgba(0, 0, 0, 0.5)'
              keyboardType="numeric"
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              maxLength={9} // Assuming 9 digits after the prefix
            />
          </View>
        </View>

        <Button
          onPress={handleNext}
          title="Next"
          filled
          style={{ marginTop: 18, marginBottom: 4, backgroundColor: '#daa520', borderColor: '#000000' }}
        />

        <View style={styles.loginOptionsContainer}>
          <Text style={styles.loginText}>Already Have an Account?</Text>
          <Pressable onPress={() => navigation.navigate("LoginAdmin")} style={styles.loginButtonContainer}>
            <Text style={styles.loginButton}>Login as an Admin</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("LoginRep")} style={styles.loginButtonContainer}>
            <Text style={styles.loginButton}>Login as a Sales Representative</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    paddingLeft: 22,
  },
  input: {
    width: '100%',
  },
  pickerContainer: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
  },
  phoneContainer: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  phoneCode: {
    width: '10%',
    lineHeight: 48,
    fontSize: 16,
    color: COLORS.black,
    borderRightWidth: 1,
    borderRightColor: COLORS.grey,
    height: '100%',
    paddingRight:'1'
  },
  phoneInput: {
    width: '80%',
    paddingLeft: 10,
    fontSize: 14,
  },
  loginOptionsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 12,
  },
  loginButtonContainer: {
    marginVertical: 4,
  },
  loginButton: {
    fontSize: 16,
    color: '#daa520',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
