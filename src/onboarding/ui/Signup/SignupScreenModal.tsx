import React from 'react';
import {Modal, Pressable, Text, View, ActivityIndicator} from 'react-native';
import {SignupActions, SignupModalStates} from '../../reducers/SignupUiState';
import {SignupModalStateType} from '../../reducers/SignupUiState';
import {globalStyles} from '../../../ui/theme/styles';
import { Themes } from '../../../ui/theme/Theme';

export function SignupScreenModal(
  modalState: SignupModalStateType,
  modalTitle: string,
  modalMessage: string | undefined,
  dispatch: React.Dispatch<
    import('/Users/philcarlson/ReactNativeProjects/CueJam/src/onboarding/reducers/SignupUiState').SignupAction
  >,
): React.ReactNode {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalState != undefined}
      onRequestClose={() => {
        dispatch(SignupActions.closeModal());
      }}>
      <View style={globalStyles.modalOuter}>
        <View style={globalStyles.modalInner}>
          <Text style={globalStyles.title}>{modalTitle}</Text>

          {modalMessage && (
            <Text style={globalStyles.modalErrorText}>{modalMessage}</Text>
          )}

          {modalState.modalButtonText && (
            <Pressable
              style={[globalStyles.button, {marginTop: 16}]}
              onPress={() => {
                dispatch(SignupActions.tryAgainPressed());
              }}>
              <Text style={globalStyles.buttonText}>Try again</Text>
            </Pressable>
          )}
          {modalState === SignupModalStates.Loading && (
            <ActivityIndicator size="large" color={Themes.dark.lightText} />
          )}
        </View>
      </View>
    </Modal>
  );
}
