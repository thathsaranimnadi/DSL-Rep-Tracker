import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Signup, Welcome } from './screens'; // Import Welcome correctly

const Stack = createNativeStackNavigator(); // Use capital S for Stack

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          initialRouteName="Welcome" // Use capital W for Welcome
      >
        <Stack.Screen
          name="Welcome" // Use capital W for Welcome
          component={Welcome} // Use capital W for Welcome
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
