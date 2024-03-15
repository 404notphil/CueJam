import React, {useReducer, useState, useEffect} from 'react';
import {
  Modal,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';
import {useAuth} from '../auth/AuthProvider';
import {globalStyles} from './theme/styles';
import {loginUser} from '../services/AuthService';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export function LoginScreen(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [uiState, dispatch] = useReducer(reduce, initialUiState);
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

export enum EmailError {
  Empty = 'Email must not be empty',
  NoAtSign = "Email must have '@' sign",
}

// enum PasswordError {
//   Empty = 'Password must not be empty',
//   NoLetters = 'Password must include one letter',
//   NoNumbers = 'Password must include one number',
//   NoSpecialChars = 'Password must include one special character',
//   TooShort = 'Password must be at least 6 characters long',
// }

export interface LoginUiState {
  emailText: string;
  passwordText: string;
  emailError?: EmailError;
  passwordErrors:
    | {
        [K in PasswordError]?: boolean;
      }
    | undefined;
  modalState?: LoginModalStateType;
}

const initialUiState = {
  emailText: '',
  passwordText: '',
  emailError: undefined,
  passwordErrors: undefined,
  modalState: undefined,
};

export type LoginModalStateType = {
  modalTitle: string;
  modalMessage?: string;
  modalButtonText?: string;
};

export const LoginModalStates = {
  Loading: {
    modalTitle: 'Loading',
  },
  Error: {
    modalTitle: 'Uh oh!',
    modalMessage: "Something's not right there",
    modalButtonText: 'Try again',
  },
} satisfies Record<string, LoginModalStateType>;

// Action types
export type InitializeScreen = {type: 'InitializeScreen'};
export type FieldValueChanged = {
  type: 'FieldValueChanged';
  email: string;
  password: string;
};
export type LoginPressed = {
  type: 'LoginPressed';
  email: string;
  password: string;
};
export type TryAgainPressed = {type: 'TryAgainPressed'};
export type ServerOrCredentialError = {type: 'ServerOrCredentialError'};
export type LoginCompleted = {type: 'LoginCompleted'};
export type ShowModalForInvalidFields = {
  type: 'ShowModalForInvalidFields';
};
export type CloseModal = {
  type: 'CloseModal';
};
export type LoginAction =
  | InitializeScreen
  | FieldValueChanged
  | LoginPressed
  | TryAgainPressed
  | ServerOrCredentialError
  | LoginCompleted
  | ShowModalForInvalidFields
  | CloseModal;

export class LoginActions {
  static initializeScreen(): InitializeScreen {
    return {type: 'InitializeScreen'};
  }

  static fieldValueChanged(email: string, password: string): FieldValueChanged {
    return {type: 'FieldValueChanged', email, password};
  }

  static loginAttemptInitiated(email: string, password: string): LoginPressed {
    return {type: 'LoginPressed', email, password};
  }

  static tryAgainPressed(): TryAgainPressed {
    return {type: 'TryAgainPressed'};
  }
  static serverOrCredentialError(): ServerOrCredentialError {
    return {type: 'ServerOrCredentialError'};
  }
  static loginCompleted(): LoginCompleted {
    return {type: 'LoginCompleted'};
  }
  static showModalForInvalidFields(): ShowModalForInvalidFields {
    return {type: 'ShowModalForInvalidFields'};
  }
  static closeModal(): CloseModal {
    return {type: 'CloseModal'};
  }
}
export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

export type PasswordError =
  | 'Empty'
  | 'NoLetters'
  | 'NoNumbers'
  | 'NoSpecialChars'
  | 'TooShort';

export function reduce(state: LoginUiState, action: LoginAction): LoginUiState {
  switch (action.type) {
    case 'InitializeScreen': {
      return initialUiState;
    }
    case 'FieldValueChanged': {
      const emptyEmail = action.email.length == 0;
      const emptyPassword = action.password.length == 0;
      return {
        ...state,
        emailText: action.email,
        passwordText: action.password,
        emailError: emptyEmail ? EmailError.Empty : state.emailError,
        passwordErrors: emptyPassword ? {Empty: true} : state.passwordErrors,
        modalState: undefined,
      };
    }
    case 'TryAgainPressed':
      return {
        ...state,
        emailError: EmailError.Empty,
        passwordErrors: {
          Empty: true,
        },
        modalState: undefined,
      };
      break;
    case 'LoginPressed': {
      return {
        ...state,
      };
    }
    case 'LoginCompleted': {
      return initialUiState;
    }
    case 'ServerOrCredentialError': {
      return {
        ...state,
        modalState: LoginModalStates.Error,
      };
    }
    case 'ShowModalForInvalidFields': {
      return {
        ...state,
        emailError: EmailError.Empty,
        passwordErrors: {
          Empty: true,
        },
        modalState: LoginModalStates.Error,
      };
    }
    case 'CloseModal': {
      return {
        ...state,
        modalState: undefined,
      };
    }
    default:
      return assertNever(action); // TypeScript will error if any case is not handled
  }
}
