import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {NumberSelectorView} from './NumberSelectorView';
import {View} from 'react-native';

interface SetBeatsPerPromptModalProps {
  modalIsVisible: boolean;
  beatsPerPrompt: number;
  onSetBeatsPerPrompt: (beatsPerPrompt: number) => void;
  onDismiss: () => void;
}

export const SetBeatsPerPromptModal: React.FC<
  SetBeatsPerPromptModalProps
> = props => {
  const [currentDisplayedBeatsPerPrompt, setCurrentDisplayedBeatsPerPrompt] =
    useState(props.beatsPerPrompt);

  return (
    <AppModal
      {...props}
      innerModalStyles={{top: '10%', padding: 16}}
      dismissingShouldFinish={true}
      onFinish={() => props.onSetBeatsPerPrompt(currentDisplayedBeatsPerPrompt)}>
      <NumberSelectorView
        selectedNumberInViewer={currentDisplayedBeatsPerPrompt}
        onSelectNumberInViewer={setCurrentDisplayedBeatsPerPrompt}
        onCommitSelectedNumber={() => {
          props.onSetBeatsPerPrompt(currentDisplayedBeatsPerPrompt);
          props.onDismiss();
        }}
      />
    </AppModal>
  );
};
