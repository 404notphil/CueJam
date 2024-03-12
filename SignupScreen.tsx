import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import {RootStackParamList} from './RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export function SignupScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [emailText, setEmailText] = useState('');
  const [usernameText, setUsernameText] = useState('');
  const [passwordText, setpasswordText] = useState('');
  const onLoginPressed = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Signup</Text>
      <Text style={styles.fieldHeader}>Email</Text>
      <TextInput
        style={styles.textInputArea}
        onChangeText={setEmailText}
        value={emailText}
        placeholder="Type email here"
      />

      <Text style={styles.fieldHeader}>Username</Text>
      <TextInput
        style={styles.textInputArea}
        onChangeText={setUsernameText}
        value={usernameText}
        placeholder="Type username here"
      />

      <Text style={styles.fieldHeader}>Password</Text>
      <TextInput
        style={styles.textInputArea}
        onChangeText={setpasswordText}
        value={passwordText}
        placeholder="Type password here"
      />
      <TouchableOpacity onPress={onLoginPressed} style={styles.button}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 24,
    flex: 1,
    backgroundColor: 'black',
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
