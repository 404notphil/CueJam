import React, {useState, useEffect} from 'react';
import {HomeScreen} from './HomeScreen';
import {LoginScreen} from '../onboarding/ui/LoginScreen';
import {LandingScreen} from '../onboarding/ui/LandingScreen';
import {SignupScreen} from '../onboarding/ui/Signup/SignupScreen';
import {AuthProvider} from '../auth/AuthProvider';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../auth/AuthProvider';
import {Animated, View, Text, TouchableOpacity} from 'react-native';
import {Themes} from './theme/Theme';
import {ConfigureDrillScreen} from '../MainApp/ConfigureDrillScreen';
import {DrillScreen} from '../MainApp/DrillScreen';
import {SavedDrillsScreen} from '../MainApp/SavedDrillsScreen';
import {globalStyles} from './theme/styles';

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
        header: () => <MainAppHeader isHomeScreen={false} />,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{header: () => <MainAppHeader isHomeScreen={true} />}}
      />
      <Stack.Screen name="ConfigureDrill" component={ConfigureDrillScreen} />
      <Stack.Screen name="Drill" component={DrillScreen} />
      <Stack.Screen name="SavedDrills" component={SavedDrillsScreen} />
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

function AppBar(): React.JSX.Element {
  return (
    <View style={{height: 100, backgroundColor: Themes.dark.background}}></View>
  );
}

interface AppHeaderProps {
  isHomeScreen: boolean;
}

function MainAppHeader(props: AppHeaderProps) {
  const navigation = useNavigation();
  const {token, setToken} = useAuth();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingRight: 5,
      }}>
      <TouchableOpacity
        onPress={() => {
          props.isHomeScreen ? setToken(null) : navigation.navigate('Home');
        }}
        style={[
          globalStyles.button,
          {height: 40, padding: 10, marginVertical: 16, marginHorizontal: 16},
        ]}>
        <Text style={globalStyles.buttonText}>
          {props.isHomeScreen ? (token == 'temp' ? 'Login' : 'Logout') : 'Home'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
