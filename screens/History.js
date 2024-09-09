import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../firebaseConfig';

const History = () => {
  const [salesRepName, setSalesRepName] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const onSearch = async () => {
    setModalVisible(true);
    const db = getFirestore(app);

    if (!salesRepName) {
      alert("Please enter a sales rep name");
      return;
    }

    const startDate = new Date(fromDate.setHours(0, 0, 0, 0));
    const endDate = new Date(toDate.setHours(23, 59, 59, 999));

    try {
      const salesRepQuery = query(
        collection(db, 'Sales Rep'),
        where('Name', '==', salesRepName)
      );
      const salesRepSnapshot = await getDocs(salesRepQuery);

      if (salesRepSnapshot.empty) {
        alert("Sales rep not found");
        return;
      }

      const salesRepData = [];
      for (const salesRepDoc of salesRepSnapshot.docs) {
        const locationHistoryRef = collection(salesRepDoc.ref, 'Location History');
        const historyQuery = query(
          locationHistoryRef,
          where('Timestamp', '>=', startDate),
          where('Timestamp', '<=', endDate)
        );
        const historySnapshot = await getDocs(historyQuery);

        if (!historySnapshot.empty) {
          historySnapshot.forEach((historyDoc) => {
            const data = historyDoc.data();
            salesRepData.push({
              date: data.Timestamp.toDate().toLocaleString(),
              address: data.address,
              latitude: data.latitude,
              longitude: data.longitude,
            });
          });
        } else {
          alert("No location history found for the selected range");
        }
      }

      setLocationHistory(salesRepData);

    } catch (error) {
      console.error("Error fetching location history:", error);
      alert("Error fetching location history");
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.historyItem}>
      <Card.Content>
        <Text style={styles.historyDate}>{`Date: ${item.date}`}</Text>
        <Text style={styles.historyLocation}>{`Address: ${item.address}`}</Text>
        <Text style={styles.historyLocation}>{`Latitude: ${item.latitude}`}</Text>
        <Text style={styles.historyLocation}>{`Longitude: ${item.longitude}`}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sales Rep History</Text>
      </View>

      <Image
        source={require('../assets/map.png')}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <MaterialIcons name="person-search" size={24} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Enter the name"
          value={salesRepName}
          onChangeText={setSalesRepName}
        />
      </View>

      <Text style={styles.textFix}>Date</Text>

      <View style={styles.dateTimeRow}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.textMark}>{'From:'}</Text>
          <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateTimeButton}>
            <Text>{fromDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showFromPicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || fromDate;
                setShowFromPicker(false);
                setFromDate(currentDate);
              }}
            />
          )}
        </View>

        <View style={styles.dateTimeContainer}>
          <Text style={styles.textMark}>{'To:'}</Text>
          <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateTimeButton}>
            <Text>{toDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showToPicker && (
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || toDate;
                setShowToPicker(false);
                setToDate(currentDate);
              }}
            />
          )}
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.textFix}>Time</Text>
      <View style={styles.dateTimeRow}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.textMark}>{'From:'}</Text>
          <TouchableOpacity onPress={() => setShowFromTimePicker(true)} style={styles.dateTimeButton}>
            <Text>{fromDate.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showFromTimePicker && (
            <DateTimePicker
              value={fromDate}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                const currentTime = selectedTime || fromDate;
                setShowFromTimePicker(false);
                setFromDate(currentTime);
              }}
            />
          )}
        </View>

        <View style={styles.dateTimeContainer}>
          <Text style={styles.textMark}>{'To:'}</Text>
          <TouchableOpacity onPress={() => setShowToTimePicker(true)} style={styles.dateTimeButton}>
            <Text>{toDate.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showToTimePicker && (
            <DateTimePicker
              value={toDate}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                const currentTime = selectedTime || toDate;
                setShowToTimePicker(false);
                setToDate(currentTime);
              }}
            />
          )}
        </View>
      </View>

      <Button
        mode="contained"
        onPress={onSearch}
        style={styles.searchButton}
        icon="magnify"
      >
        Search
      </Button>

      {/* Modal to show search results */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.resultsContainer}>
              <FlatList
                data={locationHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            </ScrollView>
            <Button
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  textMark: {},
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'contain',
    marginBottom: 30,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    elevation: 1,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  dateTimeRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 30,
  },
  dateTimeContainer: {
    width: '50%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dateTimeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
  },
  
  searchButton: {
    marginTop: 20,
    backgroundColor:'black'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  resultsContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  historyItem: {
    marginBottom: 10,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyLocation: {
    fontSize: 14,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor:'black'
  },
});

export default History;
