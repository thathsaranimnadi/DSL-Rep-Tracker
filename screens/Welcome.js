import { View, Text, Pressable, ImageBackground, Image, StyleSheet } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import firebase from 'firebase/app';


const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/black.jpg")}
                style={styles.backgroundImage}
                imageStyle={styles.backgroundImageStyle}
            >
                <View style={styles.overlay} />

                <Image
                    source={require("../assets/dsl.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
                
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>Douglas & Sons (Pvt) Ltd</Text>
                    <Text style={styles.subtitleText}>Location Tracker</Text>
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
            </ImageBackground>
        </View>
    );
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImageStyle: {
        opacity: 0.9,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: '30%',
    },
    textContainer: {
        paddingHorizontal: 22,
        alignItems: 'center',
        marginTop: 40,
    },
    titleText: {
        fontSize: 30,
        fontWeight: '800',
        color: COLORS.white,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    subtitleText: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    buttonContainer: {
        marginTop: 'auto',
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    joinButton: {
        backgroundColor: COLORS.primary,
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
        color: COLORS.white,
    },
    loginButton: {
        fontSize: 16,
        color: COLORS.white,
        fontWeight: "bold",
        marginLeft: 4,
    },
});
