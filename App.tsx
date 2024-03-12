/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {HomeScreen} from './HomeScreen';
import {LoginScreen} from './LoginScreen';
import {
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const containerStyle = {
//     flex: 1, // This makes the SafeAreaView fill the entire screen
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, // Keeps your theme
//   };

//   return (
//     <NavigationContainer>
//       <SafeAreaView style={containerStyle}>
//         <StatusBar
//           barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//           backgroundColor={containerStyle.backgroundColor}
//         />
//         <MyStack />
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// }


export default App;


// How do I know what colors are available?
// How do I know what properties, such as "flex" are available in a style sheet?
// How do I make a completely custom color? 
// How about a gradient?