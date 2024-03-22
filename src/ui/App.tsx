import React, {useState, useEffect} from 'react';
import {HomeScreen} from './HomeScreen';
import {LoginScreen} from '../onboarding/ui/LoginScreen';
import {LandingScreen} from '../onboarding/ui/LandingScreen';
import {SignupScreen} from '../onboarding/ui/Signup/SignupScreen';
import {AuthProvider} from '../auth/AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../auth/AuthProvider';
import {Animated, View} from 'react-native';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Landing"
    screenOptions={{
      headerShown: false,
      animation: 'fade',
      contentStyle: {backgroundColor: '#4B6496'},
    }}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'fade',
      contentStyle: {backgroundColor: '#4B6496'},
    }}>
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
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    // Instantly set to 0 to ensure it's not visible
    fadeAnim.setValue(0);
    // On token change, animate the opacity
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [token]); // Depend on token to trigger animation

  return (
    <View style={{flex: 1, backgroundColor: '#4B6496'}}>
      <Animated.View style={{flex: 1, opacity: fadeAnim}}>
        {token ? <HomeStack /> : <AuthStack />}
      </Animated.View>
    </View>
  );
};

export default App;
