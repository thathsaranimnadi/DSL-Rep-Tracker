import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
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

        fetchSalesReps();
    }, []);

    const handleSearch = (query) => {
        const filtered = salesReps.filter(rep => rep.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredSalesReps(filtered);
    };

    return (
        <View style={styles.homeContainer}>
            <Header onSearch={handleSearch} />
            <CustomMapView salesReps={filteredSalesReps} />
            <SalesRepsList salesReps={filteredSalesReps} onSelect={setSelectedRep} />
            {selectedRep && <SalesRepDetails rep={selectedRep} />}
        </View>
    );
};

const CustomMapView = ({ salesReps }) => {
    return (
        <View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
            >
                {salesReps.map(rep => (
                    <Marker
                        key={rep.id}
                        coordinate={{ latitude: rep.latitude, longitude: rep.longitude }}
                        title={rep.name}
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
            {/* Add more details as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        height: '100%',
        padding: 20,
    },
    map: {
        width: '100%',
        height: 500,
        marginTop: 40,
    },
    repItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    repDetails: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
    },
});

export default HomeScreen;
