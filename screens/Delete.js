import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'

export default function Delete(){
    return (
        <View style={styles.BG}>
          <SearchBar/>
        </View>
      )
}

const styles = StyleSheet.create({
    BG:{
        backgroundColor : '#ffffd8' ,
        flex:1
    }
})