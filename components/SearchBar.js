import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';


export default function SearchBar(){
    return (
        <View style = { styles.asembler }>
        <View style = { styles.searchContainer }>
            <TextInput placeholder = 'Search the account'style = { styles.searchInput}>
                
            </TextInput>
        <View style = { styles.button}>
            <TouchableOpacity>
                <Ionicons style = { styles.icon } name="search" size={32}color={'Black'} />
            </TouchableOpacity>
        </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 5,
        borderRadius: 99,
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor :'#C0C0C0', 
        height: 50,
        width: 250
    },
    searchInput: {
        fontSize: 18,
        marginLeft: 5,
        marginTop : 5,
        marginBottom : 5,
        paddingRight: 5 

    },
    button:{
        backgroundColor: '#ffffff',
        height: 50,
        width: 60,
        borderWidth: 1,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderColor :'#C0C0C0',
        alignItems: 'center',

    },
    asembler:{
        flexDirection: 'row',
        justifyContent : 'center',
        marginTop: 50,
    
    },
     icon:{
        marginRight: 10,

     }
})