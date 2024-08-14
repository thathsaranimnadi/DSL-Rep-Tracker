import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'

// Define black color manually
const black = "#000000";

const Splash = ({ navigation }) => {
   useEffect(()=> {
        setTimeout(()=>{
            navigation.navigate("Welcome");
        },2000);
   }, []);

  return (
    <View style={{
        backgroundColor:"white",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
        }}>

      <Animatable.Text style={{
        color:black,
        fontSize:36,
        fontWeight:"800"
        }} duration={2000} animation="fadeInDownBig">
        DSL
      </Animatable.Text>
    </View>
  )
};

export default Splash

const styles = StyleSheet.create({})
