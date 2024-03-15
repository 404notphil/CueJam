import React, {useState} from 'react';
import {
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../auth/AuthProvider';

export function SignupScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [usernameText, setUsernameText] = useState('');
  const [passwordText, setpasswordText] = useState('');
  const [modalTitle, setModalTitle] = useState('Loading');
  const [modalMessage, setModalMessage] = useState('');

  const {setToken} = useAuth();

  const handleSignupAndLogin = async (
    email: String,
    username: String,
    password: String,
  ) => {
    setModalTitle('Loading');
    setModalMessage('');
    setModalVisible(true);
    try {
      const signupResponse = await fetch(
        'http://192.168.0.32:8080/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Replace username and password with actual values you want to send
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        },
      );

      const signupData = await signupResponse.json();

      // Update state with the login response
      if (signupResponse.status >= 200 && signupResponse.status <= 299) {
        // Continue to log the user in
        const loginResponse = await fetch(
          'http://192.168.0.32:8080/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // Replace username and password with actual values we want to send
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          },
        );

        const loginData = await loginResponse.json();
        if (loginResponse.status >= 200 && loginResponse.status <= 299) {
          setToken(loginData.token);
          navigation.navigate('Home');
        } else {
          setModalTitle('Uh oh!');
          setModalMessage("Something's not quite right there.");
          setModalVisible(true);
        }
      } else {
        setModalTitle('Uh oh!');
        setModalMessage("Something's not quite right there.");
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setModalTitle('Uh oh!');
      setModalMessage("Something's not quite right there.");
      setModalVisible(true);
    }
  };

  const onSignupPressed = () => {
    handleSignupAndLogin(emailText, usernameText, passwordText);
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
            <Text style={styles.title}>{modalTitle}</Text>
            <Text style={styles.errorText}>{modalMessage}</Text>
            <Pressable
              style={[styles.button, styles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Try again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
      <TouchableOpacity
        onPress={() => {
          if (
            emailText.length === 0 ||
            usernameText.length === 0 ||
            passwordText.length === 0
          ) {
            setModalTitle('Uh oh!');
            setModalMessage('Fields were left empty!');
            setModalVisible(true);
          } else {
            onSignupPressed();
          }
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
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
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    // Add other text styles as needed
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
