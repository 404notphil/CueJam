import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {
  SignupActions,
  PasswordErrorMessages,
  SignupUiState,
} from '../../reducers/SignupUiState';
import {globalStyles} from '../../../ui/theme/styles';
import {signupStyles} from './SignupScreen';

export function PasswordFieldAndErrors(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupUiState').SignupAction
  >,
  uiState: SignupUiState,
) {
  return (
    <View>
      <Text style={globalStyles.fieldHeader}>Password</Text>
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        style={globalStyles.textInputArea}
        onChangeText={text =>
          dispatch(
            SignupActions.fieldValueChanged(
              uiState.emailText,
              uiState.usernameText,
              text,
            ),
          )
        }
        value={uiState.passwordText}
        placeholder="Type password here"
      />

      {/* Password field errors */}
      {uiState.passwordErrors &&
        uiState.passwordErrors.map((error, index) => (
          <Text style={signupStyles.errorText} key={index}>
            {PasswordErrorMessages[error]}
          </Text>
        ))}
    </View>
  );
}
