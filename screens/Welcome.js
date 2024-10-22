import { View, Text, Pressable, StyleSheet, Animated, BackHandler } from 'react-native';
import React, { useRef, useEffect } from 'react';
import COLORS from '../constants/colors';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native'; // Import the useIsFocused hook

const Welcome = ({ navigation }) => {
    const animation = useRef(null);
    const scaleValue = useRef(new Animated.Value(1)).current;
    const isFocused = useIsFocused(); // Check if Welcome screen is currently focused

    useEffect(() => {
        const backAction = () => {
            if (isFocused) {  // Only handle the back action if the Welcome screen is focused
                BackHandler.exitApp(); // Exit the app immediately
                return true; // Prevent default behavior
            }
            return false; // Allow default back action for other pages
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [isFocused]); // Add isFocused as a dependency

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
                    onPress={() => navigation.navigate("Signup0")}>
                    <Animated.View style={[styles.joinButton, { transform: [{ scale: scaleValue }] }]}>
                        <Text style={styles.buttonText}>Join Now</Text>
                    </Animated.View>
                </Pressable>

                {/* Row 1 */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already Have an Account?</Text>
                </View>
                    
                {/* Row 2 */}
                <View style={styles.loginButton}>
                    <Pressable onPress={() => navigation.navigate("LoginAdmin")}>
                        <Text style={styles.loginButton}>Login as an Admin</Text>
                    </Pressable>
                </View>

                {/* Row 3 */}
                <View style={styles.loginButton}>
                    <Pressable onPress={() => navigation.navigate("LoginRep")}>
                        <Text style={styles.loginButton}>Login as a Sales Representative</Text>
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
        marginTop:50
    },
    textContainer: {
        paddingHorizontal: 22,
        alignItems: 'center',
        marginTop: 10,
    },
    subtitleText: {
        fontSize: 55,
        fontWeight: '800',
        color: '#2F4F4F',
        textAlign: 'center',
        
        //textShadowOffset: { width: 5, height: 6 },
        //textShadowRadius: 10,
    },
    buttonContainer: {
        marginTop: 'auto',
        paddingHorizontal: 22,
        paddingBottom: 50,
    },
    joinButton: {
        backgroundColor: '#DAA520',
        padding: 6,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
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
        marginBottom: 10
    },
    loginButton: {
        fontSize: 16,
        color: '#2F4F4F', 
        fontWeight: "bold",
        marginLeft: 4,
        marginVertical: 1,
        alignItems: 'center'
    },
});
