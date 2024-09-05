import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Image
                    source={require('../assets/dsl.png')} 
                    style={styles.profileImage}
                />
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}
const styles = StyleSheet.create({
    drawerHeader: {
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor:'#f0c95a',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    
});
