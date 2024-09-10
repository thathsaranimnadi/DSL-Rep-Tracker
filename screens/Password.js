import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import app from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';




const Password = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const auth = getAuth(app); // Initialize Firebase Auth
    const user = auth.currentUser;
    const navigation = useNavigation();


    const handleChangePassword = async () => {
        return reauthenticate(currentPassword).then(() => {
            return updatePassword(user, newPassword).then(() => {
                console.log('Password changed successfully');
                
                alert('Password changed');
                navigation.navigate('HomeScreen');
                
            }).catch((error) => {
                console.log('Error updating password:', error.message);
                alert(error.message);
            });
        }).catch((error) => {
            alert(error.message);
        });
    };

    const reauthenticate = (currentPassword) => {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        return reauthenticateWithCredential(user, credential);     

    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/lock.png')} 
                style={styles.animation}
            />
            <Text style={styles.title}>Reset Password</Text>

            <TextInput
                label="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
            />

            <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
                left={<TextInput.Icon icon="lock-outline" />}
            />

            

            <Button
                mode="contained"
                onPress={handleChangePassword}
                style={styles.button}
                contentStyle={styles.buttonContent}
            >
                Change Password
            </Button>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#daa520',
        justifyContent: 'center',
    },
    animation: {
        width: 150,
        height: 160,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        marginTop: 10,
        backgroundColor: 'black', 
    },
    buttonContent: {
        paddingVertical: 10,
    },
});

export default Password;
