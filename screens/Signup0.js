import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import app from '../firebaseConfig';
import { getFirestore} from "firebase/firestore";


const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');
  const firestore = getFirestore(app); // Initialize Firestore
  

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
              placeholderTextColor={COLORS.black}
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
              placeholder="Enter your Employee ID"
              placeholderTextColor={COLORS.black}
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
              <Picker.Item label="Select your department" value="" />
              <Picker.Item label="Battery" value="battery" />
              <Picker.Item label="Tyre" value="tyre" />
              <Picker.Item label="Spare Parts" value="spare_parts" />
            </Picker>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Mobile Number
          </Text>
          <View style={styles.phoneContainer}>
            <TextInput
              placeholder="+94"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={styles.phoneCode}
              value={phone.slice(0, 4)}
              onChangeText={(text) => setPhone(`${text}${phone.slice(4)}`)}
            />
            <TextInput
              placeholder="Enter your Mobile number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={styles.phoneInput}
              value={phone.slice(4)}
              onChangeText={(text) => setPhone(`${phone.slice(0, 4)}${text}`)}
            />
          </View>
        </View>

        <Button
          onPress={() => {
            if (!name || !employeeId || !department) {
              alert('Please fill in all fields and agree to the terms and conditions.');
            } else {
              navigation.navigate('Signup', { 
                name: name,
                employeeId: employeeId,
                department: department,
                phone: phone,
               });
            }
          }}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 22,
  },
  phoneCode: {
    width: '12%',
    borderRightWidth: 1,
    borderRightColor: COLORS.grey,
    height: '100%',
  },
  phoneInput: {
    width: '80%',
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
