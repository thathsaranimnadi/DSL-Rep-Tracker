import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'



const black = "#000000";

const Splash = ({ navigation }) => {
   useEffect(()=> {
        setTimeout(()=>{
            navigation.navigate("Welcome");
        }, 2000);
   }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
        source={require('../assets/dsl.png')} 
        style={styles.logo}
        duration={2000}
        animation="zoomIn"
      />
    </View>
  )
};

export default Splash

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#070738",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 150, 
    height: 200, 
    
    
  }
});
