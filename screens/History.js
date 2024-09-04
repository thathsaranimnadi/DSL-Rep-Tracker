import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Card, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const History = () => {
  const [salesRepName, setSalesRepName] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const onSearch = () => {
    // Fetch location history logic here
    setShowResults(false); // Hide results while searching
  };

  const onViewResults = () => {
    setShowResults(true); // Show results after clicking "View"
  };

  const renderItem = ({ item }) => (
    <Card style={styles.historyItem}>
      <Card.Content>
        <Text style={styles.historyDate}>{`Date: ${item.date}`}</Text>
        <Text style={styles.historyLocation}>{`Location: ${item.location}`}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>View Sales Rep History</Text>
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="person-search" size={24} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Enter Sales Rep Name"
          value={salesRepName}
          onChangeText={setSalesRepName}
        />
      </View>

      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateTimeButton}>
          <Text>{`From: ${fromDate.toLocaleDateString()} ${fromDate.toLocaleTimeString()}`}</Text>
        </TouchableOpacity>
        {showFromPicker && (
          <DateTimePicker
            value={fromDate}
            mode="datetime"
            is24Hour={true}
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
        <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateTimeButton}>
          <Text>{`To: ${toDate.toLocaleDateString()} ${toDate.toLocaleTimeString()}`}</Text>
        </TouchableOpacity>
        {showToPicker && (
          <DateTimePicker
            value={toDate}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || toDate;
              setShowToPicker(false);
              setToDate(currentDate);
            }}
          />
        )}
      </View>

      <Button
        mode="contained"
        onPress={onSearch}
        style={styles.searchButton}
        icon="magnify"
      >
        Search
      </Button>

      <Button
        mode="outlined"
        onPress={onViewResults}
        disabled={locationHistory.length === 0}
        style={styles.viewButton}
        icon="eye"
      >
        View
      </Button>

      {showResults && (
        <FlatList
          data={locationHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          style={styles.historyList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#daa520',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
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
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  dateTimeContainer: {
    marginBottom: 16,
  },
  dateTimeButton: {
    padding: 12,
    backgroundColor: '#daa520',
    borderRadius: 5,
    elevation: 1,
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: '#daa520',
  },
  viewButton: {
    marginTop: 10,
    borderColor: '#6200ee',
  },
  historyList: {
    marginTop: 20,
  },
  historyItem: {
    marginBottom: 10,
    elevation: 2,
    borderRadius: 5,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#daa520',
  },
  historyLocation: {
    fontSize: 14,
    color: '#777',
  },
});

export default History;
