import React, {useReducer} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {globalStyles} from '../../../ui/theme/styles';
import {signupReducer} from '../../reducers/SignupReducer';
import {initialSignupUiState} from '../../reducers/SignupUiState';
import {SignupScreenModal} from './SignupScreenModal';
import {EmailFieldAndErrors} from './EmailFieldAndErrors';
import {UsernameFieldAndErrors} from './UsernameFieldAndErrors';
import {PasswordFieldAndErrors} from './PasswordFieldAndErrors';
import {SignupButton} from './SignupButton';

export function SignupScreen(): React.JSX.Element {
  const [uiState, dispatch] = useReducer(signupReducer, initialSignupUiState);

  return (
    <View style={globalStyles.screenContainer}>
      {uiState.modalState &&
        SignupScreenModal(
          uiState.modalState,
          uiState.modalState.modalTitle,
          uiState.modalState.modalMessage,
          dispatch,
        )}

      {/* Header */}
      <Text style={globalStyles.title}>Signup</Text>

      <EmailFieldAndErrors dispatch={dispatch} uiState={uiState} />

      {UsernameFieldAndErrors(dispatch, uiState)}

      <PasswordFieldAndErrors dispatch={dispatch} uiState={uiState} />

      {SignupButton(dispatch, uiState)}
    </View>
  );
}

export const signupStyles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontFamily: 'arciform',
  },
});
