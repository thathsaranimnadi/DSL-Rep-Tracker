import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, Image, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { getFirestore, collection, query, where, getDocs, doc } from 'firebase/firestore';
import app from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';

const { height, width } = Dimensions.get('window');

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
  const [department, setDepartment] = useState('');

  const normalizeString = (str) => {
    return str
      .toLowerCase()         // Convert to lowercase
      .replace(/\s+/g, '')   // Remove all spaces
      .replace(/\./g, '');   // Remove all dots
  };

  useEffect(() => {
    const fetchAdminDepartment = async () => {
      const db = getFirestore(app);
      const auth = getAuth();
      const adminId = auth.currentUser.uid;
  
      try {
        const adminDocRef = doc(db, 'Admin', adminId); 
        const adminDocSnap = await getDoc(adminDocRef); // Use getDoc instead of getDocs
  
        if (adminDocSnap.exists()) {
          setDepartment(adminDocSnap.data().Department); 
        } else {
          alert('Admin not found');
        }
      } catch (error) {
        console.error('Error fetching admin department:', error);
        alert('Error fetching admin department');
      }
    };
  
    fetchAdminDepartment();
  }, []);
  
  const onSearch = async () => {
    const db = getFirestore(app);

    if (!salesRepName) {
      alert("Please enter a sales rep name");
      return;
    }

    const normalizedInput = normalizeString(salesRepName);
    const startDate = new Date(fromDate.setHours(0, 0, 0, 0));
    const endDate = new Date(toDate.setHours(23, 59, 59, 999));

    try {
      const salesRepQuery = query(
        collection(db, 'Sales Rep'),
        where('Department', '==', department)  // Only fetch sales reps from the admin's department
      );

      const salesRepSnapshot = await getDocs(salesRepQuery);

      const filteredSalesReps = salesRepSnapshot.docs.filter((doc) => {
        const rep = doc.data();
        const normalizedRepName = normalizeString(rep.Name); // Normalize the stored name
        return normalizedRepName.includes(normalizedInput);
      });

      if (filteredSalesReps.length === 0) {
        alert("No sales reps found");
        return;
      }

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
              address: data.Address || 'No address available',
              latitude: data.Latitude || 'No latitude available',
              longitude: data.Longitude || 'No longitude available',
            });
          });
        } else {
          alert("No location history found for the selected range");
        }
      }

      setLocationHistory(salesRepData);
      setModalVisible(true);

      // Reset state after search
      setSalesRepName('');
      setFromDate(new Date());
      setToDate(new Date());
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

      {/* Date Picker Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Date</Text>
        <View style={styles.dateTimeRow}>
          {/* From Date Picker */}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.label}>From:</Text>
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

          {/* To Date Picker */}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.label}>To:</Text>
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
      </View>

      {/* Time Picker Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Time</Text>
        <View style={styles.dateTimeRow}>
          {/* From Time Picker */}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.label}>From:</Text>
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

          {/* To Time Picker */}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.label}>To:</Text>
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
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={locationHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
            <Button onPress={() => setModalVisible(false)} style={styles.closeButton}>
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
  image: {
    width: '100%',
    height: 260,
    resizeMode: 'contain',
    marginBottom: 30,
    marginTop: height > 1000 ? height * 0.05 : height * 0.01,
    marginBottom: height > 1000 ? height * 0.07 : height * 0.01,
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 17,
    marginLeft: 10,
  },
  pickerContainer: {
    marginTop: 8,
    marginBottom: height > 1000 ? height * 0.04 : height * 0.02,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight:10,
 
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginRight:10,
    
  },
  label: {
    fontSize: 16,
    width: 50, 
   
  },
  dateTimeButton: {
    flex: 1,
    padding: 9,
    borderRadius: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    marginTop: 15,
    backgroundColor: '#070738',
    width:290,
    justifyContent:'center',
    alignSelf: 'center',
    
    
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    
  },
  resultsContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    height:'100%'
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
    marginTop: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'black',
    width: '100%',
    padding: 10,
  },
 
});

export default History;
