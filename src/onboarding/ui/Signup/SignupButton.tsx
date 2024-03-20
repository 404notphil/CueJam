import React, {useEffect} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useAuth} from '../../../auth/AuthProvider';
import {
  SignupActions,
  SignupModalStates,
  SignupUiState,
  hasErrors,
} from '../../reducers/SignupUiState';
import {globalStyles} from '../../../ui/theme/styles';
import {RootStackParamList} from '../../../navigation/RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {signUpUser} from '../../../services/AuthService';

export function SignupButton(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupUiState').SignupAction
  >,
  uiState: SignupUiState,
) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {setToken} = useAuth();

  const attemptUserSignup = async () => {
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
        dispatch(SignupActions.signupCompleted());
        navigation.navigate('Home');
      }
    }
  };

  useEffect(() => {
    if (uiState.modalState === SignupModalStates.Loading) {
      if (hasErrors(uiState)) {
        // Then we failed validation, and should not attempt a signup call to the server.
        dispatch(SignupActions.serverOrCredentialError());
      } else {
        // Proceed with signup attempt
        attemptUserSignup();
      }
    }
  }, [uiState]);

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
      }}
      style={globalStyles.button}>
      <Text style={globalStyles.buttonText}>Sign up</Text>
    </TouchableOpacity>
  );
}
