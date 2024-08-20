import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import app from '../firebaseConfig';



import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState(''); 

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
              placeholder="Enter your name"
              placeholderTextColor={COLORS.black}
              style={{
                width: '100%',
              }}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Employee ID
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
              placeholder="Enter your Employee ID"
              placeholderTextColor={COLORS.black}
              style={{
                width: '100%',
              }}
              value={employeeId}
              onChangeText={setEmployeeId}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>
            Department
          </Text>
          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              justifyContent: 'center',
            }}
          >
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
              placeholder="+94"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: '12%',
                borderRightWidth: 1,
                borderRightColor: COLORS.grey,
                height: '100%',
              }}
              value={phone.slice(0, 4)}
              onChangeText={(text) => setPhone(`${text}${phone.slice(4)}`)}
            />
            <TextInput
              placeholder="Enter your Mobile number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: '80%',
              }}
              value={phone.slice(4)}
              onChangeText={(text) => setPhone(`${phone.slice(0, 4)}${text}`)}
            />
          </View>
        </View>

       
         
          
            
            
            
          
        

        
        

         

        <Button onPress={() => navigation.navigate("Signup")}
          title="Next"
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
         

        
             
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
