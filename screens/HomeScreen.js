import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import app from '../firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import axios from 'axios';

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
    const [selectedRep, setSelectedRep] = useState(null);
    const [rep, setRep] = useState({});

    // Fetch data from Firestore
    const setData = async () => {
        try {
            const db = getFirestore(app);
            const repCollection = collection(db, 'Sales Rep name');
            const snapshot = await getDocs(repCollection);
            snapshot.docs.forEach(doc =>{
                console.log(doc.data());
                setRep(doc.data());

            });
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        setData();
    }, []);

    const handleSearch = (query) => {
        const filtered = salesReps.filter(rep => rep.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredSalesReps(filtered);
    };

    return (
        <View>
            <View style={styles.homeContainer}>
                <Header onSearch={handleSearch} />
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

        
        </View>
    );
};

// CustomMapView Component
const CustomMapView = ({ salesReps }) => {
    return (
        <View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
            >
                {salesReps.map((rep, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: rep.latitude || 0, // Default to 0 if latitude is missing
                            longitude: rep.longitude || 0 // Default to 0 if longitude is missing
                        }}
                        title={rep.name || 'Unknown Location'}
                    />
                ))}
            </MapView>
        </View>
    );
};

// SalesRepsList Component
const SalesRepsList = ({ salesReps, onSelect }) => {
    return (
        <FlatList
            data={salesReps}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.repItem} onTouchEnd={() => onSelect(item)}>
                    <Text>{item.name}</Text>
                    <Text>{item.location}</Text>
                </View>
            )}
        />
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
        height: 500,
        marginTop: 40,
    },
    infoContainer: {
        marginBottom: 0,
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
    repItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    noRepSelected: {
        textAlign: 'center',
        fontSize: 18,
        color: '#666',
    },
});

export default HomeScreen;
