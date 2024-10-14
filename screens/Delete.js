import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import app from '../firebaseConfig';
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import Button from '../components/Button';

export default function Delete() {
    const [salesReps, setSalesReps] = useState([]);
    const [filteredSalesReps, setFilteredSalesReps] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const setData = () => {
        const db = getFirestore(app);
        const repCollection = collection(db, 'Sales Rep');

        const unsubscribe = onSnapshot(repCollection, (snapshot) => {
            const repsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSalesReps(repsData);
            setFilteredSalesReps(repsData);
            setLoading(false); // Hide loading indicator once data is fetched
        }, (error) => {
            console.error('Error fetching data: ', error);
            setLoading(false); // Stop loading if an error occurs
        });

        return () => unsubscribe(); // Clean up listener when the component unmounts
    };

    useEffect(() => {
        setData();
    }, []);

    const normalizeString = (str) => {
        return str
            .toLowerCase()         // Convert to lowercase
            .replace(/\s+/g, '')   // Remove all spaces
            .replace(/\./g, '');   // Remove all dots
    };

    const handleSearch = (query) => {
        if (query) {
            const normalizedQuery = normalizeString(query);
            const filtered = salesReps.filter(rep =>{
                const normalizedName = normalizeString(rep.Name); // Normalize the stored name
                return normalizedName.includes(normalizedQuery) || 
                rep.Employee_ID.toLowerCase() === normalizedQuery;
        });
            setFilteredSalesReps(filtered.length > 0 ? filtered : []);
        } else {
            setFilteredSalesReps(salesReps);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.repDetails}>
            <Text style={styles.repDetailText}>{item.Name}</Text>
            <Text style={styles.repDetailText}>User ID: {item.Employee_ID}</Text>
            <View style={styles.buttonp}>
                <Button
                    onPress={() => {
                        Alert.alert(
                            "Delete Confirmation",
                            "Are you sure you want to delete this account?",
                            [
                                { text: "Cancel", style: "cancel" },
                                { text: "OK", onPress: () => deleteRep(item.id) }
                            ],
                            { cancelable: false }
                        );
                    }}
                    title="Delete"
                    filled
                    style={styles.deleteb}
                />
            </View>
        </View>
    );

    const deleteRep = async (id) => {
        const db = getFirestore(app);
        try {
            await deleteDoc(doc(db, "Sales Rep", id));
            Alert.alert("User account deleted!");
        } catch (error) {
            console.error("Error deleting document: ", error);
            Alert.alert("Error occurred while deleting the account!");
        }
    };

    return (
        <View style={styles.BG}>
            <View style={styles.searchbar}>
                <SearchBar onSearch={handleSearch} />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredSalesReps}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={styles.noResultsText}>No such account found.</Text>}
                    initialNumToRender={10}  // Render the first 10 items
                    windowSize={5}           // Render 5 screens worth of content for smoother scrolling
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    BG: {
        backgroundColor: '#daa520',
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    repDetails: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    repDetailText: {
        fontSize: 17,
    },
    noResultsText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 250,
        color: 'red',
    },
    searchbar: {
        marginTop:0,
        borderColor: 'black',
    },
    deleteb: {
        backgroundColor: "red",
        width: 100,
        alignSelf: 'flex-end',
        borderBottomColor: '#101010',
        elevation: 10,
        borderColor: 'red',
    },
    buttonp: {},
});
