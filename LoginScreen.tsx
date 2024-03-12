import React, {useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
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

export function LoginScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [passwordText, setpasswordText] = useState('');

  const [loginResponse, setLoginResponse] = useState('Loading');

  const handleLogin = async (username: String, password: String) => {
    try {
      const response = await fetch('http://192.168.0.32:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Replace username and password with actual values you want to send
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      // Update state with the login response
      setLoginResponse(data.message); // Assuming the response has a message field
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during login:', error);
      setLoginResponse('Login failed. Please try again.' + username + password);
      setModalVisible(true);
    }
  };

  const onLoginPressed = () => {
    handleLogin(emailText, passwordText);
  };

  return (
    <View style={styles.screenContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOuter}>
          <View style={styles.modalInner}>
            <Text style={styles.title}>{loginResponse}</Text>
            <Pressable
              style={[styles.button, styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Login</Text>
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
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOuter: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  modalInner: {
    position: 'absolute',
    top: '25%',
    margin: 32,
    padding: 16,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 0.3,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
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
