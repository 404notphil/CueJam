export enum EmailError {
  Empty = 'Email must not be empty',
  NoAtSign = "Email must have '@' sign",
}

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

export const initialUiState = {
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

export function loginReducer(
  state: LoginUiState,
  action: LoginAction,
): LoginUiState {
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
        modalState: undefined,
      };
      break;
    case 'LoginPressed': {
      return {
        ...state,
        modalState: LoginModalStates.Loading,
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
