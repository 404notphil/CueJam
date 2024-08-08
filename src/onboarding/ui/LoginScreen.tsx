import React, {useReducer, useState, useEffect} from 'react';
import {
  Modal,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../../auth/AuthProvider';
import {globalStyles} from '../../ui/theme/styles';
import {loginUser} from '../../services/AuthService';
import {initialUiState, LoginActions} from '../reducers/LoginReducer';
import {loginReducer} from '../reducers/LoginReducer';
import {Themes} from '../../ui/theme/Theme';
import auth from '@react-native-firebase/auth';

export function LoginScreen(): React.JSX.Element {
  const [uiState, dispatch] = useReducer(loginReducer, initialUiState);
  const {setToken} = useAuth();

  const onLoginPressed = () => {
    auth()
      .createUserWithEmailAndPassword(uiState.emailText, uiState.passwordText)
      .then(() => {
        console.log('12345 + User account created & signed in!');
        dispatch(LoginActions.loginCompleted());
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('12345 + That email address is already in use!');
          auth().signInWithEmailAndPassword(
            uiState.emailText,
            uiState.passwordText,
          );
          return;
        }

        if (error.code === 'auth/invalid-email') {
          console.log('12345 + That email address is invalid!');
        }

        console.error('12345 +' + error);
        dispatch(LoginActions.serverOrCredentialError());
      });
  };

  return (
    <View style={globalStyles.screenContainer}>
      {uiState.modalState && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={uiState.modalState != null}
          onRequestClose={() => {
            dispatch(LoginActions.closeModal());
          }}>
          <View style={globalStyles.modalOuter}>
            <View style={globalStyles.modalInner}>
              <Text style={globalStyles.title}>
                {uiState.modalState?.modalTitle}
              </Text>
              <Text style={globalStyles.modalErrorText}>
                {uiState.modalState?.modalMessage}
              </Text>
              {uiState.modalState?.modalButtonText && (
                <Pressable
                  style={globalStyles.button}
                  onPress={() => {
                    dispatch(LoginActions.tryAgainPressed());
                  }}>
                  <Text style={globalStyles.buttonText}>Try again</Text>
                </Pressable>
              )}
              {uiState.modalState.modalTitle == 'Loading' && (
                <ActivityIndicator size="large" color={Themes.dark.lightText} />
              )}
            </View>
          </View>
        </Modal>
      )}

      <Text style={globalStyles.title}>Login</Text>
      <Text style={globalStyles.fieldHeader}>Username</Text>
      <TextInput
        autoCapitalize="none"
        style={globalStyles.textInputArea}
        onChangeText={email =>
          dispatch(LoginActions.fieldValueChanged(email, uiState.passwordText))
        }
        value={uiState.emailText}
        placeholder="Type email or username here"
      />
      <Text style={globalStyles.fieldHeader}>Password</Text>
      <TextInput
        autoCapitalize="none"
        style={globalStyles.textInputArea}
        onChangeText={password =>
          dispatch(LoginActions.fieldValueChanged(uiState.emailText, password))
        }
        value={uiState.passwordText}
        placeholder="Type password here"
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(
            LoginActions.loginAttemptInitiated(
              uiState.emailText,
              uiState.passwordText,
            ),
          );
          onLoginPressed();
        }}
        style={[globalStyles.button, {marginTop: 16}]}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
