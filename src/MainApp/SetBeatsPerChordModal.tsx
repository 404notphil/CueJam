import React, {useState} from 'react';
import {AppModal} from '../ui/AppModal';
import {NumberSelectorView} from './NumberSelectorView';
import {View} from 'react-native';

interface SetBeatsPerChordModalProps {
  modalIsVisible: boolean;
  beatsPerChord: number;
  onSetBeatsPerChord: (beatsPerChord: number) => void;
  onDismiss: () => void;
}

export const SetBeatsPerChordModal: React.FC<
  SetBeatsPerChordModalProps
> = props => {
  const [currentDisplayedBeatsPerChord, setCurrentDisplayedBeatsPerChord] =
    useState(props.beatsPerChord);

  return (
    <AppModal
      {...props}
      innerModalStyles={{top: '10%', padding: 16}}
      dismissingShouldFinish={true}
      onFinish={() => props.onSetBeatsPerChord(currentDisplayedBeatsPerChord)}>
      <NumberSelectorView
        selectedNumberInViewer={currentDisplayedBeatsPerChord}
        onSelectNumberInViewer={setCurrentDisplayedBeatsPerChord}
        onCommitSelectedNumber={() => {
          props.onSetBeatsPerChord(currentDisplayedBeatsPerChord);
          props.onDismiss();
        }}
      />
    </AppModal>
  );
};
