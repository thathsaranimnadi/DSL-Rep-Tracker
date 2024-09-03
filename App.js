import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAdmin from './screens/LoginAdmin';
import LoginRep from './screens/LoginRep';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import SalesRepView from './screens/SalesRepView';
import Splash from './screens/Splash';
import { HomeScreen } from './screens';
import Signup0 from './screens/Signup0';
import Delete from './screens/Delete';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginAdmin"
          component={LoginAdmin}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="LoginRep"
          component={LoginRep}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup0"
          component={Signup0}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SalesRepView"
          component={SalesRepView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Delete'
          component={Delete}
          options={{headerShown:false}}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
