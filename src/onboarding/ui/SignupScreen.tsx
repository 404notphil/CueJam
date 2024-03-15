import React, {useState} from 'react';
import {
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../auth/AuthProvider';
import {globalStyles} from '../../ui/theme/styles';

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
    <View style={globalStyles.screenContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={globalStyles.modalOuter}>
          <View style={globalStyles.modalInner}>
            <Text style={globalStyles.title}>{modalTitle}</Text>
            <Text style={globalStyles.errorText}>{modalMessage}</Text>
            <Pressable
              style={[globalStyles.button, globalStyles.button]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={globalStyles.buttonText}>Try again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={globalStyles.title}>Signup</Text>
      <Text style={globalStyles.fieldHeader}>Email</Text>
      <TextInput
        style={globalStyles.textInputArea}
        onChangeText={setEmailText}
        value={emailText}
        placeholder="Type email here"
      />

      <Text style={globalStyles.fieldHeader}>Username</Text>
      <TextInput
        style={globalStyles.textInputArea}
        onChangeText={setUsernameText}
        value={usernameText}
        placeholder="Type username here"
      />

      <Text style={globalStyles.fieldHeader}>Password</Text>
      <TextInput
        style={globalStyles.textInputArea}
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
        style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
