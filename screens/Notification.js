import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAuth } from 'firebase/auth';

export default function NotificationHistory() {
    const [notifications, setNotifications] = useState([]);
    const [salesRepName, setSalesRepName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [adminDepartment, setAdminDepartment] = useState('');
    const db = getFirestore();
    const auth = getAuth();
    const adminId = auth.currentUser?.uid;

    const normalizeString = (str) => {
        return str
          .toLowerCase()         // Convert to lowercase
          .replace(/\s+/g, '')   // Remove all spaces
          .replace(/\./g, '');   // Remove all dots
    };

    // Fetch admin's department when component mounts
    useEffect(() => {
        const fetchAdminDepartment = async () => {
            try {
                const adminDocRef = doc(db, 'Admin', adminId);
                const adminDocSnap = await getDoc(adminDocRef);
                if (adminDocSnap.exists()) {
                    const adminData = adminDocSnap.data();
                    setAdminDepartment(adminData.Department);
                }
            } catch (error) {
                console.error('Error fetching admin department: ', error);
            }
        };
        if (adminId) {
            fetchAdminDepartment();
        }
    }, [adminId, db]);

    const fetchFilteredNotifications = async () => {
        try {
            let notificationsRef = collection(db, 'AdminNotifications');
            let q = query(notificationsRef, where('Department', '==', adminDepartment)); 
    
            if (startDate && endDate) {
                q = query(
                    notificationsRef,
                    where('Timestamp', '>=', Timestamp.fromDate(startDate)),
                    where('Timestamp', '<=', Timestamp.fromDate(endDate)),
                    where('Department', '==', adminDepartment) 
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
                style={[styles.input, styles.textInputBg]} 
                placeholder="Enter Sales Rep Name"
            />

            <View style={ styles.date}>
                <View style={ styles.datePicker}>
                    <Text>From: </Text>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateTimeButton}>
                        <Text>{startDate ? startDate.toLocaleDateString()  : 'Select Start Date'}</Text>
                    </TouchableOpacity>
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

                <View style={ styles.datePicker}>
                    <Text>To: </Text>
                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateTimeButton}>
                        <Text>{endDate ? endDate.toLocaleDateString() : 'Select End Date'}</Text>
                    </TouchableOpacity>
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
            </View>

            <Button
                mode="contained"
                onPress={fetchFilteredNotifications}
                style={[styles.filterButton, { backgroundColor: '#070738' }, { marginTop: 50}]}
            >
                Filter Notifications
            </Button>

            {notifications.length === 0 && salesRepName ? (
                <Text style={styles.text}>No notifications found for the selected filters!</Text>
            ) : (
                notifications.map(notification => (
                    <View key={notification.id} style={styles.notificationItem}>
                        <Text style={styles.label}>Sales Rep: {notification.Name}</Text>
                        <Text style={styles.label}>Department: {notification.Department}</Text>
                        <Text style={styles.label}>Message: {notification.Message}</Text>
                        <Text style={styles.label}>Time: {notification.Timestamp.toDate().toLocaleString()}</Text>
                    </View>
                ))
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
        backgroundColor: '#ADD8E6', 
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
        elevation: 6
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    text: {
        color: '#070738',
        alignSelf: 'center',
        paddingTop: 150,
    },
    datePicker: {
        flexDirection: 'row',
    },
    dateTimeButton:{
        backgroundColor: '#ADD8E6',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding:5,
    },
    date:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    }
});
