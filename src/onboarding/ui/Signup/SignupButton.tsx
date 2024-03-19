import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useAuth} from '../../../auth/AuthProvider';
import {
  SignupActions,
  hasErrors,
  SignupUiState,
} from '../../reducers/SignupUiState';
import {globalStyles} from '../../../ui/theme/styles';

export function SignupButton(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupUiState').SignupAction
  >,
  uiState: SignupUiState,
  onSignupPressed: () => Promise<void>,
) {
  const {setToken} = useAuth();

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
