import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import app from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Password = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const auth = getAuth(app); // Initialize Firebase Auth
    const user = auth.currentUser;
    const navigation = useNavigation();

    const handleChangePassword = async () => {
        try {
            // Re-authenticate user with the current password
            await reauthenticate(currentPassword);
            // Update password
            await updatePassword(user, newPassword);
            // Notify user of successful password change
            alert('Password changed successfully');
            console.log('Password changed successfully');
            // Clear the password fields
            setCurrentPassword('');
            setNewPassword('');
            // Reset the navigation stack and navigate to HomeScreen
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });
        } catch (error) {
            // Display any errors that occur during the process
            console.log('Error updating password:', error.message);
            alert(error.message);
        }
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

            {/* Current Password Input */}
            <TextInput
                label="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                right={
                    <TextInput.Icon
                        icon={showCurrentPassword ? "eye" : "eye-off"}
                        onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                    />
                }
            />

            {/* New Password Input */}
            <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                style={styles.input}
                left={<TextInput.Icon icon="lock-outline" />}
                right={
                    <TextInput.Icon
                        icon={showNewPassword ? "eye" : "eye-off"}
                        onPress={() => setShowNewPassword(!showNewPassword)}
                    />
                }
            />

            {/* Change Password Button */}
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