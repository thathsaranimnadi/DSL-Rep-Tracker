import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import app from '../firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
    
    const [rep , getRep] = useState({});
    // Fetch data from Firestore
    const getData = async () => {
        try {
            const db = getFirestore(app);
            const repCollection = collection(db, 'Sales Rep name');
            const snapshot = await getDocs(repCollection);
            snapshot.docs.forEach((doc) => {
                console.log(doc.data());
                getRep(doc.data());


            });
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    // Use useEffect to trigger data fetch
    useEffect(() => {
        getData();
    }, []);

    return (
        <View>
            <View style={styles.homeContainer}>
                <Header />
            </View>
            
                <View style={styles.infoContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{rep.name || 'Name not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Employee ID:</Text>
                        <Text style={styles.value}>{rep.employee_id || 'Employee ID not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Role:</Text>
                        <Text style={styles.value}>{rep.role || 'Role not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Department:</Text>
                        <Text style={styles.value}>{rep.department || 'Department not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mobile No:</Text>
                        <Text style={styles.value}>{rep.mobile_no || 'Mobile No not available'}</Text>
                    </View>
                </View>  
                <CustomMapView />
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
    );
};

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
        marginTop: 40
    },
    infoContainer: {
        marginBottom: 0,
        paddingTop: 10,
        paddingLeft: 15
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        //justifyContent: 'space-between', // Adjust space between label and value
        marginBottom: 10, // Optional margin between rows
    },

});

export default HomeScreen;
