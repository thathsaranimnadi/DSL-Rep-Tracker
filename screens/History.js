import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
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
  const [showResults, setShowResults] = useState(false);

  const onSearch = async () => {
    setShowResults(false);
    const db = getFirestore(app);

  
    if (!salesRepName) {
      alert("Please enter a sales rep name");
      return;
    }
  
    // Convert fromDate and toDate to Firestore-compatible format
    const startDate = new Date(fromDate.setHours(0, 0, 0, 0));
    const endDate = new Date(toDate.setHours(23, 59, 59, 999));
  
    try {
      const salesRepQuery = query(collection(db, 'Sales Rep'));
      const salesRepSnapshot = await getDocs(salesRepQuery);

      const filteredSalesReps = salesRepSnapshot.docs.filter((doc) => {
        const rep = doc.data();
        return rep.Name.split(" ").some(word => word.toLowerCase().includes(salesRepName.toLowerCase()));
      });
  
      if (filteredSalesReps.length === 0) {
        alert("No sales reps found with the given name");
        return;
      }
  
      // Loop through each sales rep found (though it should be unique)
      const salesRepData = [];
      for (const salesRepDoc of filteredSalesReps) {
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
  
      // Update the state with the location history results
      setLocationHistory(salesRepData);
      setShowResults(true);
  
    } catch (error) {
      console.error("Error fetching location history:", error);
      alert("Error fetching location history");
    }
  };
  

  const onViewResults = () => {
    setShowResults(true);
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
        {/* Date Picker for "From" */}
        <View style={styles.dateTimeContainer}>

          {/* Display selected "From Date" */}
          <Text style = {styles.textMark}>{'From:'}</Text>

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

        {/* Date Picker for "To" */}
        <View style={styles.dateTimeContainer}>
          {/* Display selected "To Date" */}
          <Text style = {styles.textMark}>{'To:'}</Text>
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

      {/* Divider */}
      <View style={styles.divider} />

      <Text style={styles.textFix}>Time</Text>
      <View style={styles.dateTimeRow}>        
        {/* Time Picker for "From" */}
        <View style={styles.dateTimeContainer}>
          {/* Display selected "From Time" */}
          <Text style = {styles.textMark}>{'From:'}</Text>
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

        {/* Time Picker for "To" */}
        <View style={styles.dateTimeContainer}>
          {/* Display selected "To Time" */}
          <Text style = {styles.textMark}>{'To:'}</Text>
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
  textMark:{
    //marginLeft: 20
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
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  dateTimeButton: {
    padding: 9,
    borderRadius: 1,
    elevation: 1,
  },
  divider: {
    height: 2,
    
  
  },
  searchButton: {
    marginTop: 20,
    backgroundColor: 'black',
    borderWidth: 3,
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
  textFix:{
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  }
});

export default History;
