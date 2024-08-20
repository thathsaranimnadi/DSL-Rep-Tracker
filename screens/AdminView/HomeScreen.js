import { View, Text } from 'react-native';
import React from 'react';
import Header from './Header';


export default function HomeScreen() {
    return (
        <View>
            <View style={{ 
                backgroundColor: '#ffd700',
                 height: 250, 
                 padding: 20 
                }}>
                <Header />
            </View>
        </View>
    );
}
