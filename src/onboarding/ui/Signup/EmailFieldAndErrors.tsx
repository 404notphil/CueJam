import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {SignupActions, SignupUiState} from '../../reducers/SignupUiState';
import {globalStyles} from '../../../ui/theme/styles';
import {ExpandableText} from '../ExpandableText';

export function EmailFieldAndErrors(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupUiState').SignupAction
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
      <ExpandableText error={uiState.emailError} />
    </View>
  );
}
