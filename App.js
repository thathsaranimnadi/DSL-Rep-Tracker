import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginAdmin from './screens/LoginAdmin';
import LoginRep from './screens/LoginRep';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import SalesRepView from './screens/SalesRepView';
import Splash from './screens/Splash';
import HomeScreen from './screens/HomeScreen';
import Signup0 from './screens/Signup0';
import Delete from './screens/Delete';

import  History  from './screens/History';
import Update from './screens/Update';
import ChangePassword from './screens/ChangePassword';


// Create stack and drawer navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
    return (
        <Drawer.Navigator initialRouteName="HomeScreen">
            <Drawer.Screen name="Home" component={HomeScreen} 
                drawerContent={props => <CustomDrawerContent {...props} />}
            />
            <Drawer.Screen name="History" component={History} />
            <Drawer.Screen name="Update User" component={Update} />
            <Drawer.Screen name="Delete User" component={Delete} />
            <Drawer.Screen name="Change Password" component={ChangePassword} />
            <Drawer.Screen name="Log Out" component={Welcome}  options={{ headerShown: false }}/>
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="LoginAdmin" component={LoginAdmin} options={{ headerShown: false }} />
                <Stack.Screen name="LoginRep" component={LoginRep} options={{ headerShown: false }} />
                <Stack.Screen name="Signup0" component={Signup0} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="SalesRepView" component={SalesRepView} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="Delete" component={Delete} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
