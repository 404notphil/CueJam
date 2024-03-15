export enum EmailError {
  Empty = 'Email must not be empty',
  NoAtSign = "Email must have '@' sign",
}

export interface SignupUiState {
  emailText: string;
  passwordText: string;
  emailError?: EmailError;
  passwordErrors:
    | {
        [K in PasswordError]?: boolean;
      }
    | undefined;
  modalState?: SignupModalStateType;
}

export const initialSignupUiState = {
  emailText: '',
  passwordText: '',
  emailError: undefined,
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
  password: string;
};
export type SignupPressed = {
  type: 'SignupPressed';
  email: string;
  password: string;
};
export type TryAgainPressed = {type: 'TryAgainPressed'};
export type ServerOrCredentialError = {type: 'ServerOrCredentialError'};
export type SignupCompleted = {type: 'SignupCompleted'};
export type ShowModalForInvalidFields = {
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

  static fieldValueChanged(email: string, password: string): FieldValueChanged {
    return {type: 'FieldValueChanged', email, password};
  }

  static signupAttemptInitiated(
    email: string,
    password: string,
  ): SignupPressed {
    return {type: 'SignupPressed', email, password};
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
        emailError: EmailError.Empty,
        passwordErrors: {
          Empty: true,
        },
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
