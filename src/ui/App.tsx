import React from 'react';
import {HomeScreen} from './HomeScreen';
import {LoginScreen} from '../onboarding/ui/LoginScreen';
import {LandingScreen} from '../onboarding/ui/LandingScreen';
import {SignupScreen} from '../onboarding/ui/SignupScreen';
import {AuthProvider} from '../auth/AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
