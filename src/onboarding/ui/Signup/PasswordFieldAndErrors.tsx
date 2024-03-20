import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {
  SignupActions,
  SignupAction,
  PasswordErrorMessages,
  SignupUiState,
} from '../../reducers/SignupUiState';
import {globalStyles} from '../../../ui/theme/styles';
import {signupStyles} from './SignupScreen';
import {ExpandableText} from '../ExpandableText';

interface PasswordFieldAndErrorsProps {
  dispatch: React.Dispatch<SignupAction>;
  uiState: SignupUiState;
}

export function PasswordFieldAndErrors({
  dispatch,
  uiState,
}: PasswordFieldAndErrorsProps) {
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
          <ExpandableText key={index} error={PasswordErrorMessages[error]} />
        ))}
    </View>
  );
}
