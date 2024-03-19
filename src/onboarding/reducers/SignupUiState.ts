export enum EmailUsernameError {
  Empty = 'Must not be empty',
  NoAtSign = "Email must have '@' sign",
}

export interface SignupUiState {
  emailText: string;
  usernameText: string;
  passwordText: string;
  emailError?: EmailUsernameError;
  usernameError?: EmailUsernameError;
  passwordErrors: PasswordError[] | undefined;
  modalState?: SignupModalStateType;
}

export function hasErrors(uiState: SignupUiState): boolean {
  return (
    uiState.emailError != undefined ||
    uiState.usernameError != undefined ||
    uiState.passwordErrors != undefined
  );
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
  emailText: string;
  usernameText: string;
  passwordText: string;
};
export type TryAgainPressed = {type: 'TryAgainPressed'};
export type ServerOrCredentialError = {type: 'ServerOrCredentialError'};
export type SignupCompleted = {type: 'SignupCompleted'};
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
    return {
      type: 'SignupPressed',
      emailText: email,
      usernameText: username,
      passwordText: password,
    };
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
  static closeModal(): CloseModal {
    return {type: 'CloseModal'};
  }
}

export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

export const PasswordErrorMessages = {
  Empty: 'Required field',
  NoLowercaseLetters: 'At least one lowercase letter is required',
  NoUppercaseLetters: 'At least one uppercase letter is required',
  NoNumbers: 'At least one number is required',
  NoSpecialChars: 'At least one special character is required',
  TooShort: 'Password must be at least 6 characters long',
} satisfies Record<PasswordError, string>;

export type PasswordError =
  | 'Empty'
  | 'NoUppercaseLetters'
  | 'NoLowercaseLetters'
  | 'NoNumbers'
  | 'NoSpecialChars'
  | 'TooShort';
