import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import History from '../screens/History';
import Delete from '../screens/Delete';
import CustomDrawerContent from './CustomDrawerContent';
import Password from '../screens/Password';
import LoginAdmin from '../screens/LoginAdmin';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="HomeScreen"
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#f0f0f0', 
                },
            }}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="History" component={History} />
            <Drawer.Screen name="Delete User" component={Delete} />
            <Drawer.Screen name="Reset Password" component={Password} />
            <Drawer.Screen name="Log Out" component={LoginAdmin} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}
