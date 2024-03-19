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
  SignupUiState,
} from '../reducers/SignupReducer';
import {SignupModalStateType} from '../reducers/SignupReducer';
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
      {uiState.modalState &&
        uiState.modalState.modalMessage &&
        SignupScreenModal(
          uiState.modalState,
          uiState.modalState.modalTitle,
          uiState.modalState.modalMessage,
          dispatch,
        )}

      {/* Header */}
      <Text style={globalStyles.title}>Signup</Text>

      {/* Email field */}
      {EmailFieldAndErrors(dispatch, uiState)}

      {/* Username field */}
      {UsernameFieldAndErrors(dispatch, uiState)}

      {/* Password field */}
      {PasswordFieldAndErrors(dispatch, uiState)}

      {SignupButton(dispatch, uiState, onSignupPressed)}
    </View>
  );
}

const signupStyles = StyleSheet.create({
  errorText: {
    color: 'red',
    // Add other text styles as needed
  },
});

function SignupButton(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupReducer').SignupAction
  >,
  uiState: SignupUiState,
  onSignupPressed: () => Promise<void>,
) {
  return (
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
  );
}

function PasswordFieldAndErrors(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupReducer').SignupAction
  >,
  uiState: SignupUiState,
) {
  return (
    <View>
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
    </View>
  );
}

function UsernameFieldAndErrors(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupReducer').SignupAction
  >,
  uiState: SignupUiState,
) {
  return (
    <View>
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
    </View>
  );
}

function EmailFieldAndErrors(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupReducer').SignupAction
  >,
  uiState: SignupUiState,
) {
  return (
    <View>
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
    </View>
  );
}

function SignupScreenModal(
  modalState: SignupModalStateType,
  modalTitle: string,
  modalMessage: string,
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupReducer').SignupAction
  >,
): React.ReactNode {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalState != undefined}
      onRequestClose={() => {
        dispatch(SignupActions.closeModal());
      }}>
      <View style={globalStyles.modalOuter}>
        <View style={globalStyles.modalInner}>
          <Text style={globalStyles.title}>{modalTitle}</Text>
          <Text style={globalStyles.errorText}>{modalMessage}</Text>

          {modalState.modalButtonText && (
            <Pressable
              style={[globalStyles.button, globalStyles.button]}
              onPress={() => {
                dispatch(SignupActions.tryAgainPressed());
              }}>
              <Text style={globalStyles.buttonText}>Try again</Text>
            </Pressable>
          )}
          {modalTitle == 'Loading' && (
            <ActivityIndicator size="large" color="#00ff00" />
          )}
        </View>
      </View>
    </Modal>
  );
}
