import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login,Signup,welcome } from './screens';

const stack=createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator
          initialRouteName="welcome"
          >
            <stack.Screen
              name="welcome"
              component={welcome}
              options={{
                headerShown:false
              }}
            />
            <stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown:false
              }}
            />
            <stack.Screen
              name="Signup"
              component={ Signup}
              options={{
                headerShown:false
              }}
            />

      </stack.Navigator>
    </NavigationContainer>
  );
}