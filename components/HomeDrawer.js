import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import History from '../screens/History';
import Update from '../screens/Update';
import Delete from '../screens/Delete';
import ChangePassword from '../screens/ChangePassword';
import Welcome from '../screens/Welcome';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="HomeScreen"
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="History" component={History} />
            <Drawer.Screen name="Update User" component={Update} />
            <Drawer.Screen name="Delete User" component={Delete} />
            <Drawer.Screen name="Change Password" component={ChangePassword} />
            <Drawer.Screen name="Log Out" component={Welcome} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}