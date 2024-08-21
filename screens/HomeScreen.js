import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import app from '../firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Marker } from 'react-native-maps';

import axios from 'axios'; 

const Header = ({ onSearch }) => {
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
                    onChangeText={onSearch}
                />
                <MaterialIcons name="person-search" size={50} color="black" />
            </View>
        </View>
    );
};

const HomeScreen = () => {
    const [salesReps, setSalesReps] = useState([]);
    const [filteredSalesReps, setFilteredSalesReps] = useState([]);
    const [selectedRep, setSelectedRep] = useState(null);
    
    const [rep , setRep] = useState({});
    // Fetch data from Firestore
    const setData = async () => {
        try {
            const db = getFirestore(app);
            const repCollection = collection(db, 'Sales Rep name');
            const snapshot = await getDocs(repCollection);
            snapshot.docs.forEach((doc) => {
                console.log(doc.data());
                setRep(doc.data());


            setSalesReps(reps);
            setFilteredSalesReps(reps);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    // Use useEffect to trigger data fetch
    useEffect(() => {
        setData();
    }, []);

    /*const [salesReps, setSalesReps] = useState([]);
    const [filteredSalesReps, setFilteredSalesReps] = useState([]);
    const [selectedRep, setSelectedRep] = useState(null);

    useEffect(() => {
        // Fetch sales reps' locations from backend
        const fetchSalesReps = async () => {
            try {
                const response = await axios.get('YOUR_API_ENDPOINT');
                setSalesReps(response.data);
                setFilteredSalesReps(response.data);
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchSalesReps();
    }, []);
*/
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
                <CustomMapView />
        </View>
    );
};

const CustomMapView = ({ salesReps = [] }) => { // Added default empty array
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

const SalesRepDetails = ({ rep }) => {
    return (
        <View style={styles.repDetails}>
            <Text>Name: {rep.name}</Text>
            <Text>Location: {rep.location}</Text>
            
        </View>
    );
};


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
        marginBottom: 10 // Optional margin between rows
    },
    repItem: {
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    repDetails:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:5,
        marginTop:10
    },

});

export default HomeScreen;
