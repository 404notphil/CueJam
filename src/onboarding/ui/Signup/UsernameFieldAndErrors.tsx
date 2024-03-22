import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {SignupActions, SignupUiState} from '../../reducers/SignupUiState';
import {globalStyles} from '../../../ui/theme/styles';
import { ExpandableText } from '../ExpandableText';

export function UsernameFieldAndErrors(
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/NotePrompter/src/onboarding/reducers/SignupUiState').SignupAction
  >,
  uiState: SignupUiState,
) {
  return (
    <View>
      <Text style={globalStyles.fieldHeader}>Username</Text>
      <TextInput
        autoCapitalize="none"
        style={globalStyles.textInputArea}
        onChangeText={text =>
          dispatch(
            SignupActions.fieldValueChanged(
              uiState.emailText,
              text,
              uiState.passwordText,
            ),
          )
        }
        value={uiState.usernameText}
        placeholder="Type username here"
      />

      {/* Username field error(s) */}
      <ExpandableText
        error={uiState.usernameError}
        isCurrent={uiState.usernameError != undefined}
      />
    </View>
  );
}
