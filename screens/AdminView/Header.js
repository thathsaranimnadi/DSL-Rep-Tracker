import {View,Text} from 'react-native'
import React from 'react'
import {useUser} from 'clerk/clerk-expo'
import { TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Header() {
        const {isLoaded,isSignedIn,user}=useUser();

    return isLoaded&& (
        <View style={{}}>
            <View style={{
                display:'flex',
                flexDirection:'row',
                gap:10,
                alignItems:'center'}}>

                <Image source={require('../assests/hi.gif')} 
                style={{
                    width:50,
                    height:50,
                    borderRadius:99
                }}/>
                <View>
                    <Text style={{color:'#000000'}}>Welcome,</Text>
                </View>
            </View>

            <View style={{
                backgroundColor:'#ffffff',
                paddingLeft:20,
                paddingRight:5,
                borderRadius:99,
                marginTop:25,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'}}>
                <TextInput placeholder='Search Users'  
                
                    style={{
                        fontFamily:'outfit',
                        fontSize:18
                    }}/>
                <MaterialIcons name="person-search" size={50} color="black" />
            </View>
        </View>
    )
}
