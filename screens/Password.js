import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        // Handle password change logic here
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

            <TextInput
                label="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
                Update Password
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

export default ChangePassword;
