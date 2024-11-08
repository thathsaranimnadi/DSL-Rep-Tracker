import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import History from '../screens/History';
import CustomDrawerContent from './CustomDrawerContent';
import Password from '../screens/Password';
import Notification from '../screens/Notification';

import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
    const navigation = useNavigation();

    // Custom logout confirmation
    const handleLogout = () => {
        Alert.alert(
            'Logout Confirmation',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('LoginAdmin'), // Navigate to LoginAdmin page
                },
            ],
            { cancelable: false }
        );
    };

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
            <Drawer.Screen name="Reset Password" component={Password} />
            <Drawer.Screen name="Notifications" component={Notification} />
            <Drawer.Screen
                name="Log Out"
                component={HomeScreen} // Use any component, it won't be displayed
                options={{
                    headerShown: false,
                    // Custom handler for Log Out
                    drawerLabel: 'Log Out',
                    onPress: handleLogout, // Call the logout confirmation
                }}
                listeners={{
                    drawerItemPress: (e) => {
                        e.preventDefault(); // Prevent default behavior
                        handleLogout(); // Trigger logout confirmation
                    },
                }}
            />
        </Drawer.Navigator>
    );
}
