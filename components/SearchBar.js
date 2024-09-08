import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchText); // Pass the search text to the parent component
        }
    };

    return (
        <View style={styles.asembler}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search by name or ID"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.searchInput}
                />
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleSearch}>
                        <Ionicons style={styles.icon} name="search" size={32} color={'Black'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        borderRadius: 99,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#C0C0C0',
        height: 50,
        width: 300,
        alignItems: 'center',
    },
    searchInput: {
        fontSize: 18,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        paddingRight: 5,
        flex: 1,
    },
    button: {
        backgroundColor: '#ffffff',
        height: 52,
        width: 60,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        borderColor: '#C0C0C0',
        alignItems: 'center',
        borderWidth: 1,
        paddingRight: 10,

        
        
    },
    asembler: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    icon: {
        marginRight: 0,
    },
});
