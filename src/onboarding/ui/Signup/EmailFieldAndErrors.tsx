import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {SignupActions, SignupUiState} from '../../reducers/SignupReducer';
import {globalStyles} from '../../../ui/theme/styles';
import {signupStyles} from './SignupScreen';

export function EmailFieldAndErrors(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupReducer').SignupAction
  >,
  uiState: SignupUiState,
) {
  return (
    <View>
      <Text style={globalStyles.fieldHeader}>Email</Text>
      <TextInput
        autoCapitalize="none"
        style={globalStyles.textInputArea}
        onChangeText={text =>
          dispatch(
            SignupActions.fieldValueChanged(
              text,
              uiState.usernameText,
              uiState.passwordText,
            ),
          )
        }
        value={uiState.emailText}
        placeholder="Type email here"
      />

      {/* Email field error(s) */}
      {uiState.emailError && (
        <Text style={signupStyles.errorText}>{uiState.emailError}</Text>
      )}
    </View>
  );
}
