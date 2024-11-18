import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import NetInfo from '@react-native-community/netinfo';
import app from '../firebaseConfig';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import authentication

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
    const [searchQuery, setSearchQuery] = useState('');
    const [isDataEnabled, setIsDataEnabled] = useState(true);
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);
    const [adminDepartment, setAdminDepartment] = useState(null);

    // Fetch admin's department from Firestore
    const fetchAdminDepartment = async (uid) => {
        try {
            const db = getFirestore(app);
            const adminDoc = await getDoc(doc(db, 'Admin', uid));
            if (adminDoc.exists()) {
                setAdminDepartment(adminDoc.data().Department);
            } else {
                console.error('Admin not found');
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    };

    // Fetch sales reps from Firestore
    const fetchSalesReps = async () => {
        try {
            const db = getFirestore(app);
            const repCollection = collection(db, 'Sales Rep');
            const snapshot = await getDocs(repCollection);
            const repsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSalesReps(repsData);
            setFilteredSalesReps(repsData.filter(rep => rep.Department === adminDepartment));
        } catch (error) {
            console.error('Error fetching sales reps data:', error);
        }
    };

    // Monitor data and location status
    const monitorDataAndLocation = () => {
        const unsubscribeNetInfo = NetInfo.addEventListener(state => {
            if (!state.isConnected || !state.isInternetReachable) {
                setIsDataEnabled(false);
                notifyAdmin('Data disabled');
            } else {
                setIsDataEnabled(true);
            }
        });

        const checkLocationStatus = async () => {
            const { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') {
                setIsLocationEnabled(false);
                notifyAdmin('Location disabled');
            } else {
                setIsLocationEnabled(true);
            }
        };

        checkLocationStatus();

        return () => {
            unsubscribeNetInfo();
        };
    };

    // Notify admin when data or location is disabled
    const notifyAdmin = (message) => {
        Alert.alert('Warning', `Sales rep has turned off ${message}`);
    };

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            fetchAdminDepartment(user.uid); // Pass the uid to fetchAdminDepartment
        } else {
            console.error('User is not authenticated');
        }

        monitorDataAndLocation();
    }, []);

    useEffect(() => {
        if (adminDepartment) {
            fetchSalesReps();
        }
    }, [adminDepartment]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filtered = salesReps.filter(rep =>
                (rep.Name.toLowerCase().includes(query.toLowerCase()) ||
                rep.Employee_ID.toLowerCase().includes(query.toLowerCase())) &&
                rep.Department === adminDepartment
            );
            setFilteredSalesReps(filtered);
            setSelectedRep(filtered.length > 0 ? filtered[0] : null);
        } else {
            setFilteredSalesReps(salesReps.filter(rep => rep.Department === adminDepartment));
            setSelectedRep(null);
        }
    };

    const handleMarkerPress = (rep) => {
        setSelectedRep(rep);
    };

    const showInfo = selectedRep || searchQuery;

    return (
        <View style={styles.container}>
            <View style={styles.homeContainer}>
                <Header onSearch={handleSearch} />
            </View>

            <View style={[styles.mapContainer, showInfo && styles.mapContainerWithInfo]}>
                <CustomMapView
                    salesReps={filteredSalesReps}
                    onMarkerPress={handleMarkerPress}
                />
            </View>

            {showInfo && (
                <ScrollView style={styles.infoContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name: </Text>
                        <Text style={styles.value}>{selectedRep?.Name || 'Name not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Employee ID: </Text>
                        <Text style={styles.value}>{selectedRep?.Employee_ID || 'Employee ID not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Role: </Text>
                        <Text style={styles.value}>{selectedRep?.Role || 'Role not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Department: </Text>
                        <Text style={styles.value}>{selectedRep?.Department || 'Department not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mobile No: </Text>
                        <Text style={styles.value}>{selectedRep?.Phone_No || 'Mobile No not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Current Address: </Text>
                        <Text style={styles.value}>{selectedRep?.Address || 'Address not available'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Timestamp: </Text>
                        <Text style={styles.value}>
                            {selectedRep?.Timestamp ? selectedRep.Timestamp.toDate().toLocaleString() : 'Time not available'}
                        </Text>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

// CustomMapView Component
const CustomMapView = ({ salesReps = [], currentLocation, onMarkerPress }) => {
    const departmentColors = {
        'Energy': 'red',
        'Tyre': 'blue',
        'Auto-Parts': 'yellow',
        'Ronet': 'green',
        'Ekway': 'white',
        'GCR': 'purple',
        'Industrial': 'orange'
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
                    onPress={() => onMarkerPress(rep)}
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
    welcomeText: {
        color: '#000000',
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
        backgroundColor: '#ffffff'
    },
    homeContainer: {
        backgroundColor: '#070738',
        height: 111,
        paddingTop: 15,
        paddingBottom: 30,
    },
    mapContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    mapContainerWithInfo: {
        flex: 0.5
    },
    map: {
        flex: 1,
    },
    infoContainer: {
        backgroundColor: 'white',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
    },
});

export default HomeScreen;
