import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import COLORS from '../constants/colors';
import LottieView from 'lottie-react-native';
import { Animated } from 'react-native';

const Welcome = ({ navigation }) => {
    const animation = useRef(null);
    const scaleValue = useRef(new Animated.Value(1)).current;

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <LottieView style={{ flex: 1 }} source={require('../assets/image05.json')} autoPlay loop />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.subtitleText}>Sales Pulse</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.joinButton}
                    onPress={() => navigation.navigate("Signup")}>
                    <Animated.View style={[styles.joinButton, { transform: [{ scale: scaleValue }] }]}>
                        <Text style={styles.buttonText}>Join Now</Text>
                    </Animated.View>
                </Pressable>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already Have an Account?</Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginButton}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffd8',
        justifyContent: 'center',
    },
    welcome: {
        height: 400,
        aspectRatio: 1,
        marginRight: 40,
    },
    textContainer: {
        paddingHorizontal: 22,
        alignItems: 'center',
        marginTop: 40,
    },
    subtitleText: {
        fontSize: 55,
        fontWeight: '800',
        color: '#daa520',
        textAlign: 'center',
        marginTop: 10,
        textShadowColor: 'black', // Outline color
        textShadowOffset: { width: 3, height: 6 },
        textShadowRadius: 6,
    },
    buttonContainer: {
        marginTop: 'auto',
        paddingHorizontal: 22,
        paddingBottom: 50,
    },
    joinButton: {
        backgroundColor: '#daa520',
        padding: 6,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        //elevation: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 16,
        color: COLORS.black,
    },
    loginButton: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: "bold",
        marginLeft: 4,
    },
});
