import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import COLORS from '../constants/colors';
import LottieView from 'lottie-react-native';

const Welcome = ({ navigation }) => {
    const animation = useRef(null);

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <LottieView style={{flex: 1}} source={require('../assets/image05.json')} autoPlay loop />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.subtitleText}>Sales Pulse</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.joinButton}
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Text style={styles.buttonText}>Join Now</Text>
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
        backgroundColor: '#fffaf0', 
        justifyContent: 'center',
    },
    welcome: {
        height: 400, 
        aspectRatio: 1, 
        marginRight:40,
    },
    textContainer: {
        paddingHorizontal: 22,
        alignItems: 'center',
        marginTop: 40,
    },
    titleText: {
        fontSize: 30,
        fontWeight: '800',
        color: COLORS.black, 
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.black, 
        textAlign: 'center',
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 'auto',
        paddingHorizontal: 22,
        paddingBottom: 50,
    },
    joinButton: {
        backgroundColor: '#daa520',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
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
