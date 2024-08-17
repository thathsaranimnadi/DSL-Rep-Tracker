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
                <Text style={styles.titleText}>Douglas & Sons (Pvt) Ltd</Text>
                <Text style={styles.subtitleText}>Sales Pulse</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.joinButton}
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Text style={styles.buttonText}>Join Now</Text>
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
        marginBottom: 10
    },
    loginButton: {
        fontSize: 16,
        color: '#daa520', 
        fontWeight: "bold",
        marginLeft: 4,
        marginVertical: 1,
        alignItems: 'center'
    },
});
