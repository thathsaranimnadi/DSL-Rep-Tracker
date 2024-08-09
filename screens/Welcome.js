import { View, Text, Pressable, ImageBackground, Image } from 'react-native'; // Import Image
import React from 'react';
import COLORS from '../constants/colors';

const Welcome = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require("../assets/background.jpg")}
                style={{ flex: 1 }}
            >
                <Image
                    source={require("../assets/dsl.jpeg")}
                    resizeMode="contain"
                    style={{ // Style the image to position it correctly
                        width: 150,
                        height: 150,
                        alignSelf: 'center', // Center the image horizontally
                        marginTop: 50, // Add some margin at the top
                    }}
                />
                
                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: '800',
                        color: COLORS.white
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: '800',
                        color: COLORS.white
                    }}>Started</Text>
                </View>

                <View style={{
                    marginTop: 22,
                    paddingHorizontal: 22,
                }}>
                    <Pressable
                        style={{
                            backgroundColor: COLORS.primary,
                            padding: 12,
                            borderRadius: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={{
                            color: COLORS.white,
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}>
                            Join Now
                        </Text>
                    </Pressable>
                </View>

                <View style={{
                    flexDirection: "row",
                    marginTop: 12,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: COLORS.white
                    }}>Already Have an Account?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            fontWeight: "bold",
                            marginLeft: 4
                        }}>Login</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Welcome;
