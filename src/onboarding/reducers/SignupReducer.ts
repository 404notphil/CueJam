import {
  SignupUiState,
  SignupAction,
  initialSignupUiState,
  hasErrors,
  SignupModalStates,
  assertNever,
} from './SignupUiState';
import {
  hasEmailError,
  hasUsernameError,
  hasPasswordErrors,
} from './SignupValidation';

export function signupReducer(
  state: SignupUiState,
  action: SignupAction,
): SignupUiState {
  switch (action.type) {
    case 'InitializeScreen': {
      return initialSignupUiState;
    }
    case 'FieldValueChanged': {
      return {
        ...state,
        emailText: action.email,
        usernameText: action.username,
        passwordText: action.password,
        emailError: hasEmailError(action.email),
        usernameError: hasUsernameError(action.username),
        passwordErrors: hasPasswordErrors(action.password),
        modalState: undefined,
      };
    }
    case 'TryAgainPressed':
      return {
        ...state,
        modalState: undefined,
      };
    case 'SignupPressed': {
      return {
        ...state,
        emailError: hasEmailError(action.emailText),
        usernameError: hasUsernameError(action.usernameText),
        passwordErrors: hasPasswordErrors(action.passwordText),
        modalState: hasErrors(state)
          ? SignupModalStates.Error
          : SignupModalStates.Loading,
      };
    }
    case 'SignupCompleted': {
      return initialSignupUiState;
    }
    case 'ServerOrCredentialError': {
      return {
        ...state,
        modalState: SignupModalStates.Error,
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
