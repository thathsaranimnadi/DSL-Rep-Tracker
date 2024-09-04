import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import SearchBar from '../components/SearchBar';
import app from '../firebaseConfig';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
//import { Button } from 'react-native-paper';
import Button from '../components/Button';

export default function Delete() {
    const [salesReps, setSalesReps] = useState([]);
    const [filteredSalesReps, setFilteredSalesReps] = useState([]);

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
            setFilteredSalesReps(repsData); 
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
                rep.Name.toLowerCase().startsWith(query.toLowerCase()) || 
                rep.Employee_ID.toLowerCase() === query.toLowerCase()
            );
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
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
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
            setData(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting document: ", error);
            Alert.alert("Error occurred while deleting the account!");
        }
    }


    return (
        <View style={styles.BG}>
            <View style={styles.searchbar}>
                <SearchBar onSearch={handleSearch} />
            </View>
            <View style={styles.scrollView}>
            <FlatList
                data={filteredSalesReps}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.noResultsText}>No such account found.</Text>}
                alwaysBounceVertical={false}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    BG: {
        backgroundColor: '#ffffd8',
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
        fontSize: 18,
    },
    noResultsText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 250,
        color: 'red',
    },
    searchbar:{
        marginBottom:50,
        borderColor: 'black',	

    },
    scrollView:{

    },

    deleteb:{
        backgroundColor: "red",
        width: 100,
        alignSelf: 'flex-end',
    },
    buttonp:{

    }
});
