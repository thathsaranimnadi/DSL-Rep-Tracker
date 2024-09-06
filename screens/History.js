import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const History = () => {
  const [salesRepName, setSalesRepName] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const onSearch = () => {
    setShowResults(false);
  };

  const onViewResults = () => {
    setShowResults(true);
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
          placeholder="Enter Sales Rep Name"
          value={salesRepName}
          onChangeText={setSalesRepName}
        />
      </View>

      {/* Date and Time Picker for "From" */}
      <View style={styles.dateTimeRow}>
        <View style={[styles.dateTimeContainer, { backgroundColor: '#ffebcd' }]}>
          <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateTimeButton}>
            <Text>{'From Date:'}</Text>
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

        <View style={[styles.dateTimeContainer, { backgroundColor: '#ffebcd' }]}>
          <TouchableOpacity onPress={() => setShowFromTimePicker(true)} style={styles.dateTimeButton}>
            <Text>{'From Time:' }</Text>
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
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Date and Time Picker for "To" */}
      <View style={styles.dateTimeRow}>
        <View style={[styles.dateTimeContainer, { backgroundColor: '#f5f5f5' }]}>
          <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateTimeButton}>
            <Text>{'To Date :'}</Text>
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

        <View style={[styles.dateTimeContainer, { backgroundColor: '#f5f5f5' }]}>
          <TouchableOpacity onPress={() => setShowToTimePicker(true)} style={styles.dateTimeButton}>
            <Text>{'To Time :'}</Text>
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
    backgroundColor: 'white',
  },
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
    borderWidth:1
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  dateTimeRow: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  dateTimeContainer: {
    width: '100%',
    marginBottom: 10,
  },
  dateTimeButton: {
    padding: 9,
    borderRadius: 5,
    elevation: 1,
  },
  divider: {
    height: 2,
    backgroundColor: 'balck',
    marginVertical: 10,
    marginTop: 2,
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: 'black',
    borderWidth:3
  },
  viewButton: {
    marginTop: 10,
    borderColor: 'black',
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
