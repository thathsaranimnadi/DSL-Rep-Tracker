import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Update() {
    return (
        <View style={styles.container}>
            <Text>Update Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
