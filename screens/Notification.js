import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function NotificationHistory() {
    const [notifications, setNotifications] = useState([]);
    const [salesRepName, setSalesRepName] = useState('');
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const db = getFirestore();

    const normalizeString = (str) => {
        return str
          .toLowerCase()         // Convert to lowercase
          .replace(/\s+/g, '')   // Remove all spaces
          .replace(/\./g, '');   // Remove all dots
    };

    const fetchFilteredNotifications = async () => {
        try {
            let notificationsRef = collection(db, 'AdminNotifications');
            
            let q = query(notificationsRef);
    
            if (department) {
                q = query(notificationsRef, where('Department', '==', department));
            }
            if (startDate && endDate) {
                q = query(
                    notificationsRef,
                    where('Timestamp', '>=', Timestamp.fromDate(startDate)),
                    where('Timestamp', '<=', Timestamp.fromDate(endDate))
                );
            }
    
            // Fetch all documents and apply the normalized filter for the sales rep name
            const snapshot = await getDocs(q);
            let filteredNotifications = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
    
            // Apply normalization and filtering on the client-side
            if (salesRepName) {
                const normalizedInput = normalizeString(salesRepName);
                filteredNotifications = filteredNotifications.filter((notification) => {
                    const normalizedRepName = normalizeString(notification.Name);
                    return normalizedRepName.includes(normalizedInput);
                });
            }
    
            setNotifications(filteredNotifications);
        } catch (error) {
            console.error('Error fetching filtered notifications: ', error);
        }
    };

    // Event handlers for date pickers
    const onStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);
    };

    const onEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                label="Sales Rep Name"
                value={salesRepName}
                onChangeText={text => setSalesRepName(text)}
                style={[styles.input, styles.textInputBg]} // Applying the background color
                placeholder="Enter Sales Rep Name"
            />
            <View style={[styles.pickerContainer, styles.pickerBg]}>
                <Picker
                    selectedValue={department}
                    onValueChange={(itemValue) => setDepartment(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select the Department" value="" />
                    <Picker.Item label="Tyre" value="Tyre" />
                    <Picker.Item label="Energy" value="Energy" />
                    <Picker.Item label="Auto-Parts" value="Auto-Parts" />
                    <Picker.Item label="Ronet" value="Ronet" />
                    <Picker.Item label="Ekway" value="Ekway" />
                    <Picker.Item label="GCR" value="GCR" />
                    <Picker.Item label="Industrial" value="Industrial" />
                </Picker>
            </View>

            <View>
                <Button onPress={() => setShowStartDatePicker(true)}>Select Start Date</Button>
                {showStartDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={onStartDateChange}
                        style={styles.text}

                    />
                )}
            </View>

            <View>
                <Button onPress={() => setShowEndDatePicker(true)}>Select End Date</Button>
                {showEndDatePicker && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display="default"
                        onChange={onEndDateChange}
                        style={styles.text}
                    />
                )}
            </View>

            <Button
                mode="contained"
                onPress={fetchFilteredNotifications}
                style={[styles.filterButton, { backgroundColor: '#070738' }]}
            >
                Filter Notifications
            </Button>

            {notifications.length > 0 ? (
                notifications.map(notification => (
                    <View key={notification.id} style={styles.notificationItem}>
                        <Text style={styles.label}>Sales Rep: {notification.Name}</Text>
                        <Text style={styles.label}>Department: {notification.Department}</Text>
                        <Text style={styles.label}>Message: {notification.Message}</Text>
                        <Text style={styles.label}>Time: {notification.Timestamp.toDate().toLocaleString()}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.text}>No notifications found for the selected filters !</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        marginBottom: 10,
        borderColor: '#070738',
        borderWidth: 1,
        borderRadius: 5,
    },
    textInputBg: {
        backgroundColor: '#ADD8E6', // Background color for TextInput
    },
    pickerContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
    },
    pickerBg: {
        backgroundColor: '#ADD8E6', // Background color for Picker
    },
    picker: {
        height: 50,
        color: 'black'
    },
    filterButton: {
        marginTop: 10,
        marginBottom: 20,
    },
    notificationItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    text: {
        color: '#070738',
        alignSelf: 'center',
        paddingTop: 50,
    }
});
