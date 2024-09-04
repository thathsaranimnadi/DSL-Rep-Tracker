import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
    const [searchQuery, setSearchQuery] = useState(''); // Track the search query

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
        setSearchQuery(query);
        if (query) {
            const filtered = salesReps.filter(rep =>
                rep.Name.toLowerCase().includes(query.toLowerCase()) ||
                rep.Employee_ID.toLowerCase().includes(query.toLowerCase()));
            setFilteredSalesReps(filtered);
            if (filtered.length > 0) {
                setSelectedRep(filtered[0]); // Show details of the first filtered sales rep
            } else {
                setSelectedRep(null); // Clear selected rep if no results
            }
        } else {
            setFilteredSalesReps(salesReps); // Show all reps if search query is empty
            setSelectedRep(null); // Clear selected rep if search query is empty
        }
    };

    const handleMarkerPress = (rep) => {
        setSelectedRep(rep); // Set the selected sales rep when a marker is pressed
    };

    const showInfo = selectedRep || searchQuery; // Determine if infoContainer should be shown

    return (
        <View style={styles.container}>
            <View style={styles.homeContainer}>
                <Header onSearch={handleSearch} />
            </View>

            <View style={[styles.mapContainer, showInfo && styles.mapContainerWithInfo]}>
                <CustomMapView
                    salesReps={filteredSalesReps}
                    onMarkerPress={handleMarkerPress} // Pass the marker press handler to CustomMapView
                />
            </View>

            {showInfo && (
                <View style={styles.infoContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{selectedRep?.Name || 'Name not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Employee ID:</Text>
                        <Text style={styles.value}>{selectedRep?.Employee_ID || 'Employee ID not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Role:</Text>
                        <Text style={styles.value}>{selectedRep?.Role || 'Role not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Department:</Text>
                        <Text style={styles.value}>{selectedRep?.Department || 'Department not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mobile No:</Text>
                        <Text style={styles.value}>{selectedRep?.Phone_No || 'Mobile No not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Current Address:</Text>
                        <Text style={styles.value}>{selectedRep?.Address || 'Address not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Timestamp:</Text>
                        <Text style={styles.value}>
                            {selectedRep?.Timestamp ? selectedRep.Timestamp.toDate().toLocaleString() : 'Time not available'}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};




// CustomMapView Component
const CustomMapView = ({ salesReps = [], currentLocation, onMarkerPress }) => {
    const departmentColors = {
        'battery': 'red',
        'tyre': 'blue',
        'spare_parts': 'yellow',
    };

    return (
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
                        latitude: rep.Latitude || 0,
                        longitude: rep.Longitude || 0
                    }}
                    title={rep.Name || 'Unknown Location'}
                    pinColor={departmentColors[rep.Department] || 'gray'}
                    onPress={() => onMarkerPress(rep)} // Call onMarkerPress when a marker is pressed
                />
            ))}
        </MapView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        height: 5,
    },
    animation: {
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
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchInput: {
        fontSize: 18,
    },
    homeContainer: {
        backgroundColor: '#daa520',
        height: 111,
        padding: 20,
    },
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Full screen when infoContainer is not shown
    },
    mapContainerWithInfo: {
        flex: 0.6, // Adjust this value based on how much space you want the map to occupy when infoContainer is shown
    },
    map: {
        width: '100%',
        height: '100%',
        marginTop:30,
    },
    infoContainer: {
        paddingTop: 10,
        paddingLeft: 15,
        height: 'auto', 
        backgroundColor: '#fff',
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
