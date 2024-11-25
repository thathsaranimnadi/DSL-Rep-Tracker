import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAdmin from './screens/LoginAdmin';
import LoginRep from './screens/LoginRep';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import SalesRepView from './screens/SalesRepView';
import Splash from './screens/Splash';
import Signup0 from './screens/Signup0';
import HomeDrawer from './components/HomeDrawer'; 
import  ChangePassword  from './screens/ChangePassword';
import Notification from './screens/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const Stack = createNativeStackNavigator();

export default function App() {

    const [initialRoute, setInitialRoute] = useState(null); // Track initial route
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const auth = getAuth();

    useEffect(() => {
        const checkSession = async () => {
            try {
                // Retrieve session data from AsyncStorage
                const sessionData = await AsyncStorage.getItem('userSession');
                console.log("Session data retrieved:", sessionData);

                if (sessionData) {
                    const parsedData = JSON.parse(sessionData);
                    console.log("Parsed session data:", parsedData);

                    const { Email, Password } = parsedData;

                    // Navigate based on the user's role
                    if (parsedData.Role === 'sales_rep') {               
                        if (Email && Password) {
                            try {
                              await signInWithEmailAndPassword(auth, Email, Password);
                              console.log("User authenticated with Firebase using session data.");
                              // After successful authentication, navigate to SalesRepView
                              setInitialRoute('SalesRepView');
                              console.log("Navigate to sales rep view")
                            } catch (error) {
                              console.error("Error authenticating with Firebase:", error);
                              setInitialRoute('Welcome'); // Fallback if authentication fails
                            }
                          }

                    } else if (!("Role" in parsedData)) {
                        if (Email && Password) {
                            try {
                              await signInWithEmailAndPassword(auth, Email, Password);
                              console.log("User authenticated with Firebase using session data.");
                              // After successful authentication, navigate to SalesRepView
                              setInitialRoute('HomeScreen');
                              console.log("Navigate to admin view")
                            } catch (error) {
                              console.error("Error authenticating with Firebase:", error);
                              setInitialRoute('Welcome'); // Fallback if authentication fails
                            }
                          }

                    } else {
                        setInitialRoute('Welcome'); // Fallback to Welcome
                    }

                } else {
                    setInitialRoute('Splash'); // No session, go to Welcome
                }
            } catch (error) {
                console.error("Error checking session:", error);
                setInitialRoute('Splash'); // On error, go to Welcome
            }finally {
                setIsLoading(false); // Stop loading
              }
        };

        checkSession();
    }, []);



    // Return splash screen while loading
    if (isLoading) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="LoginAdmin" component={LoginAdmin} options={{ headerShown: false }} />
                <Stack.Screen name="LoginRep" component={LoginRep} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>
                <Stack.Screen name="Signup0" component={Signup0} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="SalesRepView" component={SalesRepView} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
