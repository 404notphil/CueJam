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
import {Themes} from './theme/Theme';
import {ConfigureDrillScreen} from '../MainApp/ConfigureDrillScreen';
import {DrillScreen} from '../MainApp/DrillScreen';
import {SavedDrillsScreen} from '../MainApp/SavedDrillsScreen';
import {MainAppHeader} from './MainAppHeader';

export type ScreenName = 'Home' | 'ConfigureDrill' | 'SavedDrills' | 'Drill';

const Stack = createNativeStackNavigator();

function AuthStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {backgroundColor: Themes.dark.background},
      }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function NonAuthStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'fade',
        contentStyle: {backgroundColor: Themes.dark.background},
        header: () => <MainAppHeader screenName="Home" />,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <MainAppHeader screenName="Home" />,
        }}
      />
      <Stack.Screen
        name="ConfigureDrill"
        component={ConfigureDrillScreen}
        options={{
          header: () => <MainAppHeader screenName="ConfigureDrill" />,
        }}
      />
      <Stack.Screen
        name="Drill"
        component={DrillScreen}
        options={{
          header: () => <MainAppHeader screenName="Drill" />,
        }}
      />
      <Stack.Screen
        name="SavedDrills"
        component={SavedDrillsScreen}
        options={{
          header: () => <MainAppHeader screenName="SavedDrills" />,
        }}
      />
    </Stack.Navigator>
  );
}

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
    <View style={{flex: 1, backgroundColor: Themes.dark.background}}>
      <Animated.View style={{flex: 1, opacity: fadeAnim}}>
        {token ? <NonAuthStack /> : <AuthStack />}
      </Animated.View>
      {/* <View style={{flex: 1, backgroundColor: 'blue', opacity: 0}} /> */}
    </View>
  );
};

export default App;
