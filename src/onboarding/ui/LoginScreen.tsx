import React, {useReducer, useState, useEffect} from 'react';
import {
  Modal,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';
import {useAuth} from '../../auth/AuthProvider';
import {globalStyles} from '../../ui/theme/styles';
import {loginUser} from '../../services/AuthService';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  initialUiState,
  LoginAction,
  LoginActions,
  LoginCompleted,
  LoginModalStateType,
  LoginModalStates,
  LoginPressed,
  LoginUiState,
} from '../reducers/LoginReducer';

import {loginReducer} from '../reducers/LoginReducer';

export function LoginScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        navigation.navigate('Home');
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
              <Text style={globalStyles.errorText}>
                {uiState.modalState?.modalMessage}
              </Text>
              <Pressable
                style={[globalStyles.button, globalStyles.button]}
                onPress={() => {
                  dispatch(LoginActions.tryAgainPressed());
                }}>
                <Text style={globalStyles.buttonText}>Try again</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      <Text style={globalStyles.title}>Login</Text>
      <Text style={globalStyles.fieldHeader}>Email/username</Text>
      <TextInput
        style={globalStyles.textInputArea}
        onChangeText={email =>
          dispatch(LoginActions.fieldValueChanged(email, uiState.passwordText))
        }
        value={uiState.emailText}
        placeholder="Type email or username here"
      />
      <Text style={globalStyles.fieldHeader}>Password</Text>
      <TextInput
        style={globalStyles.textInputArea}
        onChangeText={password =>
          dispatch(LoginActions.fieldValueChanged(uiState.emailText, password))
        }
        value={uiState.passwordText}
        placeholder="Type password here"
      />
      <TouchableOpacity
        onPress={() => {
          if (
            uiState.passwordText.length === 0 ||
            uiState.emailText.length === 0
          ) {
            dispatch(LoginActions.showModalForInvalidFields());
          } else {
            dispatch(
              LoginActions.loginAttemptInitiated(
                uiState.emailText,
                uiState.passwordText,
              ),
            );
            onLoginPressed();
          }
        }}
        style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
