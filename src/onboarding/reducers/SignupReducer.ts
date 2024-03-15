export enum EmailUsernameError {
  Empty = 'Email must not be empty',
  NoAtSign = "Email must have '@' sign",
}

export interface SignupUiState {
  emailText: string;
  usernameText: string;
  passwordText: string;
  emailError?: EmailUsernameError;
  usernameError?: EmailUsernameError;
  passwordErrors:
    | {
        [K in PasswordError]?: boolean;
      }
    | undefined;
  modalState?: SignupModalStateType;
}

export const initialSignupUiState = {
  emailText: '',
  usernameText: '',
  passwordText: '',
  emailError: undefined,
  usernameError: undefined,
  passwordErrors: undefined,
  modalState: undefined,
};

export type SignupModalStateType = {
  modalTitle: string;
  modalMessage?: string;
  modalButtonText?: string;
};

export const SignupModalStates = {
  Loading: {
    modalTitle: 'Loading',
  },
  Error: {
    modalTitle: 'Uh oh!',
    modalMessage: "Something's not right there",
    modalButtonText: 'Try again',
  },
} satisfies Record<string, SignupModalStateType>;

// Action types
export type InitializeScreen = {type: 'InitializeScreen'};
export type FieldValueChanged = {
  type: 'FieldValueChanged';
  email: string;
  username: string;
  password: string;
};
export type SignupPressed = {
  type: 'SignupPressed';
  email: string;
  username: string;
  password: string;
};
export type TryAgainPressed = {type: 'TryAgainPressed'};
export type ServerOrCredentialError = {type: 'ServerOrCredentialError'};
export type SignupCompleted = {type: 'SignupCompleted'};
export type ShowModalForInvalidFields = {
  emailText: string;
  usernameText: string;
  passwordText: string;
  type: 'ShowModalForInvalidFields';
};
export type CloseModal = {
  type: 'CloseModal';
};
export type SignupAction =
  | InitializeScreen
  | FieldValueChanged
  | SignupPressed
  | TryAgainPressed
  | ServerOrCredentialError
  | SignupCompleted
  | ShowModalForInvalidFields
  | CloseModal;

export class SignupActions {
  static initializeScreen(): InitializeScreen {
    return {type: 'InitializeScreen'};
  }

  static fieldValueChanged(
    email: string,
    username: string,
    password: string,
  ): FieldValueChanged {
    return {type: 'FieldValueChanged', email, username, password};
  }

  static signupAttemptInitiated(
    email: string,
    username: string,
    password: string,
  ): SignupPressed {
    return {type: 'SignupPressed', email, username, password};
  }

  static tryAgainPressed(): TryAgainPressed {
    return {type: 'TryAgainPressed'};
  }
  static serverOrCredentialError(): ServerOrCredentialError {
    return {type: 'ServerOrCredentialError'};
  }
  static signupCompleted(): SignupCompleted {
    return {type: 'SignupCompleted'};
  }
  static showModalForInvalidFields(
    emailText: string,
    usernameText: string,
    passwordText: string,
  ): ShowModalForInvalidFields {
    return {
      emailText,
      usernameText,
      passwordText,
      type: 'ShowModalForInvalidFields',
    };
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
  | 'NoUppercaseLetters'
  | 'NoLowercaseLetters'
  | 'NoNumbers'
  | 'NoSpecialChars'
  | 'TooShort';

export function signupReducer(
  state: SignupUiState,
  action: SignupAction,
): SignupUiState {
  switch (action.type) {
    case 'InitializeScreen': {
      return initialSignupUiState;
    }
    case 'FieldValueChanged': {
      const emptyEmail = action.email.length == 0;
      const emptyUsername = action.username.length == 0;
      const emptyPassword = action.password.length == 0;
      return {
        ...state,
        emailText: action.email,
        usernameText: action.username,
        passwordText: action.password,
        emailError: emptyEmail ? EmailUsernameError.Empty : state.emailError,
        usernameError: emptyUsername
          ? EmailUsernameError.Empty
          : state.emailError,
        passwordErrors: emptyPassword ? {Empty: true} : state.passwordErrors,
        modalState: undefined,
      };
    }
    case 'TryAgainPressed':
      return {
        ...state,
        modalState: undefined,
      };
      break;
    case 'SignupPressed': {
      return {
        ...state,
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
    case 'ShowModalForInvalidFields': {
      return {
        ...state,
        emailError: validateEmail(action.emailText),
        usernameError: validateUsername(action.usernameText),
        passwordErrors: validatePassword(action.passwordText),
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

function validateUsername(username: string): EmailUsernameError | undefined {
  return username.length === 0 ? EmailUsernameError.Empty : undefined;
}

function validateEmail(email: string): EmailUsernameError | undefined {
  if (email.length == 0) return EmailUsernameError.Empty;
  if (!email.includes('@')) return EmailUsernameError.NoAtSign;
  else return undefined;
}

function validatePassword(
  password: string,
): {[K in PasswordError]?: boolean} | undefined {
  const hasLowerCase = /[a-z]/;
  const hasUpperCase = /[A-Z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[^A-Za-z0-9]/;

  const errors: {[K in PasswordError]?: boolean} = {};

  if (password.length === 0) errors.Empty = true;
  if (!hasLowerCase.test(password)) errors.NoUppercaseLetters = true;
  if (!hasUpperCase.test(password)) errors.NoLowercaseLetters = true;
  if (!hasNumber.test(password)) errors.NoNumbers = true;
  if (!hasSpecialChar.test(password)) errors.NoSpecialChars = true;
  if (password.length < 6) errors.TooShort = true;

  return Object.keys(errors).length === 0 ? undefined : errors;
}
