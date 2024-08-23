import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import app from '../firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Header Component
const Header = ({ onSearch }) => {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/hi.gif')}
                    style={styles.image}
                />
                <Text style={styles.welcomeText}>Welcome,</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search Users"
                    style={styles.searchInput}
                    onChangeText={onSearch}
                />
                <MaterialIcons name="person-search" size={50} color="black" />
            </View>
        </View>
    );
};

// HomeScreen Component
const HomeScreen = () => {
    const [salesReps, setSalesReps] = useState([]);
    const [filteredSalesReps, setFilteredSalesReps] = useState([]);

    const departmentColors = {
        'Battery': 'red',
        'Tyre': 'blue',
        'Spare Parts': 'yellow',
    };

    // Fetch data from Firestore
    const setData = async () => {
        try {
            const db = getFirestore(app);
            const repCollection = collection(db, 'Sales Rep');
            const snapshot = await getDocs(repCollection);
            const repsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSalesReps(repsData);
            setFilteredSalesReps(repsData); // Initialize filtered sales reps with all data
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        setData();
    }, []);

    const handleSearch = (query) => {
        if (query) {
            const filtered = salesReps.filter(rep => 
                rep.Name.toLowerCase().includes(query.toLowerCase()) || 
                rep.Employee_ID.toLowerCase().includes(query.toLowerCase()));
            setFilteredSalesReps(filtered);
        } else {
            setFilteredSalesReps(salesReps); // Show all reps if search query is empty
        }
    };

    return (
        <View>
            <View style={styles.homeContainer}>
                <Header onSearch={handleSearch} />
            </View>

            <View style={styles.infoContainer}>
                <FlatList
                    data={filteredSalesReps}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.infoContainer}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Name:</Text>
                                <Text style={styles.value}>{item.Name || 'Name not available'}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Employee ID:</Text>
                                <Text style={styles.value}>{item.Employee_ID || 'Employee ID not available'}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Role:</Text>
                                <Text style={styles.value}>{item.Role || 'Role not available'}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Department:</Text>
                                <Text style={styles.value}>{item.Department || 'Department not available'}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Mobile No:</Text>
                                <Text style={styles.value}>{item.Phone_No || 'Mobile No not available'}</Text>
                            </View>
                        </View>

                    )}
                />
            </View>
            <CustomMapView salesReps={filteredSalesReps} />
        </View>
    );
};

// CustomMapView Component
const CustomMapView = ({ salesReps = [], currentLocation }) => {
    const departmentColors = {
        'Battery': 'red',
        'Tyre': 'blue',
        'Spare Parts': 'yellow',
    };

    return (
        <View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={false}
                initialRegion={{
                    latitude: currentLocation?.latitude || 6.9271,
                    longitude: currentLocation?.longitude || 79.9612,
                    latitudeDelta: 0.922,
                    longitudeDelta: 0.421,
                }}
            >
                {salesReps.map((rep, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: rep.latitude || 0,
                            longitude: rep.longitude || 0
                        }}
                        title={rep.Name || 'Unknown Location'}
                        pinColor={departmentColors[rep.Department] || 'gray'}
                    >
                        <View>
                            <Image
                                source={require('../assets/marker.png')}
                                style={{ width: 60, height: 60 }}
                            />
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 150,
        marginTop: 60,
        marginBottom: 10,
    },
    welcomeText: {
        color: '#000000',
        marginTop: 75,
        fontSize: 30,
        marginBottom: 5,
    },
    searchContainer: {
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 5,
        borderRadius: 99,
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchInput: {
        fontSize: 18,
    },
    homeContainer: {
        backgroundColor: '#ffd700',
        height: 250,
        padding: 20,
    },
    map: {
        width: '100%',
        height: 400,
        marginTop: 10,
    },
    infoContainer: {
        paddingTop: 10,
        paddingLeft: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
});

export default HomeScreen;
