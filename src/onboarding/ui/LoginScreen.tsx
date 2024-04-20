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
import { Themes } from '../../ui/theme/Theme';

export function LoginScreen(): React.JSX.Element {
  const [uiState, dispatch] = useReducer(loginReducer, initialUiState);
  const {setToken} = useAuth();

  const onLoginPressed = async () => {
    const response = await loginUser(
      uiState.emailText,
      uiState.passwordText,
      setToken,
    );

    switch (response) {
      case 'Success': {
        dispatch(LoginActions.loginCompleted());
        break;
      }
      case 'InvalidCredentials' || 'UserNotFound' || 'ErrorDuringLogin': {
        dispatch(LoginActions.serverOrCredentialError());
        break;
      }
    }
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
