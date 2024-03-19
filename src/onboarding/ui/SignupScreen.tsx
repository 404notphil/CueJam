import React, {useReducer, useState} from 'react';
import {
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  SignupActions,
  hasErrors,
  PasswordErrorMessages,
} from '../reducers/SignupReducer';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../auth/AuthProvider';
import {signUpUser} from '../../services/AuthService';
import {globalStyles} from '../../ui/theme/styles';
import {initialSignupUiState, signupReducer} from '../reducers/SignupReducer';
import {PasswordError} from '../reducers/LoginReducer';

export function SignupScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [uiState, dispatch] = useReducer(signupReducer, initialSignupUiState);

  const {setToken} = useAuth();

  const onSignupPressed = async () => {
    const result = await signUpUser(
      uiState.emailText,
      uiState.usernameText,
      uiState.passwordText,
      setToken,
    );
    switch (result) {
      case 'ErrorDuringSignup': {
        dispatch(SignupActions.serverOrCredentialError());
      }
      case 'Success': {
        navigation.navigate('Home');
      }
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      {uiState.modalState && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={uiState.modalState != undefined}
          onRequestClose={() => {
            dispatch(SignupActions.closeModal());
          }}>
          <View style={globalStyles.modalOuter}>
            <View style={globalStyles.modalInner}>
              <Text style={globalStyles.title}>
                {uiState.modalState.modalTitle}
              </Text>
              <Text style={globalStyles.errorText}>
                {uiState.modalState.modalMessage}
              </Text>

              {uiState.modalState?.modalButtonText && (
                <Pressable
                  style={[globalStyles.button, globalStyles.button]}
                  onPress={() => {
                    dispatch(SignupActions.tryAgainPressed());
                  }}>
                  <Text style={globalStyles.buttonText}>Try again</Text>
                </Pressable>
              )}
              {uiState.modalState.modalTitle == 'Loading' && (
                <ActivityIndicator size="large" color="#00ff00" />
              )}
            </View>
          </View>
        </Modal>
      )}

      {/* Header */}
      <Text style={globalStyles.title}>Signup</Text>

      {/* Email field */}
      <Text style={globalStyles.fieldHeader}>Email</Text>
      <TextInput
        autoCapitalize="none"
        style={globalStyles.textInputArea}
        onChangeText={text =>
          dispatch(
            SignupActions.fieldValueChanged(
              text,
              uiState.usernameText,
              uiState.passwordText,
            ),
          )
        }
        value={uiState.emailText}
        placeholder="Type email here"
      />

      {/* Email field error(s) */}
      {uiState.emailError && (
        <Text style={signupStyles.errorText}>{uiState.emailError}</Text>
      )}

      {/* Username field */}
      <Text style={globalStyles.fieldHeader}>Username</Text>
      <TextInput
        autoCapitalize="none"
        style={globalStyles.textInputArea}
        onChangeText={text =>
          dispatch(
            SignupActions.fieldValueChanged(
              uiState.emailText,
              text,
              uiState.passwordText,
            ),
          )
        }
        value={uiState.usernameText}
        placeholder="Type username here"
      />

      {/* Username field error(s) */}
      {uiState.usernameError && (
        <Text style={signupStyles.errorText}>{uiState.usernameError}</Text>
      )}

      {/* Password field */}
      <Text style={globalStyles.fieldHeader}>Password</Text>
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        style={globalStyles.textInputArea}
        onChangeText={text =>
          dispatch(
            SignupActions.fieldValueChanged(
              uiState.emailText,
              uiState.usernameText,
              text,
            ),
          )
        }
        value={uiState.passwordText}
        placeholder="Type password here"
      />

      {/* Password field errors */}
      {uiState.passwordErrors &&
        uiState.passwordErrors.map((error, index) => (
          <Text style={signupStyles.errorText} key={index}>
            {PasswordErrorMessages[error]}
          </Text>
        ))}

      <TouchableOpacity
        onPress={() => {
          dispatch(
            SignupActions.signupAttemptInitiated(
              uiState.emailText,
              uiState.usernameText,
              uiState.passwordText,
            ),
          );
          if (!hasErrors(uiState)) {
            onSignupPressed();
          }
        }}
        style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const signupStyles = StyleSheet.create({
  errorText: {
    color: 'red',
    // Add other text styles as needed
  },
});