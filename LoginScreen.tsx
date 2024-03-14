import React, {useReducer, useState} from 'react';
import {
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import {loginUser} from './services/AuthService';
import {RootStackParamList} from './RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export function LoginScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const initialState = {
    emailText: '',
    passwordText: '',
    emailError: undefined,
    passwordErrors: undefined,
    modalState: undefined,
  };

  const [uiState, dispatch] = useReducer(reduce, initialState);

  const onLoginPressed = async () => {
    const response = await loginUser(uiState.emailText, uiState.passwordText);

    switch (response) {
      case 'Success': {
        dispatch(LoginActions.loginCompleted());
        navigation.navigate('Home');
      }
      case 'InvalidCredentials':
      case 'UserNotFound':
      case 'ErrorDuringLogin': {
        dispatch(LoginActions.serverOrCredentialError());
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      {uiState.modalState && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={uiState.modalState != null}
          onRequestClose={() => {
            dispatch(LoginActions.closeModal());
          }}>
          <View style={styles.modalOuter}>
            <View style={styles.modalInner}>
              <Text style={styles.title}>{uiState.modalState?.modalTitle}</Text>
              <Text style={styles.errorText}>
                {uiState.modalState?.modalMessage}
              </Text>
              <Pressable
                style={[styles.button, styles.button]}
                onPress={() => {
                  dispatch(LoginActions.tryAgainPressed());
                }}>
                <Text style={styles.buttonText}>Try again</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      <Text style={styles.title}>Login</Text>
      <Text style={styles.fieldHeader}>Email/username</Text>
      <TextInput
        style={styles.textInputArea}
        onChangeText={email =>
          dispatch(LoginActions.fieldValueChanged(email, uiState.passwordText))
        }
        value={uiState.emailText}
        placeholder="Type email or username here"
      />
      <Text style={styles.fieldHeader}>Password</Text>
      <TextInput
        style={styles.textInputArea}
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
        style={styles.button}>
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    // Add other text styles as needed
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // Add other text styles as needed
  },
});

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
      return {
        ...state,
      };
    }
    case 'FieldValueChanged': {
      const emptyEmail = action.email.length == 0;
      const emptyPassword = action.password.length == 0;
      const eitherEmpty = emptyEmail || emptyPassword;
      return {
        ...state,
        emailError: emptyEmail ? EmailError.Empty : undefined,
        passwordErrors: emptyPassword ? {Empty: true} : undefined,
        modalState: eitherEmpty ? LoginModalStates.Error : undefined,
      };
    }
    case 'LoginPressed': {
      return {
        ...state,
        emailError: EmailError.Empty,
        passwordErrors: {
          NoLetters: true,
          NoNumbers: true,
        },
        modalState: undefined,
      };
    }
    case 'TryAgainPressed':
      return {
        ...state,
        emailError: EmailError.Empty,
        passwordErrors: {
          NoLetters: true,
          NoNumbers: true,
        },
        modalState: undefined,
      };
      break;
    case 'LoginCompleted': {
      return {
        ...state,
        emailError: undefined,
        passwordErrors: undefined,
        modalState: undefined,
      };
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
