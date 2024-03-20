import React from 'react';
import {HomeScreen} from './HomeScreen';
import {LoginScreen} from '../onboarding/ui/LoginScreen';
import {LandingScreen} from '../onboarding/ui/LandingScreen';
import {SignupScreen} from '../onboarding/ui/Signup/SignupScreen';
import {AuthProvider} from '../auth/AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../auth/AuthProvider';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Landing"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
};

const AppContent = () => {
  const {token} = useAuth();

  return token ? <HomeStack /> : <AuthStack />;
};

export default App;

