import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// Header Component
const Header = () => {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/hi.gif')}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.welcomeText}>Welcome,</Text>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Search Users'
                    style={styles.searchInput}
                />
                <MaterialIcons name="person-search" size={50} color="black" />
            </View>
        </View>
    );
};

// HomeScreen Component
const HomeScreen = () => {
    return (
        <View>
            <View style={styles.homeContainer}>
                <Header />
                {/* Render the MapView component */}
                <CustomMapView />
            </View>
        </View>
    );
};

// Map view Component (renamed to CustomMapView)
const CustomMapView = () => {
    return (
        <View>
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
            />
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 150, 
        marginTop: 60,
        marginBottom: 10
    },
    welcomeText: {
        color: '#000000',
        marginTop: 75,
        fontSize: 30,
        marginBottom: 5
    },
    searchContainer: {
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 5,
        borderRadius: 99,
        marginTop: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchInput: {
        fontFamily: 'outfit',
        fontSize: 18
    },
    homeContainer: {
        backgroundColor: '#ffd700',
        height: 250,
        padding: 20
    },
    map: {
        width: '100%',
        height: 500,
        marginTop:40
    }
});

export default HomeScreen;
