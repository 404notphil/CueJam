import React, {useState} from 'react';
import {NumberSelectorView} from './NumberSelectorView';
import {DefaultAppModal} from './DefaultAppModal';

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
    <DefaultAppModal
      {...props}
      title={'beats per prompt'}
      onDismiss={() => {
        props.onSetBeatsPerPrompt(currentDisplayedBeatsPerPrompt);
        props.onDismiss();
      }}>
      <NumberSelectorView
        selectedNumberInViewer={currentDisplayedBeatsPerPrompt}
        onSelectNumberInViewer={setCurrentDisplayedBeatsPerPrompt}
        onCommitSelectedNumber={() => {
          props.onSetBeatsPerPrompt(currentDisplayedBeatsPerPrompt);
          props.onDismiss();
        }}
      />
    </DefaultAppModal>
  );
};
