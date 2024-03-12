/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type LoginProps = PropsWithChildren<{
  title: string;
  hint: string;
  validationErrorText: string;
}>;

function LoginScreen({
  title,
  hint,
  validationErrorText,
  children,
}: LoginProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [emailText, setEmailText] = useState('');
  const [passwordText, setpasswordText] = useState('');
  const onLoginPressed = () => {};

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.fieldHeader}>Email</Text>
      <TextInput
        style={styles.textInputArea}
        onChangeText={setEmailText}
        value={emailText}
        placeholder="Type email here"
      />
      <Text style={styles.fieldHeader}>Password</Text>
      <TextInput
        style={styles.textInputArea}
        onChangeText={setpasswordText}
        value={passwordText}
        placeholder="Type password here"
      />
      <TouchableOpacity onPress={onLoginPressed} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    flex: 1, // This makes the SafeAreaView fill the entire screen
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, // Keeps your theme
  };

  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={containerStyle.backgroundColor}
      />
      <LoginScreen
        title="Login"
        hint="Type here"
        validationErrorText="Type here"></LoginScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    margin: 24,
    flex: 1,
  },
  title: {
    marginTop: 8,
    fontSize: 40,
    fontWeight: '600',
  },
  fieldHeader: {
    marginTop: 16,
    fontSize: 25,
    fontWeight: '600',
  },
  textInputArea: {
    height: 40,
    marginTop: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  textInputText: {
    fontSize: 14,
    fontWeight: '200',
  },
  validationError: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonStyle: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#999999',
    padding: 16,
    marginVertical: 32,
    borderRadius: 5, // Optional: if you want rounded corners
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // Add other text styles as needed
  },
});

export default App;


// How do I know what colors are available?
// How do I know what properties, such as "flex" are available in a style sheet?
// How do I make a completely custom color? 
// How about a gradient?